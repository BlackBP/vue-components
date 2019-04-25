import Home from '../views/Home';
import TasksList from '../views/Tasks';

// == Мета-данные маршрутов
export const META = {
    home: createMeta('/', 'home', 'Главная', 'home'),
    tasks: createMeta('/tasks', 'tasks', 'Заявки', 'format-list-checkbox'),
};

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

/**
 *
 * @param metaData
 * @param component
 * @param rest
 * @return {{path: *, component: *, meta: *}|{path: *, component: *, meta: *, name: *}}
 */
function createRoute(metaData, component, rest = {}) {
    let {path, name, ...meta} = metaData;
    let hasName = !!name;

    if (hasName) {
        return {
            path,
            name,
            component,
            meta: {
                ...meta
            },
            ...rest
        }
    }

    return {
        path,
        component,
        meta: {
            ...meta
        },
        ...rest
    }
}

export default [
    createRoute(META.home, Home),
    createRoute(META.tasks, TasksList)
]
