<template>
    <c-loading-overlay loading-text=""
                       :loading="loading"
                       :loading-dense="true">
        <h4 class="u-flex u-flex-content-between u-flex-items-center">
            <b>Категории</b>
            <c-icon-btn icon="plus"
                        :dense="true"
                        :transparent="true"/>
        </h4>
        <c-tree-view :data="list"
                     :active-item="active"
                     @clickitem="changeActiveCategory">
        </c-tree-view>
    </c-loading-overlay>
</template>

<script>
    import CTreeView from "../../components/TreeView";
    import CLoadingOverlay from "../../../components/LoadingOverlay";
    import CIconBtn from "../../../components/IconButton";

    export default {
        name: "widget-categories-tree",
        components: {
            CIconBtn,
            CLoadingOverlay,
            CTreeView
        },
        props: {
            active: {
                type: [Number, String],
                default: '',
                required: false
            }
        },
        data() {
            return {
                loading: true,
                list: []
            }
        },
        methods: {
            async getData() {
                this.loading = true;

                try {
                    let res = await this.$api.productCategory.getList();
                    this.loading = false;
                    this.list = _.get(res, 'data.data', []);
                } catch (e) {
                    this.loading = false;
                }
            },
            changeActiveCategory(data) {
                this.$emit('change', data.id);
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
