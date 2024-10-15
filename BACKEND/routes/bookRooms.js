const router = require("express").Router();
const { request } = require("express");
let BookRoom = require("../models/bookRoom");

//add booking room
router.route("/addBooking").post((req,res) => {

    const cusName = req.body.cusName;
    const roomId = req.body.roomId;
    const roomName = req.body.roomName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const noOfPersons = req.body.noOfPersons;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    const newbookRoom = new BookRoom({
        cusName,
        roomId,
        roomName,
        email,
        phoneNumber,
        noOfPersons,
        checkin,
        checkout

    })

    newbookRoom.save().then(() => {
        res.json("Room added")
    }).catch((err) => {
        console.log(err);
    })

})


//get all booked room details
router.route("/getbookings").get((req,res) => {

    BookRoom.find().then((bookRooms)=>{
        res.json(bookRooms)
    }).catch((err)=>{
        console.log(err);
    })
})



//update booked rooms
router.route("/updateBooking/:id").put(async(req,res)=>{
    let bookRoomId = req.params.id;
    const {cusName, roomName, roomId, email, phoneNumber, noOfPersons, checkin, checkout} = req.body;

    const updateBookRoom = {
        cusName,
        roomId,
        roomName,
        email,
        phoneNumber,
        noOfPersons,
        checkin,
        checkout
    }

    const updateBooking = await BookRoom.findByIdAndUpdate(bookRoomId, updateBookRoom).then(() => {
        res.status(200).send({status: "Room reservation updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

    
})



//delete booked room
router.route("/deleteBooking/:id").delete(async(req, res) => { 
    let bookRoomId = req.params.id;

    await BookRoom.findByIdAndDelete(bookRoomId).then(() => {
        res.status(200).send({ status: "Room reservation deleted" });
    }
    ).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting data" , error: err.message});
    });

});


//get one booked room detail
router.route("/getB/:id").get(async (req, res) => { 
    let bookRoomId = req.params.id;

    const bookRoom = await BookRoom.findById(bookRoomId).then((bookRoom) => {
        res.status(200).send({ status: "Room reservation fetched", bookRoom });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching data", error: err.message });
    });
    
});


router.get('/getCusBookings/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log("Fetching bookings for username:", username); // Debug log
        const bookings = await BookRoom.find({ cusName: username });

        if (bookings.length === 0) {
            return res.status(404).send({ error: "No bookings found for this user" });
        }

        res.json(bookings);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "Error fetching customer bookings" });
    }
});





module.exports = router;