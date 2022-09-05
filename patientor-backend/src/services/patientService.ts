import patients from '../../data/patients';

import {
  NonSensitivePatient,
  NewPatient,
  Patient
} from '../types';

import { v1 as uuid } from 'uuid';
const id = uuid();


const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
