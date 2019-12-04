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

        <c-overlay v-model="visible"
                   content-class="custom"
                   :outside-dismiss="false">
            <c-card style="width: auto;">
                hello
                <br>
                <c-btn @click="visible = false">
                    visible off
                </c-btn>
            </c-card>
        </c-overlay>
    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "./layouts/ScreenCard.vue";
    import CPopper from "../components/test/popper";
    import COverlay from "../../src/components/overlay/COverlay";

    export default {
        name: "ScreenHome",
        components: {
            COverlay,
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

<style lang="scss">
    .custom {

    }
</style>