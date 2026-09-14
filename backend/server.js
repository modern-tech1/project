const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');



// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clients_management_system"
});

//connection.connect((error)=>{
//    if(error){
//        console.log("connection error",error);
//    }
//    else{
//        console.log("yes")
//    }
//})

// Middleware
app.use(cors());
app.use(express.json());



// INSERT DATA
app.post('/insert', (req, res) => {

    const {firstname,lastname,id_card,gender,address,telephone} = req.body;
    console.log(firstname)
    console.log(lastname)
    console.log(id_card)
    console.log(gender)
    console.log(telephone)
    const sql = 
        "INSERT INTO clients(firstname, lastname, id_card, gender, address, telephone)VALUES (?, ?, ?, ?, ?, ?)";
    

    connection.query(sql,[firstname, lastname, id_card, gender, address, telephone ],
        ((error) => {
            if (error) {
                console.log("Insert failed:", error);
                }
                else{
                    console.log("data inserted");
                    res.json({data:"data inserted"})
                }
            }
        )
)
});

// GET DATA
app.get('/clients', (req, res) => {

    connection.query(
        "SELECT * FROM clients",
        (error, result) => {
            if(error){
                console.log("selected error",error);
            }
            else{
                res.json({data:result})
            }
        })
    })

// Start Server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});