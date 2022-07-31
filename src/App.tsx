import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Header } from "./components";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<p>HOME PAGE</p>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
