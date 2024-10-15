
/*
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env file

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
//const URL = process.env.MONGODB_URL;
const dayoutDbUrl = process.env.MONGODB_DAYOUT_URL;
const bookingDbUrl = process.env.MONGODB_BOOKING_URL;

mongoose.connect(dayoutDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connect(bookingDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Get connection
/*const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});
*/
/*
dayoutConnection.once("open", () => {
    console.log("Mongodb Connection Success for Dayout DB!");
});

bookingConnection.once("open", () => {
    console.log("Mongodb Connection Success for Booking DB!");
});

/*
const packageRouter = require("./routes/dayout.js");
const bookingsRoute = require("./routes/bookingDayout.js");

//loading http://localhost:8080/dayout

app.use("/dayout", packageRouter);
app.use("/bookingDayout", bookingsRoute);
*/
/*
// Importing routes and passing connections
const createRouterWithDb = (routerFile,connection) => {
    const router = express.Router();
    // Example of usage: require('./routes/dayout.js')(router, connection);
    require(routerFile)(router, connection);
    return router;
};

app.use("/dayout", createRouterWithDb(require("./routes/dayout.js"),dayoutConnection));
app.use("/bookingDayout", createRouterWithDb(require("./routes/bookingDayout.js"),bookingConnection));

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
*/

//DONE

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const db_connection = require("./database/index");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs');

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

//Janith
// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//Nimla opening
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(err => {
    console.error("MongoDB connection error:", err);
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb connected successfully");
})


// Serve static files from the "uploads" folder
// This allows access to the uploaded images via the "/uploads" path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const roomRouter = require("./routes/rooms.js");
app.use("/room", roomRouter);

const bookRoomRouter = require("./routes/bookRooms.js");
app.use("/book", bookRoomRouter);

const customerRouter = require("./routes/customers.js");
app.use("/customer", customerRouter);

const reservationManagerRouter = require("./routes/reservationManagers.js");
app.use("/reservationManager", reservationManagerRouter);
//Nimla Closing


//Janith Starting

// Import and use routes
const reviewRouter = require('./routes/reviews');
const adminRouter = require('./routes/admins');
const cusRouter = require('./routes/cusJs'); // Add this if you have customer routes

// Use the routers
app.use('/reviews', reviewRouter);
app.use('/', adminRouter); // Now the /admin-login route will work
app.use('/cus', cusRouter); // Use the customer routes (if applicable)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

//Janith Closing



//Mithula starting

const bookingRouter = require("./routes/bookings");
const promotionRouter=require("./routes/promotions");

app.use("/booking", bookingRouter);
app.use("/promotion",promotionRouter);
//Mithula Closing


//Kavindya Starting

const authRoutes = require("./routes/auth.route.js");
const Items = require("./routes/items.route.js");
const bookRoutes = require("./routes/book.js");

app.use("/auth", authRoutes);
app.use("/items", Items);
app.use("/book", bookRoutes);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
//Kavindya Closing


//Bipasha & Dulaj's starting

const staffRoutes = require("./routes/staff"); 
const authRoutes1 = require("./routes/auth"); 
const attendanceRoutes = require("./routes/attendance"); 
const leavesRoutes = require("./routes/leave"); 
const menuRoutes = require("./routes/menu");

app.use(express.static(path.join(__dirname, 'public')));

app.use("/staff", staffRoutes); 
app.use("/auth", authRoutes1);
app.use("/attendance", attendanceRoutes);
app.use("/leaves", leavesRoutes);
app.use("/menu", menuRoutes); 

//Bipasha & Dulaj's Closing




//Ojani Starting

// Connect to the databases
const dayoutDbUrl = process.env.MONGODB_DAYOUT_URL;
const bookingDbUrl = process.env.MONGODB_BOOKING_URL;
const activitiesUrl1 = process.env.MONGODB_ACTIVITY_URL;
const spaUrl1 = process.env.MONGODB_SPA_URL;

const dayoutConnection = mongoose.createConnection(dayoutDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bookingConnection = mongoose.createConnection(bookingDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const activityConnection = mongoose.createConnection(activitiesUrl1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const spaConnection = mongoose.createConnection(spaUrl1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Verify connections
dayoutConnection.once("open", () => {
    console.log("Mongodb Connection Success for Dayout DB!");
});

bookingConnection.once("open", () => {
    console.log("Mongodb Connection Success for Booking DB!");
});

activityConnection.once("open", () => {
    console.log("Mongodb Connection Success for Activity DB!");
})

spaConnection.once("open", () => {
    console.log("Mongodb Connection Success for Spa DB!");
})

// Importing routes and passing connections
const createRouterWithDb = (routerFile, connection) => {
    const router = express.Router();
    require(routerFile)(router, connection);
    return router;
};

app.use("/dayout", createRouterWithDb('./routes/dayout.js', dayoutConnection));
app.use("/bookingDayout", createRouterWithDb('./routes/bookingDayout.js', bookingConnection));
app.use("/activities", createRouterWithDb('./routes/activities.js', activityConnection));
app.use("/spa", createRouterWithDb('./routes/spa.js', spaConnection));
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Ojani Closing



//Chathurika Opening

// Import the stockRouter
const stockRouter = require("./routes/Stocks.js");
// Use the stockRouter
app.use("/stocks", stockRouter);

//Chathurika Closing

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});

