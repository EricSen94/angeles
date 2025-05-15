import React from 'react';
import './App.css';
import { CategoryList } from './components/organisms/testParaStore/testParaStore';

function App() {
  return (
    <div className="App" data-testid="principal-div">
      <CategoryList />
    </div>
  );
}

export default App;
