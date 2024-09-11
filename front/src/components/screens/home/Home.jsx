import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import userService from "../../../services/user.service";

const Home = () => {
  const { user } = useAuth();
  console.log("home", user);
  const { data, refetch, isLoading } = useQuery(
    ["get userInfo", user?.sub],
    () => userService.getUserById(user.decode.sub),
    {
      enabled: !!user?.sub,
      select: ({ data }) => data,
    }
  );

  console.log("user", data);
  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Loading...</p>}
      {data && <p>User Info: {JSON.stringify(data)}</p>}
      <button onClick={refetch}>Отправить запрос</button>
    </div>
  );
};
export default Home;
