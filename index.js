const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello beautyyyyyy!')
})

// mongodb connection
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.dbebnio.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    const userCollection=client.db('beauty-parlour').collection('users')
    const serviceCollection=client.db('beauty-parlour').collection('services')

    // service api
    app.get('/services',async(req,res)=>{
        const query={}
        const services=await serviceCollection.find(query).toArray()
        res.send(services)
    })
}
finally{

}
}
run().catch(err=>console.log(err))



app.listen(port, () => {
  console.log(`beauty-parlour listening on port ${port}`)
})