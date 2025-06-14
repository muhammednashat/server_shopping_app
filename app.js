const bodyParser = require('body-parser');
const express = require('express')
const mongoos = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')

//  start
const admin = require('firebase-admin');
// Initialize Firebase Admin SDK
var serviceAccount = require("./serviceAcount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myproject-18932-default-rtdb.firebaseio.com"
});
// end

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
app.get('/any', (req, res) => { return res.json({ ok: "ok" }) })

// API endpoint to send notifications
app.post('/send-notification', async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    console.log(req.body)
    const db = admin.firestore();
   const usersCollection = db.collection('Users');
   const token = (await usersCollection.doc(userId).get()).get('token');
   console.log('----------------------------')
   console.log(token) 
   console.log('----------------------------')


    await admin.messaging().send({
      token: token,
      notification: { title, body },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


mongoos.connect(mongoDbConnectionString).then(() => { console.error('Connected with mongoDb') }).catch((error) => { console.error(error) });




app.listen(port, hostName, () => {
  console.log(`the server is running at http://${hostName}:${port}`)
});