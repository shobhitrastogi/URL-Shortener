const express = require("express")
const app = express();
const urlRoute = require("./routes/url");
const connectToMongo = require("./db/db");
connectToMongo()
app.use(express.json())
app.use('/url',urlRoute);
app.use('/',urlRoute);

app.listen(5000,()=>{
    try {
        console.log(`app are listen on http://localhost:5000`)
    } catch (error) {
        console.log(`app not listen on port no 5000 `)
    }
})