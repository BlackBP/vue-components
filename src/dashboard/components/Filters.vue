<template>
    <div>
        <template v-if="hasConfig">
            <div class="u-flex u-flex-row u-flex-content-start">
                <template v-for="(field, fieldKey) in config">
                    <template v-if="fieldKey in data">


                        <template v-if="field.type === 'input'">
                            <c-text-input v-model="data[fieldKey]"
                                          v-bind="field.props"
                                          :key="`filter-item-${fieldKey}`"/>
                        </template>


                    </template>
                </template>

                <c-btn color="primary"
                       @click="emitChange">
                    Apply
                </c-btn>
            </div>
        </template>

        <template v-else>
            <c-chip color="info">No filters</c-chip>
        </template>
    </div>
</template>

<script>
    import CChip from "../../components/Chip";
    import CTextInput from "../../components/TextInput";
    import CBtn from "../../components/Button";
    export default {
        name: "c-filters",
        components: {CBtn, CTextInput, CChip},
        model: {
            event: 'change'
        },
        props: {
            value: {
                type: null,
                default: () => ({})
            },
            config: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        data() {
            return {
                data: {}
            }
        },
        computed: {
            hasConfig() {
                return !_.isEmpty(this.config);
            }
        },
        methods: {
            getData() {
                return _.reduce(this.data, (total, value, key) => {

                    if (!_.isEmpty(value)) {
                        total[key] = value
                    }

                    return total
                }, {})
            },
            emitChange() {
                this.$emit('change', this.getData())
            }
        },
        beforeMount() {
            this.data = _.reduce(this.value, (total, value, key) => {
                total[key] = value;

                return total;
            }, {})
        }
    }
</script>
