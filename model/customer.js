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
    password:{
        type:String,
        select: false 
    },

},{versionKey:false})



const  customer=mongoose.model('customer',schema)

module.exports=customer