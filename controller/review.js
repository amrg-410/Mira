const route = require('express').Router()
const review = require('../model/review');


route.post('/saveReview',(req,res)=>{
    console.log(req.body);
    review.create(req.body);
    console.log("Review");
    res.sendStatus(200);
})


route.post('/rating',(req,res)=>{
    const {movie} = req.body;
    review.find({
        movieName:movie
    })
    .then((rate)=>{
        if(!rate){
            res.sendStatus(404);
        }
        else{
            let rating = 0 ;
            let pos =0;
            let neg =0;
            for(var i=0;i<rate.length;i++){
                if(rate[i].review==='Positive'){
                    pos++;
                }
                else{
                    neg++;
                }
            }
            rating=(pos-neg)/Math.max(1,(pos+neg));
            res.send(rating);
        }
    })
})


module.exports=route