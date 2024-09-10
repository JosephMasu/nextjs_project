"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const router1 = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const openResetPassword = () => {
        router1.push('/resetpassword');
      };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data.username);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black py-8 px-4">
            <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold text-white text-center mb-4">Profile</h1>
                <p className="text-white text-center mb-6">Welcome to your profile page. Here you can view your details, logout and Reset Password</p>

                <h2 className="text-xl font-medium bg-gray-500 text-white p-3 rounded-lg text-center mb-6">
                    {data === 'nothing' ? "No User Data" : <Link href={`/profile/${data}`} className="hover:underline">{data}</Link>}
                </h2>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={logout}
                        className="w-full text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2"
                    >
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="w-full text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2"
                    >
                        Get User Details
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
