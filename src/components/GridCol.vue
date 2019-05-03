<script>
    const SIZE = {
        xl: 'xl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
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
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-grid-col';
            let sizes = {
                [SIZE.xl]: props[SIZE.xl],
                [SIZE.lg]: props[SIZE.lg],
                [SIZE.md]: props[SIZE.md],
                [SIZE.sm]: props[SIZE.sm],
                [SIZE.xs]: props[SIZE.xs],
            };

            sizes = _.reduce(sizes, (total, value, key) => {

                if (value !== '') {
                    total.push(`${baseClass}-${key}${value}`);
                }

                return total
            }, []);

            data.class = [data.class, baseClass, sizes];

            return createElement('div', data, children)
        }
    }
</script>
