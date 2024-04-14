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
      const uid = session.getUserId()!;
      const { data, error } = await supabase
        .from("chatrooms")
        .select("*")
        .eq("user_uuid", uid);

      if (error) {
        console.error("Error fetching chatrooms:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching the chatrooms." },
          { status: 500 }
        );
      }

      return NextResponse.json({ chatrooms: data });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  });
}
