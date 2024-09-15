import Admin from "../components/screens/admin/Admin";
import Calculator from "../components/screens/calculators/Calculator";
import History from "../components/screens/history/History";
import Home from "../components/screens/home/Home";
import NotConfirmed from "../components/screens/not-confirmed/Not-confirmed";
import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";

export const routes = [
  {
    path: "https://maddox-rage.github.io/calculator_frontend/",
    component: Home,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//auth",
    component: SignIn,
    isAuth: false,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//register",
    component: SignUp,
    isAuth: false,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//history",
    component: History,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//admin",
    component: Admin,
    isAuth: false,
    isConfirmed: true,
    isAdmin: true,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//not-confirmed",
    component: NotConfirmed,
    isAuth: true,
    isConfirmed: false,
    isAdmin: false,
  },
  {
    path: "https://maddox-rage.github.io/calculator_frontend//calculator",
    component: Calculator,
    isAuth: false,
    isConfirmed: true,
    isAdmin: false,
  },
];
