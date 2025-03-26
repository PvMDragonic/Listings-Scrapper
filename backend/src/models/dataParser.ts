import axios from 'axios';
import { JSDOM } from 'jsdom';
import { error } from 'console';

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
        const searchTerm = input.toLowerCase().replace(' ', '+');
        const { data } = await axios.get(`https://www.amazon.com/s?k=${searchTerm}`);
        
        const dom = new JSDOM(data);

        const itemListingContainer = dom.window.document.querySelector('span[data-component-type="s-search-results"] div');
        if (!itemListingContainer)
            throw error("Couldn't find item container.");

        const itemListing = itemListingContainer.querySelectorAll('div[role="listitem"]');
        if (!itemListing)
            throw error("Couldn't find item listings.");

        return Array.from(itemListing).map(div => 
        {
            const title = div.querySelector("div > div[data-cy='title-recipe'] > a > h2")?.textContent ?? '';
            const rating = div.querySelector("span.a-icon-alt")?.textContent ?? '';
            const reviews = div.querySelector("span.a-size-base.s-underline-text")?.textContent ?? '';
            const image = div.querySelector('img.s-image')?.getAttribute('src') ?? '';
        
            return { title, rating, reviews, image };
        });
    } 
    catch (error) 
    {
        console.error('Error scraping data:', error);
    }

    return null;
};