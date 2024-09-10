import SignIn from "../components/screens/signin/signin";
import SignUp from "../components/screens/signup/Signup";

export const routes = [
  {
    path: "/",
    component: "Asdasd",
    isAuth: true,
  },
  {
    path: "/auth",
    component: SignIn,
    isAuth: false,
  },
  {
    path: "/register",
    component: SignUp,
    isAuth: false,
  },
];
