import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { setPatient } from "../state";

import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";

import { Box, Table, TableHead, Typography, TableCell, TableBody, TableRow } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();


  if (id !== patient.id) {
    const fetchPatient =
      async () => {
        try {
          if (id) {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`);
            dispatch(setPatient(patientFromApi));
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


  const getDiagnoseName = (code: string): string => {
    return diagnoses[code]?.name;
  };

  const renderCodes = (patientEntry: Entry) => {

    if (patientEntry.diagnosisCodes) {
      return (
        <div>
          Diagnoses:
          {patientEntry.diagnosisCodes.map((code) =>
            <ul key={code}>
              <li> {code}: {getDiagnoseName(code)} </li>
            </ul>
          )}
        </div>
      );
    }
  };


  return (
    <div className="App">

      <Box>
        <Typography align="left" variant="h4" style={{ marginBottom: "1em", marginTop: "2em" }}>
          {patient.name} {genderIcon()}

        </Typography>
      </Box>

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
      {patient.entries?.length > 0 ?
        <div>

          <Box>
            <Typography align="left" variant="h6" style={{ marginBottom: "1em", marginTop: "2em" }}>
              ENTRIES
            </Typography>
          </Box>

          <Table style={{ marginBottom: "1em" }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Specialist</TableCell>
                <TableCell colSpan={2}>Description</TableCell>
                <TableCell >Other</TableCell>
              </TableRow>
            </TableHead>

            {patient.entries?.map((entry) => (
              <TableBody key={entry.id}>
                <TableRow >
                  <TableCell><b>{entry.date}</b></TableCell>
                  <TableCell><b>{entry.specialist}</b></TableCell>
                  <TableCell><i>{entry.description}</i></TableCell>
                  <TableCell>{renderCodes(entry)}</TableCell>
                  <TableCell><EntryDetails entry={entry} /></TableCell>
                </TableRow>
              </TableBody>

            ))
            }
          </Table>
        </div>

        : <Box>
          <Typography align="left" variant="h6" style={{ marginBottom: "1em", marginTop: "2em" }}>
            Patient has no entries.
          </Typography>
        </Box>
      }


    </div >
  );
};

export default PatientInfoPage;
