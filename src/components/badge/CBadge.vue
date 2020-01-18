<script>
    import _ from 'lodash';
    import {CIcon} from '../icon';

    export default {
        name: "c-badge",
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            },
            value: {
                type: [Number, String],
                default: ''
            },
        },
        render(createElement, {data, props, slots}) {
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