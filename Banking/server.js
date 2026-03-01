const app = require('./src/app')
const connectToDB = require('./src/config/db')

const dotenv = require('dotenv')
dotenv.config();

connectToDB();


app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})