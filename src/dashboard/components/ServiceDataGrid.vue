<script>
    export default {
        name: "service-data-grid",
        props: {
            route: {},
            params: {}
        },
        data() {
            return {
                data: [],
                current: 1,
                total: 1
            }
        },
        computed: {

        },
        methods: {
            getData() {

            },
            handleChange() {
                this.$emit('change')
            }
        }
    }
</script>
