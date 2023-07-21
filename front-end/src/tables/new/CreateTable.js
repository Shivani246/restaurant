import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../../layout/ErrorAlert";
import { createTable } from "../../utils/api";



function CreateTable() {
  const [error, setError] = useState(null);
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const handleChange = ({ target }) => {
    setTable({
      ...table,
      [target.name]: target.value,
    });
  };
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (table.capacity.length) {
      const integerCapacity = Number(table.capacity);
      table.capacity = integerCapacity;
    } 
    createTable(table, abortController.signal)
      .then((data) => {
        history.push("/dashboard")
      })
      .catch(setError)
      return () => abortController.abort()

  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <>
        <h1>Create Table</h1>
        <div>
            <ErrorAlert error = {error} />
            <form onSubmit = {handleSubmit}>
                <div>
                <label className = 'form-label' htmlFor="table_name">Table Name</label>
                <input
                    name="table_name"
                    value={table.table_name}
                    placeholder="table name"
                    require="true"    
                    onChange={handleChange}               
                />
                </div>

                <div>
                <label className = 'form-label' htmlFor="capacity">Capacity</label>
                <input
                    name="capacity"
                    value={table.capacity}
                    placeholder="Enter Capacity"
                    require="true"       
                    onChange={handleChange}                    
                />
                </div>

              <button className="cancel-btn" type="cancel" onClick={handleCancel}>
                  Cancel
              </button>
              <button className="submit-btn" type="submit">
                  Submit
              </button>

            </form>
            


          
        </div>
    </>
  )
}

export default CreateTable;