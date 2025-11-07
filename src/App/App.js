// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import StudentForm from '../Components/StudentForm/StudentForm';
import ViewStudent from '../Components/ViewStudent/ViewStudent';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
             <Route path="/" element={<StudentForm />} />
          <Route path='/edit-singleElement/:id' element={<StudentForm/>}/>
          <Route path='/viewStudent' element={<ViewStudent/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
