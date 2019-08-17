<template>
    <div class="">

    </div>
</template>

<script>
    function getDaysInMonth(month = 1, year = 2019) {
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    }
    
    function getDaysCount(month = 1, year = 2019) {
        return new Date(Date.UTC(year, month, 0)).getDate()
    }

    export default {
        name: "CCalendar"
    }
</script>

<style scoped>

</style>