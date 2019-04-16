import Home from '../views/Home';
import Orders from '../views/Orders';
import Logs from '../views/Logs';
import Products from '../views/product/List';
import ProductEditor from '../views/product/Editor';

// == Мета-данные маршрутов
export const META = {
    home: createMeta('/', 'home', 'Главная', 'home'),
    orders: createMeta('/orders', 'orders-list', 'Заказы', 'clipboard-check'),
    products: createMeta('/products', 'products-list', 'Товары', 'cart'),
    productAdd: createMeta('/products/add', 'product-add', 'Новый товар'),
    productEdit: createMeta('/products/edit/:id', 'product-edit', 'Редактирование товара'),
    modifiers: createMeta('/modifiers', 'modifiers-list', 'Модификаторы', 'file-tree'),
    modifierAdd: createMeta('/modifiers/add', 'modifiers-add', 'Новый модификатор'),
    modifierEdit: createMeta('/modifiers/edit', 'modifiers-edit', 'Редактирование модификатора'),
    props: createMeta('/props', 'props-list', 'Характеристики товара', 'shape-plus'),
    reports: createMeta('/reports', 'reports-list', 'Отчёты', 'chart-bar'),
    logs: createMeta('/logs', 'system-logs', 'Журналы', 'library-books')
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
    createRoute(META.orders, Orders),
    createRoute(META.products, Products),
    createRoute(META.productAdd, ProductEditor, {
        props: {
            isEdit: false
        }
    }),
    createRoute(META.productEdit, ProductEditor, {
        props: {
            isEdit: true
        }
    }),
    createRoute(META.logs, Logs)
]
