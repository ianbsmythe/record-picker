"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateRecord = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Set the path to the records.json file
const DATA_PATH = path_1.default.join(__dirname, "..", "..", "data", "records.json");
// Define the rateRecord function to rate a record by title and add a rating and comment to it 
const rateRecord = (req, res) => {
    const { title } = req.params;
    const { rating, comment } = req.body;
    fs_1.default.readFile(DATA_PATH, "utf8", (error, data) => {
        if (error)
            return res.status(500).json({ message: "Failed to read records" });
        const records = JSON.parse(data); // Use the Record interface for typing
        const record = records.find((r) => r.title === title);
        if (!record)
            return res.status(404).json({ message: "Record not found" });
        // Push the new rating to the ratings array
        record.ratings.push({ rating, comment, date: new Date() });
        fs_1.default.writeFile(DATA_PATH, JSON.stringify(records, null, 2), (error) => {
            if (error)
                return res.status(500).json({ message: 'Failed to save rating' });
            res.status(200).json({ message: 'Rating added successfully' });
        });
    });
};
exports.rateRecord = rateRecord;
