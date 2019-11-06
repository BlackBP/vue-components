<script>
    import LoaderDefault from './LoaderDefault.vue';
    import {getConfig} from '../../config';

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
            const Config = getConfig(parent, 'loading');
            const CustomSpinner = Config.spinner;

            const BaseClassName = 'c-loading';
            const ClassName = {
                spinner: `${BaseClassName}__spinner`,
                text: `${BaseClassName}__text`
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

            data.class = [data.class, BaseClassName, {
                [`${BaseClassName}--elevated`]: !!propElevated,
                [`${BaseClassName}--dense`]: !!propDense
            }];

            return h('div', data, content);
        }
    }
</script>
