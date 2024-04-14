import Navbar from "@/components/Navbar";
import { SessionAuthForNextJS } from "@/components/SessionAuthForNextJS";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionAuthForNextJS requireAuth={false}>
        <Navbar linkToApp="/app" />
      </SessionAuthForNextJS>
      {children}
    </>
  );
}

export default Layout;
