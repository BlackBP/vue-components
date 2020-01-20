<script lang="ts">
    import _ from 'lodash'
    import {CreateElement, RenderContext, VNode, VNodeData} from 'vue'
    import {createIcon} from '../icon/helper'
    import {IconBtnProps} from '../../../types/button'
    import {getButtonColor, getButtonSize} from '../../utils/button'

    const ClassName = 'c-icon-btn';
    const IconClassName = `${ClassName}__icon`;

    export default {
        name: "c-icon-btn",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'button'
            },
            type: {
                type: [String, Boolean],
                default: false
            },
            color: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            bordered: {
                type: Boolean,
                default: false
            },
            elevated: {
                type: Boolean,
                default: false
            },
            transparent: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: 'dots-horizontal',
                required: true
            }
        },
        render(createElement: CreateElement, {data = <VNodeData>{}, props = <IconBtnProps>{}}: RenderContext<IconBtnProps>): VNode {
            const {
                tag: propTag,
                icon: propIcon,
                type: propType,
                disabled: propDisabled,
                color: propColor,
                size: propSize,
                transparent: propTransparent,
                elevated: propElevated,
                bordered: propBordered
            } = props;

            const {
                attrs = {},
                on: listeners = {}
            } = data;

            data.attrs = {
                ...attrs,
                disabled: propDisabled,
                type: propType
            };

            data.class = [
                data.class,
                ClassName,
                getButtonSize(<string>propSize),
                getButtonColor(propColor),
                {
                    [`is-disabled`]: propDisabled,
                    [`is-transparent`]: propTransparent,
                    [`is-elevated`]: propElevated,
                    [`is-bordered`]: propBordered,
                }
            ];

            data.on = {
                ...listeners,
                click: (event: MouseEvent) => {
                    if (propDisabled) return;
                    if (_.isFunction(listeners.click)) {
                        listeners.click(event)
                    }
                }
            };

            // Render
            return createElement(propTag, data, [
                createIcon(createElement, IconClassName, {
                    name: <string>propIcon
                })
            ])
        }
    }
</script>
