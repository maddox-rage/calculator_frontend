import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { routes } from "./routes.data.js";
import NotFound from "../components/screens/not-found/Not-found.jsx";
import NotConfirmed from "../components/screens/not-confirmed/Not-confirmed.jsx";
import CalcPageK1 from "../components/screens/calculators/CalcPageK1.jsx";

const RouteGuard = ({ element, isAuth, user }) => {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  if (!currentRoute) {
    return <NotFound />;
  }

  if (currentRoute.isAuth && !isAuth) {
    return (
      <Navigate
        to="https://maddox-rage.github.io/calculator_frontend//auth"
        replace
      />
    );
  }

  if (currentRoute.isConfirmed && !user.decode.isConfirmed) {
    return (
      <Navigate
        to="https://maddox-rage.github.io/calculator_frontend//not-confirmed"
        replace
      />
    );
  }
  if (currentRoute.isAdmin && !user?.decode?.isAdmin) {
    return (
      <Navigate
        to="https://maddox-rage.github.io/calculator_frontend//"
        replace
      />
    );
  }

  return element;
};
const Router = () => {
  const { isAuth, user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RouteGuard
                element={<route.component />}
                isAuth={isAuth}
                user={user}
              />
            }
          />
        ))}
        <Route
          path="https://maddox-rage.github.io/calculator_frontend//calculator/CalcPageK1"
          element={<CalcPageK1 />}
        />
        <Route
          path="https://maddox-rage.github.io/calculator_frontend//not-confirmed"
          element={<NotConfirmed />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
