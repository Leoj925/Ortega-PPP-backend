const express =require("express")
const app=express()
const path= require("path")

const PORT=3000

app.set("view engine", "ejs");

app.listen(PORT, ()=>console.log("Escuchando al puerto: ",PORT))

app.use(express.static("public")) //de donde saco los archivos (carpeta publica =>muchos archivos distintos, estaticos)

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