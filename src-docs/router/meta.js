import {createMeta} from './helpers';

export default {
    home: createMeta('/', 'home', 'Home', 'home'),
    buttons: createMeta('/buttons', 'buttons', 'Buttons', 'checkbox-multiple-blank'),
    formFields: createMeta('/form-fields', 'form-fields', 'Form fields', 'clipboard-text'),
    contextPopup: createMeta('/context-popup', 'context-popup', 'Context popover', 'tooltip-text'),
    collapse: createMeta('/collapse', 'collapse', 'Collapse', 'arrow-collapse-vertical'),
    notifications: createMeta('/notifications', 'notifications', 'Notifications', 'bell'),
    icons: createMeta('/icons', 'icons', '@mdi/font', 'material-design')
};
