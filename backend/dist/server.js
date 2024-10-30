"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_1 = require("./api/records/get");
const add_1 = require("./api/records/add");
const rate_1 = require("./api/records/rate");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/records', get_1.getRecords);
app.post('/api/records', add_1.addRecord);
app.post('/api/records/:title/rate', rate_1.rateRecord);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
