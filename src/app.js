const express =require("express")
const app=express()
const path= require("path")

const PORT=3000

app.listen(PORT, ()=>console.log("Escuchando al puerto: ",PORT))

app.use(express.static("public")) //de donde saco los archivos (carpeta publica =>muchos archivos distintos, estaticos)

/* RUTAS */
app.get("/", (req,res)=> {
    res.sendFile (path.join(__dirname, "views/home.html"))
})

app.get("/detalle-producto", (req,res)=> {
    res.sendFile (path.join(__dirname, "views/productDetail.html"))
})

app.get("/login", (req,res)=> {
    res.sendFile (path.join(__dirname, "views/login.html"))
})

app.get("/cart", (req,res)=> {
    res.sendFile (path.join(__dirname, "views/cart.html"))
})

app.get("/register", (req,res)=> {
    res.sendFile (path.join(__dirname, "views/register.html"))
})