import express from 'express';
import { getRecords } from './api/records/get';
import { addRecord } from './api/records/add';
import { rateRecord } from './api/records/rate';

const app = express();
app.use(express.json());

app.get('/api/records', getRecords);
app.post('/api/records', addRecord);
app.post('/api/records/:title/rate', rateRecord);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});