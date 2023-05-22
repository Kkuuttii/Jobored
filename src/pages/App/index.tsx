import MainLayout from "components/MainLayout";
import Vacancies from "pages/Vacancies";
import { MantineProvider } from "@mantine/core";
import axios from "axios";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Vacancy } from "pages/Vacancy";
import { Favourites } from "pages/Favourites";
import { useLocalStorage } from "hooks/useLocalStorage";

function App() {
  const { item: acsessToken, setItemToLocalStorage } = useLocalStorage<string>(
    "acsessToken",
    ""
  );
  useEffect(() => {
    if (!acsessToken) {
      axios({
        method: "get",
        url: "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0",
        headers: { "x-secret-key": "GEU4nvd3rej*jeh.eqp" },
      }).then((response) => setItemToLocalStorage(response.data.access_token));
    }
  }, [acsessToken, setItemToLocalStorage]);

  return (
    <MantineProvider
      theme={{ fontFamily: "Inter" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to={"/vacancies"} />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/vacancies/:id" element={<Vacancy />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
