import { Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./layout/DashboardLayout";
import { HeroLayout } from "./layout/HeroLayout";
import { Hero } from "./features/Hero/Hero";
import { Page } from "./pages/Page";
import { Padlock } from "./features/Padlock/Padlock";
import { CreatePadlockForm } from "./features/CreatePadlockForm/CreatePadLockForm";
import { TopRelationships } from "./features/TopRelationships/TopRelationships";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroLayout />}>
        <Route index element={<Hero />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/padlock" element={<Page children={<Padlock />} />} />
        <Route
          path="/propose"
          element={<Page children={<CreatePadlockForm />} />}
        />
        <Route
          path="/top-relationships"
          element={<Page children={<TopRelationships />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
