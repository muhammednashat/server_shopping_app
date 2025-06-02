const bodyParser = require('body-parser');
const express = require('express')
const mongoos = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const authRouter = require('./routes/auth')


require('dotenv/config')
const env = process.env
const hostName = env.HOST;
const port = env.PORT;
const mongoDbConnectionString = env.MONGODB_CONNECTION_STRING
const apiUrl = env.API_URL

const app = express();
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors());

app.use(`${apiUrl}/`,authRouter)


mongoos.connect(mongoDbConnectionString).then(()=>{console.error('Connected with mongoDb')}).catch((error) =>{console.error(error)}) ;


app.listen(port, hostName, () => {
    console.log(`the server is running at http://${hostName}:${port}`)
});