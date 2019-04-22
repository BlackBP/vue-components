<template>

    <div class="c-tree-view">

        <div v-show="!hasData">
            Список пуст
        </div>

        <div v-show="hasData"
             class="c-tree-view__items">

            <template v-for="(node, index) in parsedData">

                <div :key="`tree-view-node-${node[trackBy]}`"
                     :class="node.isActive ? 'is-active' : ''"
                     @click.prevent.stop="handleClickOnItem(node)"
                     class="c-tree-view-item">

                    <div class="c-tree-view-item__wrap">
                        <c-icon v-if="icon"
                                :name="node.isGroup ? groupIcon : icon"
                                class="c-tree-view-item__icon"/>

                        <div class="c-tree-view-item__label">
                            {{ node[label] }}
                        </div>
                    </div>

                    <template v-if="node.hasOwnProperty(childLabel)">
                        <c-tree-view v-if="node[childLabel].length > 0"
                                     :data="node[childLabel]"
                                     :icon="icon"
                                     :label="label"
                                     :track-by="trackBy"
                                     :active-item="parsedActiveItem"
                                     :child-label="childLabel"
                                     @clickitem="handleClickOnItem"
                                     class="c-tree-view__nested"/>
                    </template>

                </div>

            </template>

        </div>

    </div>

</template>

<script>
    import CIcon from "../../components/Icon";

    export default {
        name: "c-tree-view",
        components: {CIcon},
        props: {
            data: {
                type: Array,
                default: () => [],
                required: true
            },
            label: {
                type: String,
                default: 'name',
                required: false
            },
            icon: {
                type: String,
                default: 'folder',
                required: false
            },
            groupIcon: {
                type: String,
                default: 'folder-multiple',
                required: false
            },
            childLabel: {
                type: String,
                default: 'children',
                required: false
            },
            trackBy: {
                type: String,
                default: 'id',
                required: false
            },
            activeItem: {
                type: [Number, String],
                default: '',
                required: false
            }
        },
        computed: {
            parsedActiveItem() {
                let id = +this.activeItem;
                return _.isNaN(id) ? '' : id
            },
            hasData() {
                return !_.isEmpty(this.data);
            },
            parsedData() {
                return this.parseData(this.data);
            }
        },
        methods: {
            handleClickOnItem(item) {
                this.$emit('clickitem', item.value);
            },
            parseData(data) {
                return _.map(data, (item) => {
                    let itemId = _.get(item, this.trackBy, '');
                    let childs = _.get(item, this.childLabel, []);
                    let isGroup = false;

                    if(_.isArray(childs)) {
                        if(childs.length > 0) {
                            isGroup = true;
                            childs = this.parseData(childs);
                        }
                    }

                    return {
                        [this.trackBy]: itemId,
                        [this.label]: _.get(item, this.label, ''),
                        [this.childLabel]: childs,
                        isActive: this.parsedActiveItem === itemId,
                        isGroup: isGroup,
                        value: item
                    }
                })
            }
        }
    }
</script>
