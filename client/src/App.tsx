import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { ProblemPage } from "./pages/ProblemPage";
import { MachinesPage } from "./pages/MachinesPage";
import { MachinePage } from "./pages/MachinePage";
import { SparePartsPage } from "./pages/SparePartsPage";
import { AddSparePartPage } from "./pages/AddSparePartPage";
import { SparePartPage } from "./pages/SparePartPage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
          <Route path="/machines/:machine_type_id" element={<MachinePage />} />
          <Route
            path="machines/:machine_type_id/:problem_id"
            element={<ProblemPage />}
          />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
