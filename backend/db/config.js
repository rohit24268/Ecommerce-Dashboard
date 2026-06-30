const mongoose=require('mongoose');
mongoose.connect('mongodb://user21:MERNDatabase123@ac-pz5syzd-shard-00-00.kkdchaj.mongodb.net:27017,ac-pz5syzd-shard-00-01.kkdchaj.mongodb.net:27017,ac-pz5syzd-shard-00-02.kkdchaj.mongodb.net:27017/e-commerce?ssl=true&replicaSet=atlas-f4kofo-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{
    console.log("MongoDB connected to",mongoose.Collection.name);
});