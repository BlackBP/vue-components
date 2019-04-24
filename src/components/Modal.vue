<template>

    <transition name="modal-container-fade">
        <div v-show="visible"
             class="c-modal-container"
             tabindex="-1"
             role="dialog"
             @click="backdropClick">

            <div class="c-modal-container__wrap">

                <template v-if="loading">
                    <c-loading :visible="true"
                               style="margin: auto;"/>
                </template>

                <template v-else>
                    <transition :name="modalTransitionClassName">

                        <template v-if="customContent">
                            <div v-show="visible"
                                 class="c-modal"
                                 @click.stop>
                                <slot :closeModal="close"></slot>
                            </div>
                        </template>

                        <template v-else>
                            <div v-show="visible"
                                 :class="modalClassName"
                                 :style="modalStyle"
                                 @click.stop>

                                <header v-if="hasTitle || hasIcon"
                                        class="c-modal__header">

                                    <c-icon v-if="hasIcon"
                                            :name="icon"
                                            class="c-modal__header-icon"/>

                                    <div v-if="hasTitle"
                                         class="c-modal__header-title">
                                        {{ title }}
                                    </div>

                                    <div class="c-modal__close-icon">
                                        <c-icon-btn v-show="allowDismiss"
                                                    icon="close"
                                                    :dense="true"
                                                    :transparent="true"
                                                    @click="close"/>
                                    </div>

                                </header>

                                <div class="c-modal__body">
                                    <slot :closeModal="close"></slot>
                                </div>

                                <footer v-show="showFooter"
                                        class="c-modal__footer">
                                    <slot name="footer"
                                          :closeModal="close">
                                    </slot>
                                </footer>

                            </div>
                        </template>

                    </transition>
                </template>

            </div>

        </div>
    </transition>

</template>

<script>
    import CIcon from "./Icon";
    import CIconBtn from "./IconButton";
    import CLoading from "./Loading";

    const $html = document.querySelector('html');

    const CssClass = {
        html: {
            modalOpened: 'modal-open'
        },
        modal: {
            base: 'c-modal',
            transition: {
                scale: 'modal-scale',
                slideY: 'modal-slideY',
                slideUpY: 'modal-slideUpY',
                slideX: 'modal-slideX',
                slideRightX: 'modal-slideRightX',
                rotateX: 'modal-rotateX',
                rotateY: 'modal-rotateY'
            }
        }
    };

    const Events = {
        open: {
            name: 'open'
        },
        close: {
            name: 'close'
        }
    };

    export default {
        name: "c-modal",
        components: {
            CLoading,
            CIconBtn,
            CIcon
        },
        props: {
            title: {
                type: String,
                default: '',
                required: false
            },
            icon: {
                type: String,
                default: '',
                required: false
            },
            allowDismiss: {
                type: Boolean,
                default: true,
                required: false
            },
            outsideDismiss: {
                type: Boolean,
                default: true,
                required: false
            },
            modalTransition: {
                type: String,
                default: 'scale',
                required: false,
                validator(value) {
                    return Object.keys(CssClass.modal.transition).includes(value);
                }
            },
            customContent: {
                type: Boolean,
                default: false,
                required: false
            },
            showFooter: {
                type: Boolean,
                default: false,
                required: false
            },
            flex: {
                type: Boolean,
                default: false,
                required: false
            },
            styleType: {
                type: String,
                default: 'default',
                required: false
            },
            maxWidth: {
                type: String,
                default: '400px',
                required: false
            },
            loading: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        data() {
            return {
                visible: false
            };
        },
        computed: {
            hasTitle() {
                return typeof this.title === 'string' && this.title !== '';
            },
            hasIcon() {
                return typeof this.icon === 'string' && this.icon !== '';
            },
            modalClassName() {
                let base = CssClass.modal.base;
                let mods = {};

                mods[`${base}--${this.styleType}`] = !!this.styleType;
                mods[`${base}--flex`] = this.flex;

                return [base, mods];
            },
            modalStyle() {
                return {
                    maxWidth: this.maxWidth
                }
            },
            modalTransitionClassName() {
                return CssClass.modal.transition[this.modalTransition];
            }
        },
        methods: {
            open() {
                setTimeout(() => {
                    $html.classList.add(CssClass.html.modalOpened);
                }, 100);

                this.visible = true;
                this.$emit(Events.open.name);
            },
            close() {
                $html.classList.remove(CssClass.html.modalOpened);

                this.visible = false;
                this.$emit(Events.close.name);
            },
            backdropClick(event) {
                event.preventDefault();
                event.stopPropagation();

                if (!this.allowDismiss) return;
                if (!this.outsideDismiss) return;

                this.close();
            }
        }
    }
</script>
