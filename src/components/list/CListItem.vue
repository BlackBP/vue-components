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
                        [`${baseClass}__leading`]: true
                    }
                }, $slots.leading))
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
                        [`${baseClass}__trailing`]: true
                    }
                }, $slots.trailing))
            }

            data.class = [data.class, baseClass];

            return createElement(props.tag, data, children)
        }
    }
</script>
