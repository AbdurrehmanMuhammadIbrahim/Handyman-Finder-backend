import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
import cors from "cors";

dotenv.config({path:'./.env'});

const port = process.env.PORT || 3000;

//  app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
}); 