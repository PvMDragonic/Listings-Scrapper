<div align="center">
    <h1 align="center">Listings Srapper</h1>
    <p align="center">
        A fullstack application made using Vue 3, Axios and JSDOM in NodeJS to scrappe basic information from Amazon product listing results.
    </p>
    <img 
        style="border-radius: 1rem"
        src="https://github.com/user-attachments/assets/98161dcc-7b58-46a6-b401-ebbd00d7e3af"
        alt="Example"
    />
</div>

## Background
<div align="justify">
<p>This came to be from a job offering a measly $200 for a full-time 5-by-2 developer job where they had the balls to ask for a coding challenge at the end of the application process. The challenge was to submit a repo with installation instructions for an Amazon listings scrapper you made using JavaScript.</p>
<p>It was probably some smart-ass trying to get free work out of desperate developers, but I thought the idea was interesting to have it added to my portfolio, especially after finding out that Amazon is considered pretty hard to scrappe. It stroke my ego, so I took on the challenge to see what it was about (and also as an excuse to learn Vue, since this was something smaller in scale).</p>
</div>

## Results

<div align="justify">
This scrapper only pulls superfical data from the first page of any giving listings:
<br/>
<br/>
</div>

- Item image;
- Title;
- Rating; and
- Number of reviews.

### Findings
<div align="justify">
<p>It turns out that scrapping Amazon is pretty difficult, actually. Their page structure is very messy, leading to trouble finding the correct xpath, but this is only the tip of the iceberg.</p>
<p>I saw some comments on Stack Overflow that they had to do different scrappers for each product category because of layout changes, but this isn't the case (anymore, at least) in my experience. Firstly, some more detailed information like the actual reviews are locked behind a login, so that already blocks alot of scrapping, but in my testing, manually searching in an actual browser would yield more results than via scrapping. This suggests that they curate what people see in the sense that you'll recieve more or less results depending or how the fingerprinter scores you.</p>
<p>That said, one day I was getting all four data strings for each listings entry and out of nowhere, the next day, both title and ratings started returning as empty. I had to rework and tight-up how I was targetting the elements, and for a week, that seemed to do the trick. No idea for how long it'll last, though. This leads to another theory (that I didn't really look into but is plausible) that they have different page layouts on rotation or, even, that they feed different layouts to browsers depending on their location to throw off people using or referencing different scrappers. This would certainly explain people's different experience with scrapping Amazon.</p>
<p>But that's not all.</p>
<p>If you just try to scrappe willy-nilly, you'll soon get blocked by Amazon with a message saying to use their API. This isn't an IP ban (as you can still go into the website via your browser), but moreso from the fingerprints left by the scrapper. The solution is to use custom headers to try and mask yourself as a real person doing real browsing. That's when <a href="https://www.useragents.me">Useragents.me</a> comes in handy, as they list the most current and up-to-date user agents to fabricate custom request headings with. One could also use alternating proxies to <i>really</i> dodge fingerprinting, but from my experience, most of the free ones are already blocked and/or are umbearably slow, making them a pain to work with.</p>
<p>The scrapper stopped being blocked after a user agents randomizer was implemented (although I did try to not spam requests to minimize the odds of it happening) and results from different categories (pregnancy tests, because of the keyword "test"; manga; and computer parts) seemed consistent albeit low in amount, returning either half or even less than that compared to what would've been in an actual browser.</p>
<p>In the end, however, Amazon is an ever-evolving website, so eventually, either the xpaths will break or the user agents will end up being flagged by the fingerprinter. In my opinion, doing this for real is XP waste. It's an arms race not worth the hassle; just use their partner program API if you really need their data for any legitimate reason.</p>
</div>

# License
No license because this is more of a proof-of-concept and made for educational pourposes, so it shouldn't really be used. Also, screw those guys responsible for the job offering that started this all.
