import React from "react";
//import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@mui/material";

//import { apiBaseUrl } from "./constants";
//import { useStateValue } from "./state";
//import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";
import { Typography } from "@mui/material";

const App = () => {
  //const [, dispatch] = useStateValue();


  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientInfoPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
