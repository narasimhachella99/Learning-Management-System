import React, { useEffect, useState } from 'react'
import TeacherNav from '../navbars/TeacherNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Courses = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const getData = async () => {
        try {
            const res = await axios.get(`http://192.168.1.204:8080/api/Courses`);
            console.log(res.data, "DATA")
            setData(res.data);
        } catch { alert("something went wrong") }

    }
    useEffect(() => {
        getData();
    }, []);


    const handleSubmit = async (id) => {
        try {
            console.log(id,"Id")
            const res = await axios.delete(`http://192.168.1.204:8080/api/Courses/${id}`)
            toast.success("Deleted")
            getData()
        } catch (error) {
            toast.error("Not deleted")
        }
    }
    if (data != null) {
        return (
            <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
                <TeacherNav />
                <div className='justify-center flex'>
                    <button onClick={() => navigate(`/addcourse`)}
                        class=" w-64 mt-3  none center rounded-lg bg-purple-200 py-2 px-6 font-sans text-md font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Add Course
                    </button>
                </div>
                <div className='flex justify-center mt-10'>
                    <table className='w-9/12 border-3xl border-4 rounded-lg  '>
                        <thead className='border p-4 mb-5'>
                            <tr>
                            <th>S.No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>NoOfDays</th>
                                <th>BatchSize</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {data.map((item) => {
                                return (
                                    <tr >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.numberOfDays}</td>
                                        <td>{item.batchSize}</td>
                                        <td className='p-3'>  <button onClick={() => navigate(`/updateCourse/${item.id}`)}
                                            class=" w-full  none  rounded-lg bg-emerald-700 py-2  font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            data-ripple-light="true"
                                        >
                                            Update
                                        </button>
                                            <button onClick={() => handleSubmit(item.id)}
                                                class=" w-full  none mt-1 rounded-lg bg-red-200 py-2  font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                data-ripple-light="true"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    else {
        <h2 className='text-5xl'>No data found</h2>
    }
}

export default Courses;