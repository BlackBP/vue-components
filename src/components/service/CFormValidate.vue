<script>
    import {
        each,
        get,
        filter,
        isNumber,
        isNaN,
        toString,
        isEmpty
    } from '../../utils/helpers';

    export default {
        name: "c-service-form-validate",
        model: {
            prop: 'errors',
            event: 'change'
        },
        props: {
            errors: {
                type: Object,
                default: () => ({})
            },
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
                handler(data) {
                    let errors = {};

                    each(data, (value, key) => {
                        errors[key] = this.test(value, key)
                    });

                    // this.$nextTick(() => {
                    this.$emit('change', errors)
                    // })
                }
            }
        },
        methods: {
            test(value = '', key = '') {
                let errors = [];
                let rules = get(this.rules, key, {});

                each(rules, (condition, ruleName) => {
                    switch (ruleName) {
                        case 'required':
                            if (condition) {
                                errors.push(this.testIsRequired(value))
                            }
                            break;
                    }
                });

                return filter(errors, item => item !== '')
            },
            testIsRequired(value = '') {
                if (isNumber(value)) {
                    value = isNaN(value) ? '' : value;
                    value = toString(value)
                }

                if (isEmpty(value)) {
                    return 'Обязательно для заполнения.'
                }

                return ''
            }
        },
        render(createElement) {
            return createElement('div', {
                style: {
                    display: 'none',
                    visibility: 'hidden',
                    opacity: 0
                }
            })
        }
    }
</script>
