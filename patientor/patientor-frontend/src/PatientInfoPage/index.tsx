import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

import { Box, Table, TableHead, Typography, TableCell, TableBody, TableRow } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  type PatientInfoType = Omit<Patient, "entries">;

  if (id !== patient.id) {

    const fetchPatient =
      async () => {
        try {
          if (id) {
            const { data: patientFromApi } = await axios.get<PatientInfoType>(
              `${apiBaseUrl}/patients/${id}`);
            dispatch({ type: "SET_PATIENT", payload: patientFromApi });
          }
        } catch (e) {
          console.error(e);
        }
      };

    void fetchPatient();
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case 'female':
        return (< FemaleIcon fontSize="inherit" />);
      case 'male':
        return (< MaleIcon fontSize="inherit" />);
      default:
        return (< TransgenderIcon fontSize="inherit" />);
    }
  };


  return (
    <div className="App">

      <Box>
        <Typography align="left" variant="h4" style={{ marginBottom: "1em", marginTop: "2em" }}>
          {patient.name} {genderIcon()}
        </Typography>
      </Box>
      {
        patient === null ? 'höh' :
          <Table style={{ marginBottom: "1em" }}>

            <TableHead>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Date of birth</TableCell>
                <TableCell>SSN</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell>{patient.ssn}</TableCell>
                <TableCell>
                </TableCell>
              </TableRow>

            </TableBody>

          </Table>
      }
    </div >
  );
};

export default PatientInfoPage;
