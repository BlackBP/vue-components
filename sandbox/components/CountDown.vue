<template>
    <div>
        <div style="height: 5px; background: #ddd;">
            <div style="height: 100%; width: 0; background: #ca0000; transition: 0.5s"
                 :style="{width: `${width}%`}">
            </div>
        </div>

        <b>timeDifference:</b> {{ timeDifference }}

        <c-btn @click="loading(10)">
            Start
        </c-btn>
    </div>
</template>

<script>
    import {CBtn} from "../../src/components/button";

    export default {
        name: "CountDown",
        components: {CBtn},
        data() {
            return {
                width: 100,
                timeDifference: 0,
                textInput: '',
            }
        },
        methods: {
            loading(time = 10) {
                time = time * 1000;

                let startTime = +new Date();
                let endTime = startTime + time;

                let interval = setInterval(() => {

                    let currentTime = +new Date();
                    let timeDifference = endTime - currentTime;

                    this.width = Math.ceil((timeDifference / time) * 100);
                    this.timeDifference = Math.ceil(timeDifference / 1000);

                    if(currentTime >= endTime || timeDifference <= 0) {
                        this.width = 0;
                        clearInterval(interval)
                    }

                }, 1000);
            }
        }
    }
</script>

<style scoped>

</style>