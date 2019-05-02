<script>
    export default {
        name: "c-list-item",
        functional: true,
        render(createElement, {data, slots}) {
            let baseClass = 'c-list-item';
            let children = [];
            let $slots = slots();

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

            data.class = [data.class, baseClass];

            return createElement('div', data, children)
        }
    }
</script>
