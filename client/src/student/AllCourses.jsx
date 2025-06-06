import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StudentNav from "../navbars/StudentNav";

const AllCourses = () => {
  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const getData = async () => {
    try {
      const res = await axios.get(`http://192.168.1.204:8080/api/Courses`);
      console.log(res.data, "DATA");
      setData(res.data);
    } catch {
      alert("something went wrong");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (item) => {
    try {
      const dataToSend = {
        courseId: item.id,
        teacherId: item.addedBy.id,
        studentId: user.id,
      };
      console.log(dataToSend,"manitharun reddy");
      const res = await axios.post(
        `http://192.168.1.204:8080/api/CourseRequests`,dataToSend
      );
      toast.success("Requested");
    } catch (error) {
      toast.error("Not Requested");
    }
  };
  if (data != null) {
    return (
      <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
        <StudentNav />
        <div className="justify-center flex">
          <button
            class=" w-64 mt-3  none center rounded-lg bg-neutral-500 py-2 px-6 font-sans text-md font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            All Courses
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <table className="w-9/12 border-3xl border-4 rounded-lg  ">
            <thead className="border p-4 mb-5">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Price</th>
                <th>NoOfDays</th>
                <th>BatchSize</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  
                    <td>{item.price}</td>
                    <td>{item.noOfDays}</td>
                    <td>{item.batchSize}</td>
                    <td className="p-3">
                      {" "}
                      <button
                        onClick={() => handleSubmit(item)}
                        class=" w-full  none mt-1 rounded-lg bg-red-200 py-2  font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                      >
                        Send Request
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
  }
};

export default AllCourses;
