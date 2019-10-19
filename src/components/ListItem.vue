<script>
    export default {
        name: "c-list-item",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
        },
        render(createElement, {data, slots, props}) {
            let baseClass = 'c-list-item';
            let children = [];
            let $slots = slots();

            //
            if($slots.leading) {
                children.push(createElement('div', {
                    class: {
                        [`${baseClass}__start`]: true
                    }
                }, $slots.start))
            }

            //
            children.push(createElement('div', {
                class: {
                    [`${baseClass}__body`]: true
                }
            }, $slots.default));

            //
            if($slots.trailing) {
                children.push(createElement('div', {
                    class: {
                        [`${baseClass}__end`]: true
                    }
                }, $slots.end))
            }

            data.class = [data.class, baseClass];

            return createElement(props.tag, data, children)
        }
    }
</script>
