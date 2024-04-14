"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import Image from "next/image";

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
      <section className="relative flex w-full flex-col items-center justify-center pt-12 ">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center text-2xl">Your own college AI assistant</p>
        <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
          <h1 className="text-center text-9xl font-bold md:text-[200px]">
            Bits AI
          </h1>
        </div>
        <div className="relative mt-[-40px] flex items-center justify-center pb-4">
          <Image
            src={"/preview.png"}
            alt="banner image"
            priority={true}
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="absolute bottom-0 left-0 right-0 top-[50%] z-10 bg-gradient-to-t dark:from-background"></div>
        </div>
      </section>
    </>
  );
}
