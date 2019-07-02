<script>

    /**
     *
     */
    function setInitialStyles(element, props) {
        element.style.transitionProperty = 'height';
        element.style.transitionDuration = `${props.duration}ms`;
        element.style.transitionTimingFunction = props.easing;
        element.style.overflow = 'hidden';
    }

    /**
     *
     * @param element
     */
    function clearStyles(element) {
        element.style.height = null;
        element.style.transitionProperty = null;
        element.style.transitionDuration = null;
        element.style.transitionTimingFunction = null;
        element.style.overflow = null;
    }

    export default {
        name: "transition-collapse",
        functional: true,
        props: {
            duration: {
                type: [Number, String],
                default: 300
            },
            easing: {
                type: String,
                default: 'ease-in-out'
            },
        },
        render(createElement, {children, props}) {
            return createElement('transition', {
                props: {
                    type: 'transition'
                },
                on: {
                    beforeEnter(element) {
                        setInitialStyles(element, props)
                    },
                    enter(element) {

                        // Устанавливаем временные стили, чтобы вычислить размеры элемента
                        element.style.width = window.getComputedStyle(element).width;
                        element.style.height = 'auto';
                        element.style.position = 'fixed';
                        element.style.visibility = 'hidden';

                        // Вычисляем натуральную высоту элемента
                        const height = window.getComputedStyle(element).height;

                        // Force repaint to make sure the
                        // animation is triggered correctly.
                        getComputedStyle(element).height;

                        // Убираем времееные стили и устанавливаем высоту равную `0`
                        element.style.width = null;
                        element.style.height = 0;
                        element.style.position = null;
                        element.style.visibility = null;

                        // Trigger the animation.
                        // We use `setTimeout` because we need
                        // to make sure the browser has finished
                        // painting after setting the `height`
                        // to `0` in the line above.
                        setTimeout(() => {
                            element.style.height = height;
                        });
                    },
                    afterEnter(element) {
                        clearStyles(element)
                    },
                    beforeLeave(element) {
                        setInitialStyles(element, props)
                    },
                    leave(element) {
                        // Устанавливаем "строгую" высоту элемента
                        element.style.height = window.getComputedStyle(element).height;

                        // Force repaint to make sure the
                        // animation is triggered correctly.
                        getComputedStyle(element).height;

                        setTimeout(() => {
                            element.style.height = 0;
                        });
                    },
                    afterLeave(element) {
                        clearStyles(element)
                    }
                }
            }, children)
        }
    }
</script>

<style scoped>
    * {
        will-change: height;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
</style>
