<script>
    import {
        isNumber,
        isString,
        toString
    } from '../../utils/helpers';
    import {CIcon} from '../icon';
    import {createProp} from "../../utils/component";

    export default {
        name: "c-badge",
        functional: true,
        props: {
            icon: createProp(String, ''),
            color: createProp(String, ''),
            value: createProp([Number, String], ''),
        },
        render(h, {data, props, slots}) {
            const baseClassName = 'c-badge';
            const ClassName = {
                slot: `${baseClassName}__slot`,
                badge: `${baseClassName}__badge`
            };
            const {
                icon: propIcon = '',
                color: propColor = '',
                value: propValue = '',
            } = props;
            const $slots = slots();
            const value = !isNumber(propValue) && !isString(propValue) ? '' : toString(propValue);

            const hasIcon = propIcon !== '';
            const hasColor = propColor !== '';
            const hasValue = value !== '';
            const children = [
                h('div', {class: ClassName.slot}, [
                    $slots.default
                ]),
            ];

            // Добавляем основной класс
            data.class = [data.class, baseClassName, {
                [`${baseClassName}--${propColor}`]: hasColor
            }];

            if(hasValue || hasIcon) {
                let iconData = {
                    props: {
                        name: propIcon
                    }
                };

                children.push(
                    h('div', {class: ClassName.badge}, [
                        hasIcon ? h(CIcon, iconData) : value
                    ])
                )
            }

            return h('div', data, children)
        }
    }
</script>