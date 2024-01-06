import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Employee } from './employee/Employee';
import { Emplyeelist } from './employee/Emplyeelist';
import Classlist from './class/Classlist';
import Classform from './class/Classform';
import Class from './class component/Class';
import List from './class component/List';
import Classformlist from './class component/Classformlist';
import { Reducerlist } from './reducer/Reducerlist';
import { Reducerform } from './reducer/Reducerform';
import { Inc } from './context/Inc';
import { Usecontextlist } from './UseContext/Usecontextlist';
import { Otp } from './class/Otp';
import { Usecontextmain } from './UseContext/Usecontextmain';
import { View } from './UseContext/View';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/form' element={< Employee/>} />
        <Route path='/list' element={< Emplyeelist/>} />
        <Route path='/form/:id' element={< Employee/>} />
        <Route path='/class' element={<Classform/>} />
        <Route path='/classlist' element={<Classlist/>} />
        <Route path='/classform' element={<Class/>} />
        <Route path='/classform/:id' element={<Class/>} />
        <Route path='/clist' element={<List/>} />
        <Route path='/rlist' element={<Reducerlist/>} />
        <Route path='/rform' element={<Reducerform/>} />
        <Route path='/rform/:id' element={<Reducerform/>} />
        <Route path='/inc' element={<Inc/>}/>
        <Route path='/ctable' element={<Usecontextlist/>}/>
        <Route path='/cmain' element={<Usecontextmain/>}/>
        <Route path='/view' element={<View/>}/>
        <Route path='/otp' element={<Otp/>}/>
      </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
