'use client'
import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/forgotpassword', { email });
            setMessage(response.data.message);
        } catch (err: any) {
            setError(err.response.data.error || 'An error occurred');
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-black">
            <form onSubmit={handleSubmit} className="bg-black p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold  mb-3 text-white">Forgot Password</h2>
                {/* <hr className="w-full py-4 border-gray-400" /> */}
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <label htmlFor="email" className="block text-left mb-2 text-white">
          Email
        </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button type="submit" className=" text-white w-full py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
