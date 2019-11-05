<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-grid-row justify="center">
            <c-grid-col xl="4">

                <form @submit.prevent="addNotify">

                    <c-form-row>
                        <c-text-input v-model="duration"
                                      type="number"
                                      placeholder="Duration"
                                      leading="timer"/>
                    </c-form-row>

                    <c-form-row>
                        <c-select v-model="color"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Color"
                                  :options="colors"/>
                    </c-form-row>

                    <c-form-row>
                        <c-text-input v-model="title"
                                      leading="text"
                                      placeholder="Title" />
                    </c-form-row>

                    <c-form-row>
                        <c-text-area v-model="message"
                                     placeholder="Message"/>
                    </c-form-row>

                    <c-form-row>
                        <c-btn color="primary"
                               leading="bell"
                               type="submit">
                            Show notification
                        </c-btn>
                    </c-form-row>

                </form>

            </c-grid-col>
        </c-grid-row>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard";
    import CTextInput from "../../../src/components/form-text-input/TextInput";
    import CFormRow from "../../../src/components/form-row/FormRow";
    import CGridRow from "../../../src/components/grid/GridRow";
    import CGridCol from "../../../src/components/grid/GridCol";
    import CSelect from "../../../src/components/form-select/Select";
    import CTextArea from "../../../src/components/form-text-area/TextArea";
    import CBtn from "../../../src/components/button/Btn";

    const COLORS = [
        {
            id: 'default',
            name: 'Default'
        },
        {
            id: 'success',
            name: 'Success'
        },
        {
            id: 'error',
            name: 'Error'
        },
        {
            id: 'warn',
            name: 'Warn'
        },
        {
            id: 'info',
            name: 'info'
        },
    ];

    export default {
        name: "ScreenNotifications",
        components: {
            CBtn,
            CTextArea,
            CSelect,
            CGridCol,
            CGridRow,
            CFormRow,
            CTextInput,
            LayoutScreenCard
        },
        data() {
            return {
                title: 'Notification',
                message: 'Awesome notification message!',
                duration: 1000,
                color: {...COLORS[0]},
                colors: [...COLORS]
            }
        },
        methods: {
            addNotify() {
                this.$notify.add(this.message, {
                    title: this.title,
                    duration: this.duration,
                    color: this.color.id,
                    onClose(e, i) {
                        console.log(e, i)
                    }
                })
            },
        }
    }
</script>