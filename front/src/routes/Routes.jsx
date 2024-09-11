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

const RouteGuard = ({ element, isAuth, user, isConfirmed }) => {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  if (!currentRoute) {
    return <NotFound />;
  }

  if (currentRoute.isAuth && !isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (currentRoute.isConfirmed && !user.isConfirmed) {
    return <Navigate to="/not-confirmed" replace />;
  }

  return element;
};
console.log(user.isConfirmed);
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
                isConfirmed={user?.isConfirmed}
              />
            }
          />
        ))}

        <Route path="/not-confirmed" element={<NotConfirmed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
