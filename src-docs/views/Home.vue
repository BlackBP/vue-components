<template>
    <layout-screen-card header="Components grid"
                        icon="view-dashboard">
        <clock/>
    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "./layouts/ScreenCard.vue";
    import Clock from "../components/Clock";

    export default {
        name: "ScreenHome",
        components: {
            Clock,
            LayoutScreenCard
        },
        computed: {
        }
    }
</script>