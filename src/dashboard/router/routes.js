import {createRoute} from './helpers';
import Meta from './meta';

// Views
import Home from '../views/Home';
import Components from "../views/Components";

const routes = [
    createRoute(Meta.home, Home),
    createRoute(Meta.components, Components),
];

export default routes
