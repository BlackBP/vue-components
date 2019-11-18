import {createRoute} from './helpers';
import Meta from './meta';

// Views
import Home from '../views/Home.vue';
import Icons from "../views/Icons.vue";

// Components view
import Buttons from "../views/components/Buttons.vue";
import Collapse from "../views/components/Collapse.vue";
import ContextPopup from "../views/components/ContextPopup.vue";
import Notifications from "../views/components/Notifications.vue";
import FormFields from "../views/components/FormFields.vue";

const routes = [
    createRoute(Meta.home, Home),
    createRoute(Meta.buttons, Buttons),
    createRoute(Meta.contextPopup, ContextPopup),
    createRoute(Meta.collapse, Collapse),
    createRoute(Meta.notifications, Notifications),
    createRoute(Meta.formFields, FormFields),
    createRoute(Meta.icons, Icons),
];

export default routes
