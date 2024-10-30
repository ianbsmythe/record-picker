// Purpose: API route to rate a record by title and add a rating and comment to it. 
import { Request, Response } from 'express';
import fs from "fs";
import path from "path";

// Set the path to the records.json file
const DATA_PATH = path.join(__dirname, "..", "..", "data", "records.json");

// Define the interface for a Rating
interface Rating {
    rating: number; // Assuming rating is a number
    comment: string;
    date: Date; // Use Date object to represent the date
}

// Define the interface for a Record
interface Record {
    title: string;
    artist: string;
    ratings: Rating[]; // Array of ratings
}

// Define the rateRecord function to rate a record by title and add a rating and comment to it 
export const rateRecord = (req: Request, res: Response) => {
    const { title } = req.params;
    const { rating, comment } = req.body;

    fs.readFile(DATA_PATH, "utf8", (error, data) => {
        if (error) return res.status(500).json({ message: "Failed to read records" });

        const records: Record[] = JSON.parse(data); // Use the Record interface for typing
        const record = records.find((r) => r.title === title);

        if (!record) return res.status(404).json({ message: "Record not found" });

        // Push the new rating to the ratings array
        record.ratings.push({ rating, comment, date: new Date() });

        fs.writeFile(DATA_PATH, JSON.stringify(records, null, 2), (error) => {
            if (error) return res.status(500).json({ message: 'Failed to save rating' });
            res.status(200).json({ message: 'Rating added successfully' });
        });
    });
};
