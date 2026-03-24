import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if(!email) {
            return NextResponse.json({message: "Email is requied"}, {status: 400})
        }
        
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        console.log(user); // for debugging

        // send reset password email
        // later use enum or constants or env variable for email type
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        })
        return NextResponse.json({message: "Password reset email sent successfully", success: true}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}