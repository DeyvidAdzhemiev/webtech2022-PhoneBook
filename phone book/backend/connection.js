import express, { json } from "express";
import { connect, connection } from "mongoose";
import Router from "./routes";

const app = express();
app.use(json());
//app.use(app.router);

// mongoose.connect('mongodb://localhost:27017/usersdb', {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });


connect(`mongodb+srv://Deyvid:005017@cluster0.tltxh.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

export default router;