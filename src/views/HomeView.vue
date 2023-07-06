<script setup lang="ts">
import Calender from "@/components/calender/calender.vue";
import DatePickerCommon from "@/components/date-picker-common/date-picker-common.vue";
</script>

<template>
    <main>
        <div>
            <span>具有任意选择时间功能的时间选择器：</span>
            <Calender />
        </div>
        <div>
            普通日期选择器
            <DatePickerCommon />
        </div>
    </main>
</template>
