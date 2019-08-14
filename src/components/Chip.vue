<script>
    import {isEmptyString} from '../utils'
    import CIcon from "./Icon.vue"

    /**
     *
     * @param createElement
     * @param iconName
     * @param className
     * @return {*}
     */
    function createIcon(createElement, iconName, className) {
        return createElement(CIcon, {
            class: className,
            props: {
                name: iconName
            }
        })
    }

    export default {
        name: "c-chip",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            leading: {
                type: String,
                default: '',
            },
            trailing: {
                type: String,
                default: '',
            },
            color: {
                type: String,
                default: '',
            }
        },
        render(createElement, {data, children, props}) {
            let baseClass = 'c-chip',
                leadingIconClassName = `${baseClass}__leading`,
                trailingIconClassName = `${baseClass}__trailing`,
                hasColor = !isEmptyString(props.color),
                hasLeading = !isEmptyString(props.leading),
                hasTrailing = !isEmptyString(props.trailing),
                tagName = isEmptyString(props.tag) ? 'div' : props.tag,
                className = [
                    baseClass,
                    {
                        [`${baseClass}--${props.color}`]: hasColor
                    }
                ];

            let elText = createElement('div', {
                class: `${baseClass}__text`
            }, children);

            let content = [elText];

            data.class = [data.class, className];

            if (hasLeading || hasTrailing) {
                if (hasLeading) {
                    content = [
                        createIcon(createElement, props.leading, leadingIconClassName),
                        elText
                    ];
                }

                if (hasTrailing) {
                    content = [
                        elText,
                        createIcon(createElement, props.trailing, trailingIconClassName),
                    ];
                }

                if (hasLeading && hasTrailing) {
                    content = [
                        createIcon(createElement, props.leading, leadingIconClassName),
                        elText,
                        createIcon(createElement, props.trailing, trailingIconClassName),
                    ];
                }
            }

            return createElement(tagName, data, content);
        }
    }
</script>
