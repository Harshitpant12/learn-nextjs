"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function LoginPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            toast.success("Login success")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="font-black uppercase text-amber-300 text-6xl tracking-tighter"> {loading ? "Processing" : "Login"} </h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email" />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
            <button
                className="bg-amber-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors duration-300"
                onClick={onLogin}
            > {buttonDisabled ? "Fill all fields" : "Login here"} </button>
            <Link href="/signup" className="text-sm text-gray-500 mt-4 hover:text-gray-700 transition-colors duration-300">
                Don't have an account? Signup here
            </Link>
        </div>
    )
}