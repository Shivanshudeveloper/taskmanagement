import Head from "next/head";
import { CacheProvider } from "@emotion/react";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { AuthConsumer, AuthProvider } from "../contexts/firebase-auth-context";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? "Loading..." : getLayout(<Component {...pageProps} />)
            }
          </AuthConsumer>
        </ThemeProvider>
        {/* </LocalizationProvider> */}
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
