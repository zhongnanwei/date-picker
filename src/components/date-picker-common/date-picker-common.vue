<template>
    <div class="date-picker">
        <div class="date-picker-input" @mouseenter="showDatePickClean" @mouseleave="state.showCleanButton = false">
            <input class="wrapper-full" :placeholder="placeholder" :value="state.currentDate" readonly
                @click.stop="showDatePick" />
            <button v-show="state.showCleanButton" class="date-picker-clean" @click.stop="state.currentDate = ''">
                X
            </button>
        </div>
        <div v-show="state.visible" class="date-picker-wrapper" @click.stop>
            <header>
                <div @click="changeYear('pre')" class="left">&lt;&lt;</div>
                <div @click="changeMonth('pre')" class="left">&lt;</div>
                <div class="center">
                    {{ currentMonthTime }}
                </div>
                <div @click.prevent="changeMonth('next')" class="right">&gt;</div>
                <div @click="changeYear('next')" class="right">&gt;&gt;</div>
            </header>
            <div class="label_box">
                <p class="label">一</p>
                <p class="label">二</p>
                <p class="label">三</p>
                <p class="label">四</p>
                <p class="label">五</p>
                <p class="label">六</p>
                <p class="label">日</p>
            </div>
            <div class="date-wrapper">
                <div :class="['item', 'pre', index + 1 === state.pre.length ? 'end' : '']"
                    v-for="(item, index) in state.pre" :key="'pre' + item" @click="setCurrent(item, 'pre')">
                    {{ item }}
                </div>

                <div :class="[
                    'item',
                    isSelectDate(item) ? 'current' : '',
                    currentTime === getFormatDate(state.year, state.month, item) ? 'today' : '',
                ]" v-for="item in state.cur" :key="'cur' + item" @click="setCurrent(item)">
                    {{ item }}
                </div>

                <div :class="['item', 'next', !idx ? 'start' : '']" v-for="(item, idx) in state.next" :key="'next' + item"
                    @click="setCurrent(item, 'next')">
                    {{ item }}
                </div>
            </div>
            <footer>
                <a @click="getMoment">此刻</a>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import {
    getLastMonthRestDays,
    getNextMonthRestDay,
    getDateInfo,
    getFormatDate,
    getCurrentDayArr,
    getToday,
} from "../calendarUtils.js";

const props = withDefaults(defineProps<{placeholder?:string}>(),{
    placeholder: '请选择时间'
})
const state = reactive({
    visible: false,
    showCleanButton: false,
    pre: [],
    next: [],
    cur: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    currentDate: "",
    today: new Date().getDate(),
});

//弹出选择框
const showDatePick = () => {
    state.visible = true;
};
//日期当前年月显示
const currentMonthTime = computed(() => {
    const { year, month } = state;
    return `${year}年${month}月`;
});
//当前时间
const currentTime = computed(() => {
    const { today } = state;
    const [year, month, day] = getDateInfo(today);
    return getFormatDate(year, month, day);
});

const changeMonth = (type) => {
    switch (type) {
        case "pre":
            Number(state.month) - 1 <= 0 ? --state.year && (state.month = 12) : state.month--;
            break;
        case "next":
            Number(state.month) + 1 > 12 ? ++state.year && (state.month = 1) : state.month++;
            break;
        default:
            break;
    }

    init();
};

const changeYear = (type) => {
    if (type === "pre") state.year--;
    else state.year++;
    init();
};
//是否为已选择日期
const isSelectDate = (day) => {
    const { year, month } = state;
    return state.currentDate === getFormatDate(year, month, day);
};
//日历日期初始化
const init = () => {
    const { year, month, today } = state;
    state.cur = getCurrentDayArr(year, month);
    state.pre = getLastMonthRestDays(year, month);
    state.next = getNextMonthRestDay(year, month);
    state.today = getToday(year, month, today);
};
//设置当前选中时间
const setCurrent = (date, type) => {
    if (type) changeMonth(type);
    state.day = date;
    const { year, month, day } = state;
    state.currentDate = getFormatDate(year, month, day);
    init();
};
//

const showDatePickClean = () => {
    if (state.currentDate) state.showCleanButton = true;
};

const getMoment = () => {
    state.currentDate = currentTime.value;
    state.year = Number(currentTime.value.split("-")[0]);
    state.month = Number(currentTime.value.split("-")[1]);
    init();
    state.visible=false
};

onMounted(() => {
    init();
    document.addEventListener("click", function (e) {
        state.visible = false;
    });
});
</script>

<style lang="scss" scoped>
.date-picker {
    position: relative;

    &-input {
        box-sizing: border-box;
        margin: 0;
        color: #000000d9;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        font-feature-settings: "tnum";
        display: inline-flex;
        align-items: center;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        transition: border 0.3s, box-shadow 0.3s;
        min-width: 240px;
        height: 40px;
    }

    &-clean {
        width: 18px;
        height: 18px;
        font-size: 12px;
        text-align: center;
        border-radius: 50%;
        border: 0;
        color: #fff;
        background: #ccc;
    }

    &-wrapper {
        width: 358px;
        background-color: #fff;
        border: 1px solid #ccc;
        position: absolute;
        left: 0;
        z-index: 1050;

        header {
            display: flex;
            justify-content: space-between;

            .center,
            .left,
            .right {
                cursor: pointer;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }

            .center {
                width: 140px;
            }
        }

        .label_box {
            display: flex;

            .label {
                width: 50px;
                text-align: center;
                line-height: 50px;
            }
        }

        .date-wrapper {
            display: flex;
            width: 358px;
            height: 300px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            flex-wrap: wrap;
            box-sizing: border-box;

            .item {
                position: relative;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #424242;
                font-size: 12px;
                cursor: pointer;

                .ticket {
                    display: block;
                    top: 16px;
                    left: 18px;
                    font-size: 12px;
                    position: absolute;
                    color: rgba(255, 166, 0, 0.9);
                    scale: 0.8;
                }
            }

            .current {
                background-color: #54a0ff;
                color: #fff;
                border-radius: 50%;
                font-weight: 700;

                &.today {
                    color: #fff;
                }
            }

            .today {
                color: #6cf;
                border: 1px solid #6cf;
                font-weight: 700;
            }

            .start {
                position: relative;
                z-index: 999;

                &::before {
                    content: "";
                    width: 40px;
                    height: 30px;
                    background-color: rgba(148, 160, 172, 0.1);
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    border-radius: 20px 0 0 20px;
                    z-index: 0;
                }
            }

            .end {
                &::before {
                    content: "";
                    width: 40px;
                    height: 30px;
                    background-color: rgba(148, 160, 172, 0.1);
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    border-radius: 0 20px 20px 0;
                    z-index: 99;
                }
            }

            .pre,
            .next {
                color: #ddd;

                &::before {
                    content: "";
                    width: 50px;
                    height: 30px;
                    background-color: rgba(148, 160, 172, 0.1);
                    position: absolute;
                    top: 10px;
                    left: 0px;
                    z-index: 0;
                }

                &:first-child {
                    &::before {
                        content: "";
                        width: 40px;
                        height: 30px;
                        background-color: rgba(148, 160, 172, 0.1);
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        border-radius: 20px 0 0 20px;
                        z-index: 0;
                    }
                }

                &:last-child {
                    &::before {
                        content: "";
                        width: 40px;
                        height: 30px;
                        background-color: rgba(148, 160, 172, 0.1);
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        border-radius: 0 20px 20px 0;
                        z-index: 0;
                    }
                }
            }
        }

        footer {
            padding: 10px 0;
            text-align: center;
        }
    }
}
</style>
