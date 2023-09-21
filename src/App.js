import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyReport from './screens/DailyReport';
import MonthlyReport from './screens/MonthlyReport';
import EmployeeReport from './screens/EmployeeReport'
import Employees from './screens/Employees';
import NewEntry from './screens/NewEntry';
import NewEmployee from './screens/AddNewEmployee';
import UpdateEntry from './screens/UpdateEntry';
import Navbar from './components/Navbar';
import UpdateEmployee from './screens/UpdatEmployee';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/l" element={<Login/>}/>

        <Route path="/" element={<Dashboard/>}/>
          <Route path="/daily_report" element={<DailyReport/>}/>
          <Route path="/monthly_report" element={<MonthlyReport/>}/>
          <Route path='/employee_report' element={<EmployeeReport/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/new_entry' element={<NewEntry/>}/>
          <Route path='/new_employee' element={<NewEmployee/>}/>
          <Route path='/edit_entry/:id' element={<UpdateEntry/>}/>
          <Route path='/edit_employee/:id' element={<UpdateEmployee/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;