<template>

    <transition name="modal-container-fade">
        <div v-show="isVisible"
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
                    <transition :name="modalTransition">

                        <template v-if="customContent">
                            <div v-show="isVisible"
                                 class="c-modal"
                                 :class="customContentClass"
                                 @click.stop>
                                <slot/>
                            </div>
                        </template>

                        <template v-else>
                            <div v-show="isVisible"
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
                                                    color="light"
                                                    :transparent="true"
                                                    @click="close"/>
                                    </div>

                                </header>

                                <div class="c-modal__body">
                                    <slot/>
                                </div>

                                <footer v-show="showFooter"
                                        class="c-modal__footer">
                                    <slot name="footer"/>
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
    import {
        isNaN,
        isString
    } from '../../utils/helpers';

    import {CIcon} from '../icon';
    import {CIconBtn} from '../icon-button';
    import {CLoading} from '../loading';

    const $html = document.querySelector('html');

    const ClassName = 'c-modal';
    const ClassNameModalOpened = 'modal-open';
    const DataKeyModalOpenCount = 'modalOpenCount';
    const EVENTS = {
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
            visible: {
                type: Boolean,
                default: false
            },
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
                default: 'modal-scale'
            },
            customContent: {
                type: Boolean,
                default: false,
            },
            customContentClass: {
                type: [Array, Object, String],
                default: ''
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
                isVisible: this.visible
            };
        },
        watch: {
            visible(value) {
                if(value) {
                    this.open()
                } else {
                    this.close()
                }
            }
        },
        computed: {
            hasTitle() {
                return isString(this.title) && this.title !== '';
            },
            hasIcon() {
                return isString(this.icon) && this.icon !== '';
            },
            modalClassName() {
                return [
                    ClassName,
                    {
                        [`${ClassName}--${this.styleType}`]: !!this.styleType,
                        [`${ClassName}--flex`]: this.flex
                    }
                ];
            },
            modalStyle() {
                return {
                    maxWidth: this.maxWidth
                }
            },
        },
        methods: {
            open() {
                const modalCount = this.getModalCount();

                if (modalCount <= 0) {
                    this.setModalCount(1);
                } else {
                    this.setModalCount(modalCount + 1)
                }

                $html.classList.add(ClassNameModalOpened);

                this.isVisible = true;
                this.$emit(EVENTS.open.name);
            },
            close() {
                const modalCount = this.getModalCount();

                if (modalCount > 1) {
                    this.setModalCount(modalCount - 1)
                } else {
                    this.setModalCount(0);
                    $html.classList.remove(ClassNameModalOpened);
                }

                this.isVisible = false;
                this.$emit(EVENTS.close.name);
            },
            backdropClick() {
                if (this.outsideDismiss) {
                    this.close()
                }
            },
            getModalCount() {
                let modalCount = parseInt($html.dataset[DataKeyModalOpenCount]);
                return isNaN(modalCount) ? 0 : modalCount;
            },
            setModalCount(value) {
                $html.dataset[DataKeyModalOpenCount] = value;
            }
        },
        mounted() {
            this.$el.__vueModalListener__ = (event) => {
                if (event.code === 'Escape') {
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
