import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function SeatReservationForm() {
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState({
    table_id: "",
    reservation_id: "",
  })
  const history = useHistory();
  const { reservation_id } = useParams()


  useEffect(() => {
      const abortController = new AbortController()
      listTables(abortController.signal)
        .then(setTables)
        .catch(setError)
      return () => abortController.abort();
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    seatReservation(tableData.table_id, reservation_id)
    
      .then(() => history.push("/"))
      .catch(setError)
    return () => abortController.abort();

  };

  const handleChange = ({ target }) => {
    setTableData({
      ...tableData,
      [target.name]: target.value,
    });
  };


  function handleCancel() {
    history.goBack();
  }

  const tableOptions = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
    </option>
  ))

  return (
    <div>
        <h1>Seating Reservation for {reservation_id}</h1>
        <ErrorAlert error = {error}/>
        <form onSubmit={handleSubmit}>
          <h3>Select a table option</h3>

            <select
              id="table_form"
              name="table_id"
              value={tableOptions.table_id}
              onChange={handleChange}
              require="true"
            >
            <option value="">Table Name - Capacity</option>
            {tableOptions}
            </select>

            <button className="cancel-btn" type="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="submit-btn" type="submit">
              Submit
            </button>
        </form>
    </div>
  );
}

export default SeatReservationForm;
