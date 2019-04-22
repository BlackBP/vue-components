<template>

    <c-scroll-view>
        <div class="container-fluid">
            <div v-for="(rItem, rIndex) in Array(5)"
                 class="row"
                 :key="`row-${rIndex}`"
                 style="margin-bottom: 30px;">

                <div class="col-4">
                    <c-card class="c-elevate-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem officiis repellat repudiandae sed tempore. Accusantium
                            dignissimos dolorum eveniet excepturi facere iusto laboriosam laudantium numquam quis, quo saepe similique, voluptatum.</p>
                        <p>Adipisci aspernatur commodi error et facere illum possimus praesentium recusandae temporibus. Fugit id magni nihil praesentium
                            quasi qui ratione sed similique sint. Aspernatur consequuntur cum enim laboriosam magni, quis sequi.</p>
                        <p>Aliquid atque eaque facere minus modi. Accusamus adipisci aperiam aspernatur commodi corporis dolor dolore est iusto molestias
                            nihil nobis officia, omnis quas qui rerum saepe, tempore temporibus veritatis vitae voluptate.</p>
                    </c-card>
                </div>

                <div class="col-4">
                    <c-card class="c-elevate-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem officiis repellat repudiandae sed tempore. Accusantium
                            dignissimos dolorum eveniet excepturi facere iusto laboriosam laudantium numquam quis, quo saepe similique, voluptatum.</p>
                        <p>Adipisci aspernatur commodi error et facere illum possimus praesentium recusandae temporibus. Fugit id magni nihil praesentium
                            quasi qui ratione sed similique sint. Aspernatur consequuntur cum enim laboriosam magni, quis sequi.</p>
                        <p>Aliquid atque eaque facere minus modi. Accusamus adipisci aperiam aspernatur commodi corporis dolor dolore est iusto molestias
                            nihil nobis officia, omnis quas qui rerum saepe, tempore temporibus veritatis vitae voluptate.</p>
                    </c-card>
                </div>

                <div class="col-4">
                    <c-card class="c-elevate-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem officiis repellat repudiandae sed tempore. Accusantium
                            dignissimos dolorum eveniet excepturi facere iusto laboriosam laudantium numquam quis, quo saepe similique, voluptatum.</p>
                        <p>Adipisci aspernatur commodi error et facere illum possimus praesentium recusandae temporibus. Fugit id magni nihil praesentium
                            quasi qui ratione sed similique sint. Aspernatur consequuntur cum enim laboriosam magni, quis sequi.</p>
                        <p>Aliquid atque eaque facere minus modi. Accusamus adipisci aperiam aspernatur commodi corporis dolor dolore est iusto molestias
                            nihil nobis officia, omnis quas qui rerum saepe, tempore temporibus veritatis vitae voluptate.</p>
                    </c-card>
                </div>

                <div class="col-12" style="margin-top: 30px;">
                    <c-card class="c-elevate-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem officiis repellat repudiandae sed tempore. Accusantium
                            dignissimos dolorum eveniet excepturi facere iusto laboriosam laudantium numquam quis, quo saepe similique, voluptatum.</p>
                        <p>Adipisci aspernatur commodi error et facere illum possimus praesentium recusandae temporibus. Fugit id magni nihil praesentium
                            quasi qui ratione sed similique sint. Aspernatur consequuntur cum enim laboriosam magni, quis sequi.</p>
                        <p>Aliquid atque eaque facere minus modi. Accusamus adipisci aperiam aspernatur commodi corporis dolor dolore est iusto molestias
                            nihil nobis officia, omnis quas qui rerum saepe, tempore temporibus veritatis vitae voluptate.</p>
                    </c-card>
                </div>

            </div>
        </div>
    </c-scroll-view>

</template>

<script>
    import CCard from "../../components/Card";
    import CScrollView from "../../components/ScrollView";

    export default {
        name: "view-home",
        components: {
            CScrollView,
            CCard
        }
    }
</script>
