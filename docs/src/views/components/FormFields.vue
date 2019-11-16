<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">
        <c-stack-group justify="start"
                       :wrap="true">
            <c-stack-item>
                <c-switch v-model="enableErrors">
                    Enable errors
                </c-switch>
            </c-stack-item>
        </c-stack-group>

        <c-stack-group justify="start"
                       :wrap="true">
            <c-stack-item>
                <c-checkbox v-model="enableErrors">
                    Enable errors
                </c-checkbox>
            </c-stack-item>
        </c-stack-group>

        <c-stack-group justify="start"
                       :wrap="true">
            <c-stack-item>
                <c-radio v-model="radio"
                         value="">
                    Default
                </c-radio>
            </c-stack-item>

            <c-stack-item>
                <c-radio v-model="radio"
                         value="disabled">
                    Disabled
                </c-radio>
            </c-stack-item>

            <c-stack-item>
                <c-radio v-model="radio"
                         value="readonly">
                    Readonly
                </c-radio>
            </c-stack-item>
        </c-stack-group>

        <c-divider/>

        <c-form @submit.prevent>
            <c-form-field label="Text input label:"
                          label-for="input">
                <c-text-input v-model="input"
                              placeholder="Type here"
                              field-id="input"
                              leading="send"
                              id="input"
                              :show-counter="true"
                              :max-length="5"
                              :helper="input"
                              :disabled="radio === 'disabled'"
                              :readonly="radio === 'readonly'"
                              :errors="enableErrors ? errors.input : ''">
                    <c-icon-btn slot="trailing"
                                icon="close"
                                size="xs"
                                :transparent="true"
                                @click="input = ''"/>
                </c-text-input>
            </c-form-field>
            <c-form-field label="Textarea label:"
                          label-for="textarea">
                <c-text-input v-model="area"
                              helper="Some fancy helper"
                              placeholder="Type here"
                              rows="5"
                              id="textarea"
                              :show-counter="true"
                              :max-length="5"
                              :multiline="true"
                              :disabled="radio === 'disabled'"
                              :readonly="radio === 'readonly'"
                              :errors="enableErrors ? errors.textArea : ''"/>
            </c-form-field>

            <c-form-field label="Select label:"
                          label-for="select">
                <c-select v-model="select"
                          id="select"
                          placeholder="Select here"
                          track-by="id"
                          option-text="name"
                          group-values="children"
                          group-text="name"
                          max="5"
                          :disabled="disabled"
                          :toggleable="false"
                          :multiple="true"
                          :searchable="true"
                          :options="selectOptions"
                          :errors="enableErrors ? errors.select : ''">

                </c-select>
            </c-form-field>

        </c-form>
    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard.vue";

    const createOptions = (size = 50, isChild = false, parentId = 0) => {
        return [...Array(size)].map((item, index) => {
            let id = index + 1;
            let name = `Option ${id}`;

            return {
                id: isChild ? `${parentId}-${id}` : id,
                name: isChild ? `Option ${parentId} - child ${id}` : name,
                children: isChild ? [] : createOptions(size, true, id)
            }
        })
    };

    export default {
        name: "ScreenFormFields",
        components: {
            LayoutScreenCard
        },
        data() {
            return {
                input: '',
                area: '',
                select: true,
                selectOptions: createOptions(10, false),
                disabled: false,
                enableErrors: false,
                radio: '',
                errors: {
                    input: 'Some error',
                    textArea: ['Some error', 'One more error'],
                    select: ['Some error', 'One more error'],
                }
            }
        },
        methods: {
            alert(msg) {
                alert(msg);
            }
        }
    }
</script>