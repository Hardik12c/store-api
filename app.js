require('dotenv').config();
require('express-async-errors');
const express=require('express');
const notFoundmiddleware=require('./middleware/not-found')
const connectDB=require('./db/connect')
const productrouter=require('./routes/products')
const app=express();


app.use(express.json());

app.use('/api/v1/product',productrouter);


app.use(notFoundmiddleware);




const port=process.env.PORT || 3000;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`app listening on port http://localhost:${port}/`)
          })
    } catch (error) {
        console.log(error);
    }
}
start();
