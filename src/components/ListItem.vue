<script>
    export default {
        name: "c-list-item",
        functional: true,
        render(createElement, context) {
            let baseClass = 'c-list-item';
            let $slots = context.slots();
            let data = {
                class: {
                    [`${baseClass}`]: true
                }
            };
            let children = [];

            //
            if($slots.start) {
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
            if($slots.end) {
                children.push(createElement('div', {
                    class: {
                        [`${baseClass}__end`]: true
                    }
                }, $slots.end))
            }

            data = _.defaultsDeep(data, context.data);

            return createElement('div', data, children)
        }
    }
</script>
