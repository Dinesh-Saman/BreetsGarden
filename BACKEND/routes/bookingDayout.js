const router = require("express").Router();
let Bookings = require("../models/bookingDayout");
const mongoose = require("mongoose");

//get mongoose connection
module.exports = (router, connection) => {
    const Bookings = connection.model("Bookings", new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        packageType: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }));

//Custome side
//creating the CRUD part

//CREATE
router.route("/book").post((req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const packageType = req.body.packageType;
    const duration = req.body.duration;
    const price = req.body.price;

    const newBookings = new Bookings({

        name,
        email,
        packageType,
        duration,
        price

    })

    newBookings.save().then(()=>{   
        res.json("Dayout Added")   
    }).catch((err)=>{
        console.log(err);  
        res.status(500).send({ status: "Error with adding data", error: err.message });
    })

})

//pitch data
router.route("/").get((req,res)=>{

    Bookings.find().then((Bookings)=>{
        res.json(Bookings)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({ status: "Error with fetching data", error: err.message });
    
    })

})


//UPDATE
//http//localhost:8080/Bookings/update/<id>
router.route("/update/:id").put(async(req,res)=>{
    //let bookingId = req.params.id; 
    
    //destructuring
    const{bookingId} = req.params.id;
    const{name,email,packageType,duration, price} = req.body;

    const updateBookings = {
        name,
        email,
        packageType,
        duration,
        price,
        
    }

    const update = await Bookings.findByIdAndUpdate(bookingId, updateBookings).then (()=> {
        res.status(200).send({status: "Package Updated"})
        //res.status means , like 404, 500 error....    
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

//DELETE
//http//localhost:8080/Bookings/delete/<id>
router.route("/delete/:id").delete(async (req,res) => {
    //let bookingId = req.params.id;
 
    const{bookingId} = req.params.id;
    await Bookings.findByIdAndDelete(bookingId).then (()=> {
        res.status(200).send({status: "Package deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete package", error: err.message});
    })
})

//get only one user details
router.route("/get/:id").get(async (req,res)=> {
    //let bookingId = req.params.id;

    const {bookingId} = req.params.id;
    const user = await Bookings.findById(bookingId).then((Bookings)=> {
        res.status(200).send({status: "Package fetched", Bookings})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get package", error: err.message});
    })
})


return router;
};