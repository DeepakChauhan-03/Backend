import express from 'express';
import mongoose from 'mongoose';
import practiceModel from './model/practicemodel.js';

const app = express();
app.use(express.json()); //Middleware used to extract data from body
//Database Connection
mongoose.connect("mongodb://localhost:27017/practice1")
.then(() => {
    console.log("___Database Connected____");
})
.catch((err) => {
    console.log("Database Error:", err);
});

//Get Route
app.get("/", async (req, res) => {
    try {
        const practiceData = await practiceModel.find();
        res.send({
            success: true,
            data: practiceData
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Error fetching data"
        });
    }
});

//Post method
app.post("/save", async (req, res) => {
    try {
        const practiceData = await practiceModel.create(req.body);

        res.send({
            message: "Data is stored",
            success: true,
            storedInfo: practiceData 
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Error saving data"
        });
    }
});

app.listen(3000,()=>{
   console.log("Server running on port 3000");
});