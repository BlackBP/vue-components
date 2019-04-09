<template>
    <div>
        <c-btn color="primary"
               :elevated="true"
               @click="openModal(1)" >
            Open modal
        </c-btn>

        <c-modal ref="modal1"
                 title="Simple modal"
                 icon="mdi mdi-home"
                 max-width="600px"
                 :allow-dismiss="true">

            Hello world!

            <template slot="footer"
                      slot-scope="methods">
                <c-btn-group>
                    <c-btn color="primary"
                           :elevated="true"
                           @click="() => {methods.closeModal(); openModal(2)}">
                        Open modal #2
                    </c-btn>

                    <c-btn :transparent="true"
                           @click="methods.closeModal">
                        Close
                    </c-btn>
                </c-btn-group>
            </template>

        </c-modal>

        <c-modal ref="modal2"
                 title="Simple modal #2"
                 icon="mdi mdi-send"
                 max-width="700px"
                 :allow-dismiss="true">

            Modal #2 content

            <template slot="footer"
                      slot-scope="methods">
                <c-btn-group>
                    <c-btn color="primary"
                           :elevated="true"
                           @click="() => {methods.closeModal(); openModal(3);}">
                        Open custom modal
                    </c-btn>

                    <c-btn :transparent="true"
                           @click="methods.closeModal">
                        Close
                    </c-btn>
                </c-btn-group>
            </template>
        </c-modal>

        <c-modal ref="modal3"
                 :custom-content="true"
                 :allow-dismiss="true">

            <template slot-scope="methods">
                <div style="background: #fff; padding: 30px; border-radius: 12px;">
                    <div>
                        Modal #3 (Custom style) content
                    </div>

                    <div style="margin-top: 15px;">
                        <c-btn @click="methods.closeModal">
                            Close
                        </c-btn>
                    </div>
                </div>
            </template>
        </c-modal>

    </div>
</template>

<script>
    import CBtn from "../components/base/Button";
    import CModal from "../components/base/Modal";
    import CBtnGroup from "../components/base/ButtonGroup";
    export default {
        name: "screen-modal",
        components: {
            CBtnGroup,
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
