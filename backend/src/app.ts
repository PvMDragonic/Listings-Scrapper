import express from 'express';
import cors from 'express';
import { processData } from './controllers/controller';

const app = express();

app.use(express.json());

app.use(cors());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/process-data', processData);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));