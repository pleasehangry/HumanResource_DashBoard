import routesConfig from "../config/route";
import LoginLayout from "../layouts/LoginLayout";
import {
  AddEmployees,
  Attendance,
  Employees,
  Login,
  Register,
  Employee,
} from "../screens";

const publicRoutes = [
  { path: routesConfig.employees, component: Employees },
  { path: routesConfig.add_employee, component: AddEmployees },
  { path: routesConfig.attendance, component: Attendance },
  { path: routesConfig.profile, component: Employee },
  { path: routesConfig.login, component: Login, layout: null },
  { path: routesConfig.register, component: Register, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
