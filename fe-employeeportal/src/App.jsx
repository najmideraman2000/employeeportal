import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeHistoryList from './pages/EmployeeHistoryList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
          <Route path="/history" element={<EmployeeHistoryList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;