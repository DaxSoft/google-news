const { GoogleNews } = require('@vorlefan/google-news')

const news = new GoogleNews(['One Piece', 'Kingkiller Chronicles'], {
    routeName: 'download',
    language: 'en-US',
    localization: 'US',
    route: (route) => {
        route.set('src', __dirname)
        route.inject('download', 'src')
        console.log(route.get('root').filepath)
    },
})

void (async function () {
    await news.run()
})()
