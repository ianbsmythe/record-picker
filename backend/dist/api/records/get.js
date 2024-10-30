"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecords = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_PATH = path_1.default.join(__dirname, '..', '..', 'data', 'records.json');
const getRecords = (req, res) => {
    fs_1.default.readFile(DATA_PATH, 'utf8', (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'failed to read records' });
        }
        res.status(200).json(JSON.parse(data));
    });
};
exports.getRecords = getRecords;
