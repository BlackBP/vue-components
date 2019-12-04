export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        helper: {
            type: String,
            default: ''
        },
        errors: {
            type: [String, Array],
            default: ''
        },
        showCounter: {
            type: Boolean,
            default: false
        },
    }
}