"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import moment from "moment/moment";
import { useState } from "react";
import "moment/locale/id";

export default function Home() {
  const [birthday, setBirthday] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [horoscope, setHoroscope] = useState(false);
  moment.locale("id");

  const calculateHoroscope = () => {
    setIsLoading(true);
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/horoscope`,
      data: {
        birthday,
      },
    })
      .then(function (response) {
        console.log("Horoscope:", response);
        setHoroscope(response.data?.data);
        setIsOpen(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center antialiased">
        <h1 className="text-9xl font-black text-gray-200">Horoscopes</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl py-5">
          Try it now!
        </p>

        <div className="w-full flex justify-center py-6 gap-3">
          <div className="w-64 max-w-full">
            <label
              htmlFor="Birthday"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="date"
                id="Birthday"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 text-gray-700 w-full px-3"
                placeholder="Birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Birthday
              </span>
            </label>
          </div>
          <button
            onClick={calculateHoroscope}
            className="flex gap-2 items-center rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <span>Calculate</span>
            {isLoading && <Loading />}
          </button>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 text-gray-700">
            <DialogTitle className="font-bold">{horoscope?.name}</DialogTitle>
            <Description>
              {moment(horoscope?.date_start).format("MMMM DD")} -{" "}
              {moment(horoscope?.date_end).format("MMMM DD")}
            </Description>
            <p
              dangerouslySetInnerHTML={{
                __html: horoscope?.description,
              }}
            ></p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

const Loading = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
