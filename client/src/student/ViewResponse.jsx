import React, { useEffect, useState } from "react";
import StudentNav from "../navbars/StudentNav";
import axios from "axios";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import { Modal, Ripple, initTE } from "tw-elements";
import { toast } from "react-toastify";
const ViewResponse = () => {
  initTE({ Modal, Ripple });
  const [data, setData] = useState();
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const getData = async () => {
    try {
      const studentId = {
        studentId: user.id,
      };
      const res = await axios.get(
        `http://192.168.1.204:8080/api/CourseRequests/filter?studentId=${user.id}`
      );
      console.log(res.data, "DATA");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [request,setRequest]=useState({});
  const submit =async(id)=>{
    try{
      const request = await axios.get(`http://192.168.1.204:8080/api/CourseRequests/${id}`)
      console.log(request)
      setRequest(request.data)
    }catch(error){
      toast.error("Id null")
    }
  }
  console.log(request,"Reqhsiahkj")
  if (data != null) {
    return (
      <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
        <StudentNav/>
        <div className="justify-center flex ">
          <button
            class=" w-64 mt-3  none center rounded-lg bg-purple-200 py-2 px-6 font-sans text-md font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            All Courses
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <table className="w-9/12 border-3xl border-4 rounded-lg  ">
            <thead className="border p-4 mb-5 p-4">
              <tr>
                <th>S.No</th>
                <th>Request Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item, index) => {
                console.log(item.description, "description");
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.course.name}</td>
                    <td>
                      <button
                        type="button" onClick={()=>submit(item.id)}
                        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-toggle="modal"
                        data-te-target="#staticBackdrop"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        View Course
                      </button>
                      <div
            data-te-modal-init
            class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none "
            id="staticBackdrop"
            data-te-backdrop="static"
            data-te-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div
              data-te-modal-dialog-ref
              class="pointer-events-none  relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
            >
              <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] bg-gradient-to-l from-blue-500 to-green-300 pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div class="flex  flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <h5
                    class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalLabel"
                  >
                    About Course
                  </h5>

                  <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div data-te-modal-body-ref class="relative p-4">
                  
                  {request.isAccepted && request.isPaymentDone
                    ? request.course.description
                    : "You need pay amount for view this course"}
                </div>

                <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <button
                    type="button"
                    class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    data-te-modal-dismiss
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
                    </td>
                    <td>{item.course.price}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/payment/${item.id}`)}
                        class={` w-full  none mt-1 rounded-lg  py-2 ${
                          !item.isAccepted && !item.isPaymentDone
                            ? "bg-emerald-700"
                            : item.isAccepted && !item.isPaymentDone
                            ? "bg-green-900"
                            : item.isAccepted && item.isPaymentDone
                            ? "bg-green-500"
                            : ""
                        } font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        data-ripple-light="true"
                      >
                        {!item.isAccepted && !item.isPaymentDone
                          ? "Need Accept"
                          : item.isAccepted && !item.isPaymentDone
                          ? "Payment"
                          : item.isAccepted && item.isPaymentDone
                          ? "Paid"
                          : ""}
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

export default ViewResponse;
