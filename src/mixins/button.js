export default {
    props: {
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: [String, Boolean],
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        bordered: {
            type: Boolean,
            default: false
        },
        elevated: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    }
}