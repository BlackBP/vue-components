<template>
    <layout-screen-card header="Notifications"
                        icon="bell">

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
                               icon-left="bell"
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
                    color: this.color
                })
            },
        }
    }
</script>

<style scoped>

</style>