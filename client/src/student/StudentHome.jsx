import React from 'react'
import StudentNav from '../navbars/StudentNav';

const StudentHome = () => {
    const user=JSON.parse(localStorage.getItem("user"));
    return (
        <div className="bg-gradient-to-l from-blue-500 to-green-300 h-screen">
            <StudentNav />
            <div className="flex justify-center mt-20">
                <h2 className="text-5xl mt-10 text-black border  p-8 ">Welcome to {user.name}</h2>
            </div>
        </div>
    )
}

export default StudentHome;