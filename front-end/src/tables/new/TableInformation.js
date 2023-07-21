import React, { useState, useEffect } from "react"
import ErrorAlert from "../../layout/ErrorAlert"
import {listTables, deleteTableAssignment, } from "../../utils/api"

function TableInformation({loadReservation}){
    const [currTable, setCurrTable] = useState()
    const [error, setError] = useState(null)

    useEffect(loadTables, [])

    async function loadTables(){
        const abortController = new AbortController();
        setError(null)
        await loadReservation()
        await listTables(abortController.signal)        
            .then(setCurrTable)
            .catch(setError)
        return () => abortController.abort()
    }

    const allTables = currTable?.map((table) => {
        let tableStatus = "Free"
        if (table.reservation_id){
            tableStatus = "Occupied"
        }

        return (
            <div>
            <p data-table-id-status={`${table.table_id}`}>
                {  table.table_name  } &nbsp;
                {  tableStatus  } &nbsp; ///
                Capacity: {  table.capacity  } &nbsp;  
                ID: {  table.table_id  } &nbsp; 
            </p>
            <FinishButton tableStatus={tableStatus} table={table}/>
            </div>
        )
    })

    function FinishButton({tableStatus, table}){
        if (tableStatus === "Occupied"){
            return (
                <button
                    type="button"
                    data-table-id-finish={table.table_id}
                    onClick ={() => handleFinish(table.table_id)}
                >
                Finish
                </button>
            )
        }
        return null
    }

    async function handleFinish(tableId){
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            await deleteTableAssignment(tableId)
            loadTables()

        }
    }

    return (
        <main>
            <h3>Tables @ Restaurant</h3>
            <ErrorAlert error={error}/>
            <div>{allTables}</div>
            

        </main>

    )

}

export default TableInformation