<script>
    import {CIcon} from '../icon';
    import btnMixin from '../../mixins/button';

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
    function createIcon(createElement, name = '', className = '') {
        return name ? createElement(CIcon, {
            class: className,
            props: {
                name
            }
        }) : null
    }

    /**
     *
     * @param className
     * @param props
     * @return {*[]}
     */
    function getClassNames(className, props = {}) {
        const {
            color: propColor,
            block: propBlock,
            bordered: propBordered,
            transparent: propTransparent,
            elevated: propElevated,
        } = props;

        const modElevated = '--elevated',
            modTransparent = '--transparent',
            modBordered = '--bordered',
            modBlock = '--block',
            modColor = `--${propColor}`;

        const classNames = [
            className,
            {
                [modColor]: !!propColor,
                [modBlock]: propBlock
            }
        ];

        // TODO: Найти более лучший способ добавления ОДНОГО из данных классов
        if (propBordered) {
            classNames.push(modBordered);
            return classNames;
        }

        if (propTransparent) {
            classNames.push(modTransparent);
            return classNames;
        }

        if (propElevated) {
            classNames.push(modElevated);
            return classNames;
        }

        return classNames;
    }

    /**
     *
     * @param data
     * @param props
     * @param listeners
     * @return {{}}
     */
    function getData(data = {}, props = {}, listeners = {}) {
        const {
            type: propType,
            disabled: propDisabled,
        } = props;

        const {
            attrs: dataAttrs,
        } = data;

        const {
            click: listenerClick = () => {
            }
        } = listeners;

        data.attrs = {
            ...dataAttrs,
            disabled: propDisabled,
            type: propType
        };

        data.on = {
            click(event) {
                if (propDisabled) return;
                listenerClick(event);
            }
        };

        return data;
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

            // CSS class bindings
            data.class = [data.class, getClassNames(ClassName, props)];

            // Render
            return createElement(propTag, getData(data, props, listeners), [
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
