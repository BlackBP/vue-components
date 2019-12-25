const MixinFormSwitches = {
    props: {
        model: {
            type: null
        },
        value: {
            type: null
        },
        name: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        className() {
            return {
                'is-active': this.checked,
                'is-disabled': this.disabled
            }
        }
    }
};

export default MixinFormSwitches