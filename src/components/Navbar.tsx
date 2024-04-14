"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdparty";

async function googleSignInClicked() {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "google",
      // This is where Google should redirect the user back after login or error.
      // This URL goes on the Google's dashboard as well.
      frontendRedirectURI:
        process.env.NEXT_PUBLIC_URL! + "auth/google/callback",
    });
    // we redirect the user to google for auth.
    window.location.assign(authUrl);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

const Navbar = ({ linkToApp = "" }: { linkToApp?: string }) => {
  const sessionContext = Session.useSessionContext();
  if (sessionContext.loading) return null;
  return (
    <>
      <div className="flex h-16 items-center justify-between">
        <Image alt="logo" src="/next.svg" height={32} width={32} />
        {sessionContext.doesSessionExist ? (
          <div className="flex items-center gap-4 self-stretch">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
            {linkToApp.length ? (
              <Link href={linkToApp}>
                <Button variant="outline" className="gap-2">
                  Launch App <ArrowUpRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            ) : null}
          </div>
        ) : (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => googleSignInClicked()}
          >
            Login with google <Icons.google className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
