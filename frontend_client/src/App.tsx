import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Padlock } from "./pages/Padlock";
import { HeroLayout } from "./layout/HeroLayout";
import { Hero } from "./features/Hero/Hero";
import { TopRelationships } from "./pages/TopRelationships";
import { Propose } from "./pages/Propose";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroLayout />}>
        <Route index element={<Hero />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/padlock" element={<Padlock />} />
        <Route path="/propose" element={<Propose />} />
        <Route path="/top-relationships" element={<TopRelationships />} />
      </Route>
    </Routes>
  );
}

export default App;
