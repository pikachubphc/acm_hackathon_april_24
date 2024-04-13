import SuperTokens from "supertokens-node";
import ThirdPartyNode from "supertokens-node/recipe/thirdparty";
import { TypeInput } from "supertokens-node/types";
import { appInfo } from "./appInfo";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_NODE_URL!,
      apiKey: process.env.SUPERTOKENS_API_KEY!,
    },
    appInfo,
    recipeList: [
      ThirdPartyNode.init({
        signInAndUpFeature: {
          providers: [
            {
              config: {
                thirdPartyId: "google",
                clients: [
                  {
                    clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
                  },
                ],
              },
            },
          ],
        },
      }),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
