import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Form from "./components/Form";
import { Box } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ textAlign: "center", m: 5 }}>
        <Form />
      </Box>
    </Provider>
  );
}

export default App;
