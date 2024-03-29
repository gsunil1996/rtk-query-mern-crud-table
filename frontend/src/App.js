import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import EmployeesTable from "./components/employeesTable/EmployeesTable";
import EmployeesProfile from "./components/employeesTable/EmployeesProfile";
import CompaniesTable from "./components/companiesTable/CompaniesTable";
import CompanyProfile from "./components/companiesTable/CompanyProfile";
import UsersList from "./components/users/UsersList";

function App() {
  const location = useLocation();
  console.log("checking", location);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/employee/:id" element={<EmployeesProfile />} />
        <Route path="/companiesTable" element={<CompaniesTable />} />
        <Route path="/companiesTable/:id" element={<CompanyProfile />} />
        <Route path="/users" element={<UsersList />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
