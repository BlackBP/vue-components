<template>
    <c-card>
        <pre class="u-text-wrap">
            {{ query }}
        </pre>
        <c-btn @click="updateQuery">
            Set query
        </c-btn>
    </c-card>
</template>

<script>

    const QUERY_MAP = {
        category: {
            key: 'category',
            default: []
        }
    };

    /**
     * @typedef {{key: string, default: string}} propMap
     */

    /**
     *
     * @param {Object.<string, propMap>} query_map
     */
    function makeQueryMap(query_map = {}) {
        return query_map
    }

    makeQueryMap({

    })

    export default {
        name: "Components",
        data() {
            return {
                query: _.mapValues(QUERY_MAP, item => item.default)
            }
        },
        methods: {
            updateQuery() {
                this.$router.push({
                    path: this.$appRoute.components.path,
                    query: {
                        category: [1, 2, 3]
                    }
                })
            },

            /**
             *
             * @param query
             */
            setQuery(query = {}) {
                _.each(QUERY_MAP, (item, key) => {
                    let value = _.get(query, key, item.default);

                    if(value !== undefined) {
                        this.query[key] = value
                    }
                })
            }
        },
        beforeRouteEnter({query}, from, next) {
            next(vm => {
                vm.setQuery(query)
            })
        },
        beforeRouteUpdate ({query}, from, next) {
            this.setQuery(query);
            next()
        }
    }
</script>