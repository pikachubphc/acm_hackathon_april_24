"use client";

import React, { useState, useEffect } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Spinner } from "./ui/spinner";

type Props = Parameters<typeof SessionAuth>[0] & {
  children?: React.ReactNode | undefined;
};

export const SessionAuthForNextJS = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }
  return <SessionAuth {...props}>{props.children}</SessionAuth>;
};
