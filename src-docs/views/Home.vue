<template>
    <layout-screen-card header="Components grid"
                        icon="view-dashboard">

        <c-btn id="button"
               @click="visible = !visible">
            Show popper
        </c-btn>

        <c-popper reference="#button"
                  style="width: auto;"
                  :visible="visible">
            Hello world!
        </c-popper>

        <c-checkbox v-model="visible">
            visible
        </c-checkbox>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "./layouts/ScreenCard.vue";
    import CPopper from "../components/test/popper";

    export default {
        name: "ScreenHome",
        components: {
            CPopper,
            LayoutScreenCard
        },
        data() {
            return {
                visible: false
            }
        },
    }
</script>