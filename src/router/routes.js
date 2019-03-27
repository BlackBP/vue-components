// Screens
import Buttons from '../views/Buttons.vue';
import FormControls from '../views/FormControls.vue';
import Modals from '../views/Modal.vue';

export const routes = [
    {
        path: '/buttons',
        routeName: 'buttons',
        name: 'Buttons',
        component: Buttons
    },
    {
        path: '/form-controls',
        routeName: 'form-controls',
        name: 'Form controls',
        component: FormControls
    },
    {
        path: '/modals',
        routeName: 'modals',
        name: 'Modals',
        component: Modals
    }
];

export default _.map(routes, route => {
    return {
        path: route.path,
        name: route.routeName,
        component: route.component
    }
})
