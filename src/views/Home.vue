<template>
    <c-card title="Админ-панель"
            class="c-elevate-3"
            :show-header="true"
            :loading="loading">
        <c-pagination v-model="current"
                      :last="last"
                      @change="goToPage"/>
    </c-card>
</template>

<script>
    import CBtn from "../components/Button";
    import CCard from "../components/Card";
    import CBtnGroup from "../components/ButtonGroup";
    import CPagination from "../components/Pagination";

    export default {
        name: "view-home",
        components: {
            CPagination,
            CBtnGroup,
            CCard,
            CBtn
        },
        data() {
            return {
                loading: true,
                current: 1,
                last: 10
            }
        },
        computed: {},
        methods: {
            goToPage(page) {
                this.current = page
            }
        },
        mounted() {
            setTimeout(() => {
                this.loading = false;
            }, 1000)
        }
    }
</script>
