<!--
 * @Author: Zhongnanwei
 * @Date: 2023-07-10 22:19:25
 * @LastEditors: Zhongnanwei
 * @LastEditTime: 2023-07-13 22:12:34
 * @Description: 
-->
<script setup>
import Calender from "@/components/calender/calender.vue";
import DatePickerCommon from "@/components/date-picker-common/date-picker-common.vue";
import DateRangePicker from '@/components/date-range-picker/date-range-picker.vue'
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
        <div>
            范围选择器
            <DateRangePicker />
        </div>
    </main>
</template>
