"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignupPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const onSignup = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="font-black uppercase text-amber-300 text-6xl tracking-tighter">Signup</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="username" />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email" />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" />
            <button
                className="bg-amber-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors duration-300"
                onClick={onSignup}
            > Signup here </button>
            <Link href="/login" className="text-sm text-gray-500 mt-4 hover:text-gray-700 transition-colors duration-300">
                Already have an account? Login here
            </Link>
        </div>
    )
}