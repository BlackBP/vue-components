<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <div>
            <c-icon-btn icon="dots-vertical"
                        :transparent="true"
                        :dense="true"
                        @click.stop="showContextMenu($event, {id: 2}, 2)" />
        </div>

        <c-divider />

        <c-table :data="data"
                 :headers="{
                    id: 'ID',
                    name: 'Name'
                 }"
                 @row-contextmenu="showContextMenu">

        </c-table>

        <c-context-popup ref="menu">
            <template slot-scope="context">
                <c-context-popup-item leading="pencil"
                                      trailing="chevron-right"
                                      :text="`Edit item #${context.id}`"/>

                <c-context-popup-item leading="delete"
                                      trailing="chevron-right"
                                      :text="`Delete item #${context.id}`"
                                      @click.native="removeItem(context.id)" />

                <c-context-popup-item leading="content-copy"
                                      trailing="chevron-right"
                                      :text="`Copy item #${context.id}`" />

                <c-divider />

                <c-context-popup-item leading="plus"
                                      trailing="chevron-right"
                                      text="Add new" />
            </template>
        </c-context-popup>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard";
    import CTable from "../../../components/Table";
    import CContextPopupItem from "../../../components/ContextPopupItem";

    export default {
        name: "ScreenContextPopup",
        components: {CContextPopupItem, CTable, LayoutScreenCard},
        data() {
            return {
                data: _.map(Array(50), (item, index) => {
                    index = index + 1;

                    return {
                        id: index,
                        name: `Item #${index}`
                    }
                })
            }
        },
        methods: {
            showContextMenu(event, rowData = {}, rowIndex) {
                event.preventDefault();
                this.$refs.menu.show(event, {
                    ...rowData,
                    index: rowIndex
                });
            },
            removeItem(id) {
                this.data = _.filter(this.data, item => {
                    return item.id !== id
                })
            }
        },
    }
</script>