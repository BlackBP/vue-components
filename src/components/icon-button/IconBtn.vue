<script>
    import {CIcon} from '../icon';
    import btnMixin from '../../mixins/button';
    import {createProp} from "../../utils/component";

    const BaseClassName = 'c-icon-btn';
    const IconClassName = `${BaseClassName}__icon`;

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
     * // TODO: Упростить. Дублируется в Btn.vue
     * @param classNames
     * @param props
     * @return {*[]}
     */
    function getClassNames(classNames, props = {}) {
        const {
            color: propColor,
            dense: propDense,
            transparent: propTransparent,
            elevated: propElevated,
            bordered: propBordered
        } = props;

        const modColor = propColor ? `${BaseClassName}--${propColor}` : '',
            modTransparent = `${BaseClassName}--transparent`,
            modElevated = `${BaseClassName}--elevated`,
            modDense = `${BaseClassName}--dense`,
            modBordered = `${BaseClassName}--bordered`;

        classNames = [
            classNames,
            BaseClassName,
            modColor,
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
                attrs: dataAttrs = {},
            } = data;

            const {
                click: listenerClick = () => {
                }
            } = listeners;

            // Data bindings
            data.attrs = {
                ...dataAttrs,
                disabled: propDisabled,
                type: propType
            };

            data.class = getClassNames(data.class, props);

            data.on = {
                click(event) {
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
