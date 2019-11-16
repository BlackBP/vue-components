<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-grid-row justify="center">
            <c-grid-col xl="4">

                <form @submit.prevent="addNotify">

                    <div>
                        <c-text-input v-model="duration"
                                      type="number"
                                      placeholder="Duration"
                                      leading="timer"/>
                    </div>

                    <div>
                        <c-select v-model="color"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Color"
                                  :options="colors"/>
                    </div>

                    <div>
                        <c-text-input v-model="title"
                                      leading="text"
                                      placeholder="Title"/>
                    </div>

                    <div>
                        <c-text-input v-model="message"
                                      placeholder="Message"
                                      :multiline="true"/>
                    </div>

                    <div>
                        <c-btn color="primary"
                               leading="bell"
                               type="submit">
                            Show notification
                        </c-btn>
                    </div>

                </form>

            </c-grid-col>
        </c-grid-row>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard.vue";

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
                    color: this.color.id,
                    onClose(e, i) {
                        console.log(e, i)
                    }
                })
            },
        }
    }
</script>