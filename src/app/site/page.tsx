"use client";

export default async function Home() {
  return (
    <>
      <section className="relative mt-[-70px] flex h-full w-full flex-col items-center justify-center md:pt-44 ">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center text-2xl">ACM Hackathon April 23</p>
        <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
          <h1 className="text-center text-5xl font-bold md:text-[300px]">
            Bits AI
          </h1>
        </div>
      </section>
    </>
  );
}
