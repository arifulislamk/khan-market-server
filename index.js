const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(express.json());
app.use(cookieParser());
const uri = `mongodb+srv://${process.env.Db_User}:${process.env.Db_Pass}@cluster0.zwicj3r.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const product = client.db("khanmarket").collection("product");
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    app.get("/product", async(req,res) =>{
        // console.log("paisi")
        const result = await product.find().toArray() ;
        res.send(result)
    })
    app.get("/product/:productId", async (req, res) => {
      const id = req.params.productId;
      // console.log(id,"paisi")
      const result = await product.findOne({ productId: id });
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("hello khan server is comming");
});
app.listen(port, () => {
  console.log(`khan server is running port ${port}`);
});
