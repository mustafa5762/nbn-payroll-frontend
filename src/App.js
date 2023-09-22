import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Slip from './screens/Slip';


function App() {
  const username = Cookies.get('username');
  const accessToken = Cookies.get('accessToken');

  const isLoggedIn = !!accessToken; // Check if the user is logged in

  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/daily_report"
          element={isLoggedIn ? <DailyReport /> : <Navigate to="/login" />}
        />
        <Route
          path="/monthly_report"
          element={isLoggedIn ? <MonthlyReport /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee_report"
          element={isLoggedIn ? <EmployeeReport /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees"
          element={isLoggedIn ? <Employees /> : <Navigate to="/login" />}
        />
        <Route
          path="/new_entry"
          element={isLoggedIn ? <NewEntry /> : <Navigate to="/login" />}
        />
        <Route
          path="/new_employee"
          element={isLoggedIn ? <NewEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit_entry/:id"
          element={isLoggedIn ? <UpdateEntry /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit_employee/:id"
          element={isLoggedIn ? <UpdateEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/salary_slip"
          element={isLoggedIn ? <Slip /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;