<script>
    import LoaderDefault from './CLoaderDefault.vue';
    import {getConfig} from '../../config';

    /**
     *
     * @param {*} createElement
     * @param {Object} data
     * @param {Object} spinner
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
            const Config = getConfig(parent, 'loading');
            const CustomSpinner = Config.spinner;

            const ClassName = 'c-loading';
            const SpinnerClassName = `${ClassName}__spinner`;
            const TextClassName = `${ClassName}__text`;
            const children = [];
            const {
                text: propText = '',
                elevated: propElevated,
                dense: propDense,
            } = props;

            children.push(createSpinner(createElement, {class: SpinnerClassName}, CustomSpinner));

            if (propText !== '') {
                children.push(createElement('div', {class: TextClassName}, propText))
            }

            data.class = [data.class, ClassName, {
                [`is-elevated`]: !!propElevated,
                [`is-dense`]: !!propDense
            }];

            return createElement('div', data, children);
        }
    }
</script>
