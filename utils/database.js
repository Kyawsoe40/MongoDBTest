const mongodb= require("mongodb");
const mongodbClient= mongodb.MongoClient;
const dotenv= require("dotenv").config();

const mongodbConnector= ()=>{
    mongodbClient.connect(process.env.MONGODB_URL)
    .then(result=> {
        console.log("connected to database!");

    })
    .catch(err=>console.log(err))
}

module.exports= mongodbConnector