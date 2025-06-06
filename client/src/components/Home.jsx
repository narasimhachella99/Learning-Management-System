import React, { useState } from "react";
import MainNav from "../navbars/MainNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
      <MainNav />
      <div className="grid grid-cols-12">
        <div className="col-start-2  mt-3">
          <img
            className="w-24 h-24 "
            src="https://www.freeiconspng.com/thumbs/book-png/book-png-17.jpg"
          ></img>
        </div>
        <div className="col-start-7  mt-3">
          <img
            className="w-24 h-24 "
            src="https://www.freeiconspng.com/thumbs/book-png/book-png-17.jpg"
          ></img>
        </div>
        <div className=" col-start-2 col-span-5 ">
          <h2 className="text-3xl mt-10 italic text-pink-900 bold">
            {" "}
            About Learning Management
          </h2>
          <p className="text-emerald-950 italic mt-5">
            An LMS helps create consistent learning environments through
            centralised content. It offers ease of reporting and tracking, as
            well as the ability to drive engagement.
          </p>
          <p className="text-emerald-950 italic mt-5">
            First and foremost, a home security system aims to protect your
            property and those inside it from burglary, home intrusion, fire,
            and other environmental disasters such as burst pipes. Professional
            monitoring services do this whether you're aware of the problem or
            not, and they can also help in a medical emergency.
          </p>
          <img
            className="w-24 h-24"
            src="https://www.freeiconspng.com/thumbs/book-png/book-png-17.jpg"
          ></img>
        </div>
        <div className=" col-start-8 col-span-4  py-4">
          <h2 className="text-3xl mt-10 text-start ml-10">Login here</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                console.log(data, "data");
                if (data.role == "student") {
                  const res = await axios.post(
                    `http://192.168.1.204:8080/api/Students/login`,
                    data
                  );
                  localStorage.setItem("user", JSON.stringify(res.data));
                  navigate("/studenthome");
                }
                if (data.role == "teacher") {
                  const res = await axios.post(
                    `http://192.168.1.204:8080/api/Teachers/login`,
                    data
                  );
                  localStorage.setItem("user", JSON.stringify(res.data));
                  navigate("/teacherhome");
                }
              } catch (error) {
                toast.error(error.response.data.msg, {});
              }
            })}
          >
            <div class="w-80 mt-5 p-8 shadow-lg">
              <div class="relative h-10 w-full min-w-[200px]">
                <input
                  {...register("email")}
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Username
                </label>
              </div>
              <div class="relative h-10 w-full min-w-[200px] mt-3">
                <input
                  {...register("password")}
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div class="relative h-10  min-w-[200px] mt-4">
                <select
                  {...register("role")}
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select position
                </label>
              </div>
              <button
                onClick={() => handleSubmit()}
                class=" w-full mt-5 none center rounded-lg bg-blue-500 py-2 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Submit
              </button>
              <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/register"
              >
                <p className="text-black">Dont have an account yet?</p> Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
