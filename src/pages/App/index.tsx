import styles from "./index.module.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import MainLayout from "components/MainLayout";
import JobSearching from "pages/JobSearching";
import axios from "axios";
import { useEffect } from "react";

function App() {
  async function getAccessToken() {
    let response = await axios({
      method: "get",
      url: "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0",
      headers: { "x-secret-key": "GEU4nvd3rej*jeh.eqp" },
    });
    return response.data.access_token;
  }

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <MantineProvider
      theme={{ fontFamily: "Inter" }}
      // проверить работает ли шрифт! было fontFamily: "Open Sans"
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <div className={styles.App}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<JobSearching />} />
              {/* <Route path="/quiz" element={<Quiz />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<About />} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
