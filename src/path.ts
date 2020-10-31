import { PathRoute } from '@vorlefan/path';

/*
:--------------------------------------------------------------------------
: Custom Path
:--------------------------------------------------------------------------
*/

const Route = new PathRoute();
Route.set('main', __dirname);
Route.structuredJoin('main');
Route.set('root', Route.back('main', 4));
Route.structuredJoin('root');

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export { Route };
