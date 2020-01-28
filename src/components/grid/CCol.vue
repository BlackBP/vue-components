<script>
    import _ from 'lodash'

    const SIZE = {
        xl: 'xl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
        auto: 'auto',
    };

    export default {
        name: "c-col",
        functional: true,
        props: {
            xl: {
                type: [Number, String],
                default: ''
            },
            lg: {
                type: [Number, String],
                default: ''
            },
            md: {
                type: [Number, String],
                default: ''
            },
            sm: {
                type: [Number, String],
                default: ''
            },
            xs: {
                type: [Number, String],
                default: ''
            },
            auto: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-col';
            let sizes = {
                [SIZE.xl]: props[SIZE.xl],
                [SIZE.lg]: props[SIZE.lg],
                [SIZE.md]: props[SIZE.md],
                [SIZE.sm]: props[SIZE.sm],
                [SIZE.xs]: props[SIZE.xs],
                [SIZE.auto]: props[SIZE.auto]
            };

            sizes = _.reduce(sizes, (total, value, key) => {

                if ((_.isString(value) && value !== '') || (_.isNumber(value) && value > 0)) {
                    total.push(`is-${key}-${value}`);
                }

                if(_.isBoolean(value) && value) {
                    total.push(`is-${key}`)
                }

                return total
            }, []);

            data.class = [data.class, baseClass, sizes];

            return createElement('div', data, children)
        }
    }
</script>
