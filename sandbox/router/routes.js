import {createRoute} from './helpers';
import Meta from './meta';

// Views
import Home from '../views/Home';
import Buttons from "../views/components/Buttons";
import Notifications from "../views/components/Notifications";
import ContextPopup from "../views/components/ContextPopup";
import FormFields from "../views/components/FormFields";

const routes = [
    createRoute(Meta.home, Home),
    createRoute(Meta.buttons, Buttons),
    createRoute(Meta.notifications, Notifications),
    createRoute(Meta.contextPopup, ContextPopup),
    createRoute(Meta.formFields, FormFields)
];

export default routes
