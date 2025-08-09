import express from "express";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const API_URL = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

app.get("/",async (req,res)=>{
    try{
        const result = await axios.get(API_URL);
        const cocktailImage = result.data.drinks[0].strDrinkThumb;
        const detail = result.data.drinks[0].strInstructions;
        const cocktailName = result.data.drinks[0].strDrink;
        res.render("index.ejs",{i:cocktailImage,d:detail,n:cocktailName});
        console.log(detail);
    }
    catch(error){
        console.log(error.message);
        res.status(500);
    }
});

app.listen(port,()=>{console.log("server running on port "+ port);});