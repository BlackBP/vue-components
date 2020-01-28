<script>
    import _ from 'lodash'
    import FormFieldService from "./FormFieldService"
    import createLabel from "./createLabel"
    import createFooter from "./createFooter"
    import createHelper from "./createHelper"
    import createCounter from "./createCounter"
    import createField from "./createField"

    const ClassName = 'c-form-field';

    export default {
        name: "c-form-field",
        functional: true,
        props: {
            label: {
                type: String,
                default: '',
            },
            labelFor: {
                type: String,
                default: '',
            },
            showCount: {
                type: Boolean,
                default: false
            },
            countValue: {
                type: [String, Number, Array],
                default: ''
            },
            countMax: {
                type: [String, Number],
                default: ''
            },
            error: {
                type: [String, Array],
                default: ''
            },
            helper: {
                type: String,
                default: ''
            },
        },
        render(createElement, {data, props, scopedSlots = {}}) {
            data.class = [data.class, ClassName];

            const {
                label: propLabel,
                labelFor: propLabelFor,
                error: propError,
                helper: propHelper,
                countValue: propCountValue,
                countMax: propCountMax,
                showCount: propShowCount,
            } = props;

            const errorText = FormFieldService.getErrorText(propError);
            const countValueSize = FormFieldService.getCountValueSize(propCountValue);
            const hasError = FormFieldService.getErrorSize(errorText);
            const hasHelper = _.size(propHelper) > 0;
            const hasCounter = countValueSize > 0;

            return createElement('div', data, [

                // The Label
                createLabel(createElement, `${ClassName}__label`, {
                    label: propLabel,
                    labelFor: propLabelFor
                }),

                // The field
                createField(createElement, `${ClassName}__field`, {
                    state: hasError ? 'has-error' : '',
                    hasError: hasError
                }, scopedSlots.default),

                // The footer
                createFooter(createElement, `${ClassName}__footer`, {
                    hasError: hasError,
                    hasHelper: hasHelper,
                    hasCounter: hasCounter,
                }, [

                    // The helper
                    createHelper(createElement, `${ClassName}__helper`, {
                        errorText: errorText,
                        helperText: propHelper
                    }),

                    // The counter
                    createCounter(createElement, `${ClassName}__counter`, {
                        count: countValueSize,
                        countMax: propCountMax,
                        showCount: propShowCount
                    })
                ])
            ])
        }
    }
</script>