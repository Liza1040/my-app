import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  Button,
} from '@vkontakte/vkui';

const NameAge = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [lastRequest, setLastRequest] = useState(null);

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setName(value);
      setError('');
      if (lastRequest) {
        lastRequest.cancel('Request canceled');
      }
      const source = axios.CancelToken.source();
      setLastRequest(source);
      setTimeout(() => {
        makeAgifyRequest(event.target.value, source.token);
      }, 3000);
    } else {
      setError('Имя может содержать только буквы');
    }
  };

  const makeAgifyRequest = async (name, cancelToken) => {
    if (name.trim() === '') {
      return;
    }
    
    try {
      const response = await axios.get('https://api.agify.io/', {
        params: {
          name: name
        },
        cancelToken: cancelToken
      });
      setAge(response.data.age);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (lastRequest) {
      lastRequest.cancel('Request canceled');
    }
    makeAgifyRequest(name, null);
  };

  return (
    <form onSubmit={handleSubmit} className='content content-display-column content__margin-left'>
      <div className="content-form">
        <Input type="text" value={name} onChange={handleNameChange} placeholder='Input name'/>
        <Button type="submit" size="m">
        Get age
        </Button>
      </div>
      {error && <div className='form-error'>{error}</div>}
      {age && <div>Age: {age}</div>}
    </form>
  );
};

export default NameAge;
