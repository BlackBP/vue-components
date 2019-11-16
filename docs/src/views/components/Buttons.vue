<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-grid-row justify="center">

            <c-grid-col :auto="true">
                <c-card-section>
                    <c-stack-group justify="center"
                                   :wrap="true">

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

                    <c-divider/>

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in colors"
                               :key="color"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            {{ color }}
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
                            {{ color }}
                        </c-btn>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in colors"
                               trailing="heart"
                               :key="color"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            {{ color }}
                        </c-btn>
                    </c-card-section>

                    <c-card-section>
                        <h4>
                            Sizing
                        </h4>

                        <c-divider/>

                        <c-card-section class="c-btn-group">
                            <c-btn v-for="(size, index) in sizes"
                                   :key="size"
                                   :color="colors[index]"
                                   :size="size"
                                   :elevated="elevated"
                                   :transparent="transparent"
                                   :bordered="bordered">
                                Size {{ size !== '' ? size : 'default'}}
                            </c-btn>
                        </c-card-section>
                    </c-card-section>

                </c-card-section>

                <c-card-section>
                    <h3>
                        Icon buttons
                    </h3>

                    <c-divider/>

                    <c-card-section class="c-btn-group">
                        <c-icon-btn v-for="color in colors"
                                    icon="plus"
                                    :key="color"
                                    :color="color"
                                    :elevated="elevated"
                                    :transparent="transparent"
                                    :bordered="bordered"/>
                    </c-card-section>

                    <c-card-section>
                        <h4>
                            Sizing
                        </h4>

                        <c-divider/>

                        <c-card-section class="c-btn-group">
                            <c-icon-btn v-for="(size, index) in sizes"
                                        icon="close"
                                        :color="colors[index]"
                                        :key="size"
                                        :size="size"
                                        :elevated="elevated"
                                        :transparent="transparent"
                                        :bordered="bordered">
                                Size {{ size !== '' ? size : 'default'}}
                            </c-icon-btn>
                        </c-card-section>
                    </c-card-section>
                </c-card-section>
            </c-grid-col>

        </c-grid-row>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard.vue";
    import {CCardSection} from "../../../../src/components/card";
    import {CBtn} from "../../../../src/components/button";
    import {CIconBtn} from "../../../../src/components/icon-button";
    import {CSwitch} from "../../../../src/components/form-switch";
    import {CDivider} from "../../../../src/components/divider";
    import {CGridRow} from "../../../../src/components/grid";
    import {CGridCol} from "../../../../src/components/grid";
    import {CStackGroup} from "../../../../src/components/stack-group";
    import {CStackItem} from "../../../../src/components/stack-group";

    export default {
        name: "ScreenButtons",
        components: {
            CStackItem,
            CStackGroup,
            CGridCol,
            CGridRow,
            CDivider,
            CSwitch,
            CIconBtn,
            CBtn,
            CCardSection,
            LayoutScreenCard
        },
        data() {
            return {
                bordered: false,
                elevated: false,
                transparent: false,
                colors: ['default', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark'],
                sizes: ['xs', '', 'md', 'lg']
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