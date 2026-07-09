export const Home_route = "/";
export const About_route = "/about";
export const How_it_works_route = "/how-it-works";
export const Contact_route = "/contact";
export const Login_route = "/login";
export const Register_route = "/register";
export const Forgot_password_route = "/forgot-password";

//admin dashboard routes
export const Admin_Dashboard_route = "/admin";
export const Admin_Users_route = "/admin/users";
export const Admin_Projects_route = "/admin/projects";
export const Admin_Teams_route = "/admin/teams";
export const Admin_Roles_route = "/admin/roles";
export const Admin_Activity_route = "/admin/activity";
export const Admin_Reports_route = "/admin/reports";

//public nav
export const navMenu = [
  {
    label: "Home",
    route: Home_route,
  },
  {
    label: "About",
    route: About_route,
  },

  {
    label: "How it works",
    route: How_it_works_route,
  },
  {
    label: "Contact",
    route: Contact_route,
  },
];

//auth routes
export const authRoute = [
  {
    label: "Login",
    route: Login_route,
  },
  {
    label: "Register",
    route: Register_route,
  },
  {
    label: "forgot-password",
    route: Forgot_password_route,
  },
];

//admin routes
export const adminNavItems = [
  { label: "Dashboard", route: Admin_Dashboard_route },
  { label: "Users", route: Admin_Users_route },
  { label: "Roles & Permissions", route: Admin_Roles_route },
  { label: "Projects", route: Admin_Projects_route },
  { label: "Teams", route: Admin_Teams_route },
  { label: "Activity", route: Admin_Activity_route },
  { label: "Reports", route: Admin_Reports_route },
];
