import React, { useRef, useState } from 'react';
import './App.css';
import {
  Input,
  Button,
} from '@vkontakte/vkui';

function CatFact() {
  const [fact, setFact] = useState('');
  const inputRef = useRef(null);

  const fetchCatFact = () => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        setFact(data.fact);
        if (inputRef) {
          inputRef.current.focus();
          const text = data.fact.split(' ');
          const firstWord = text[0];
          const restOfSentence = text.slice(1).join(' ');
          const newText = firstWord + ' ' + restOfSentence;
          inputRef.current.value = newText;
          inputRef.current.setSelectionRange(firstWord.length, firstWord.length);
        }
      })
      .catch(error => console.error('Error fetching cat fact:', error));
  };

  return (
    <div className='content content__margin-left'>
        <Input type="text" defaultValue="" getRef={inputRef}/>
        <Button size="m" onClick={fetchCatFact}>
        Get fact
        </Button>
    </div>
  );
}

export default CatFact;
