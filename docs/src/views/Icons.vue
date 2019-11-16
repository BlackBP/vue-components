<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">
        <c-form-field>
            <c-text-input v-model="query"
                          leading="magnify"
                          placeholder="Поиск по иконкам..."
                          :trailing="loading ? 'loading mdi-spin' : ''"
                          @input="search"/>
        </c-form-field>

        <c-divider/>

        <template v-if="icons.length > 0">
            <c-chip leading="information"
                    color="info">
                Нажмите два раза по иконке, чтобы скопировать название
            </c-chip>

            <c-divider />

            <div class="icons-grid">
                <div v-for="icon in icons"
                     class="icons-grid__item"
                     :key="icon.id"
                     @dblclick="copyToClipboard(icon.name)">
                    <c-icon size="2rem"
                            :title="icon.name"
                            :name="icon.name"/>
                    <div style="margin-top: 0.5rem;">
                        {{ icon.name }}
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="text-center text-bold">
                <template v-if="loading">
                    Поиск...
                </template>
                <template v-else>
                    <template v-if="query !== ''">
                        Ничего не найдено
                    </template>
                    <template v-else>
                        Введите строку поиска...
                        <br>
                        <c-chip class="text-light" color="warn">
                            <small>не менее 1 символа</small>
                        </c-chip>
                    </template>
                </template>
            </div>
        </template>
    </layout-screen-card>
</template>

<script>
    import * as MDI_META from '@mdi/svg/meta.json';
    import {debounce, filter, size, some, toLower} from "../../../src/utils/helpers";
    import LayoutScreenCard from "./layouts/ScreenCard.vue";

    import {CGridRow} from "../../../src/components/grid";
    import {CGridCol} from "../../../src/components/grid";
    import {CIcon} from "../../../src/components/icon";
    import {CTextInput} from "../../../src/components/form-text-input";
    import {CFormField} from "../../../src/components/form-field";
    import {CDivider} from "../../../src/components/divider";
    import {CChip} from "../../../src/components/chip";

    /**
     *
     * @param str
     */
    const copyToClipboard = str => {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
    };

    export default {
        name: "ScreenIcons",
        components: {CChip, CDivider, LayoutScreenCard, CFormField, CTextInput, CIcon, CGridCol, CGridRow},
        data() {
            return {
                query: '',
                icons: [],
                loading: false
            }
        },
        methods: {
            search() {
                this.loading = true;
                this.parseIcons()
            },
            parseIcons: debounce(function () {
                let query = toLower(this.query);

                if (size(query) <= 1) {
                    this.icons = [];
                    this.loading = false;
                    return
                }

                this.icons = filter(MDI_META, icon => {
                    const selfMatch = toLower(icon.name).match(query);
                    const aliasesMatch = some(icon.aliases, alias => {
                        return toLower(alias).match(query)
                    });

                    return aliasesMatch || selfMatch
                });

                this.loading = false;
            }, 500),
            copyToClipboard(name = '') {
                if(size(name) > 0) {
                    copyToClipboard(name);
                    this.$notify.add(`Иконка: ${name}`, {
                        title: 'Скопировано в буфер обмена!'
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../src/styles/mixins";

    .icons-grid {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(12, 1fr);
        text-align: center;
        user-select: none;

        &__item {
            display: block;
            width: 100%;
            min-width: 0;
            height: auto;
            margin: 0;
            cursor: pointer;
        }
    }

    .mdi-spin:before {
        animation-duration: .5s !important;
    }

    @include media(xs) {
        .icons-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>