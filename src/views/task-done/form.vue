<template>
    <div>
        <pre>{{ rate }}</pre>

        <c-textarea v-model="text"
                    placeholder="Текст отзыва"
                    style="margin-bottom: 15px;" />

        <c-btn text="Отправить"
               :click="sendForm" />
    </div>
</template>

<script>
    import CTextarea from "../../components/base/TextArea";
    import CBtn from "../../components/base/Button";

    export default {
        name: "task-done-form",
        components: {CBtn, CTextarea},
        props: {
            rate: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                text: ''
            }
        },
        methods: {
            sendForm() {
                this.$emit('submit');
            }
        }
    }
</script>

<style scoped>

</style>
