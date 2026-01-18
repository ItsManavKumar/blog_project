import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";
import "../styles/globals.css";
import Navbar from "~/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
