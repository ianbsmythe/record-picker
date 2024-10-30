import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'records.json');

export const getRecords = (req: Request, res: Response) => {
    fs.readFile(DATA_PATH, 'utf8', (error, data) => {
        if (error) {
            return res.status(500).json({message: 'failed to read records'});
        }
        res.status(200).json(JSON.parse(data));
    });
};