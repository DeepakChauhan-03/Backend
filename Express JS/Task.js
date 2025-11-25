// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv'

// const app = express();

// app.get("/",(req,res)=>{
//     res.send("Hello")
// });

// app.listen(3000);

// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // useNewUrlParser, useUnifiedTopology not required on latest mongoose but harmless
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // older versions only
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // fail fast
  }
};

connectDB();

// simple route
app.get('/', (req, res) => {
  res.send('Server running');
});

// graceful shutdown (optional but good)
const gracefulShutdown = () => {
  mongoose.connection.close(false, () => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
