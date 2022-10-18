import { State } from "./state";
import { Patient, Diagnose } from "../types";


export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnose[];
  };


export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const setDiagnoseList = (diagnoseList: Diagnose[]): Action => {
  return {
    type: 'SET_DIAGNOSE_LIST',
    payload: diagnoseList
  };
};


export const reducer = (state: State, action: Action): State => {
  console.log('state now: ', state);
  console.log('called action', action);

  switch (action.type) {

    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "SET_PATIENT":
      const patient = action.payload;
      return {
        ...state,
        patient
      };

    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };

    default:
      return state;
  }
};



