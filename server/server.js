//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer') ;


const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })

app.use(express.json());
app.use(cors());
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use(errorHandler);

// ERROR handling middleware
app.use(errorHandler);
app.use("/api/register",require("./routes/userRoutes"));
app.set('view engine', 'hbs');



//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home",(req,res)=>{
    res.render("home",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})

// route for user registration and authentication


let imageUrls = [];
app.post("/profile", upload.single("avatar"), function (req, res, next) {
    if(!req.file){
        return res.status(400).json("No file uploaded")
    }
    console.log(req.body);
    console.log(req.file);
    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    imageUrls.push(imageUrl)
    return res.render("allimages", {
        imageUrls:imageUrls
    });
   })
app.get("/allimages", (req, res) => {
    const imageUrls = [];
    res.render("images", {
        imageUrls:imageUrls
    })
})
// APP CONFIG START
app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});