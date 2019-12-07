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
        render(createElement, {data = {}, props = {}, children, parent = {}}) {
            let {
                header: propHeader = '',
                icon: propIcon = ''
            } = props;

            if(parent.$route) {
                if(parent.$route.meta) {
                    const {
                        title: routeTitle = '',
                        icon: routeIcon = ''
                    } = parent.$route.meta;

                    propHeader = propHeader !== '' ? propHeader : routeTitle;
                    propIcon = propIcon !== '' ? propIcon : routeIcon;
                }
            }

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

            const hasHeader = propHeader !== '';
            const hasIcon = propIcon !== '';

            data.class = [data.class, 'elevate-3'];
            data.props = props;

            return createElement(CCard, data, [
                createElement('h2', titleData, [
                    hasIcon ? createElement(CIcon, iconData) : null,
                    hasHeader ? propHeader : null
                ]),
                (hasIcon || hasHeader) ? createElement(CDivider) : null,
                children
            ])
        }
    }
</script>