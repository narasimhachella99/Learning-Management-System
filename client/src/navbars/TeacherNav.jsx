import React from "react";
import { Link } from "react-router-dom";

const TeacherNav = () => {
  return (
    <div>
      <nav class="mt-5 mx-auto block w-full max-w-screen-xl rounded-xl border border-white/80 bg-pink-200 bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div>
          <div class="container mx-auto flex items-center justify-between text-gray-900">
            <img
              class="relative inline-block h-12 w-12 rounded-lg object-cover object-center"
              alt="Image placeholder"
              src="data:image/png;base64,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"
            />
            <Link
              to="/"
              class="mr-10 block cursor-pointer py-1.5 font-sans text-sm font-normal leading-normal text-inherit antialiased"
            >
              <span className="text-4xl">LEARNING MANAGEMENT SYSTEM</span>
            </Link>
            <ul class=" items-center gap-6 lg:flex">
              <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                <Link class="flex items-center text-xl" to="/">
                  Home
                </Link>
              </li>
              <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                <Link class="flex items-center text-xl" to="/courses">
                  Courses
                </Link>
              </li>
              <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                <Link class="flex items-center text-xl" to="/studentrequests">
                  Requests
                </Link>
              </li>

              <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                <Link class="flex items-center text-xl" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TeacherNav;
