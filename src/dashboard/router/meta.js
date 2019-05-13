/**
 *
 * @param {string} path
 * @param {string|null} name
 * @param {string} title
 * @param {string} [icon]
 * @return {{path: string, name: string, icon: string, title: string}}
 */
function createMeta(path, name, title, icon = '') {
    return {
        path,
        name,
        title,
        icon
    }
}

export default {
    home: createMeta('/', 'home', 'Главная', 'home'),
};
