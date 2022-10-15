import patients from '../../data/patients';

import {
  NewPatient,
  Patient,
  PublicPatient
} from '../types';

import { v1 as uuid } from 'uuid';
const id = uuid();


const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};


const emptyList: string[] = [];

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: id,
    entries: emptyList,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  findById
};
