<template>
    <form action="#"
          @submit.prevent="onSubmit">

        <template v-if="ready">

            <c-form-row>
                <slot name="header" />
            </c-form-row>

            <c-form-row v-for="field in config"
                        :key="field.key">

                <template v-if="field.type === 'switch'">
                    <c-switch v-model="fieldsData[field.key]"
                              v-bind="field.props">
                        <slot :name="`field-${field.key}`"/>
                    </c-switch>
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <c-checkbox v-model="fieldsData[field.key]"
                                v-bind="field.props">
                        <slot :name="`field-${field.key}`"/>
                    </c-checkbox>
                </template>

                <template v-else-if="field.type === 'radio'">
                    <c-radio v-model="fieldsData[field.key]"
                             v-bind="field.props">
                        <slot :name="`field-${field.key}`"/>
                    </c-radio>
                </template>

                <template v-else-if="field.type === 'text-input'">
                    <c-text-input v-model="fieldsData[field.key]"
                                  v-bind="field.props"
                                  :errors="fieldsErrors[field.key]"/>
                </template>

                <template v-else-if="field.type === 'text-area'">
                    <c-text-area v-model="fieldsData[field.key]"
                                 v-bind="field.props"
                                 :errors="fieldsErrors[field.key]"/>
                </template>

                <template v-else-if="field.type === 'select'">
                    <c-select v-model="fieldsData[field.key]"
                              v-bind="field.props"
                              :errors="fieldsErrors[field.key]"/>
                </template>

                <template v-else>
                    Некорректная конфигурация
                </template>

            </c-form-row>

            <c-form-row>
                <slot name="footer" />
            </c-form-row>

            <c-service-form-validate v-model="fieldsErrors"
                                     :data="fieldsData"
                                     :rules="validateRules"/>
        </template>

        <template v-else>
            Форма не готова
        </template>

    </form>
</template>

<script>
    /**
     *
     * @param {String} key
     * @param {String} type
     * @param {*} defaultValue
     * @param {Boolean} required
     * @param {Object} [props]
     * @param {String} [label]
     * @return {{default: *, type: String, key: String, required: Boolean, props: {}, label: String}}
     */
    function createField(key, type = '', defaultValue = null, required = false, props = {}, label = '') {
        const field = {
            key,
            type,
            required,
            props,
            label
        };

        Object.defineProperty(field, 'default', {
            enumerable: true,
            get() {
                if (typeof defaultValue === 'function') {
                    return defaultValue()
                }

                return defaultValue
            },
        });

        return field
    }

    export default {
        name: "c-form",
        props: {
            config: {
                type: Object,
                required: true
            },
            data: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                ready: false,
                fieldsData: {},
                fieldsErrors: {},
            }
        },
        computed: {
            validateRules() {
                return _.reduce(this.config, (total, {key, required}) => {
                    total[key] = {
                        required
                    };
                    return total
                }, {})
            }
        },
        methods: {
            /**
             *
             */
            onSubmit() {
                this.$emit('submit', {...this.fieldsData});
            }
        },
        mounted() {
            this.ready = false;

            this.fieldsData = _.reduce(this.config, (total, {key, default: defaultValue}) => {
                total[key] = _.get(this.data, key, defaultValue);
                return total
            }, {});

            this.fieldsErrors = _.reduce(this.config, (total, {key}) => {
                total[key] = [];
                return total
            }, {});

            this.$nextTick(() => {
                this.ready = true;
            })
        },
        createField: createField
    }
</script>