"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_db_1 = require("./in-memory-db");
const webpush = require('web-push');
function sendNewsletter(req, res) {
    console.log('ffffffffffffff');
    // console.log(req);
    // console.log(res);
    console.log(in_memory_db_1.USER_SUBSCRIPTIONS);
    console.log('Total subscriptions', in_memory_db_1.USER_SUBSCRIPTIONS.length);
    // sample notification payload
    const notificationPayload = {
        'notification': {
            'title': 'Angular News',
            'body': 'Newsletter Available!',
            'icon': 'assets/main-page-logo-small-hat.png',
            'vibrate': [100, 50, 100],
            'data': {
                'dateOfArrival': Date.now(),
                'primaryKey': 1
            },
            'actions': [{
                    'action': 'explore',
                    'title': 'Go to the site'
                }]
        }
    };
    Promise.all(in_memory_db_1.USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
        .catch(err => {
        console.error('Error sending notification, reason: ', err);
        res.sendStatus(500);
    });
}
exports.sendNewsletter = sendNewsletter;
//# sourceMappingURL=send-newsletter.route.js.map