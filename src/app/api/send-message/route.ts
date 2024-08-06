import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not found",
        },
        {
          status: 404,
        }
      );
    }

    //is user accepting the messages

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        {
          status: 403,
        }
      );
    }
    const newMessage = { content, createDat: new Date() };

    user.messages.push(newMessage as message);

    await user.save();

    return Response.json(
      {
        success: true,
        message: "message send successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("erroe adding messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
