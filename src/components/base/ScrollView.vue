<template>
    <vue-scroll @handle-scroll="handleScroll">
        <slot></slot>
    </vue-scroll>
</template>

<script>
    import CLoading from "./Loading";

    export default {
        name: "c-scroll-view",
        components: {
            CLoading
        },
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
                loading: false,
                completed: false
            }
        },
        methods: {
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

                if(!this.completed) {
                    if(vScroll >= maxScroll) {
                        this.setLoading(true);
                    }
                } else {
                    this.loading = false
                }
            },
            setLoading: _.debounce(function (state) {
                this.loading = !!state;
                this.$emit('change', {
                    loaded: () => this.setLoaded(),
                    completed: () => this.setCompleted()
                })
            }, 300),
            setLoaded() {
                this.loading = false;
            },
            setCompleted() {
                this.completed = true;
                this.loading = false;
            }
        }
    }
</script>
