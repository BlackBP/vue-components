<template>
    <div style="display: none; visibility: hidden; opacity: 0"></div>
</template>
<script>
    export default {
        name: "service-form-validate",
        model: {
            prop: 'errors',
            event: 'change'
        },
        props: {
            data: {
                type: Object,
                default: () => ({}),
                required: true
            },
            rules: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        watch: {
            data: {
                deep: true,
                handler(data, oldValue) {
                    let errors = {};

                    _.each(data, (value, key) => {
                        errors[key] = this.test(value, key)
                    });

                    this.$emit('change', errors)
                }
            }
        },
        methods: {
            test(value = '', key = '') {
                let errors = [];
                let rules = _.get(this.rules, key, {});

                _.each(rules, (condition, ruleName) => {
                    switch (ruleName) {
                        case 'required':
                            if(condition) {
                                errors.push(this.testIsRequired(value))
                            }
                            break;
                    }
                });

                return _.filter(errors, item => item !== '')
            },
            testIsRequired(value = '') {
                if(typeof value === 'number') {
                    value = _.isNaN(value) ? '' : value;
                    value = _.toString(value)
                }

                if(_.isEmpty(value)) {
                    return 'Обязательно для заполнения.'
                }

                return ''
            }
        },
    }
</script>
