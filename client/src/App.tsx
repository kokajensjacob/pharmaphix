import { Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./router";
import { Aside } from "./components/Aside";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { ProblemPage } from "./components/ProblemPage";

function App() {
  return (
    <>
      <Nav />
      <Aside />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="machines/:machine_type_id/:problem_id"
          element={<ProblemPage />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
