const express =require("express")
const app=express()
const path= require("path")
const bodyParser= require("body-parser")
const { body, validationResult} = require("express-validator")
app.use(bodyParser.urlencoded({ extended:true}))
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser');
const fs = require("fs");


const PORT=3000

app.set("views", path.resolve(__dirname,"../views"))
app.set("view engine", "ejs");

app.listen(PORT, ()=>console.log("Escuchando al puerto: ",PORT))

app.use(express.static("public")) 
app.use(cookieParser())

const read = () => JSON.parse(fs.readFileSync('../data/users.json', 'utf-8'))
const writeJSON = (data) => {
    let stringifiedData = JSON.stringify (data, null, 2);
    return fs.writeFileSync("../data/users.json", stringifiedData);
};

/* RUTAS */
app.get("/", (req,res)=> {
    res.render ("../views/home.ejs")
})

app.get("/detalle-producto", (req,res)=> {
    res.render("../views/productDetail.ejs")
})

app.get("/login", (req,res)=> {
    res.render ("../views/login.ejs")
})

app.get("/cart", (req,res)=> {
    res.render ("../views/cart.ejs")
})

app.get("/register", (req,res)=> {
    res.render ("../views/register.ejs")
})

const validateUser= [
    body("nombre").trim().notEmpty().isAlpha().withMessage("Solo caracteres alfabéticos"),
    body("apellido").trim().notEmpty().isAlpha().withMessage("Solo caracteres alfabéticos"),
    body("fechaNacim").trim().notEmpty().isDate().withMessage("Solo formato fecha"),
    body("email").trim().notEmpty().isEmail().withMessage("Solo direcciones de email"),
    body("emailConfirm").trim().notEmpty().isEmail().custom((value, { req }) => {
        if (value !== req.body.email) {
            throw new Error('Los correos electrónicos no coinciden');
          }
          return true;
        }),
    body("password").trim().notEmpty().isLength(8).withMessage("Minimo 8 caracteres alfanumericos"),
    body("passwordConfirm").trim().notEmpty().isLength(8).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
          }
          return true;
        })
];
 
app.post("/register", validateUser, (req, res) => {
            const errors = validationResult(req) 
            if (!errors.isEmpty()) { 
            console.log(errors)
        }}
        )

    app.post("/register", (req,res) =>{
        let oldJSON= read()
        const newUser= {id: oldJSON.length +1 , nombre: req.body.nombre, apellido: req.body.apellido
        };
        oldJSON.push(newUser);
        writeJSON(oldJSON);
        res.redirect("/login");;
      });