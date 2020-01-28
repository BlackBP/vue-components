<script>
    import _ from 'lodash'
    import {createIcon} from '../icon/helper'
    import {getButtonColor, getButtonSize} from '../../utils/button'
    import mixinsButton from '../../mixins/button'

    const ClassName = 'c-btn';
    const IconClassName = `${ClassName}__icon`;
    const TextClassName = `${ClassName}__text`;

    export default {
        name: "c-btn",
        functional: true,
        mixins: [mixinsButton],
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
        render(createElement, {data, props, children, listeners = {}}) {
            const {
                tag: propTag,
                leading: propLeading,
                trailing: propTrailing,
                type: propType,
                disabled: propDisabled,
                color: propColor,
                size: propSize,
                block: propBlock,
                bordered: propBordered,
                transparent: propTransparent,
                elevated: propElevated,
            } = props;

            data = _.defaultsDeep({
                attrs: {
                    disabled: propDisabled,
                    type: propType
                },
                on: {
                    click: (event) => {
                        if (propDisabled) return;
                        if(listeners) {
                            if (_.isFunction(listeners.click)) {
                                listeners.click(event)
                            }
                        }
                    }
                },
                class: [
                    data.class,
                    ClassName,
                    getButtonColor(propColor),
                    getButtonSize(propSize),
                    {
                        ['is-disabled']: propDisabled,
                        ['is-block']: propBlock,
                        ['is-bordered']: propBordered,
                        ['is-transparent']: propTransparent,
                        ['is-elevated']: propElevated
                    }
                ]
            }, data);

            // Render
            return createElement(propTag, data, [
                // Leading icon
                createIcon(createElement, IconClassName, {
                    name: propLeading
                }),

                // Slot - default
                createElement('span', {
                    class: TextClassName
                }, children),

                // Trailing icon
                createIcon(createElement, IconClassName, {
                    name: propTrailing
                })
            ])
        }
    }
</script>