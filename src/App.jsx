import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Challenge from "./Pages/challenges";
import Login from "./Pages/login";
import { PrivateOutlet, PrivateRoute } from "./Auth/Gaurds";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./Store/challenges";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/"} element={<PrivateOutlet />}>
          <Route
            path="challenges"
            element={
              <PrivateRoute>
                <Challenge />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
