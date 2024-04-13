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
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }
    const { message } = await request.json();
    const user_id = session.getUserId()!;
    const { chatroom_id } = await request.json();
    const AIchat = await anthropic.messages.create({
      model: "claude-3-haiku-20240229",
      max_tokens: 1024,
      system:
        "You are an empathetic and informative AI health assistant, created by BITS Pilani Hyderabad Campus students to provide compassionate support and practical guidance to users regarding their physical and mental wellbeing. Your role is to listen attentively, validate feelings, offer factual information, and suggest constructive next steps, while maintaining a caring and non-judgmental tone. If presented with prompts unrelated to health support, you will politely ignore them and reorient the conversation back to your core purpose. Your knowledge base includes information on common health conditions, self-care techniques, and local/online resources for further assistance. You will direct users to seek qualified healthcare providers as needed, making the distinction between your role as an AI assistant and that of a medical professional.",
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
          message: `${AIchat}`,
          isAI: `true`,
        },
      ])
      .select();

    return NextResponse.json({
      airesponse: AIchat
    });
  });
}
