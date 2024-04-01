import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { ProblemPage } from "./pages/ProblemPage";
import { MachinesPage } from "./pages/MachinesPage";
import { ProblemsPerMachinePage } from "./pages/ProblemsPerMachinePage";
import { SparePartsPage } from "./pages/SparePartsPage";
import { AddSparePartPage } from "./pages/AddSparePartPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<MachinesPage />} />
        <Route path="/spare-parts" element={<SparePartsPage />} />
        <Route path="/spare-parts/add-new" element={<AddSparePartPage />} />
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
