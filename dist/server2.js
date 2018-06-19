"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const read_all_lessons_route_1 = require("./read-all-lessons.route");
const add_push_subscriber_route_1 = require("./add-push-subscriber.route");
const send_newsletter_route_1 = require("./send-newsletter.route");
const https = require("https");
const fs = require("fs");
var key = fs.readFileSync('./key.pem', 'utf8');
var cert = fs.readFileSync('./cert.pem', 'utf8');
// var ca = fs.readFileSync( 'encryption/intermediate.crt' );
const options = {
    key: key,
    cert: cert,
    passphrase: ''
};
const bodyParser = require('body-parser');
const webpush = require('web-push');
const vapidKeys = {
    'publicKey': 'BKYEevgdyG0q71I4a45jYYrSnkLX_p-NSQuGLnmiDDhGz8jGTXyILmbBcpqR0USDnskuJN_kikqTgLxQGC94Mfs',
    'privateKey': 'VsRhYJIXpCvUYnvKrc0hGRBh7OHBUauS8atIrwO609Y'
};
webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).jsonp({ "msg": "hello HTTPS" });
});
// REST API
app.route('/api/lessons')
    .get(read_all_lessons_route_1.readAllLessons);
app.route('/api/notifications')
    .post(add_push_subscriber_route_1.addPushSubscriber);
app.route('/api/newsletter')
    .post(send_newsletter_route_1.sendNewsletter);
https.createServer(options, app).listen(3000, () => {
    console.log('HTTPS server running on port 3000');
});
// launch an HTTP Server
// const httpServer = app.listen(9000, () => {
//     console.log('HTTP Server is running at http://localhost:' + httpServer.address().port);
// });
//# sourceMappingURL=server2.js.map