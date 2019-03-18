<template functional>

    <div class="section">

        <div class="section__title">
            {{ props.title }}
        </div>

        <div class="section__content">
            <slot></slot>
        </div>

        <div class="section__subsections">
            <slot name="subsection"></slot>
        </div>

    </div>

</template>

<script>
    export default {
        name: "c-section",
        props: {
            title: {
                type: String,
                default: ''
            },
            last: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .section {
        $self: #{&};
        $title: #{$self}__title;
        $content: #{$self}__content;
        $subsections: #{$self}__subsections;

        $section-offset: 15px;

        @at-root {
            #{$self} {
                display: block;
                width: 100%;

                & + & {
                    margin-top: $section-offset;
                }
            }

            #{$title} {
                font-size: 125%;
                font-weight: bold;
                margin-bottom: 5px;
            }

            #{$content},
            #{$subsections} {
                padding: 0 0 0 15px;
            }

            #{$subsections} {
                margin-top: $section-offset;

                & > #{$self} {
                    #{$content} {
                        padding: 0;
                    }
                }
            }
        }
    }
</style>
