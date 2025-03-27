import axios from 'axios';
import { JSDOM } from 'jsdom';
import { error } from 'console';
import { getUserAgent } from './userAgent';

type ProcessedData = 
{
    title: string;
    rating: string;
    reviews: string;
    image: string;
};

export async function processItemListing(input: string): Promise<ProcessedData[] | null>
{
    try 
    {
        const randomUserAgent = await getUserAgent();
        const searchTerm = input.toLowerCase().replace(' ', '+');
        const { data } = await axios.get(`https://www.amazon.com/s?k=${searchTerm}`, {
            headers: {
                'User-Agent': randomUserAgent,
                'Accept-Language': 'en-gb, en',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Referer': 'https://www.google.com/'
            }
        });
        
        const dom = new JSDOM(data);

        const itemListingContainer = dom.window.document.querySelector('span[data-component-type="s-search-results"] div');
        if (!itemListingContainer)
            throw error("Couldn't find item container.");

        const itemListing = itemListingContainer.querySelectorAll('div[role="listitem"]');
        if (!itemListing)
            throw error("Couldn't find item listings.");

        return Array.from(itemListing).map(div => 
        {
            const title = div.querySelector('h2')?.textContent ?? '';
            const rating = div.querySelector('div[data-cy="reviews-block"] span')?.textContent ?? '';
            const reviews = div.querySelector('div[data-cy="reviews-block"] span[data-component-type="s-client-side-analytics"]')?.textContent ?? '';
            const image = div.querySelector('img.s-image')?.getAttribute('src') ?? '';

            return { title, rating, reviews, image };
        }).filter(
            // Some entries return as empty. Probably an anti-scrapping measure, but not sure. 
            product => product.title !== '' && product.image !== ''
        );
    } 
    catch (error) 
    {
        console.error('Error scraping data:', error);
    }

    return null;
};