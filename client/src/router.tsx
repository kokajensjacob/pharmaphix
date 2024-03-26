import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getInvStatus } from "./api";
import { Home } from "./components/Home";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index loader={getInvStatus} element={<Home />}></Route>
    </Route>,
  ),
);
