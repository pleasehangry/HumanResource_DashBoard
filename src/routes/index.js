import routesConfig from "../config/route";
import LoginLayout from "../layouts/LoginLayout";
import {
  AddEmployees,
  Attendance,
  Employees,
  Login,
  Register,
  Employee,
  EditEmployee,
  DetailInfor,
} from "../screens";

const publicRoutes = [
  { path: routesConfig.attendance, component: Attendance },
  { path: routesConfig.profile, component: Employee },
  { path: routesConfig.login, component: Login, layout: null },
  { path: routesConfig.register, component: Register, layout: null },
  { path: routesConfig.detailInfor, component: DetailInfor, layout: null },
];
const privateRoutes = [
  { path: routesConfig.profile_edit, component: EditEmployee },
  { path: routesConfig.employees, component: Employees },
  { path: routesConfig.add_employee, component: AddEmployees },
];

export { publicRoutes, privateRoutes };
