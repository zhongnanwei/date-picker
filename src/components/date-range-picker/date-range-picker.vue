<!--
 * @Author: Zhongnanwei
 * @Date: 2023-07-10 22:44:05
 * @LastEditors: Zhongnanwei
 * @LastEditTime: 2023-07-13 22:59:34
 * @Description: 
-->
<template>
    <div class="flex-items-center">
        <data-picker placeholder="开始时间"/> <span class="mx-4">-</span> <data-picker placeholder="结束时间"/>
    </div>
</template>

<script setup>
import DataPicker from '../date-picker-common/date-picker-common.vue'
</script>
