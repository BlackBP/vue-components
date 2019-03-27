<template>
    <div>
        <c-btn color="primary"
               text="Open modal"
               :elevated="true"
               @click="openModal(1)" />

        <c-modal ref="modal1"
                 title="Simple modal"
                 icon="mdi mdi-home"
                 max-width="600px"
                 :allow-dismiss="true">

            Hello world!

            <template slot="footer">
                <c-btn color="primary"
                       text="Open modal #2"
                       :elevated="true"
                       @click="openModal(2)"/>
            </template>

        </c-modal>

        <c-modal ref="modal2"
                 title="Simple modal #2"
                 icon="mdi mdi-send"
                 max-width="700px"
                 :allow-dismiss="true">

            Modal #2 content
            <template slot="footer">
                <c-btn color="primary"
                       text="Open modal #2"
                       :elevated="true"
                       @click="openModal(3)"/>
            </template>
        </c-modal>

        <c-modal ref="modal3"
                 title="Simple modal #3"
                 icon="mdi mdi-account"
                 max-width="400px"
                 :allow-dismiss="true">

            Modal #3 content

        </c-modal>

    </div>
</template>

<script>
    import CBtn from "../components/base/Button";
    import CModal from "../components/base/Modal";
    export default {
        name: "screen-modal",
        components: {
            CModal,
            CBtn
        },
        data() {
            return {
                currentComponent: 'RatesList',
                rate: {}
            }
        },
        methods: {
            openModal(number = 1) {
                let refName = `modal${number}`;

                if(this.$refs.hasOwnProperty(refName)) {
                    this.$refs[refName].open();
                }
            }
        }
    }
</script>

<style scoped>

</style>
