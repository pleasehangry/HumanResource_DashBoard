import routesConfig from "../config/route";
import LoginLayout from "../layouts/LoginLayout";
import { Employees, Login, Register } from "../screens";

const publicRoutes = [
  { path: routesConfig.employee, component: Employees },
  { path: routesConfig.login, component: Login, layout: null },
  { path: routesConfig.register, component: Register, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
