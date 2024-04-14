"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.has("error") || searchParams.has("redirectToPath")) {
      if (searchParams.get("error") == "1") {
        const errorTitle = searchParams.get("title");
        const errorDescription = searchParams.get("description");
        if (errorTitle && errorDescription && errorTitle.length) {
          setTimeout(
            () =>
              toast({
                title: errorTitle,
                description: errorDescription,
                variant: "destructive",
              }),
            100
          );
          console.log(errorTitle, errorDescription);
        }
      }
      router.replace(pathname);
    }
  }, [searchParams]);

  return (
    <>
      <section className="relative flex w-full flex-col items-center justify-center pt-44 ">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center text-2xl">Your own college AI assistant</p>
        <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
          <h1 className="text-center text-9xl font-bold md:text-[200px]">
            Bits AI
          </h1>
        </div>
      </section>
    </>
  );
}
