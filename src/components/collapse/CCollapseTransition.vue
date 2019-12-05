<script>
    import {
        each
    } from '../../utils/helpers';

    const ANIMATED_STYLES = {
        opacity: [0, 1],
        transform: ['translateY(-20px)', 'translateY(0px)'],
    };

    const STYLES_MAP = {
        willChange: 'willChange',
        backfaceVisibility: 'backfaceVisibility',
        perspective: 'perspective',
        transitionProperty: 'transitionProperty',
        transitionDuration: 'transitionDuration',
        transitionTimingFunction: 'transitionTimingFunction',
        overflow: 'overflow',
        height: 'height',
        opacity: 'opacity',
        transform: 'transform',
    };

    /**
     * @param element
     * @param props
     */
    function setInitialStyles(element, props) {
        element.style.willChange = 'height, opacity, transform';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000px';
        element.style.transitionProperty = 'height, opacity, transform';
        element.style.transitionDuration = `${props.duration}ms`;
        element.style.transitionTimingFunction = props.easing;
        element.style.overflow = 'hidden';
    }

    /**
     * @param element
     * @param visibleState
     */
    function setAnimatedStyles(element, visibleState = false) {
        each(ANIMATED_STYLES, (value, key) => {
            element.style[key] = visibleState ? value[1] : value[0]
        })
    }

    /**
     *
     * @param element
     */
    function clearStyles(element) {
        each(STYLES_MAP, value => {
            element.style[value] = null
        });
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
        render(createElement, {props, children}) {
            return createElement('transition', {
                props: {
                    type: 'transition',
                },
                on: {
                    // Enter
                    beforeEnter(element) {
                        setInitialStyles(element, props);
                        setAnimatedStyles(element, false);
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
                        element.style.position = null;
                        element.style.visibility = null;
                        element.style.height = '0';

                        // Trigger the animation.
                        // We use `setTimeout` because we need
                        // to make sure the browser has finished
                        // painting after setting the `height`
                        // to `0` in the line above.
                        setTimeout(() => {
                            element.style.height = height;
                            setAnimatedStyles(element, true);
                        }, 0);
                    },
                    afterEnter(element) {
                        clearStyles(element)
                    },

                    // Leave
                    beforeLeave(element) {
                        setInitialStyles(element, props);
                        setAnimatedStyles(element, true);
                    },
                    leave(element) {
                        // Устанавливаем "строгую" высоту элемента
                        element.style.height = window.getComputedStyle(element).height;

                        // Force repaint to make sure the
                        // animation is triggered correctly.
                        getComputedStyle(element).height;

                        setTimeout(() => {
                            element.style.height = '0';
                            setAnimatedStyles(element, false);
                        }, 0);
                    },
                    afterLeave(element) {
                        clearStyles(element);
                    }
                }
            }, children)
        }
    }
</script>
