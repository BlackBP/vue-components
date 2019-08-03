<script>
    const SIZE = {
        xl: 'xl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
        auto: 'auto',
    };

    export default {
        name: "c-grid-col",
        functional: true,
        props: {
            xl: {
                type: String,
                default: ''
            },
            lg: {
                type: String,
                default: ''
            },
            md: {
                type: String,
                default: ''
            },
            sm: {
                type: String,
                default: ''
            },
            xs: {
                type: String,
                default: ''
            },
            auto: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-grid-col';
            let sizes = {
                [SIZE.xl]: props[SIZE.xl],
                [SIZE.lg]: props[SIZE.lg],
                [SIZE.md]: props[SIZE.md],
                [SIZE.sm]: props[SIZE.sm],
                [SIZE.xs]: props[SIZE.xs],
                [SIZE.auto]: props[SIZE.auto]
            };

            sizes = _.reduce(sizes, (total, value, key) => {

                if (typeof value === 'string' && value !== '') {
                    total.push(`--${key}-${value}`);
                } else if(typeof value === 'boolean' && value) {
                    total.push(`--${key}`)
                }

                return total
            }, []);

            data.class = [data.class, baseClass, sizes];

            return createElement('div', data, children)
        }
    }
</script>
