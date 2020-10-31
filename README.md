# Google News

Easy peasy way to get the most recent news from Google Newspaper RSS

[![https://badgen.net/bundlephobia/minzip/@vorlefan/google-news](https://badgen.net/bundlephobia/minzip/@vorlefan/google-news)](https://bundlephobia.com/result?p=@vorlefan/google-news)

With [npm](https://npmjs.org) do:

```
npm install @vorlefan/google-news @vorlefan/path xml2json
```

With [yarn](https://yarnpkg.com/en/) do:

```
yarn add  @vorlefan/google-news @vorlefan/path xml2json
```

<hr>

## Documentation

I'm creating a simple website using Vercel to use as demo and documentation.
**W.I.P**

<hr>

## Highlight

-   Easy way to define where to save
-   Multiple Queries
-   Save results in both raw (xml) and json (parsed)

<hr>

## Bootstrap

Shortcut to the definitions and settings to execute the crawler.

### Structure

```ts
import { GoogleNews } from '@vorlefan/google-news';

const news = new GoogleNews(searchs, options);
```

**[searchs]**

The paramater **searchs** can be either a single string or a array of strings. In which, will be
the search for the news.

**[options]**

Checkout the types for this paramater in which needs to be an **{Object}**

```ts
saveXml?: boolean; // default is true
saveJson?: boolean; // default is true
timeout?: number | null; // default is null
route?: (route: PathRoute) => void; // if you want to setup the PathRoute, then define a function
routeName: string; // default is 'root'
language?: string; // language, default is en-US
localization?: string; // geo-localization, default is US
```

-   _saveXml_ : If you don't want to keep the xml saved, then set it false.
-   _saveJson_ : If you want to save the .json, then set it true.
-   _timeout_ : If you want to set a waiting time in between each crawler, then set it in **seconds**
-   _route_ : If you want to define the PathRoute as create a new folder, define a new route and so on.
-   _routeName_ : Where it be gonna saved, the files.
-   _language_ : Define the language of the searching. Example: **en-US** to english from United State or **pt-BR** for brazillian
-   _localization_ : Define where it gonna be localized the search. Example: **US** for United State or **BR** for Brazil.

### Return

The methods and variables that you can interact when calling the class **GoogleNews**, is:

```ts
import { GoogleNews } from '@vorlefan/google-news';

const news = new GoogleNews(searchs, options);

// Execute the crawler
await news.run()

// return an array of the result
news.news()
news._news;

// return an array of array containg the item of each news (the items are the result of the news itself, containg things like title, link and description)
// You can define the sort if you want to.
await news.items(orderBy?: 'asc' | 'desc');

// Route from @vorlefan/path
news._route

```

<hr>

## Example

```ts
import { GoogleNews } from '@vorlefan/google-news';

const news = new GoogleNews(['Kingkiller Chronicles'], {
    route: (route) => {
        route.inject('google-news', 'main');
    },
    routeName: 'google-news',
    language: 'en-US',
    localization: 'US',
});

// Run

void (async function () {
    await news.run();
    console.log(news.items('desc'));
})();
```

<hr>

## Contributing

Thank you for being interested on making this package better. I encourage everyone to help improving this project with some new features, bug fixes and performance issues. Then please, if you can, help us to enchance
this package.

<hr>
