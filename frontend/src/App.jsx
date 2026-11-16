import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AmenintariPage from "./pages/AmenintariPage.jsx";
import AmenintareDetaliuPage from "./pages/AmenintareDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină (în locul lui <Outlet />).
// Ruta de detaliu folosește resursa din tw.json: /amenintari/:id
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AmenintariPage />} />
        <Route path="/amenintari/:id" element={<AmenintareDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
