"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecord = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_PATH = path_1.default.join(__dirname, '..', '..', 'data', 'records.json');
const addRecord = (req, res) => {
    const newRecord = req.body;
    fs_1.default.readFile(DATA_PATH, 'utf8', (error, data) => {
        if (error)
            return res.status(500).json({ message: 'Failed to read records' });
        const records = JSON.parse(data);
        records.push(newRecord);
        fs_1.default.writeFile(DATA_PATH, JSON.stringify(records, null, 2), (error) => {
            if (error)
                return res.status(500).json({ message: 'Failed to write records' });
            res.status(201).json({ message: 'Record added successfully' });
        });
    });
};
exports.addRecord = addRecord;
