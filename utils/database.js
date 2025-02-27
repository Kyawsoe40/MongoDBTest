const mongodb= require("mongodb");
const mongodbClient= mongodb.MongoClient;
const dotenv= require("dotenv").config();

let db;
const mongodbConnector= ()=>{
    mongodbClient.connect(process.env.MONGODB_URL)
    .then(result=> {
        console.log("connected to database!");
        db=result.db()
    })
    .catch(err=>console.log(err))
}
const getDatabase=()=>{
    if(db){
        return db
    }
    throw "No Database!"
}


module.exports= {mongodbConnector,getDatabase}