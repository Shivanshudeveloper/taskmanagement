import { useEffect } from "react";
import Head from "next/head";

import { gtm } from "../lib/gtm";
import { useAuth } from "../hooks/use-auth";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    gtm.push({ event: "page_view" });
    if (!user) {
      console.log(user);
      window.location.href = "/authentication/login?returnUrl=%2Fdashboard";
    } else {
      window.location.href = "/dashboard";
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Material Kit Pro</title>
      </Head>
      {/* <main>
        <HomeHero />
        <Divider />
        <HomeDevelopers />
        <Divider />
        <HomeDesigners />
        <HomeTestimonials />
        <HomeFeatures />
        <Divider />
        <HomeClients />
      </main> */}
    </>
  );
};

// Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;
