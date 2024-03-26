import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getInvStatus } from "./api";
import { Home } from "./components/Home";
import { RootLayout } from "./layouts/RootLayout";
import { ProblemPage } from "./components/ProblemPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index loader={getInvStatus} element={<Home />}></Route>
      <Route
        path="/machines/:machine_type_id/:problem_id"
        element={<ProblemPage />}
      ></Route>
    </Route>,
  ),
);
