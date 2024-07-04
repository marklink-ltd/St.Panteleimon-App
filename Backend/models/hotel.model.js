import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;