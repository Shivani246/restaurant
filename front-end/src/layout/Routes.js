import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "../reservations/new/CreateReservation";
import useQuery from "../utils/useQuery";
import CreateTable from "../tables/new/CreateTable";
import SeatReservationForm from "../reservations/new/SeatReservationForm";
import ReservationSearch from "../reservations/new/ReservationSearch";
import EditReservation from "../reservations/new/EditReservation"
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/search">
        <ReservationSearch />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservationForm />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={ date || today() } />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
