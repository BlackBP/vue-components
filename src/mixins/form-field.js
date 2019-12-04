export default {
    props: {
        id: {
            type: String,
            default: '',
        },
        value: {
            type: null,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            focused: false
        }
    },
    computed: {
        /**
         *
         * @return {String|Boolean}
         */
        inputId() {
            let id = this.id;
            return id !== '' ? id : false
        },
    },
    methods: {
        /**
         *
         * @return {Vue | Element | Vue[] | Element[]}
         */
        getFieldRef() {
            return this.$refs.field;
        },

        /**
         *
         * @param event
         */
        onFocus(event) {
            this.focused = true;
            this.$emit('focus', event)
        },

        /**
         *
         * @param event
         */
        onBlur(event) {
            this.focused = false;
            this.$emit('blur', event)
        },

        /**
         *
         * @param event
         */
        onKeyDown(event) {
            this.$emit('keydown', event)
        },

        /**
         *
         * @param event
         */
        onKeyUp(event) {
            this.$emit('keyup', event)
        }
    }
}