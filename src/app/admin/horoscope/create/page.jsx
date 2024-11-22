"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminHoroscopeCreatePage = () => {
  const [horoscope, setHoroscope] = useState({});
  const [image, setImage] = useState({});
  const router = useRouter();

  const handleChangeRecord = (name, value) => {
    console.log("Changed: ", name, value);
    setHoroscope((oldHoroscope) => {
      const newHoroscope = oldHoroscope;
      newHoroscope[name] = value;

      return { ...newHoroscope };
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", horoscope.name);
    data.append("description", horoscope.description);
    data.append("date_start", horoscope.date_start);
    data.append("date_end", horoscope.date_end);

    // Append multiple files
    for (let i = 0; i < image.length; i++) {
        data.append("image[]", image[i]);
    }
    
    axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/horoscope`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      })
      .then((response) => {
        if (response.data?.success) {
          alert("Berhasil membuat data");
          router.push("/admin/horoscope/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-screen-sm">
      <form onSubmit={submitForm} encType="multipart/form-data">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="name"
              placeholder="Name"
              onChange={(e) => handleChangeRecord("name", e.target.value)}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Name
            </span>
          </label>
          <label
            htmlFor="image"
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="file"
              id="image"
              placeholder="Image"
              onChange={(e) => setImage(e.target.files)}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Image
            </span>
          </label>
          <label
            htmlFor="description"
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="description"
              placeholder="Description"
              onChange={(e) =>
                handleChangeRecord("description", e.target.value)
              }
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Description
            </span>
          </label>
          <label
            htmlFor="date_start"
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="date_start"
              placeholder="Date start"
              onChange={(e) => handleChangeRecord("date_start", e.target.value)}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Date start
            </span>
          </label>
          <label
            htmlFor="date_end"
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="date_end"
              placeholder="Date End"
              onChange={(e) => handleChangeRecord("date_end", e.target.value)}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Date End
            </span>
          </label>

          <button
            type="submit"
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHoroscopeCreatePage;
