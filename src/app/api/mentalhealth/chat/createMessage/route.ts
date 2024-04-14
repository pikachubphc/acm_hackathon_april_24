import { withSession } from "supertokens-node/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/backend";
import SuperTokens from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { supabase } from "@/lib/supabase";
import { anthropic } from "@/lib/anthropic";

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
      const { message, chatroom_id } = await request.json();
      const user_id = session.getUserId()!;

      const AIchat = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system:
          "You are Claude, a mental health support assistant created to help students at BITS Pilani Hyderabad Campus. Your knowledge and responses are focused on providing support and resources for common mental health problems faced by Indian students. When a user asks you about a mental health issue, provide a thoughtful and empathetic response that suggests solutions and encourages the user to seek help from local campus resources like the Mental Health Student Group (MHSG), mPower, and Student Anonymous. Recommend some tips to feel motivated, and ways to feel better.",
        messages: [{ role: "user", content: `${message}` }],
      });

      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            user_id: `${user_id}`,
            chatroom_id: `${chatroom_id}`,
            message: `${message}`,
            isAI: `false`,
          },
          {
            user_id: `${user_id}`,
            chatroom_id: `${chatroom_id}`,
            message: `${AIchat.content[0].text}`,
            isAI: `true`,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting into messages table:", error);
        return NextResponse.json(
          { error: "An error occurred while saving the chat messages." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        airesponse: AIchat.content[0].text,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  });
}
