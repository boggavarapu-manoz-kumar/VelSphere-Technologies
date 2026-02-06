import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { app } from './app.js';

dotenv.config();

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
