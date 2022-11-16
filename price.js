const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  const address=req.body.address;
  const eth=req.body.id;
  const currencies=req.body.currencies;
  const url="https://api.coingecko.com/api/v3/simple/token_price/"+eth+"?contract_addresses="+address+"&vs_currencies="+currencies+""
  console.log(url)

    https.get(url,function(response){
      console.log(response.statuscode);


      response.on("data",function(data){
        const pricedata=JSON.parse(data);
       const pp = JSON.stringify(pricedata);
       res.write("<h1>Token price is:</h1>")
        res.write(pp)
        res.send();
      })
    })
})


app.listen(3000,function(){
  console.log("The server has started at port 3000");


});
