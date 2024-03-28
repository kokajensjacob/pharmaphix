import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { ProblemPage } from "./components/ProblemPage";
import { MachinesPage } from "./components/MachinesPage";
import { ProblemsPerMachinePage } from "./components/ProblemsPerMachinePage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<MachinesPage />} />
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
