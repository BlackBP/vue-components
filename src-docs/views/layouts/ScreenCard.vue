<script>
    import {CCard} from "../../../src/components/card";
    import {CDivider} from "../../../src/components/divider";
    import {CIcon} from "../../../src/components/icon";

    export default {
        name: "LayoutScreenCard",
        functional: true,
        props: {
            header: String,
            icon: String
        },
        render(createElement, {data, props, children}) {
            const {
                header: propHeader,
                icon: propIcon
            } = props;

            const titleData = {
                style: {
                    display: 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                }
            };

            const iconData = {
                style: {
                    'margin-right': '10px'
                },
                props: {
                    name: propIcon
                }
            };

            data.class = [data.class, 'elevate-3'];
            data.props = props;

            return createElement(CCard, data, [
                createElement('h2', titleData, [
                    propIcon ? createElement(CIcon, iconData) : null,
                    propHeader
                ]),
                createElement(CDivider),
                children
            ])
        }
    }
</script>