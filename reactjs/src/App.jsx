import React from "react";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Forgetpassword1 from "./pages/forget-password1";
import Forgetpassword2 from "./pages/forget-password2";
import Account from "./pages/account";
import Equipment from "./pages/equipment";
import EquipmentAdd from "./pages/equipment_add";
import EquipmentDetail from "./pages/equipment_detail";
import EquipmentUpdate from "./pages/equipment_update";
import Service from "./pages/service";
import ServiceAdd from "./pages/service_add";
import ServiceDetail from "./pages/service_detail";
import ServiceUpdate from "./pages/service_update";
import SerialNumber from "./pages/serial-number";
import SerialNumberAdd from "./pages/serial_number_add";
import SerialNumberDetail from "./pages/serial_number_detail";
import Report from "./pages/report";
import RoleManagement from "./pages/role_management";
import RoleManagementAdd from "./pages/role_management_add";
import RoleManagementUpdate from "./pages/role_management_update"
import AccountManagement from "./pages/account_management";
import AccountManagementAdd from "./pages/account_management_add";
import AccountManagementUpdate from "./pages/account_management_update"
import Diary from "./pages/diary"
import UserInterface from "./pages/user"
import DisplayKios from "./pages/display_kios"
import DisplayCounter from "./pages/display_counter"
import DisplayCenter from "./pages/display_center"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="/forget-password-1" element={<Forgetpassword1/>}/>
          <Route path="/forget-password-2" element={<Forgetpassword2/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/equipment" element={<Equipment />}/>
          <Route path="/equipment/add" element={<EquipmentAdd />}/>
          <Route path="/equipment/detail/:id" element={<EquipmentDetail />}/>
          <Route path="/equipment/update/:id" element={<EquipmentUpdate />}/>
          <Route path="/service" element={<Service />}/>
          <Route path="/service/add" element={<ServiceAdd />}/>
          <Route path="/service/detail/:id" element={<ServiceDetail />}/>
          <Route path="/service/update/:id" element={<ServiceUpdate />}/>
          <Route path="/serial-number" element={<SerialNumber/>}/>
          <Route path="/serial-number/add" element={<SerialNumberAdd />}/>
          <Route path="/serial-number/detail/:id" element={<SerialNumberDetail />}/>
          <Route path="/report" element={<Report />}/>
          <Route path="/role-management" element={<RoleManagement/>}/>
          <Route path="/role-management/add/:id" element={<RoleManagementAdd />}/>
          <Route path="/role-management/update/:id" element={<RoleManagementUpdate />}/>
          <Route path="/account-management" element={<AccountManagement/>}/>
          <Route path="/account-management/add" element={<AccountManagementAdd />}/>
          <Route path="/account-management/update/:id" element={<AccountManagementUpdate />}/>
          <Route path="/diary" element={<Diary/>}/>
          <Route path="/user-interface" element={<UserInterface/>}/>
          <Route path="/display-kios" element={<DisplayKios/>}/>
          <Route path="/display-counter" element={<DisplayCounter/>}/>
          <Route path="/display-center" element={<DisplayCenter/>}/>
        </Routes>
    </div>
  );
}

export default App;
