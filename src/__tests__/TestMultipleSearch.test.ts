import { GoogleNews } from '../index';

describe('Multiple Search', () => {
    const news = new GoogleNews(['One Piece', 'The Legend of Dragoon ps1'], {
        route: (route) => {
            route.inject('example', 'main/__tests__');
        },
        routeName: 'example',
        language: 'en-US',
        localization: 'US',
    });

    test('multiple_search', async () => {
        await news.run();
        expect(news.news().length === 2).toBe(true);
    });
});
