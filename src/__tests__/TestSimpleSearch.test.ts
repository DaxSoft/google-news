import { GoogleNews } from '../index';

describe('Simple Search', () => {
    const news = new GoogleNews(['Kingkiller Chronicles'], {
        route: (route) => {
            route.inject('example', 'main/__tests__');
        },
        routeName: 'example',
        language: 'en-US',
        localization: 'US',
    });

    test('search', async () => {
        await news.run();
        expect(news.news().length === 1).toBe(true);
    });
});
