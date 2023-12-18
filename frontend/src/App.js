import logo from './logo.svg';
import './App.css';
import TaskForm from './component/TaskForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import TaskList from './component/TaskList';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskList />}/>
        <Route path='/form' element={<TaskForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
