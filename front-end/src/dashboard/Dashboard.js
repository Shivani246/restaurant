import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableInformation from "../tables/new/TableInformation";
import ReservationInformation from "../reservations/new/ReservationInformation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadReservation, [date]);
  useEffect(loadTables, [date]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => {abortController.abort();};
  }

  async function loadTables(){
    const abortController = new AbortController();
    setTablesError(null);
    try{
    const tableResult = await listTables(abortController.signal);
    setTables(tableResult)
    }
    catch(error){
      setTablesError(error)
    }
    return () => abortController.abort();

  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationInformation reservations={reservations}/>
      <TableInformation loadReservation={loadReservation}/>
    </main>
  );
}

export default Dashboard;
