<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <c-service-form-validate v-model="errors"
                                 :data="data"
                                 :rules="validateRules"/>

        <!-- Text input -->
        <c-card-section>
            <h3>
                Text Input
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>Regular</h4>
                        </c-form-row>
                        <c-form-row v-for="field in fieldsMeta"
                                    :key="field.key">
                            <c-text-input v-model="data[field.key]"
                                          :type="field.type"
                                          :mask="field.mask"
                                          :placeholder="field.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With leading icon</h4>
                        </c-form-row>
                        <c-form-row v-for="field in fieldsMeta"
                                    :key="field.key">
                            <c-text-input v-model="data[field.key]"
                                          :type="field.type"
                                          :mask="field.mask"
                                          :leading="field.leading"
                                          :placeholder="field.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With trailing icon</h4>
                        </c-form-row>
                        <c-form-row v-for="field in fieldsMeta"
                                    :key="field.key">
                            <c-text-input v-model="data[field.key]"
                                          :type="field.type"
                                          :mask="field.mask"
                                          :trailing="field.trailing"
                                          :placeholder="field.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With leading and trailing icons</h4>
                        </c-form-row>
                        <c-form-row v-for="field in fieldsMeta"
                                    :key="field.key">
                            <c-text-input v-model="data[field.key]"
                                          :type="field.type"
                                          :mask="field.mask"
                                          :leading="field.leading"
                                          :trailing="field.trailing"
                                          :placeholder="field.placeholder"
                                          :errors="errors[field.key]"/>
                        </c-form-row>
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

        <!-- Text area -->
        <c-card-section>
            <h3>
                Text Area
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

        <!-- Select -->
        <c-card-section>
            <h3>
                Select
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                        <c-select v-model="selected"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Select"
                                  :options-limit="100"
                                  :options="selectList"
                                  :searchable="true"
                                  :multiple="false">
                            <template slot="selected-single"
                                      slot-scope="selected">
                                <c-icon :name="selected.value.name"/> {{ selected.value.name }}
                            </template>
                            <template slot="option"
                                      slot-scope="option">
                                <c-icon :name="option.value.name"/> {{ option.value.name }}
                            </template>
                        </c-select>
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

        <!-- Switches -->
        <c-card-section>
            <h3>
                Switches
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

    </layout-screen-card>
</template>

<script>
    import IconsMeta from '@mdi/svg/meta';
    import LayoutScreenCard from "../layouts/ScreenCard";

    const FIELDS_MAP = {
        name: {
            key: 'name',
            type: 'text',
            default: '',
            required: true,
            mask: false,
            leading: 'text',
            trailing: 'information',
            placeholder: 'Default',
        },
        phone: {
            key: 'phone',
            type: 'tel',
            default: '',
            required: true,
            mask: '+7 (999) 999-99-99',
            leading: 'phone',
            trailing: 'information',
            placeholder: 'With input mask',
        }
    };

    console.log();

    export default {
        name: "ScreenFormFields",
        components: {LayoutScreenCard},
        data() {
            return {
                data: _.mapValues(FIELDS_MAP, item => item.default),
                errors: _.mapValues(FIELDS_MAP, item => []),
                selected: [],
                selectList: [...IconsMeta]
            }
        },
        computed: {
            fieldsMeta() {
                return FIELDS_MAP
            },
            validateRules() {
                return _.mapValues(FIELDS_MAP, item => {
                    return {
                        required: item.required
                    }
                })
            }
        }
    }
</script>