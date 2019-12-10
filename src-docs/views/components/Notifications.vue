<template>
    <layout-screen-card style="padding: 500px 0;">

        <c-grid-row justify="center">
            <c-grid-col xl="4">

                <c-form @submit.prevent="addNotify">
                    <c-form-field label="Position"
                                  label-for="position">
                        <c-select v-model="position"
                                  id="position"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Position"
                                  :options="positions"
                                  @change="setPosition"/>
                    </c-form-field>

                    <c-form-field label="Duration"
                                  label-for="duration">
                        <c-text-input v-model="duration"
                                      id="duration"
                                      type="number"
                                      placeholder="Duration"
                                      leading="timer">
                            <template slot="trailing">ms</template>
                        </c-text-input>
                    </c-form-field>

                    <c-form-field label="Color"
                                  label-for="color">
                        <c-select v-model="color"
                                  id="color"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Color"
                                  :options="colors"/>
                    </c-form-field>

                    <c-form-field label="Title"
                                  label-for="title">
                        <c-text-input v-model="title"
                                      id="title"
                                      leading="text"
                                      placeholder="Title"/>
                    </c-form-field>

                    <c-form-field label="Message"
                                  label-for="message">
                        <c-text-input v-model="message"
                                      id="message"
                                      placeholder="Message"
                                      :multiline="true"/>
                    </c-form-field>

                    <c-form-field>
                        <c-btn color="primary"
                               leading="bell"
                               type="submit"
                               :block="true">
                            Show notification
                        </c-btn>
                    </c-form-field>

                    <c-form-field>
                        <c-btn color="error"
                               leading="delete"
                               :block="true"
                               @click.prevent="removeAll">
                            Remove all
                        </c-btn>
                    </c-form-field>

                </c-form>

            </c-grid-col>
        </c-grid-row>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard.vue";

    const COLORS_MAP = [
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

    const POSITIONS_MAP = [
        {
            id: 'top-right',
            name: 'Top right'
        },
        {
            id: 'top-left',
            name: 'Top left'
        },
        {
            id: 'bottom-right',
            name: 'Bottom right'
        },
        {
            id: 'bottom-left',
            name: 'Bottom left'
        },
    ];

    export default {
        name: "ScreenNotifications",
        components: {
            LayoutScreenCard
        },
        data() {
            return {
                position: {...POSITIONS_MAP[0]},
                positions: [...POSITIONS_MAP],
                title: 'Notification',
                message: 'Awesome notification message!',
                duration: 2000,
                color: {...COLORS_MAP[0]},
                colors: [...COLORS_MAP]
            }
        },
        methods: {
            addNotify() {
                this.$notify.add(this.message, {
                    title: this.title,
                    duration: this.duration,
                    color: this.color.id,
                    onClose(event, item) {
                        console.log(event, item)
                    }
                })
            },
            removeAll() {
                this.$notify.removeAll()
            },
            setPosition() {
                this.$notify.setPosition(this.position.id)
            }
        }
    }
</script>