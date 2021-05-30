const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// require('dotenv').config()

const uri = `mongodb+srv://blog:blog12@cluster0.wumse.mongodb.net/blog?retryWrites=true&w=majority`;

const port = 4100


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("working")
})





const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err)
  const collection = client.db("blog").collection("bloglist");
  console.log('add')
  app.post("/addBlog", (req, res) => {
    const service = req.body;
    console.log(service);
    collection.insertOne(service)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0)
      })
  })

  app.get("/blogs", (req, res) => {
    collection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get("/blog/:id", (req, res) => {
    collection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

});



app.listen(process.env.PORT || port)