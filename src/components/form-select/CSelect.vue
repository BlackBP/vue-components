<template>
    <div class="c-select">

        <div ref="field"
             class="c-select__field"
             :class="fieldClassName"
             @click.self="showList">

            <template v-if="hasSelected">
                <template v-for="selectedItem in selected">
                    <template v-if="multiple">
                        <c-chip trailing="close"
                                class="c-select__selected is-multiple"
                                :key="getOptionId(selectedItem)"
                                @mousedown.prevent
                                @click="removeOption(selectedItem)">
                            {{ getOptionText(selectedItem) }}
                        </c-chip>
                    </template>

                    <template v-else>
                        <span class="c-select__selected">
                            {{ getOptionText(selectedItem) }}
                        </span>
                    </template>
                </template>
            </template>

            <input ref="input"
                   type="text"
                   class="c-select__input"
                   :id="inputId"
                   :placeholder="inputPlaceholder"
                   :disabled="disabled"
                   :readonly="!searchable || readonly"
                   :value="query"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onSearch">

            <c-icon class="c-select__toggle"
                    :name="iconClassName"
                    @click="showList"/>
        </div>

        <transition name="c-select"
                    @after-enter="onAfterListShow"
                    @after-leave="onAfterListHide">

            <div v-show="focused"
                 ref="list"
                 class="c-select__list">

                <div v-if="hasMax || !hasOptions"
                     class="c-select__list-info">

                    <template v-if="hasMax">
                        <c-chip color="info"
                                leading="information">
                            {{ maxPlaceholder }} ({{ selectedCount }}/{{ max }})
                        </c-chip>
                    </template>

                    <template v-if="!hasOptions">
                        {{ emptyPlaceholder }}
                    </template>
                </div>

                <div v-if="hasOptions"
                     class="c-select__list-options"
                     @mousedown.prevent>
                    <template v-for="(option, optionIndex) in parsedOptions">
                        <div class="c-select__option"
                             :class="getOptionClassName(option, optionIndex)"
                             :key="option.id"
                             tabindex="-1"
                             @click="onSelect(option)">
                            {{ option.text }}
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" src="./main.ts"></script>
