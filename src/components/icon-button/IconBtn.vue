<script>
    import {CIcon} from '../icon';
    import btnMixin from '../../mixins/button';
    import {createProp} from "../../utils/component";

    const ClassName = 'c-icon-btn';
    const IconClassName = `${ClassName}__icon`;

    /**
     *
     * @param createElement
     * @param name
     * @param className
     * @return {{}|null}
     */
    function createIcon(createElement, name = '', className) {
        return name ? createElement(CIcon, {
            class: className,
            props: {
                name
            }
        }) : null
    }

    /**
     * // TODO: Упростить. Дублируется в Btn.vue
     * @param className
     * @param props
     * @return {*[]}
     */
    function getClassNames(className, props = {}) {
        const {
            color: propColor,
            size: propSize,
            dense: propDense,
            transparent: propTransparent,
            elevated: propElevated,
            bordered: propBordered
        } = props;

        const modColor = propColor ? `${className}--${propColor}` : '',
            modSize = propSize ? `${className}--${propSize}` : '',
            modTransparent = `${className}--transparent`,
            modElevated = `${className}--elevated`,
            modDense = `${className}--dense`,
            modBordered = `${className}--bordered`;

        const classNames = [
            className,
            modColor,
            modSize,
            {
                [modDense]: propDense
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

    export default {
        name: "c-icon-btn",
        functional: true,
        mixins: [btnMixin],
        props: {
            icon: createProp(String, 'dots-horizontal', true)
        },
        render(createElement, {data = {}, props = {}, listeners = {}}) {
            const {
                tag: propTag,
                icon: propIcon,
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

            // Data bindings
            data.attrs = {
                ...attrs,
                disabled: propDisabled,
                type: propType
            };

            data.class = [data.class, getClassNames(ClassName, props)];

            data.on = {
                ...restListeners,
                click: (event) => {
                    if (propDisabled) return;
                    listenerClick(event);
                }
            };

            // Render
            return createElement(propTag, data, [
                createIcon(createElement, propIcon, IconClassName)
            ])
        }
    }
</script>
