import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'records.json');

export const addRecord = (req: Request, res: Response) => {
    const newRecord = req.body;

    fs.readFile(DATA_PATH, 'utf8', (error, data) => {
        if (error) return res.status(500).json({ message: 'Failed to read records'});

        const records = JSON.parse(data);
        records.push(newRecord);
        fs.writeFile(DATA_PATH, JSON.stringify(records, null, 2), (error) => {
            if (error) return res.status(500).json({ message: 'Failed to write records'});

            res.status(201).json({ message: 'Record added successfully' });
        });
    });
};
