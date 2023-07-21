const service = require("./reservations.services")
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property." });
}

function hasFirstName(req, res, next) {
  if (req.body.data.first_name) {
    return next();
  }
  next({ status: 400, message: "first_name is required." });
}

function hasLastName(req, res, next) {
  if (req.body.data.last_name) {
    return next();
  }
  next({ status: 400, message: "last_name is required." });
}

function hasMobileNumber(req, res, next) {
  if (req.body.data.mobile_number) {
    return next();
  }
  next({ status: 400, message: "mobile_number is required." });
}

function hasReservationDate(req, res, next) {
  let reservationDate = req.body.data.reservation_date;
  const reservationDateObject = new Date(reservationDate);
  if (reservationDate && reservationDateObject.getDate()) {
    return next();
  }
  next({ status: 400, message: "reservation_date is required." });
}

function hasReservationTime(req, res, next) {
  let reservationTime = req.body.data.reservation_time;

  if (reservationTime && isValidTimeString(reservationTime)) {
    return next();
  }

  next({ status: 400, message: "reservation_time is required." });
}

function isValidTimeString(timeString) {
  const timeReg = /^([0-5][0-9]):([0-5][0-9])$/;
  return timeReg.test(timeString);
}

function hasReservationPeople(req, res, next) {
  let people = req.body.data.people;
  if (people && people > 0 && typeof people === "number") {
    return next();
  }

  next({ status: 400, message: "people are required." });
}

function isReservationTuesday(req, res, next){
  const date = req.body.data.reservation_date
  const day = new Date(date).getUTCDay()
  if (day !== 2){
    return next()
  }
  next({
    status: 400, message: "Reservations cannot be made, restaurant is closed on Tuesday."
  })
}

function isReservationPast(req, res, next){
  const { reservation_date, reservation_time } = req.body.data
  const currentTime = Date.now()
  const cleaned_reservation_date = new Date(reservation_date).toISOString().split('T')[0]

  const reservationTime = new Date(`${cleaned_reservation_date}T${reservation_time}:00`).valueOf()

  if (reservationTime > currentTime){
    return next()
  }
  next({
    status: 400, message: "Reservations cannot be made, reservations need to be made in the future."
  })
}

function isReservationDuringHours(req, res, next){
  const time = req.body.data.reservation_time
  const timeConversion = time.replace(":", "")
  if (timeConversion >= 1030 && timeConversion <= 2130){
    return next()
  }
  next({
    status: 400, message: "Reservation needs to be between the times 10:30 AM and 9:30PM."
  })
}



async function reservationExists(req, res, next){
  const {reservation_id} = req.params
  const reservation = await service.read(reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }
  next({
    status: 404, message: `this reservation_id ${reservation_id} does not exist.`
  })
}

function statusCheck(req, res, next){
  const { status } = req.body.data;

  
  if (req.method === "POST" && status && status !== "booked") {
    next({
      status: 400, message: `Reservation cannot have status of ${status}.`
    })
  }

  if (req.method === "PUT" && status && status === 'unknown') {
    
    next({
      status: 400, message: "Reservation is an unknown status."
    })
  }

  return next();
}


function reservationFinished(req, res, next) {
  const {reservation} = res.locals
  if (reservation && reservation.status !== 'finished') {
    return next()  
  }

  next({
    status: 400, message: "A finished reservation cannot be updated."
  });
  
}

//CRUD

async function list(req, res) {
  const { date, mobile_number } = req.query;

  if (date) {
    const data = await service.listForDate(date);
    res.json({ data });
  }
  else if (mobile_number){
    const data = await service.search(mobile_number)
    res.json({ data })
  }
  else{
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  // req.body.data
  // call the service create function
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

async function read(req, res){
  const data = res.locals.reservation;
  res.json({data})
}

async function updateReservation(req, res) {
  const reservation = req.body.data;
  const data = await service.update(reservation);
  res.status(200).json({ data });
}

async function updateStatus(req, res){
  const { reservation } = res.locals
  const newReservation = {
    ...reservation,
    status: req.body.data.status,
  }
  const data = await service.update(newReservation)
  res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasReservationPeople,
    isReservationTuesday,
    isReservationPast,
    isReservationDuringHours,
    statusCheck,
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)
  ],
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasReservationPeople,
    isReservationTuesday,
    isReservationPast,
    isReservationDuringHours,
    asyncErrorBoundary(updateReservation)

  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusCheck,
    reservationFinished,
    asyncErrorBoundary(updateStatus),
    
  ]
};

/*   {
    "first_name": "Rick",
    "last_name": "Sanchez",
    "mobile_number": "202-555-0164",
    "reservation_date": "2020-12-31",
    "reservation_time": "20:00:00",
    "people": 6,
    "created_at": "2020-12-10T08:30:32.326Z",
    "updated_at": "2020-12-10T08:30:32.326Z"
  }, */
