import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/pages/Home";
import { ProblemPage } from "./components/pages/ProblemPage";
import { MachinesPage } from "./components/pages/MachinesPage";
import { ProblemsPerMachinePage } from "./components/pages/ProblemsPerMachinePage";
import { SparePartsPage } from "./components/pages/SparePartsPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<MachinesPage />} />
        <Route path="/spare-parts" element={<SparePartsPage />} />
        <Route
          path="/machines/:machine_type_id"
          element={<ProblemsPerMachinePage />}
        />
        <Route
          path="machines/:machine_type_id/:problem_id"
          element={<ProblemPage />}
        />
      </Routes>
    </>
  );
}

export default App;
