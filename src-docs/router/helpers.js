/**
 *
 * @param metaData
 * @param component
 * @param rest
 * @return {{path: *, component: *, meta: *}|{path: *, component: *, meta: *, name: *}}
 */
export function createRoute(metaData, component, rest = {}) {
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

/**
 *
 * @param {string} path
 * @param {string|null} name
 * @param {string} title
 * @param {string} [icon]
 * @return {{path: string, name: string, icon: string, title: string}}
 */
export function createMeta(path, name, title, icon = '') {
    return {
        path,
        name,
        title,
        icon
    }
}