const bodyParser = require('body-parser');
const express = require('express')
const mongoos = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category');
const cartRouter =  require('./routes/cart');
const orderRouter = require('./routes/orders')
const { connectRedis } = require('./redis_clinent');
// connectRedis();





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

app.use(`${apiUrl}/`, authRouter)
app.use(`${apiUrl}/`, productRouter)
app.use(`${apiUrl}/`, categoryRouter)
app.use(`${apiUrl}/`,cartRouter)
app.use(`${apiUrl}/`,orderRouter)

app.get('/any', (req, res) => { return res.json({ ok: "ok" }) })


mongoos.connect(mongoDbConnectionString).then(() => { console.error('Connected with mongoDb') }).catch((error) => { console.error(error) });

app.listen(port, hostName, () => {
  console.log(`the server is running at http://${hostName}:${port}`)
});