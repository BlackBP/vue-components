<template>
    <div class="c-scroll-view">
        <slot/>
    </div>
</template>

<script>
    import ScrollTo from 'animated-scroll-to';

    export default {
        name: "c-scroll-view",
        props: {
            distance: {
                type: Number,
                default: 100,
                validator(value) {
                    return value >= 0;
                }
            },
            loadingDelay: {
                type: Number,
                default: 200,
                validator(value) {
                    return value >= 0;
                }
            },
            enableLoading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                complete: false,
                topDirection: false,
                scrollHeight: 0,
                scrollWidth: 0,
                scrollTop: 0,
                scrollLeft: 0,
                offsetHeight: 0,
                offsetWidth: 0,
            }
        },
        methods: {
            scrollTo(offset = 0) {
                ScrollTo(offset, {
                    element: this.$el
                })
            },
            scrollToEnd() {
                this.scrollTo(this.$el.scrollHeight)
            },
            scrollToTop() {
                this.scrollTo(0)
            },
            resetLoadingState() {
                this.loading = false;
                this.complete = false;
            }
        },
        mounted() {
            if (this.enableLoading) {
                const debouncedCB = _.debounce(() => {
                    this.loading = true;
                    this.$emit('loading', {
                        loaded: () => {
                            this.loading = false;
                            this.complete = false;
                        },
                        complete: () => {
                            this.loading = false;
                            this.complete = true;
                        }
                    })
                }, this.loadingDelay);

                this.scrollHeight = this.$el.scrollHeight;
                this.scrollWidth = this.$el.scrollWidth;
                this.scrollTop = this.$el.scrollTop;
                this.scrollLeft = this.$el.scrollLeft;
                this.offsetHeight = this.$el.offsetHeight;
                this.offsetWidth = this.$el.offsetWidth;

                this.$nextTick(() => {
                    this.$el.__vueScrollViewListener__ = event => {
                        const {
                            scrollHeight,
                            scrollWidth,
                            scrollTop,
                            scrollLeft,
                            offsetHeight,
                            offsetWidth,
                        } = event.target;

                        const LoadThreshold = Math.abs(scrollHeight - this.distance);
                        const CurrentScrollPosition = Math.abs(offsetHeight + scrollTop);
                        const isScrollYEnd = CurrentScrollPosition >= LoadThreshold;
                        const isTopDirection = this.scrollTop > scrollTop;

                        this.topDirection = isTopDirection;
                        this.scrollHeight = scrollHeight;
                        this.scrollWidth = scrollWidth;
                        this.scrollTop = scrollTop;
                        this.scrollLeft = scrollLeft;
                        this.offsetHeight = offsetHeight;
                        this.offsetWidth = offsetWidth;

                        if (isTopDirection) {
                            debouncedCB.cancel();
                        } else {
                            if (isScrollYEnd) {
                                if (!this.loading && !this.complete) {
                                    debouncedCB();
                                }
                            } else {
                                debouncedCB.cancel();
                            }
                        }
                    };

                    this.$el.addEventListener('scroll', this.$el.__vueScrollViewListener__);
                })
            }
        },
        beforeDestroy() {
            if (this.enableLoading) {
                this.$el.removeEventListener('scroll', this.$el.__vueScrollViewListener__);
            }
        }
    }
</script>

<style scoped>
    .c-scroll-view {
        display: block;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>