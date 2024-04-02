import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { ProblemPage } from "./pages/ProblemPage";
import { MachinesPage } from "./pages/MachinesPage";
import { ProblemsPerMachinePage } from "./pages/ProblemsPerMachinePage";
import { SparePartsPage } from "./pages/SparePartsPage";

function App() {
  return (
    <>
      <Nav />
      <main className="mx-7">
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
      </main>
    </>
  );
}

export default App;
