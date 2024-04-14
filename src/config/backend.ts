import SuperTokens from "supertokens-node";
import ThirdPartyNode from "supertokens-node/recipe/thirdparty";
import { TypeInput } from "supertokens-node/types";
import SessionNode from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { appInfo } from "./appInfo";
import { supabase } from "@/lib/supabase";

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
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              // override the thirdparty sign in / up API
              signInUp: async function (input) {
                // TODO: Some pre sign in / up logic
                let response = await originalImplementation.signInUp(input);
                if (response.status === "OK") {
                  // This is the response from the OAuth tokens provided by the third party provider
                  let accessToken = response.oAuthTokens["access_token"];
                  // other tokens like the refresh_token or id_token are also
                  // available in the oAuthTokens object.
                  let uid = response.user.id;
                  // This gives the user's info as returned by the provider's user profile endpoint
                  // This gives the user's info from the returned ID token
                  // if the provider gave us an ID token
                  let name =
                    response.rawUserInfoFromProvider.fromUserInfoAPI!["name"];
                  let avatar =
                    response.rawUserInfoFromProvider.fromUserInfoAPI![
                      "picture"
                    ];
                  console.log("User info", name, avatar);
                  console.log("User ID", uid);
                  await UserMetadata.updateUserMetadata(uid, { name, avatar });
                  let { data: users, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("uuid", uid);
                  if (error) {
                    console.error("Error fetching user", error);
                  }
                  if (users && users.length === 0) {
                    let { data: newUser, error } = await supabase
                      .from("users")
                      .insert([{ uuid: uid }]);
                    if (error) {
                      console.error("Error creating user", error);
                    }
                  }
                }
                return response;
              },
            };
          },
        },
        signInAndUpFeature: {
          providers: [
            {
              config: {
                thirdPartyId: "google",
                clients: [
                  {
                    clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
                    scope: [
                      "https://www.googleapis.com/auth/userinfo.profile",
                      "https://www.googleapis.com/auth/userinfo.email",
                    ],
                  },
                ],
              },
            },
          ],
        },
      }),
      SessionNode.init(),
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
