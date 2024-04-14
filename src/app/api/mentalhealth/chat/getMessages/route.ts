import { withSession } from "supertokens-node/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/backend";
import { supabase } from "@/lib/supabase";

ensureSuperTokensInit();

export function POST(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      console.error("Error during session management:", err);
      return NextResponse.json(
        { error: "An error occurred during session management." },
        { status: 500 }
      );
    }

    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    try {
      const { chatroom_id } = await request.json();
      if (!chatroom_id) return NextResponse.json({ messages: [] });
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chatroom_id", chatroom_id)
        .eq("user_id", session.getUserId()!);

      if (error) {
        return NextResponse.json(
          {
            error: "An error occurred while fetching the messages.",
            messages: [],
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ messages: data });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  });
}
