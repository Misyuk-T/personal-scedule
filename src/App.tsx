import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Header, PrivateRoute, PageLoader } from "./components";
import Profile from "./pages/Profile";
import store from "./redux/store";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <CssBaseline />
        <PageLoader />
        <Header />

        <Routes>
          <Route path="/" element={<p>HOME PAGE</p>} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
