<script>
    export default {
        name: "SignMadeBy",
        functional: true,
        props: {
            drawerOpened: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        render(createElement, {props}) {
            const baseClass = 'made-by';
            let drawerOpened = !!props.drawerOpened;

            let fullBlock = createElement('div', {class: baseClass}, [
                createElement('span', {class: [`${baseClass}__text`]}, 'Сделано с'),
                createElement('CIcon', {
                    props: {
                        name: 'heart'
                    },
                    class: `${baseClass}__heart`
                }),
                createElement('span', {class: [`${baseClass}__text`]}, 'в DreamStudio'),
            ]);

            return createElement('transition', {
                props: {
                    mode: 'out-in'
                }
            }, [
                drawerOpened ? fullBlock : createElement('div', {class: baseClass}, [
                    createElement('CIcon', {
                        props: {
                            name: 'heart'
                        },
                        class: `${baseClass}__heart`
                    })
                ])
            ])
        }
    }
</script>

<style lang="scss">

    .made-by {
        display: block;
        margin-top: 15px;
        opacity: 1;
        text-align: center;
        cursor: default;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: opacity 0.3s ease;

        &__text {
            display: inline-block;
        }

        &__heart {
            display: inline-block;
            color: #ef5350;
            animation: heartBeat 2s infinite;
        }
    }

    @keyframes heartBeat {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }

        25% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3)
        }

        40% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }

        60% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3)
        }

        to {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
    }

    .v-enter,
    .v-leave-to {
        transform: scale(0);
    }

    .v-leave,
    .v-enter-to {
        transform: scale(1);
    }

    .v-enter-active,
    .v-leave-active {
        transition: 0.3s ease;
    }
</style>