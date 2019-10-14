<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-grid-row justify="center">

            <c-grid-col :auto="true">
                <c-card-section>
                    <c-stack-group justify="center">

                        <c-stack-item>
                            <c-switch v-model="transparent">
                                Transparent buttons
                            </c-switch>
                        </c-stack-item>

                        <c-stack-item>
                            <c-switch v-model="elevated">
                                Elevated buttons
                            </c-switch>
                        </c-stack-item>

                        <c-stack-item>
                            <c-switch v-model="bordered">
                                Bordered buttons
                            </c-switch>
                        </c-stack-item>

                    </c-stack-group>
                </c-card-section>

                <c-card-section>
                    <h3>
                        Regular buttons
                    </h3>

                    <c-divider />

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in colors"
                               :key="color"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            Default
                        </c-btn>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in colors"
                               :key="color"
                               leading="heart"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            Icon
                        </c-btn>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in colors"
                               :key="color"
                               trailing="heart"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            Icon
                        </c-btn>
                    </c-card-section>

                </c-card-section>

                <c-card-section>
                    <h3>
                        Icon buttons
                    </h3>

                    <c-divider />

                    <c-card-section>
                        <c-switch v-model="dense">
                            Dense
                        </c-switch>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-icon-btn v-for="color in colors"
                                    icon="plus"
                                    :key="color"
                                    :dense="dense"
                                    :elevated="elevated"
                                    :transparent="transparent"
                                    :color="color"/>
                    </c-card-section>
                </c-card-section>
            </c-grid-col>

        </c-grid-row>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard";

    export default {
        name: "ScreenButtons",
        components: {LayoutScreenCard},
        data() {
            return {
                bordered: false,
                elevated: false,
                transparent: false,
                dense: false,
                colors: ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']
            }
        }
    }
</script>

<style lang="scss"
       scoped>

    .c-btn-group {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;

        & > * {
            margin-right: 10px;
        }
    }
</style>