'use client';
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/users/resetpassword', { token, newPassword });
            setMessage(response.data.message);
            setError('');
        } catch (err:any) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
            <form onSubmit={handleSubmit} className="bg-black p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-white">Reset Password</h2>
                {/* <hr className="w-full py-4 border-gray-400" /> */}
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />
                <button type="submit" className=" text-white w-full py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
