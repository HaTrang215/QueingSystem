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
import SerialNumberDetail from "./pages/serial_number_add";
import SerialNumberUpdate from "./pages/serial_number_update"
import Report from "./pages/report";
import RoleManagement from "./pages/role_management";
import RoleManagementAdd from "./pages/role_management_add";
import RoleManagementUpdate from "./pages/role_management_update"
import AccountManagement from "./pages/account_management";
import AccountManagementAdd from "./pages/account_management_add";
import AccountManagementUpdate from "./pages/account_management_update"
import Diary from "./pages/diary"

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forget-password-1" element={<Forgetpassword1/>}/>
          <Route path="/forget-password-2" element={<Forgetpassword2/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/equipment" element={<Equipment />}/>
          <Route path="/equipment/add" element={<EquipmentAdd />}/>
          <Route path="/equipment/detail" element={<EquipmentDetail />}/>
          <Route path="/equipment/update" element={<EquipmentUpdate />}/>
          <Route path="/service" element={<Service />}/>
          <Route path="/service/add" element={<ServiceAdd />}/>
          <Route path="/service/detail" element={<ServiceDetail />}/>
          <Route path="/service/update" element={<ServiceUpdate />}/>
          <Route path="/serial-number" element={<SerialNumber/>}/>
          <Route path="/serial-number/add" element={<SerialNumberAdd />}/>
          <Route path="/serial-number/detail" element={<SerialNumberDetail />}/>
          <Route path="/serial-number/update" element={<SerialNumberUpdate />}/>
          <Route path="/report" element={<Report />}/>
          <Route path="/role-management" element={<RoleManagement/>}/>
          <Route path="/role-management/add" element={<RoleManagementAdd />}/>
          <Route path="/role-management/update" element={<RoleManagementUpdate />}/>
          <Route path="/account-management" element={<AccountManagement/>}/>
          <Route path="/account-management/add" element={<AccountManagementAdd />}/>
          <Route path="/account-management/update" element={<AccountManagementUpdate />}/>
          <Route path="/diary" element={<Diary/>}/>
        </Routes>
    </div>
  );
}

export default App;
