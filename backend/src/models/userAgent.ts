import { useragentsme } from 'useragents-me-api';

// Used as a backup if 'useragentsme' goes down; will get outdated someday.
const USER_AGENTS = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.1958',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3'
]

function getRandomEntry<T>(list: T[]): T 
{
    return list[Math.floor(Math.random() * list.length)];
}

export async function getUserAgent()
{
    let randomUserAgent;

    try 
    {
        const userAgents = await useragentsme();
        
        if (Array.isArray(userAgents))
            randomUserAgent = getRandomEntry(userAgents)['ua'];
        else
            throw new Error("Invalid response from 'useragentsme'.");
        
    } 
    catch (error) // Will fail if the 'useragentsme' goes down.
    {
        console.error("'useragentsme' failed, using fallback:", error);
        randomUserAgent = getRandomEntry(USER_AGENTS);
    }

    return randomUserAgent;
}