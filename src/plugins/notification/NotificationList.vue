<script>
    import _ from '../../utils/helpers'
    import Notification from "./Notification.vue";
    import {notificationFactory} from "./utils";

    const ClassName = 'c-service-notify';

    export default {
        name: "NotificationList",
        components: {Notification},
        props: {
            position: {
                type: String,
                default: 'top-right',
            }
        },
        data() {
            return {
                list: [],
                currentPosition: this.position
            }
        },
        computed: {
            hasNotify() {
                return this.list.length > 0
            }
        },
        methods: {
            add(options) {
                const notification = notificationFactory(options);
                const {
                    id,
                    duration = 0
                } = notification;

                this.list.push(notification);

                if (duration > 0) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.remove(id)
                        }, duration);
                    })
                }
            },
            remove(id) {
                this.list = this.list.filter((item) => {
                    return item['id'] !== id
                })
            },
            removeAll() {
                this.list = []
            },
            setPosition(value = 'top-right') {
                this.currentPosition = value
            }
        },
        render(createElement) {
            const NotificationArray = this.list.map(item => {
                const {
                    id,
                    title,
                    message,
                    color,
                    onClick,
                    onClose
                } = item;

                return createElement(Notification, {
                    key: id,
                    props: {
                        id,
                        title,
                        message,
                        color
                    },
                    on: {
                        click: (event) => {
                            if (_.isFunction(onClick)) {
                                onClick(event, item)
                            }
                        },
                        close: (event) => {
                            if (_.isFunction(onClose)) {
                                onClose(event, item);
                                this.remove(id)
                            }
                        }
                    }
                })
            });

            return createElement('transition', {
                    props: {
                        name: 'notification-list-fade'
                    }
                },
                this.hasNotify ? [
                    createElement(
                        'div',
                        {
                            class: [
                                ClassName,
                                {
                                    [`is-position-${this.currentPosition}`]: this.currentPosition !== ''
                                }
                            ],
                        },
                        [
                            createElement('transition-group', {
                                class: `${ClassName}__list`,
                                props: {
                                    tag: 'div',
                                    name: 'notification-list'
                                }
                            }, NotificationArray)
                        ]
                    )
                ] : null
            )
        }
    }
</script>

<style lang="scss">
    .c-service-notify {
        $viewport-offset: 15px;

        position: fixed;
        z-index: 9999;
        display: flex;
        justify-content: stretch;
        align-items: flex-start;
        width: auto;
        height: auto;

        &__list {
            display: block;
            width: 100%;
            max-width: 100%;
        }

        &.is-position-top-right {
            align-items: flex-start;
            top: $viewport-offset;
            right: $viewport-offset;
        }

        &.is-position-top-left {
            align-items: flex-start;
            top: $viewport-offset;
            left: $viewport-offset;
        }

        &.is-position-bottom-right {
            align-items: flex-end;
            bottom: $viewport-offset;
            right: $viewport-offset;
        }

        &.is-position-bottom-left {
            align-items: flex-end;
            bottom: $viewport-offset;
            left: $viewport-offset;
        }
    }

    .notification-list-fade {
        &-enter-active,
        &-leave-active {
            transition: .3s ease;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }

        &-leave,
        &-enter-to {
            opacity: 1;
        }
    }

    .notification-list {
        $offsetX: 50px;

        &-leave-active {
            position: absolute !important;
        }

        &-enter {
            transform: translate($offsetX, 0);
            opacity: 0;
        }

        &-enter-to,
        &-leave {
            transform: translate(0, 0);
            opacity: 1;
        }

        &-leave-to {
            transform: translate($offsetX, 0);
            opacity: 0;
        }
    }
</style>