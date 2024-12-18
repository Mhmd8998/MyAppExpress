const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/Users");
const postrouter = require("./router/Posts");
const registerrouter = require("./router/Register");

app.use(cors());
app.use(express.json()); // لإضافة تحليل جسم الطلب
app.use("/user",router);
app.use("/post",postrouter);
app.use("/register",registerrouter);
// استخدام الروتر

// CONNECT MONGODB
mongoose.connect("mongodb+srv://3b006998:rLSvLCJKYAMmpugg@cluster0.on1ul.mongodb.net/books?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => {
    console.error('Could not connect to MongoDB...', err);
});


// تحديد مستوى الاستجابة
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
