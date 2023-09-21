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
import Cookies from 'js-cookie';


function App() {
  const username = Cookies.get('username');
  const accessToken = Cookies.get('accessToken');

  const isLoggedIn = !!accessToken; // Check if the user is logged in

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/l" element={<Login isLoggedIn={isLoggedIn}/>}/>

        <Route path="/" element={<Dashboard/>}/>
          <Route path="/daily_report" element={<DailyReport isLoggedIn={isLoggedIn}/>}/>
          <Route path="/monthly_report" element={<MonthlyReport isLoggedIn={isLoggedIn}/>}/>
          <Route path='/employee_report' element={<EmployeeReport isLoggedIn={isLoggedIn}/>}/>
          <Route path='/employees' element={<Employees isLoggedIn={isLoggedIn}/>}/>
          <Route path='/new_entry' element={<NewEntry isLoggedIn={isLoggedIn}/>}/>
          <Route path='/new_employee' element={<NewEmployee isLoggedIn={isLoggedIn}/>}/>
          <Route path='/edit_entry/:id' element={<UpdateEntry isLoggedIn={isLoggedIn}/>}/>
          <Route path='/edit_employee/:id' element={<UpdateEmployee isLoggedIn={isLoggedIn}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;