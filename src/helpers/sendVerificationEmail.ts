import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mystry messageverification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email send Successfully" };
  } catch (Emailerror) {
    console.error("Error sending verification email", Emailerror);
    return { success: false, message: "faild to send verification email" };
  }
}
