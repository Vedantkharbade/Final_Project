const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');
const FolderRoutes = require('./routes/FolderRoutes');
const formRoutes = require('./routes/FormRoutes');
const SubmissionRoutes = require('./routes/SubmisstionRoutes');
const app = express();
const dotenv = require('dotenv').config();
const PORT = 3000
app.use(cors({
    origin:process.env.CLIENT_URL,
}));
app.use(bodyParser.json());
app.use(express.json())

app.use('/user',userRouter);
app.use('/api', FolderRoutes);
app.use('/',formRoutes);
app.use('/',SubmissionRoutes)
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('failed to connect');
})




app.listen(PORT,(req,res)=>{
    console.log(`server is running at port ${PORT}`);
 })