"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_db_1 = require("./in-memory-db");
function addPushSubscriber(req, res) {
    const sub = req.body;
    console.log('Received Subscription on the server: ', sub);
    in_memory_db_1.USER_SUBSCRIPTIONS.push(sub);
    console.log(in_memory_db_1.USER_SUBSCRIPTIONS);
    res.status(200).json({ message: 'Subscription added successfully.' });
}
exports.addPushSubscriber = addPushSubscriber;
//# sourceMappingURL=add-push-subscriber.route.js.map