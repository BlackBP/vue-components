<template>
    <layout-screen-card>

        <c-grid-row justify="center">

            <c-grid-col :auto="true">
                <c-card-section>
                    <c-stack-group justify="center"
                                   :wrap="true">

                        <c-stack-item v-for="modifierCode in MODIFIERS_MAP"
                                      :key="modifierCode">
                            <c-radio v-model="modifier"
                                     name="button-modifier"
                                     :value="modifierCode">
                                {{ modifierCode }}
                            </c-radio>
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

    const MODIFIERS_MAP = {
        default: 'default',
        elevated: 'elevated',
        transparent: 'transparent',
        bordered: 'bordered',
    };

    export default {
        name: "ScreenButtons",
        components: {
            LayoutScreenCard
        },
        data() {
            return {
                modifier: MODIFIERS_MAP.default,
                colors: ['default', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark'],
                sizes: ['xs', '', 'md', 'lg']
            }
        },
        computed: {
            MODIFIERS_MAP() {
                return MODIFIERS_MAP
            },
            elevated() {
                return this.modifier === MODIFIERS_MAP.elevated;
            },
            transparent() {
                return this.modifier === MODIFIERS_MAP.transparent;
            },
            bordered() {
                return this.modifier === MODIFIERS_MAP.bordered;
            },
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