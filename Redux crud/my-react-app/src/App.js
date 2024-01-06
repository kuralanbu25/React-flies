import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Component } from './component/Component';
import { Componenttable } from './component/Componenttable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='rform' element={<Component/>}/>
      <Route path='rtable' element={<Componenttable/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
