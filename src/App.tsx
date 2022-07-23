import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Header } from "./components";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/new-component" element={<div>New component</div>} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
