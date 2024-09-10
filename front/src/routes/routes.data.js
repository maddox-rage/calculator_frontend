import Admin from "../components/screens/admin/Admin";
import Calculator from "../components/screens/calculators/Calculator";
import History from "../components/screens/history/History";
import Home from "../components/screens/home/Home";
import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";

export const routes = [
  {
    path: "/",
    component: Home,
    isAuth: false,
    isConfirmed: true,
  },
  {
    path: "/auth",
    component: SignIn,
    isAuth: false,
    isConfirmed: true,
  },
  {
    path: "/register",
    component: SignUp,
    isAuth: false,
    isConfirmed: true,
  },
  {
    path: "/history",
    component: History,
    isAuth: false,
    isConfirmed: true,
  },
  {
    path: "/admin",
    component: Admin,
    isAuth: false,
    isConfirmed: true,
  },
  {
    path: "/calculator",
    component: Calculator,
    isAuth: false,
    isConfirmed: true,
  },
];
