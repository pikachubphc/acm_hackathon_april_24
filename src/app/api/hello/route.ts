import { withSession } from "supertokens-node/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from '@/config/backend';
import SuperTokens from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
      if (err) {
          return NextResponse.json(err, { status: 500 });
      }
      if (!session) {
          return new NextResponse("Authentication required", { status: 401 });
      }

      return NextResponse.json({
          data1: await SuperTokens.getUser(session.getUserId()!),
          data2: await UserMetadata.getUserMetadata(session.getUserId()!)
        }
      );
  });
}