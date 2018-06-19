
import * as express from 'express';
import {Application} from 'express';
import {readAllLessons} from './read-all-lessons.route';
import {addPushSubscriber} from './add-push-subscriber.route';
import {sendNewsletter} from './send-newsletter.route';
import * as https from 'https';
import * as fs from 'fs';

var key = fs.readFileSync('./key.pem', 'utf8');
var cert = fs.readFileSync( './cert.pem', 'utf8' );
// var ca = fs.readFileSync( 'encryption/intermediate.crt' );
const options = {
    key : key,
    cert : cert, 
    passphrase: ''
}

const bodyParser = require('body-parser');


const webpush = require('web-push');

const vapidKeys = {
   'publicKey': 'BKYEevgdyG0q71I4a45jYYrSnkLX_p-NSQuGLnmiDDhGz8jGTXyILmbBcpqR0USDnskuJN_kikqTgLxQGC94Mfs',
   'privateKey': 'VsRhYJIXpCvUYnvKrc0hGRBh7OHBUauS8atIrwO609Y'
};



webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);




const app: Application = express();


app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.status(200).jsonp({"msg":"hello HTTPS"})
});

// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);

https.createServer(options, app).listen(3000,()=>{
    console.log('HTTPS server running on port 3000');
});


// launch an HTTP Server
// const httpServer = app.listen(9000, () => {
//     console.log('HTTP Server is running at http://localhost:' + httpServer.address().port);
// });









