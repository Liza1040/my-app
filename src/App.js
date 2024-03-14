import React, { useState } from 'react';
import './App.css';
import NameAge from './NameAge'
import CatFact from './CatFact'
import {
  AppRoot,
  View,
  Panel,
  PanelHeader,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function App() {
  const [activePanel, setActivePanel] = useState('cat-fact');

  return (
    <AppRoot activeView="main">
      <View id="main" activePanel={activePanel}>
        <Panel id="cat-fact">
        <PanelHeader>Cat Fact</PanelHeader>
          <CatFact />
          <CellButton onClick={() => setActivePanel('get-age')}>Find out age</CellButton>
        </Panel>
        
        <Panel id="get-age">
          <PanelHeader>Get age by name</PanelHeader>
          <NameAge />
          <CellButton onClick={() => setActivePanel('cat-fact')}>Get a fact about a cat</CellButton>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
