<script>
    import {CIcon} from '../icon';
    import btnMixin, {
        getColorClassName,
        getSizeClassName,
        MODIFIERS_MAP
    } from '../../mixins/button';
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
    const createIcon = (createElement, name = '', className) => {
        return name ? createElement(CIcon, {
            class: className,
            props: {
                name
            }
        }) : null
    };

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
            transparent: propTransparent,
            elevated: propElevated,
            bordered: propBordered
        } = props;


        const classNames = [
            className,
            getColorClassName(className, propColor),
            getSizeClassName(propSize)
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
