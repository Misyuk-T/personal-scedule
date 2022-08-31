import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";

import { Header, PrivateRoute, PageLoader } from "./components";
import Schedules from "./pages/Schedules";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";

import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <PageLoader />
        <Header />

        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<p>HOME PAGE</p>} />

            <Route element={<PrivateRoute />}>
              <Route path="/schedule" element={<Schedules />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
