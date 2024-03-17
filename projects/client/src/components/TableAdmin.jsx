import { numToIDRCurrency } from "../helper/currency";

export default function TableAdmin({ value = [] }) {
  console.log("ini values", value);
  // if (!value.data.rows) return <Spinner />;
  // console.log("value", value.data.rows);
  // const values = value.data.rows;

  return (
    // <div>{value}</div>

    <tbody className="divide-y divide-gray-200 bg-white">
      {value.map(
        (data) => (
          // branch.Users.map((user) => (
          <tr key={data.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
              <div className="flex items-center">
                <div className="text-gray-500">{data.email}</div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900"></div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
              <div className="text-gray-900">{data.username}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
              {data.m_role.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
              {numToIDRCurrency(data.salary)}
            </td>

            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
          </tr>
        )
        // ))
      )}
       
    </tbody>
  );
}
