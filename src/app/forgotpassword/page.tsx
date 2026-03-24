"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import React from "react"

export default function ForgotPasswordPage() {

    const [success, setSuccess] = React.useState("")

    const forgotPassword = async (email: string) => {
        try {
            const res = await axios.post('/api/users/forgotpassword', {email}) // later use url according to actual api route
            console.log(res.data);
            toast.success(res.data.message)
            setSuccess(res.data.message)

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        try {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        await forgotPassword(email)

        } catch (error: any) {
           console.log(error.message)
           toast.error(error.message) 
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {success ? (
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1 className="text-4xl font-bold mb-4 text-green-600">
                        Mail Sent Successfully!
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 text-center max-w-sm">
                        Please check your email for the password reset link.
                    </p>
                    <hr className="my-2 w-full max-w-sm" />
                    <p className="text-lg text-gray-600">
                        Go back to{" "}
                        <Link href="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            ) : (
            <>
            <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input type="email" name="email" id="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Reset Link</button>
            </form>
            <hr className="my-6 w-full" />
            <p className="text-lg text-gray-600">Remembered your password? <Link href="/login" className="text-blue-500 hover:text-blue-700">Login here</Link></p>
            </>
            )}
        </div>
    )
}