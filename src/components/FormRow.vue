<script>
    export default {
        name: "c-form-row",
        functional: true,
        render(createElement, {data, children}) {
            let baseClass = 'c-form-row';

            data.class = [data.class, baseClass];

            return createElement('div', data, children)
        }
    }
</script>
