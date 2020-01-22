<script lang="ts">
    import {CreateElement, FunctionalComponentOptions, RenderContext, VNode} from "vue"

    type LoadingProps = {
        text: string
        elevated: boolean
        dense: boolean
    }

    const ClassName = 'c-loading';
    const SpinnerClassName = `${ClassName}__spinner`;
    const TextClassName = `${ClassName}__text`;

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
        render(createElement: CreateElement, {props = <LoadingProps>{}, slots, data}: RenderContext<LoadingProps>): VNode {
            const {
                text: propText,
                elevated: propElevated,
                dense: propDense,
            } = props;

            const slotSpinner = slots().spinner;
            const slotText = slots().default;

            const text = slotText ? slotText : propText;
            const spinner = createElement('div', {
                class: 'c-loading-spinner'
            });

            data.class = [data.class, ClassName, {
                [`is-elevated`]: propElevated,
                [`is-dense`]: propDense
            }];

            return createElement('div', data, [
                createElement('div', {class: SpinnerClassName}, [
                    slotSpinner ? slotSpinner : spinner
                ]),
                text ? createElement('div', {class: TextClassName}, text) : null
            ]);
        }
    }
</script>
