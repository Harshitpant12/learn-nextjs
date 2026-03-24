"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ResetPasswordPage() {
    
    const [token, setToken] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const resetPassword = async () => {
        if(newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        try {
            await axios.post('/api/users/resetpassword', {token, newPassword, currentPassword})
            setSuccess(true)
        } catch (error: any) {
            setError(error.response.data.error)
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 m-2"
            />
            <button onClick={resetPassword} className="bg-blue-500 text-white p-2 m-2">Reset Password</button>
            {success && (
                <div>
                    <h2 className="text-2xl">Password Reset Successful</h2>
                    <Link href="/login">Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
                </div>
            )}
        </div>
    )
}