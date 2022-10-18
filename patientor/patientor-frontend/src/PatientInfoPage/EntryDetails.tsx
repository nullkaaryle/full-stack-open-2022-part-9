import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealingIcon from '@mui/icons-material/Healing';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  /**
 * Helper function for exhaustive type checking
 */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


  const HospitalEntry = ({ entry }: { entry: HospitalEntry }): JSX.Element => {
    return (
      <div>
        <p><MedicalInformationIcon style={{ color: 'red' }} /></p>
        Hospital discharge information:

        <li>date: {entry.discharge?.date}</li>
        <li>criteria:<i> {entry.discharge?.criteria}</i></li>
      </div>
    );
  };


  const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntry }): JSX.Element => {
    return (
      <div>
        <p><HealingIcon style={{ color: 'green' }} /></p>
        Occupational healthcare notes:
        <li>Employer: {entry.employerName}</li>
        {entry.sickLeave ?
          <li>Sickleave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</li>
          : ''}
      </div>
    );
  };

  const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
    return (
      <div>
        Health Rating:
        <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
      </div>
    );
  };


  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;