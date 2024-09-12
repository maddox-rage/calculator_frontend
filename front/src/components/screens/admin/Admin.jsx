import { useQuery } from "react-query";
import adminService from "../../../services/admin.service";

const Admin = () => {
  const { data, refetch, isLoading } = useQuery(
    ["getAllUsers"],
    () => adminService.getAllUsers(),
    { select: ({ data }) => data }
  );
  return (
    <div>
      <h1>admin</h1>
      {isLoading && <p>Loading...</p>}
      {data && <p>User Info: {JSON.stringify(data)}</p>}
    </div>
  );
};
export default Admin;
