import React, {useEffect, useState} from "react"
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../../utils/api";
import CreateReservationForm from "./CreateReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";
import  formatReservationDate from "../../utils/format-reservation-date"
import formatReservationTime from "../../utils/format-reservation-time";




function EditReservation(){

    const [error, setError] = useState(null)
    const { reservation_id } = useParams()
    const history = useHistory()

    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      });

      
      

      useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        getReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setError);
        return () => abortController.abort();
      }, [reservation_id]);

      function submitHandle(event) {
        event.preventDefault()
        formatReservationDate(reservation)
        formatReservationTime(reservation)
        const abortController = new AbortController();
        setError(null);
        reservation.people = Number(reservation.people)
        updateReservation(reservation, abortController.signal)
          .then(() =>
            history.push(`/dashboard?date=${reservation.reservation_date}`)
          )
          .catch(setError);
        return () => abortController.abort();
      }

      return (
        <div>
            <ErrorAlert error={error}/>
            <form onSubmit={submitHandle}>
                <CreateReservationForm
                    reservation={reservation}
                    setReservation={setReservation}
                />
            </form>
            
        </div>
      )


}

export default EditReservation