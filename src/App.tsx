import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Box, CssBaseline, Paper, Typography } from "@mui/material";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <CssBaseline />
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Paper
            elevation={3}
            sx={{ padding: "1rem", backgroundColor: "secondary.light" }}
          >
            <Typography color="primary.dark" variant="h1">
              Starter App
            </Typography>
          </Paper>
        </Box>
        <Routes>
          <Route path="/new-component" element={<div>New component</div>} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
