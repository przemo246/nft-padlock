import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Padlock } from "./pages/Padlock";
import { HeroLayout } from "./layout/HeroLayout";
import { Hero } from "./features/Hero/Hero";
import { CreateNew } from "./pages/CreateNew";
import { TopRelationships } from "./pages/TopRelationships";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroLayout />}>
        <Route index element={<Hero />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/padlock" element={<Padlock />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/top-relationships" element={<TopRelationships />} />
      </Route>
    </Routes>
  );
}

export default App;
