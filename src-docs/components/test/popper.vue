<template>
    <div class="c-popper">
        <transition name="c-popper">
            <c-card v-show="visible"
                    class="elevate-6">
                <slot/>
            </c-card>
        </transition>
    </div>
</template>

<script>
    import Popper from "popper.js";

    let $popper = null;

    /**
     *
     * @param selector
     * @return {Element}
     */
    const getEl = (selector) => {
        return document.querySelector(selector)
    };

    export default {
        name: "c-popper",
        props: {
            reference: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        watch: {
            visible(value) {
                if ($popper !== null) {
                    if (value) {
                        $popper.enableEventListeners();
                        $popper.scheduleUpdate();
                    } else {
                        $popper.disableEventListeners();
                    }
                }
            },
            reference(value) {
                if ($popper !== null) {
                    if ($popper.destroy) {
                        $popper.destroy()
                    }
                }

                if (value) {
                    $popper = new Popper(getEl(value), this.$el);
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                $popper = new Popper(getEl(this.reference), this.$el, {
                });
            })
        },
        beforeDestroy() {
            if ($popper !== null) {
                if ($popper.destroy) {
                    $popper.destroy()
                }
            }
        }
    }
</script>

<style lang="scss">
    .c-popper {
        $transition: .2s ease;

        $enter: #{&}-enter;
        $leave: #{&}-leave;
        $enter-to: #{&}-enter-to;
        $leave-to: #{&}-leave-to;

        &-enter-active,
        &-leave-active {
            transition: opacity $transition, transform $transition;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }

        &-leave,
        &-enter-to {
            opacity: 1;
            transform: translate(0, 0);
        }


        &[x-placement='bottom'] {
            margin-top: 5px;

            #{$enter}, #{$leave-to} {
                transform: translate(0, 10px);
            }
        }

        &[x-placement='top'] {
            margin-bottom: 5px;

            #{$enter}, #{$leave-to} {
                transform: translate(0, -10px);
            }
        }

        &[x-placement='right'] {
            margin-left: 5px;

            #{$enter}, #{$leave-to} {
                transform: translate(10px, 0);
            }
        }
        &[x-placement='left'] {
             margin-right: 5px;

             #{$enter}, #{$leave-to} {
                 transform: translate(0, -10px);
             }
         }
    }
</style>