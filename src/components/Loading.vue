<script>
    import Vue from 'vue'
    import LoaderDefault from "./loaders/LoaderDefault.vue";

    /**
     *
     * @param {Function} createElement
     * @param {Object} data
     * @param {Vue} spinner
     * @return {*}
     */
    function createSpinner(createElement, data, spinner) {
        return createElement('div', data, [
            createElement(spinner ? spinner : LoaderDefault)
        ])
    }

    export default {
        name: "c-loading",
        functional: true,
        props: {
            text: {
                type: String,
                default: 'Загрузка...',
            },
            elevated: {
                type: Boolean,
                default: false,
            },
            dense: {
                type: Boolean,
                default: false,
            }
        },
        render(createElement, {props, data, parent}) {
            const config = _.get(parent, '$bbpComponentsConfig.loading', {});
            const CustomSpinner = config.spinner;

            let baseClass = 'c-loading';
            let content = [];
            let spinnerWrapData = {
                class: `${baseClass}__spinner`
            };
            let textWrapData = {
                class: `${baseClass}__text`
            };

            content.push(createSpinner(createElement, spinnerWrapData, CustomSpinner));

            if (props.text) {
                content.push(createElement('div', textWrapData, props.text))
            }

            data.class = [data.class, {
                [`${baseClass}`]: true,
                [`--elevated`]: !!props.elevated,
                [`--dense`]: !!props.dense
            }];

            return createElement('div', data, content);
        }
    }
</script>
