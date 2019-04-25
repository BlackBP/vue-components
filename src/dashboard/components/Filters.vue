<template>
    <div class="c-filters-form">
        <template v-if="hasConfig">
            <template v-for="(field, fieldKey) in config">
                <template v-if="fieldKey in data">

                    <c-form-row>
                        <template v-if="field.type === 'input'">
                            <c-text-input v-model="data[fieldKey]"
                                          v-bind="field.props ? field.props : {}"
                                          :key="`filter-item-${fieldKey}`"/>
                        </template>

                        <template v-else-if="field.type === 'checkbox'">
                            <c-checkbox v-model="data[fieldKey]"
                                        v-bind="field.props ? field.props : {}"
                                        :key="`filter-item-${fieldKey}`">
                                {{ field.label }}
                            </c-checkbox>
                        </template>

                    </c-form-row>

                </template>
            </template>

            <c-btn color="primary"
                   @click="emitChange">
                Применить
            </c-btn>
        </template>

        <template v-else>
            <c-chip color="error">Конфигурация отсутствует</c-chip>
        </template>
    </div>
</template>

<script>
    import CChip from "../../components/Chip";
    import CBtn from "../../components/Button";
    import CFormRow from "../../components/FormRow";
    import CTextInput from "../../components/TextInput";
    import CCheckbox from "../../components/Checkbox";

    export default {
        name: "c-filters-form",
        components: {CCheckbox, CTextInput, CFormRow, CBtn, CChip},
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

                    if(_.isBoolean(value)) {
                        total[key] = value;
                        return total
                    }

                    if(_.isNumber(value) && !_.isNaN(value)) {
                        total[key] = value;
                        return total
                    }

                    if (!_.isEmpty(value)) {
                        total[key] = value
                    }

                    return total
                }, {})
            },
            emitChange() {
                console.log('[Filters]', this.getData());
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
