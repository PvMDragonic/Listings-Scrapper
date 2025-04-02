import { Request, Response } from 'express';
import { processItemListing } from '../models/dataParser';

export async function processData(req: Request, res: Response)
{
    try 
    {
        const { regionDomain, searchTerm } = req.body;
        const result = await processItemListing(regionDomain, searchTerm);
        res.json(result);
    }
    catch (err: unknown) 
    {
        if (err instanceof Error) 
        {
            res.status(500).json({ message: err.message });
        } 
        else 
        {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
}