const knex = require('../db/connection')

function list(){
    return knex('reservations')
        .select('*')
}

function listForDate(date){
    return knex("reservations")
    .where({reservation_date: date})
    .whereNot({status: "finished"})
    .select("*")
    .orderBy("reservation_time")
}

function search(mobile_number) {
       return knex("reservations")
         .whereRaw(
           "translate(mobile_number, '() -', '') like ?",
           `%${mobile_number.replace(/\D/g, "")}%`
        )
         .orderBy("reservation_date");
     }

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first();
}

function create(newReservation){
    return knex('reservations')
        .insert(newReservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

function update(updatedReservation) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id })
      .update(updatedReservation, "*")
      .then((updatedRecords) => updatedRecords[0]);
  }

module.exports = {
    list,
    listForDate,
    search,
    read,
    create,
    update,
}