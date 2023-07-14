const mongoose=require("mongoose")

const  schema= mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    emailId:{   
        type : String ,
        unique : true
    },
    passwordHash:{
        type:String,
        select: false //this field will not be returned in response to client request as it is sensitive
    },

},{versionKey:false})



const  model=mongoose.model('customer',schema)

module.exports=model