<template>
    <div>
        <c-btn color="primary"
               text="Open modal"
               :elevated="true"
               @click="openModal" />

        <c-modal ref="modal"
                 title="Закрытие заявки"
                 icon="mdi mdi-home"
                 max-width="600px"
                 :allow-dismiss="true">

            <rates-list v-show="currentComponent === 'RatesList'"
                        :rate-click="selectRate" />

            <task-done-form v-show="currentComponent === 'TaskDoneForm'"
                            :rate="rate"
                            @submit="showRatesList" />

        </c-modal>

    </div>
</template>

<script>
    import CBtn from "../components/base/Button";
    import CModal from "../components/base/Modal";
    import RatesList from "./task-done/rates-list";
    import TaskDoneForm from "./task-done/form";


    export default {
        name: "screen-modal",
        components: {TaskDoneForm, RatesList, CModal, CBtn},
        data() {
            return {
                currentComponent: 'RatesList',
                rate: {}
            }
        },
        methods: {
            openModal() {
                this.$refs.modal.open();
            },
            selectRate(rate) {
                this.rate = _.clone(rate);
                this.$nextTick(() => {
                    this.currentComponent = 'TaskDoneForm'
                });
            },
            showRatesList() {
                this.currentComponent = 'RatesList'
            }
        }
    }
</script>

<style scoped>

</style>
