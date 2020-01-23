import _ from 'lodash'
import Vue, {CreateElement, RenderContext, VNode, VNodeData} from 'vue'
import {createIcon} from '../icon/helper'
import {ButtonProps} from '../../../types/button'
import {getButtonColor, getButtonSize} from '../../utils/button'

const ClassName = 'c-btn';
const IconClassName = `${ClassName}__icon`;
const TextClassName = `${ClassName}__text`;

export const CBtn = Vue.extend<ButtonProps>({
    name: "c-btn",
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
    render(createElement: CreateElement, {data = <VNodeData>{}, props = <ButtonProps>{}, children}: RenderContext<ButtonProps>): VNode {
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

        const {
            attrs = {},
            on: listeners = {}
        } = data;

        data.attrs = {
            ...attrs,
            disabled: propDisabled,
            type: propType
        };

        data.on = {
            ...listeners,
            click: (event: MouseEvent) => {
                if (propDisabled) return;
                if (_.isFunction(listeners.click)) {
                    listeners.click(event)
                }
            }
        };

        data.class = [
            data.class,
            ClassName,
            getButtonColor(propColor),
            getButtonSize(<string>propSize),
            {
                [`is-disabled`]: propDisabled,
                [`is-block`]: propBlock,
                [`is-bordered`]: propBordered,
                [`is-transparent`]: propTransparent,
                [`is-elevated`]: propElevated
            }
        ];

        // Render
        return createElement(propTag, data, [
            // Leading icon
            createIcon(createElement, IconClassName, {
                name: <string>propLeading
            }),

            // Slot - default
            createElement('span', {
                class: TextClassName
            }, children),

            // Trailing icon
            createIcon(createElement, IconClassName, {
                name: <string>propTrailing
            })
        ])
    }
})