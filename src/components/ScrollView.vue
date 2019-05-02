<template>
    <vue-scroll ref="vuescroll"
                @handle-scroll="handleScroll">
        <slot></slot>
    </vue-scroll>
</template>

<script>
    export default {
        name: "c-scroll-view",
        props: {
            infiniteScroll: {
                type: Boolean,
                default: false,
                required: false
            },
            loadThreshold: {
                type: Number,
                default: 50,
                required: false
            }
        },
        data() {
            return {
                resolve: true,
                loading: false,
                completed: false
            }
        },
        methods: {
            scrollTo(x = 0, y = 0) {
                this.$refs.vuescroll.scrollTo({
                    x,
                    y
                })
            },
            handleScroll(vertical, horizontal, nativeEvent) {
                if(!this.infiniteScroll) {
                    return
                }

                if(this.loading || this.completed) {
                    return;
                }

                let threshold = this.loadThreshold;
                let target = nativeEvent.target;
                let scrollHeight = target.scrollHeight;
                let clientHeight = target.clientHeight;
                let maxScroll = scrollHeight - clientHeight - threshold;
                let vScroll = vertical.scrollTop;
                let canLoad = vScroll >= maxScroll;

                this.resolve = canLoad;

                if(!this.completed) {
                    if(canLoad) {
                        this.emitLoad(true);
                    }
                } else {
                    this.loading = false
                }
            },
            emitLoad: _.debounce(function () {
                if(this.resolve) {
                    this.resolve = false;
                    this.loading = true;

                    this.$emit('change', {
                        loaded: () => this.setLoaded(),
                        completed: () => this.setCompleted()
                    })
                }
            }, 300),
            setLoaded() {
                this.resolve = true;
                this.loading = false;
                this.completed = false;
            },
            setCompleted() {
                this.resolve = false;
                this.loading = false;
                this.completed = true;
            },
            resetInfiniteScroll() {
                this.resolve = true;
                this.loading = false;
                this.completed = false;
            }
        }
    }
</script>
