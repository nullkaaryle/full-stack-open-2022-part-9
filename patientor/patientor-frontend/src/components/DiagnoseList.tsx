import React from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";
import { setDiagnoseList } from "../state";

const DiagnoseList = () => {

  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnoseList = async () => {
      try {
        const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseList(diagnoseListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoseList();
  }, [dispatch]);

};

export default DiagnoseList;