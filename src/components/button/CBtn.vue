<script>
    import btnMixin, {
        MODIFIERS_MAP,
        getColorClassName,
        getSizeClassName
    } from '../../mixins/button';
    import {CIcon} from '../icon';

    const ClassName = 'c-btn';
    const IconClassName = `${ClassName}__icon`;
    const TextClassName = `${ClassName}__text`;

    /**
     *
     * @param createElement
     * @param name
     * @param className
     * @return {{}|null}
     */
    const createIcon = (createElement, name = '', className = '') => {
        return name ? createElement(CIcon, {
            class: className,
            props: {
                name
            }
        }) : null
    };

    /**
     *
     * @param className
     * @param props
     * @return {*[]}
     */
    function getClassNames(className, props = {}) {
        const {
            color: propColor,
            size: propSize,
            block: propBlock,
            bordered: propBordered,
            transparent: propTransparent,
            elevated: propElevated,
        } = props;

        const classNames = [
            className,
            getSizeClassName(propSize),
            getColorClassName(propColor),
            {
                [MODIFIERS_MAP.block]: propBlock
            }
        ];

        // TODO: Найти более лучший способ добавления ОДНОГО из данных классов
        if (propBordered) {
            classNames.push(MODIFIERS_MAP.bordered);
        } else if (propTransparent) {
            classNames.push(MODIFIERS_MAP.transparent);
        } else if (propElevated) {
            classNames.push(MODIFIERS_MAP.elevated);
        }

        return classNames;
    }

    export default {
        name: "c-btn",
        functional: true,
        mixins: [btnMixin],
        props: {
            leading: {
                type: String,
                default: ''
            },
            trailing: {
                type: String,
                default: ''
            },
            block: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data = {}, props = {}, children = [], listeners = {}}) {
            const {
                tag: propTag,
                leading: propLeading,
                trailing: propTrailing,
            } = props;

            const {
                type: propType,
                disabled: propDisabled,
            } = props;

            const {
                attrs = {},
            } = data;

            const {
                click: listenerClick = () => {
                },
                ...restListeners
            } = listeners;

            data.attrs = {
                ...attrs,
                disabled: propDisabled,
                type: propType
            };

            data.on = {
                ...restListeners,
                click: (event) => {
                    if (propDisabled) return;
                    listenerClick(event);
                }
            };

            data.class = [data.class, getClassNames(ClassName, props)];

            // Render
            return createElement(propTag, data, [
                // Leading icon
                createIcon(createElement, propLeading, IconClassName),

                // Slot - default
                createElement('span', {
                    class: TextClassName
                }, children),

                // Trailing icon
                createIcon(createElement, propTrailing, IconClassName)
            ])
        }
    }
</script>
