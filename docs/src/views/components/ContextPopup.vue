<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-icon-btn icon="dots-vertical"
                    :transparent="true"
                    :dense="true"
                    @click.stop="$refs.userMenu.show"/>

        <c-context-popup ref="userMenu">
            <div class="u-flex u-flex-row u-flex-nowrap u-flex-items-center"
                 style="padding: 0 15px">
                <c-icon name="account-circle"
                        size="48px" style="margin-right: 10px;"/>
                <div>
                    <b>John Doe</b>
                    <br>
                    <c-chip>
                        <small>developer</small>
                    </c-chip>
                </div>
            </div>
        </c-context-popup>

        <c-divider/>

        <c-table :data="data"
                 :headers="{
                    id: 'ID',
                    name: 'Name'
                 }"
                 @row-contextmenu="showContextMenu">

        </c-table>

        <c-context-popup ref="menu">
            <template slot-scope="context">
                <c-list>
                    <c-list-item @click="removeItem(context.id)">
                        <c-icon name="delete"/>
                        Delete item #{{ context.id }}
                        <c-icon name="chevron-right"/>
                    </c-list-item>
                </c-list>
            </template>
        </c-context-popup>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard.vue";
    import {CContextPopup} from "../../../../src/components/context-popup";
    import {CList} from "../../../../src/components/list";
    import {CListItem} from "../../../../src/components/list";
    import {CIcon} from "../../../../src/components/icon";
    import {CTable} from "../../../../src/components/table";
    import {CIconBtn} from "../../../../src/components/icon-button";
    import {CChip} from "../../../../src/components/chip";
    import {CDivider} from "../../../../src/components/divider";

    export default {
        name: "ScreenContextPopup",
        components: {CDivider, CChip, CIconBtn, CTable, CIcon, CListItem, CList, CContextPopup, LayoutScreenCard},
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