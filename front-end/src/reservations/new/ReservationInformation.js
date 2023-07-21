import React, {useState} from "react"
import { Link } from "react-router-dom"
import { setReservationStatus } from "../../utils/api"
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";

function ReservationInformation({reservations}){

const [error, setError] = useState(null)
const history = useHistory()

function handleCancel(reservationID){
    if (window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ){
        const abortController = new AbortController();
        setError(null);
        setReservationStatus(reservationID, "cancelled", abortController.signal)
          .then(() => {
            history.push("/dashboard")
          })
          .catch(setError);
        return () => abortController.abort();
      }
}

const resRow = reservations.map((reservation) => {
    
    return (
        <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
        <td>
            {reservation.status === 'booked' ?
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button>Seat</button>
            </Link>
            :
            <></>
            }
        </td>
        <td>
          {reservation.status === 'booked' ?
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button className="btn btn-primary "> Edit </button>
          </Link>
          :
          <></>
          }
        </td>
        <td data-reservation-id-cancel={reservation.reservation_id}>
          {reservation.status === 'booked' ?
            <button onClick={() => handleCancel(reservation.reservation_id)}> Cancel </button>
          :
          <></>
          }
        </td>

        </tr>
    )
})

if (!reservations){
    return (
        <div>No reservations currently.</div>
    )
}

return (
    <div>
        <ErrorAlert error={error}/>
        <table>
            <tbody>
                <tr>
                <th scope="col">  Reservation ID  </th>
                <th scope="col">  First Name</th>
                <th scope="col">  Last Name  </th>
                <th scope="col">  Mobile Number  </th>
                <th scope="col">  Reservation Date  </th>
                <th scope="col">  Reservation Time  </th>
                <th scope="col">  People  </th>
                <th scope="col">  Status  </th>
                <th scope="col">  Seat  </th>
                </tr>
            </tbody>
        <tbody>{resRow}</tbody>
      </table>
    </div>
)

}

export default ReservationInformation