import React from "react";
import { useHistory } from "react-router";

function CreateReservationForm({ reservation, setReservation }) {
  const history = useHistory();

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>Create Reservation</h1>
      <div>
        <label>First Name</label>
        <input
          name="first_name"
          value={reservation.first_name}
          placeholder="first name"
          require="true"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          name="last_name"
          value={reservation.last_name}
          placeholder="last name"
          require="true"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Mobile Number</label>
        <input
          name="mobile_number"
          type="tel"
          value={reservation.mobile_number}
          placeholder="###-###-####"
          require="true"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Reservation Date</label>
        <input
          name="reservation_date"
          type="date"
          value={reservation.reservation_date}
          placeholder="reservation date"
          require="true"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Reservation Time</label>
        <input
          name="reservation_time"
          type="time"
          value={reservation.reservation_time}
          placeholder="reservation time"
          require="true"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>People</label>
        <input
          name="people"
          value={reservation.people}
          placeholder="number of people"
          require="true"
          onChange={handleChange}
          type="number"
        />
      </div>

      <button className="cancel-btn" type="cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </div>
  );
}

export default CreateReservationForm;
