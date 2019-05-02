<script>
    export default {
        name: "c-card-section",
        functional: true,
        render(createElement, {data, children}) {
            let baseClass = 'c-card-sect';

            data.class = [data.class, baseClass];

            return createElement('div', data, children)
        }
    }
</script>
