import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Components } from './component/Components';
import Componentone from './component/Componentone';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='component' element={<Components/>} ></Route>
     <Route path='comp' element={<Componentone/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
