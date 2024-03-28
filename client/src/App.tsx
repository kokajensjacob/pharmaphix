import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { ProblemPage } from "./components/ProblemPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="machines/:machine_type_id/:problem_id"
          element={<ProblemPage />}
        />
      </Routes>
    </>
  );
}

export default App;
