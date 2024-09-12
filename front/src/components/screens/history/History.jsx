import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import historyService from "../../../services/history.service";
import Layout from "../../layout/Layout";
import Loader from "../../ui/Loader";

const History = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useQuery(
    ["getHistoryByUserId"],
    () => historyService.getHistoryByUserId(user.decode.sub),
    { select: ({ data }) => data }
  );
  console.log(data);
  return (
    <Layout>
      <div>
        <h1>history</h1>
        {isLoading && <Loader />}
        {<h1>data not found</h1> && <p>history: {JSON.stringify(data)}</p>}

        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full border-collapse border border-gray-200 text-center rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Дата",
                  "Показатель",
                  "Единица",
                  "Результат",
                  "Погрешность",
                  "Представление",
                ].map((header, index) => (
                  <th key={index} className="border border-gray-300 py-2 px-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 py-2 px-4">
                    {item.createdAt}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.metric}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.unit}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.resultValue}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.absoluteError}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.representation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
export default History;
