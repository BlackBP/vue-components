import Home from '../views/Home';
import Meta from './meta';

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
