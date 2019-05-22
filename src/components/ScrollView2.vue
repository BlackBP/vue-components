<template>
    <div class="c-scroll-view"
         @mouseenter="focusView">

        <div ref="view"
             tabindex="0"
             class="c-scroll-view__view">
            <slot></slot>
        </div>


        <div class="__percents c-elevate-3">
            x: {{ percent.x }}, y: {{ percent.y }}
        </div>

        <div v-if="false"
             class="c-scroll-view__bar-v"
             :style="{width: barWidth}">
            <div class="c-scroll-view__bar"></div>
        </div>

        <div v-if="false"
             class="c-scroll-view__bar-h"
             :style="{height: barWidth}">
            <div class="c-scroll-view__bar"></div>
        </div>

    </div>
</template>

<script>
    function onScroll(event, $vue) {
        let target = event.target;

        let {
            clientHeight, // Высота видимой области (без учета полосы прокрутки)
            clientWidth, // Ширина видимой области (без учета полосы прокрутки)
            scrollHeight, // Полная высота прокручиваемой области
            scrollWidth, // Полная ширина прокручиваемой области
            scrollTop, // Величина прокрученной области сверху
            scrollLeft, // Величина прокрученной области слева
            offsetHeight, // Полная высота видимой области
            offsetWidth // Полная ширина видимой области
        } = target;

        let scrollYPercent = +Math.abs((scrollTop / (scrollHeight - clientHeight)) * 100);
        let scrollXPercent = +Math.abs((scrollLeft / (scrollWidth - clientWidth)) * 100);

        scrollYPercent = _.isNaN(scrollYPercent) ? 0 : scrollYPercent;
        scrollXPercent = _.isNaN(scrollXPercent) ? 0 : scrollXPercent;

        $vue.percent.x = parseInt(scrollXPercent);
        $vue.percent.y = parseInt(scrollYPercent);

        console.log({
            clientHeight, // Высота видимой области (без учета полосы прокрутки)
            clientWidth, // Ширина видимой области (без учета полосы прокрутки)
            scrollHeight, // Полная высота прокручиваемой области
            scrollWidth, // Полная ширина прокручиваемой области
            scrollTop, // Величина прокрученной области сверху
            scrollLeft, // Величина прокрученной области слева
            offsetHeight, // Полная высота видимой области
            offsetWidth // Полная ширина видимой области
        });
    }

    /**
     *
     * @param {Object} options
     * @param {Number} options.duration
     * @param {Function} options.timing
     * @param {Function} options.draw
     */
    function animate(options) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction от 0 до 1
            let timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            // текущее состояние анимации
            let progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }

    const REF = {
        view: 'view'
    };

    export default {
        name: "c-scroll-view2",
        props: {
            barWidth: {
                type: String,
                default: '6px'
            }
        },
        data() {
            return {
                percent: {
                    x: 0,
                    y: 0
                }
            }
        },
        computed: {
            viewRef() {
                return this.$refs[REF.view]
            }
        },
        methods: {
            focusView() {
                this.viewRef.focus()
            },
            blurView() {
                this.viewRef.blur()
            },
            scrollTo(x = 0, y = 0) {
                animate({
                    duration: 300,
                    draw: (progress) => {
                        let percents = _.floor(progress, 2);
                        let offset = percents * y;

                        this.viewRef.scrollTo(0, offset)
                    },
                    timing: (timeFraction) => {
                        return Math.pow(timeFraction, 2)
                    }
                })
            },
        },
        mounted() {
            this.$refs.view.addEventListener('scroll', (event) => {
                onScroll(event, this)
            })
        },
        beforeDestroy() {
            this.$refs.view.removeEventListener('scroll', (event) => {
                onScroll(event, this)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .c-scroll-view {
        $self: #{&};
        $view: #{$self}__view;
        $bar: #{$self}__bar;
        $bar-v: #{$self}__bar-v;
        $bar-h: #{$self}__bar-h;

        @at-root {
            #{$self} {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            #{$view} {
                position: relative;
                z-index: 1;
                display: block;
                width: 100%;
                height: 100%;
                overflow: auto;
            }

            #{$bar-v},
            #{$bar-h} {
                position: absolute;
                z-index: 2;
                display: block;
                background: rgba(#000, 0.15);
            }

            #{$bar-v} {
                right: 0;
                top: 0;
                bottom: 0;
            }

            #{$bar-h} {
                left: 0;
                right: 0;
                bottom: 0;
            }

            #{$bar} {
                position: relative;
                z-index: 3;
                display: block;
                background-color: #969696;
            }
        }
    }

    .__percents {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
        padding: 10px;
        background-color: #61bd4f;
        color: #fff;
        border-radius: 12px
    }
</style>
