<template>

    <transition name="modal-container-fade">
        <div v-show="visible"
             class="c-modal-container"
             tabindex="-1"
             role="dialog"
             @click="backdropClick">

            <div class="c-modal-container__wrap">

                <template v-if="loading">
                    <c-loading style="margin: auto;"
                               :visible="true"/>
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

                                <header v-if="hasTitle || hasIcon || allowDismiss"
                                        class="c-modal__header">

                                    <c-icon v-if="hasIcon"
                                            :name="icon"
                                            class="c-modal__header-icon"/>

                                    <div v-if="hasTitle"
                                         class="c-modal__header-title">
                                        {{ title }}
                                    </div>

                                    <div v-if="allowDismiss"
                                         class="c-modal__close-icon">
                                        <c-icon-btn icon="close"
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
    import {CIcon} from '../icon';
    import {CIconBtn} from '../icon-button';
    import {CLoading} from '../loading';

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

    const dataKeys = {
        modalOpenCount: 'modalOpenCount'
    };

    function getModalCount() {
        let modalCount = parseInt($html.dataset[dataKeys.modalOpenCount]);
        return _.isNaN(modalCount) ? 0 : modalCount;
    }

    function setModalCount(value) {
        $html.dataset[dataKeys.modalOpenCount] = value;
    }

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
            },
            icon: {
                type: String,
                default: '',
            },
            allowDismiss: {
                type: Boolean,
                default: true,
            },
            outsideDismiss: {
                type: Boolean,
                default: true,
            },
            modalTransition: {
                type: String,
                default: 'scale',
                validator(value) {
                    return Object.keys(CssClass.modal.transition).includes(value);
                }
            },
            customContent: {
                type: Boolean,
                default: false,
            },
            showFooter: {
                type: Boolean,
                default: false,
            },
            flex: {
                type: Boolean,
                default: false,
            },
            styleType: {
                type: String,
                default: 'default',
            },
            maxWidth: {
                type: String,
                default: '400px',
            },
            loading: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                visible: false
            };
        },
        computed: {
            hasTitle() {
                return _.isString(this.title) && this.title !== '';
            },
            hasIcon() {
                return _.isString(this.icon) && this.icon !== '';
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
                let modalCount = getModalCount();

                if (modalCount <= 0) {
                    setModalCount(1);
                } else {
                    setModalCount(modalCount + 1)
                }

                $html.classList.add(CssClass.html.modalOpened);

                this.visible = true;
                this.$emit(Events.open.name);
            },
            close() {
                let modalCount = getModalCount();

                if (modalCount > 1) {
                    setModalCount(modalCount - 1)
                } else {
                    setModalCount(0);
                    $html.classList.remove(CssClass.html.modalOpened);
                }

                this.visible = false;
                this.$emit(Events.close.name);
            },
            backdropClick(event) {
                if (this.outsideDismiss) {
                    this.close()
                }
            }
        },
        mounted() {
            this.$el.__vueModalListener__ = (event) => {
                if(event.code === 'Escape') {
                    this.close()
                }
            };

            window.addEventListener('keyup', this.$el.__vueModalListener__);
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.$el.__vueModalListener__);
        }
    }
</script>
