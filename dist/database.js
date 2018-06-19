"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const database_data_1 = require("./database-data");
class InMemoryDatabase {
    readAllLessons() {
        return _.values(database_data_1.LESSONS);
    }
}
exports.db = new InMemoryDatabase();
//# sourceMappingURL=database.js.map