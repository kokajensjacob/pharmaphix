import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { ProblemPage } from "./pages/ProblemPage";
import { MachinesPage } from "./pages/MachinesPage";
import { ProblemsPerMachinePage } from "./pages/ProblemsPerMachinePage";
import { SparePartsPage } from "./pages/SparePartsPage";
import { AddSparePartPage } from "./pages/AddSparePartPage";
import { SparePartPage } from "./pages/SparePartPage";

function App() {
  return (
    <>
      <Nav />
      <main className="mx-7">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/spare-parts" element={<SparePartsPage />} />
          <Route path="/spare-parts/add-new" element={<AddSparePartPage />} />
          <Route
            path="/spare-parts/:spare_part_id"
            element={<SparePartPage />}
          />
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
