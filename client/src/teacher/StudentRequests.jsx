import React, { useEffect, useState } from "react";
import TeacherNav from "../navbars/TeacherNav";
import axios from "axios";
import { toast } from "react-toastify";

const StudentRequests = () => {
  const [data, setData] = useState();
  const [accepted,setAccepted] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.204:8080/api/Courserequests`
      );
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
      const res = await axios.post(
        `http://192.168.1.204:8080/api/CourseRequests/update/${item.id}/true`
    
      );
      console.log(res,"ghh")
      toast.success("Accepted");
      getData()
    } catch (error) {
      toast.error("Not Accepted");
    }
  };
  if (data != null) {
    return (
      <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
        <TeacherNav />
        <div className="justify-center flex">
          <button
            class=" w-64 mt-3  none center rounded-lg bg-purple-200 py-2 px-6 font-sans text-md font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            All Courses
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <table className="w-9/12 border-3xl border-4 rounded-lg  ">
            <thead className="border  mb-5">
              <tr>
                <th>RequestID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Payment</th>
                {/* <th>Status</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.course.name}</td>
                    <td>{item.course.description}</td>
                    <td>{item.course.price}</td>
                    <td>{item.isPaymentDone?"Paid":"Not Paid"}</td>
                    
                    <td className="p-3">
                      {" "}
                    {/* {item.isPaymentDone ? "Accepted" =return} */}
                    
                      <button
                        onClick={() => handleSubmit(item)}
                        class={` w-full  none mt-1 rounded-lg ${item.isAccepted? 'bg-green-500' :'bg-blue-300'} py-2  font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        data-ripple-light="true"
                      >
                        {item.isAccepted ? "Accepted":"Accept"}
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

export default StudentRequests;
