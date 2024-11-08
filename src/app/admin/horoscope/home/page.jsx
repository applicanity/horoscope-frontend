"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminHoroscopeHomePage = () => {
  const [horoscopes, setHoroscopes] = useState([]);
  const parsingData = () => {
    axios
      .request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/horoscopes`,
        method: "GET",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHoroscopes(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    parsingData();
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Rasi bintang
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Tanggal awal
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Tanggal akhir
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Action (<button>Tambah</button>)
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {horoscopes.map((horoscope, key) => {
            return (
              <tr key={key}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {horoscope?.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {horoscope?.date_start}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {horoscope?.date_end}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-2">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHoroscopeHomePage;
