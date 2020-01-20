<script lang="ts">
    import _ from 'lodash'
    import {CreateElement, PropOptions, RenderContext, VNode, VNodeData} from 'vue'
    import {CIcon} from '../icon'

    type BadgeProps = {
        icon: string
        color: string
        value: string|number
    }

    export default {
        name: "c-badge",
        functional: true,
        props: {
            icon: <PropOptions>{
                type: String,
                default: ''
            },
            color: <PropOptions>{
                type: String,
                default: ''
            },
            value: <PropOptions>{
                type: [Number, String],
                default: ''
            },
        },
        render(createElement: CreateElement, {data = <VNodeData>{}, props = <BadgeProps>{}, slots}: RenderContext<BadgeProps>): VNode {
            const ClassName = 'c-badge';
            const SlotClassName = `${ClassName}__slot`;
            const BadgeClassName = `${ClassName}__badge`;
            const {
                icon: propIcon = '',
                color: propColor = '',
                value: propValue = '',
            } = props;
            const $slots = slots();
            const value = !_.isNumber(propValue) && !_.isString(propValue) ? '' : _.toString(propValue);

            const hasIcon = propIcon !== '';
            const hasColor = propColor !== '';
            const hasValue = value !== '';
            const children = [
                createElement('div', {class: SlotClassName}, [
                    $slots.default
                ]),
            ];

            // Добавляем основной класс
            data.class = [data.class, ClassName, {
                [`is-${propColor}`]: hasColor
            }];

            if (hasValue || hasIcon) {
                children.push(
                    createElement('div', {class: BadgeClassName}, [
                        hasIcon ? createElement(CIcon, {
                            props: {
                                name: propIcon
                            }
                        }) : value
                    ])
                )
            }

            return createElement('div', data, children)
        }
    }
</script>