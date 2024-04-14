"use client";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { signInAndUp } from "supertokens-web-js/recipe/thirdparty";

async function handleGoogleCallback() {
  let isError = true;
  let errorTitle = "Error";
  let errorDescription = "Description";
  try {
    const response = await signInAndUp();
    if (response.status === "OK") {
      console.log(response.user);
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        // sign up successful
      } else {
        // sign in successful
      }
      isError = false;
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      errorTitle = "Sign up not allowed";
      errorDescription = response.reason;
    } else {
      // SuperTokens requires that the third party provider
      // gives an email for the user. If that's not the case, sign up / in will fail.
      errorTitle = "Sign up not allowed";
      errorDescription =
        "No email provided by social login.\nPlease use another form of login";
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      errorDescription = err.message;
    } else {
      console.error(err);
      errorDescription = "Oops! Something went wrong.";
    }
  }
  return { isError, errorTitle, errorDescription };
}

export default () => {
  useEffect(() => {
    handleGoogleCallback().then((res) => {
      const urlParams = new URLSearchParams();
      if (res.isError) {
        urlParams.set("error", "1");
        urlParams.set("title", res.errorTitle);
        urlParams.set("description", res.errorDescription);
      } else {
        urlParams.set("error", "0");
      }
      window.location.replace("/?" + urlParams.toString());
    });
  }, []);
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-background">
      <Spinner />
    </div>
  );
};
