const express= require("express");
const connectDb= require("./config/dbConnection")
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
app.use(express.json());
const port= process.env.PORT || 5000;
app.use("/api/propertyApi", require("./routes/propertyRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});