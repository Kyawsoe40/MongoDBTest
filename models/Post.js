const { ObjectId } = require("mongodb");
const {getDatabase}= require("../utils/database") 

class Post{
    constructor(title,description,imgUrl,id){
        this.title=title
        this.description=description
        this.imgUrl=imgUrl
        this.id=id
    }

    create(){
        const db=getDatabase();
        let dbTmp;
        if(this.id){
            dbTmp=db.collection("posts").updateOne({_id:new ObjectId(this.id)},{$set:this})
        }else{
            dbTmp=db.collection("posts").insertOne(this)
        }
        return dbTmp
        .then((result)=> console.log(result))
        .catch(err=> console.log(err))
    }
    static getPosts(){
        const db=getDatabase();
        return db.collection("posts").find().sort({title:1}).toArray()
            .then((posts)=> {
                return posts
            })
            .catch(err=> console.log(err))
    }
    static getSinglePost(postId){
        const db=getDatabase();
        return db.collection("posts").find({_id: new ObjectId(postId)}).toArray()
            .then((posts)=>{
                return posts[0]
            })
            .catch(err=> console.log(err))
    }

    static deletePost(id){
        const db=getDatabase()
        return db.collection("posts").deleteOne({_id:new ObjectId(id)})
            .then(()=>{
                console.log("Deleted successfully!!")
                return
            })
            .catch(err=> console.log(err))
    }
}

module.exports =Post