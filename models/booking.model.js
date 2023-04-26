const mongoose = require("mongoose");

const { FlightModel } = require("./flight.model")
const { UserModel } = require("./user.model")

let ObjectId = mongoose.Schema.ObjectId;

const bookingSchema = mongoose.Schema({
    user: { type: ObjectId, ref: UserModel },
    flight: { type: ObjectId, ref: FlightModel }
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel }