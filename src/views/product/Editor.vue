<template>
    <c-card class="u-h100 u-flex u-flex-column u-flex-content-start"
            :loading="isLoading">

        <div class="row">
            <div class="col-6">
                <h3 class="u-m0">
                    <c-icon-btn icon="arrow-left"
                                :transparent="true"
                                @click="$router.back()" />
                    Назад
                </h3>
            </div>
            <div class="col-6 u-text-right">
                <c-btn color="primary"
                       icon-left="content-save">
                    Сохранить
                </c-btn>
            </div>
        </div>

        <hr>

        <div class="row u-h100">

            <div class="col-2">
                <c-list>
                    <c-list-item v-for="menuItem in menu"
                                 :key="`product-editor-${menuItem.code}`"
                                 :class="menuItem.code === currentForm ? 'is-active' : ''"
                                 @click="viewForm(menuItem.code)">
                        <c-icon slot="start"
                                size="1.25rem"
                                :name="menuItem.icon" />
                        {{ menuItem.title }}
                    </c-list-item>

                </c-list>
            </div>

            <div class="col-10 u-h100">
                <c-scroll-view>
                    <component :is="currentFormComponent"></component>
                </c-scroll-view>
            </div>

        </div>

    </c-card>
</template>

<script>
    import CCard from "../../components/Card";
    import CScrollView from "../../components/ScrollView";
    import CIconBtn from "../../components/IconButton";
    import CBtn from "../../components/Button";
    import CIcon from "../../components/Icon";
    import CList from "../../components/List";
    import CListItem from "../../components/ListItem";

    // Forms
    import FormMain from './FormMain';
    import FormProps from './FormProps';
    import FormMods from './FormMods';
    import FormVariants from './FormVariants';

    /**
     *
     * @param code
     * @param title
     * @param icon
     * @param componentName
     * @return {{code: *, icon: *, componentName: *, title: *}}
     */
    function createMenuItem(code, title, icon, componentName) {
        return {
            code,
            title,
            icon,
            componentName
        }
    }

    const MENU_ITEMS = {
        main: 'main',
        props: 'props',
        mods: 'mods',
        variants: 'variants',
    };

    const EditorMenu = {
        [MENU_ITEMS.main]: createMenuItem(MENU_ITEMS.main, 'Основные данные', 'file-document-box', 'FormMain'),
        [MENU_ITEMS.props]: createMenuItem(MENU_ITEMS.props, 'Характеристики', 'shape-plus', 'FormProps'),
        [MENU_ITEMS.mods]: createMenuItem(MENU_ITEMS.mods, 'Модификаторы', 'file-tree', 'FormMods'),
        [MENU_ITEMS.variants]: createMenuItem(MENU_ITEMS.variants, 'Варианты', 'folder-multiple', 'FormVariants'),
    };

    export default {
        name: "view-product-editor",
        components: {
            CListItem,
            CList,
            CIcon,
            CBtn,
            CIconBtn,
            CScrollView,
            CCard,
            FormMain,
            FormProps,
            FormMods,
            FormVariants,
        },
        props: {
            isEdit: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        data() {
            return {
                isLoading: true,
                currentForm: `${EditorMenu.main.code}`
            }
        },
        watch: {
            '$route' (to, from) {
                console.log(to);
            }
        },
        computed: {
            menu() {
                this.viewForm(EditorMenu.main.code);

                if(this.isEdit) {
                    return  [
                        EditorMenu.main,
                        EditorMenu.props,
                        EditorMenu.mods,
                        EditorMenu.variants
                    ]
                }

                return [
                    EditorMenu.main
                ]
            },
            currentFormComponent() {
                return EditorMenu[this.currentForm].componentName
            }
        },
        methods: {
            viewForm(code) {
                if(EditorMenu.hasOwnProperty(code)) {
                    this.currentForm = code;
                } else {
                    alert('!!!');
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.isLoading = false;
            }, 0)
        }
    }
</script>
