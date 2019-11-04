import _ from '../utils';

const MODEL = {
    prop: 'value',
    event: 'change',
};

export default {
    model: MODEL,
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        helper: {
            type: String,
            default: '',
        },
        value: {
            type: null,
            default: ''
        },
        errors: {
            type: Array,
            default: () => [],
        },
        showCounter: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 100,
        }
    },
    data() {
        return {
            focused: false,
            valueLength: 0
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.valueLength = _.toString(value).length;
                this.$emit(MODEL.event, value);
            }
        },
        hasErrors() {
            if (_.isArray(this.errors)) {
                return !_.isEmpty(this.errors)
            }

            return false;
        },
        helperText() {
            let text = this.helper;

            if (this.hasErrors) {
                text = this.errors.join(', ');
            }

            return text;
        },
        fieldRef() {
            return this.$refs.field;
        }
    },
    methods: {
        focus() {
            this.$refs.field.focus();
        },
        handleChange(event) {
            this.$emit(MODEL.event, event)
        },
        handleKeyPress(event) {
            this.$emit('keypress', event)
        }
    }
}