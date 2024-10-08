'use client';
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onSignup = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          router.push("/login");
          
      } catch (error:any) {
          console.log("Signup failed", error.message);
          
          toast.error(error.message);
      }finally {
          setLoading(false);
      }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1 className="text-2xl font-semibold mb-4 text-white">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      {/* <hr className="w-full my-4 border-gray-400" /> */}
      
      <div className="w-full max-w-xs">
        <label htmlFor="username" className="block text-left mb-2">
          Username
        </label>
        <input
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

        <label htmlFor="email" className="block text-left mb-2">
          Email
        </label>
        <input
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />


        <label htmlFor="password" className="block text-left mb-2">
          Password
        </label>
        <input
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        
        <div className="flex justify-between">
          <button 
            onClick={onSignup}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2">
            {buttonDisabled ? 'No Signup' : 'Signup'}
          </button>
          <Link 
            className="w-full p-2 text-center relative hover:text-white ml-2 group"
            href='/login'>
            Visit login page
            <span className="absolute left-0 right-0 bottom-5 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}