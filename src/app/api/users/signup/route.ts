import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        if (!username || !email || !password) {
            return NextResponse.json({message: "All fields are required"}, {status: 400})
        }
        console.log(reqBody) // remove it later

        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // send verification email

        await sendEmail({
            email,
            emailType: "VERIFY", // later use enum or constants or env variable
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        console.error("Signup error:", error)
        return NextResponse.json({message: error.message}, {status: 500})
    }
}