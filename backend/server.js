const express = require("express")
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors=require('cors')

dotenv.config()


// Connection URL
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passop';
client.connect();

const app = express()
const port = 3000

app.use(cors())

app.use(bodyparser.json())
//get all the passwords

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
//Save a the passwords

app.post('/', async (req, res) => {
    const password = req.body
    console.log(password)
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password);
    res.send({ success: true,findResult:true })
})

app.delete('/', async (req, res) => {
    const password = req.body
    console.log(password)
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password);

    res.send({ success: true ,findResult:true})
})
// app.put('/', async (req, res) => {
//     const password = req.body
//     console.log(password)
//     const db = client.db(dbName);
//     const collection = db.collection('password');
//     const findResult = await collection.updateOne(password);

//     res.send({ success: true ,findResult:true})
// })

//delete a password


app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
})