<script>
    import {CIcon} from '../icon';

    /**
     *
     * @param h
     * @param iconName
     * @param className
     * @return {*}
     */
    function createIcon(h, iconName, className) {
        return h(CIcon, {
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
        render(h, {data, children, props}) {
            const baseClassName = 'c-chip';
            const ClassName = {
                leading: `${baseClassName}__leading`,
                trailing: `${baseClassName}__trailing`,
                text: `${baseClassName}__text`
            };
            
            const {
                color: propColor = '',
                leading: propLeading = '',
                trailing: propTrailing = '',
                tag: propTag = 'div',
            } = props;

            const hasColor = propColor !== '';
            const hasLeading = propLeading !== '';
            const hasTrailing = propTrailing !== '';
            const tagName = propTag !== '' ? propTag : 'div';

            let elText = h('div', {
                class: ClassName.text
            }, children);

            let content = [elText];

            data.class = [data.class, baseClassName, {
                [`${baseClassName}--${propColor}`]: hasColor
            }];

            if (hasLeading || hasTrailing) {
                if (hasLeading) {
                    content = [
                        createIcon(h, propLeading, ClassName.leading),
                        elText
                    ];
                }

                if (hasTrailing) {
                    content = [
                        elText,
                        createIcon(h, propTrailing, ClassName.trailing),
                    ];
                }

                if (hasLeading && hasTrailing) {
                    content = [
                        createIcon(h, propLeading, ClassName.leading),
                        elText,
                        createIcon(h, propTrailing, ClassName.trailing),
                    ];
                }
            }

            return h(tagName, data, content);
        }
    }
</script>
