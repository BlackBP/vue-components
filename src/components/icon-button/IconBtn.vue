<script>
    import {CIcon} from '../icon';
    import btnMixin from '../../mixins/button';

    const ClassName = 'c-icon-btn';
    const IconClassName = `${ClassName}__icon`;

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
     * @param classNames
     * @param props
     * @return {*[]}
     */
    function getClassNames(classNames, props = {}) {
        const {
            color: propColor,
            dense: propDense,
            transparent: propTransparent,
            elevated: propElevated
        } = props;

        const modColor = propColor ? `--${propColor}` : '',
            modTransparent = '--transparent',
            modElevated = '--elevated',
            modDense = '--dense';

        classNames = [
            classNames,
            ClassName,
            modColor,
            {
                [modDense]: propDense
            }
        ];

        // TODO: Найти более лучший способ добавления ОДНОГО из данных классов
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
            icon: {
                type: String,
                default: 'dots-horizontal',
                required: true
            }
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
