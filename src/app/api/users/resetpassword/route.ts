import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword, currentPassword } = reqBody;
        console.log(token, newPassword)

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })

        if(!user) {
            return NextResponse.json({error: 'Invalid or expired token'}, {status:400})
        }

        const isCurrentPasswordCorrect = await bcryptjs.compare(currentPassword, user.password)

        if(!isCurrentPasswordCorrect) {
            return NextResponse.json({error: 'Your current password is incorrect'}, {status: 400})
        }
        
        user.password = await bcryptjs.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: 'Password reset successfully', success: true}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}