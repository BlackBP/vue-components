<template>

    <div>
        <c-card class="c-elevate-3">

            <div class="u-flex u-flex-row u-flex-items-center u-flex-content-start"
                 style="cursor: pointer"
                 @click="visible = !visible">

                <c-chip color="success">
                    <b>Collapse</b>
                </c-chip>

                <c-icon :name="visible ? 'menu-up' : 'menu-down'"
                        size="1.5rem"
                        style="margin-left: 1rem;"/>
            </div>

            <c-collapse :visible="visible">
                <c-loading-overlay :loading="false"
                                   loading-text="">
                    <c-divider/>

                    <p>
                        <c-switch v-model="transparent">
                            Transparent buttons
                        </c-switch>

                        <c-switch v-model="elevated">
                            Elevated buttons
                        </c-switch>

                        <c-switch v-model="bordered">
                            Bordered buttons
                        </c-switch>
                    </p>

                    <div class="c-btn-group">
                        <c-btn v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                               icon-left="send"
                               :key="color"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            Click me!
                        </c-btn>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                                icon="plus"
                                :key="color"
                                :elevated="elevated"
                                :transparent="transparent"
                                :color="color"/>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                                icon="plus"
                                :key="color"
                                :dense="true"
                                :elevated="elevated"
                                :transparent="transparent"
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
                bordered: false,
                elevated: false,
                transparent: false,
                visible: true,
                badge: 10,
                drawerOpened: true,
                notifyMessage: 'Hello world!'
            }
        },
        methods: {
            addNotify() {
                this.$notify.add(this.notifyMessage, {
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
