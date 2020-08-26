const express=require('express');
const router=new express.Router();
//const web=require('../utils/functions');
const web=require('../utils/temp');
router.post('/approve',async(req,res)=>{
    try{
        const result=await web.Approve(req.body.spender,req.body.tokens);
        res.status(202).send("allowance set successfully");
    }catch(e){
        console.log(e);
        res.send('something went wrong ...')
    }
})

router.post('/transfer',async(req,res)=>{
    try{
        const result=await web.Transfer(req.body.to,req.body.tokens)
        res.status(200).send("transfered successfully");
    }catch(e){
        console.log(e);
        res.send('something went wrong ...')
    }
})

router.post('/transferFrom',async(req,res)=>{
    try{
        const result=await web.TransferFrom(req.body.sender,req.body.to,req.body.tokens)
        res.status(200).send("transfered successfully");
    }catch(e){
        console.log(e);
        res.send('something went wrong ...')
    }
})

router.get('/balanceOf/:address',async(req,res)=>{
    try{
       const _address= req.params.address;
       const result = await web.balanceOf(_address);
       res.status(200).send(result);
    }catch(e){
        console.log(e);
        res.send('something went wrong ...')
    }
})


router.get('/allowance',async(req,res)=>{
    try{
       const result = await web.Allowance(req.body.owner,req.body.spender);
       res.status(200).send(result);
    }catch(e){
        console.log(e);
        res.send("Something went wrong ...")
    }
})

module.exports=router;