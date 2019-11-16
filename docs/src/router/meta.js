import {createMeta} from './helpers';

export default {
    home: createMeta('/', 'home', 'Главная', 'home'),
    buttons: createMeta('/buttons', 'buttons', 'Кнопки', 'checkbox-multiple-blank'),
    notifications: createMeta('/notifications', 'notifications', 'Уведомления', 'bell'),
    contextPopup: createMeta('/context-popup', 'context-popup', 'Контекстное меню', 'tooltip-text'),
    formFields: createMeta('/form-fields', 'form-fields', 'Поля форм', 'clipboard-text'),
    icons: createMeta('/icons', 'icons', '@mdi/font', 'material-design')
};
