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
      return NextResponse.json({ error: "An error occurred during session management." }, { status: 500 });
    }

    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    try {
      const { message } = await request.json();
      const uid = session.getUserId()!;

      const chatheader = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: "give me a one line chat header.",
        messages: [{ role: "user", content: `${message}` }],
      });

      const { data, error } = await supabase
        .from("chatrooms")
        .insert([
          { user_uuid: `${uid}`, chat_title: `${chatheader.content[0].text}` },
        ])
        .select();

      if (error) {
        console.error("Error inserting into chatrooms table:", error);
        return NextResponse.json({ error: "An error occurred while creating the chatroom." }, { status: 500 });
      }

      const chatroom_id = data ? data[0].chatroom_id : null;

      const AIchat = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: "You are an empathetic and informative AI health assistant, created by BITS Pilani Hyderabad Campus students to provide compassionate support and practical guidance to users regarding their physical and mental wellbeing. Your role is to listen attentively, validate feelings, offer factual information, and suggest constructive next steps, while maintaining a caring and non-judgmental tone. If presented with prompts unrelated to health support, you will politely ignore them and reorient the conversation back to your core purpose. Your knowledge base includes information on common health conditions, self-care techniques, and local/online resources for further assistance. You will direct users to seek qualified healthcare providers as needed, making the distinction between your role as an AI assistant and that of a medical professional.",
        messages: [{ role: "user", content: `${message}` }],
      });

      const { data: data1, error: error1 } = await supabase
        .from("messages")
        .insert([
          {
            user_id: `${uid}`,
            chatroom_id: `${chatroom_id}`,
            message: `${message}`,
            isAI: `false`,
          },
          {
            user_id: `${uid}`,
            chatroom_id: `${chatroom_id}`,
            message: `${AIchat.content[0].text}`,
            isAI: `true`,
          },
        ])
        .select();

      if (error1) {
        console.error("Error inserting into messages table:", error1);
        return NextResponse.json({ error: "An error occurred while saving the chat messages." }, { status: 500 });
      }

      return NextResponse.json({
        chatheader: chatheader.content[0].text,
        airesponse: AIchat.content[0].text,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
  });
}