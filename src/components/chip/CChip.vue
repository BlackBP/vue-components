<script>
    import {CIcon} from '../icon';

    /**
     *
     * @param createElement
     * @param iconName
     * @param className
     * @return {VNode|null}
     */
    function createIcon(createElement, iconName = '', className = '') {
        return iconName !== '' ? createElement(CIcon, {
            class: className,
            props: {
                name: iconName
            }
        }) : null
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
                default: ''
            },
            trailing: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            },
        },
        render(createElemet, {data, children, props}) {
            const ClassName = 'c-chip';
            const LeadingClassName = `${ClassName}__leading`;
            const TrailingClassName = `${ClassName}__trailing`;
            const TextClassName = `${ClassName}__text`;
            const {
                color: propColor = '',
                leading: propLeading = '',
                trailing: propTrailing = '',
                tag: propTag = 'div',
            } = props;

            const tagName = propTag !== '' ? propTag : 'div';

            data.class = [data.class, ClassName, {
                [`is-${propColor}`]: propColor !== ''
            }];

            return createElemet(tagName, data, [
                createIcon(createElemet, propLeading, LeadingClassName),
                createElemet('div', {
                    class: TextClassName
                }, children),
                createIcon(createElemet, propTrailing, TrailingClassName),
            ]);
        }
    }
</script>
