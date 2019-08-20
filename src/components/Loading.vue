<script>
    import Vue from 'vue'
    import LoaderDefault from "./loaders/LoaderDefault.vue";
    import {getConfig} from '../utils.js'

    /**
     *
     * @param {*} createElement
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
        render(h, {props, data, parent}) {
            const config = getConfig(parent, 'loading');
            const CustomSpinner = config.spinner;

            const baseClassName = 'c-loading';
            const ClassName = {
                spinner: `${baseClassName}__spinner`,
                text: `${baseClassName}__text`
            };
            const content = [];
            const {
                text: propText = '',
                elevated: propElevated,
                dense: propDense,
            } = props;

            content.push(createSpinner(h, {class: ClassName.spinner}, CustomSpinner));

            if (propText !== '') {
                content.push(h('div', {class: ClassName.text}, propText))
            }

            data.class = [data.class, baseClassName, {
                [`--elevated`]: !!propElevated,
                [`--dense`]: !!propDense
            }];

            return h('div', data, content);
        }
    }
</script>
