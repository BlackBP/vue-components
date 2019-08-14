<template>

    <div>
        <c-card class="c-elevate-3">

            <div style="cursor: pointer"
                 @click="collapse.visible = !collapse.visible">

                <c-stack-group justify="start"
                               align-items="center">
                    <c-stack-item>
                        <c-chip color="success">
                            <b>Collapse</b>
                        </c-chip>
                    </c-stack-item>

                    <c-stack-item style="align-self: start">
                        <c-icon :name="collapse.visible ? 'menu-up' : 'menu-down'"
                                size="1.5rem"/>
                    </c-stack-item>

                    <c-stack-item>
                        <c-switch v-model="collapse.loading"
                                  @click.native.stop>
                            Loading
                        </c-switch>
                    </c-stack-item>

                </c-stack-group>
            </div>

            <c-collapse :visible="visible">
                <c-loading-overlay :loading="false"
                                   loading-text="">
                    <c-divider/>

                    <p>
                        <c-switch v-model="transparent">
                            Transparent buttons
                        </c-switch>

                        <c-switch v-model="buttons.elevated">
                            Elevated buttons
                        </c-switch>

                        <c-switch v-model="buttons.bordered">
                            Bordered buttons
                        </c-switch>
                    </p>

                    <div class="c-btn-group">
                        <c-btn v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                               icon-left="send"
                               :key="color"
                               :elevated="buttons.elevated"
                               :bordered="buttons.bordered"
                               :transparent="buttons.transparent"
                               :color="color">
                            Click me!
                        </c-btn>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in buttons.colors"
                                icon="plus"
                                :key="color"
                                :elevated="buttons.elevated"
                                :transparent="buttons.transparent"
                                :color="color"/>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in buttons.colors"
                                icon="plus"
                                :key="color"
                                :dense="true"
                                :elevated="buttons.elevated"
                                :transparent="buttons.transparent"
                                :color="color"/>
                    </div>

                    <div class="c-btn-group">
                        <c-badge>
                            <c-icon-btn icon="filter"
                                        @click="badge = badge + 1"/>
                            <template slot="badge">{{ badge }}</template>
                        </c-badge>

                        <c-badge icon="alert">
                            <c-icon-btn icon="bell"
                                        @click="addNotify"/>
                        </c-badge>
                    </div>

                    <c-text-area v-model="notifyMessage"
                                 placeholder="Введите текст"/>
                </c-loading-overlay>

            </c-collapse>
        </c-card>
    </div>

</template>

<script>
    export default {
        name: "view-home",
        data() {
            return {
                buttons: {
                    bordered: false,
                    elevated: false,
                    transparent: false,
                    colors: ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']
                },
                collapse: {
                    visible: true,
                    loading: false,
                },
                badge: 10,
                drawerOpened: true,
                notifyMessage: 'Hello world!'
            }
        },
        methods: {
            addNotify() {
                this.$notify.add(this.notify.message, {
                    duration: 0,
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-btn-group {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin-bottom: 15px;
        padding: 15px;

        &:last-child {
            margin-bottom: 0;
        }

        & > * {
            margin-right: 10px;
        }
    }
</style>
