import dayjs from "dayjs"

/***
 * 获取几月的 1号是星期几,
 * month 是一个index 从0开始算，所以要减一
 * 
 */
function getFirstWeekDay(year, month) {
    const data = new Date(year, month - 1, 1)
    return data.getDay()
}

/**
 * 获取一个月的天数
 * new Date( year , month , day)
 * day 如果是0 会获取上个月的最后一天的时间 
 * 
 */
function getMonthDayCount(year, month) {
    const date = new Date(year, month, 0)

    return date.getDate() // 返回一个月的几天
}


/**
 * 剩余的天数
 * 上个月的结算天数 
 * 拿到上个月的最后一天的
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
function getLastMonthRestDays(year, month) {
    const days = getFirstWeekDay(year, month) // 计算前一个月的天数
    let lastDay = getMonthDayCount(year, month - 1)  // 前一个月的最后一天的日期
    const restDay = []
     //减一是因为周日放在后面,周日本应为0
    while (restDay.length < days - 1) {
        restDay.push(lastDay--)
    }
    return restDay.reverse()
}
/**
 * 获取下个月的的盒子
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
function getNextMonthRestDay(year, month) {
     //减一是因为周日放在后面,周日本应为0
    const lastMonthRestDayCount = getFirstWeekDay(year, month)-1
    const currentMonthDayCount = getMonthDayCount(year, month)
    const nextMonthRestDayCount = 42 - (lastMonthRestDayCount + currentMonthDayCount)
    const restDays = []
    for (let i = 1; i <= nextMonthRestDayCount; i++) {
        restDays.push(i)
    }

    return restDays
}
/**
 * 获取年月日 【year, month ,day】
 * @param {*} timeStamp 
 * @returns 
 */
function getDateInfo(timeStamp) {
    let date = timeStamp ? new Date(timeStamp) : new Date()
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ]
}

/**
 * 格式化年月日
 * @param {*} year 
 * @param {*} month 
 * @param {*} date 
 * @returns 
 */
function getFormatDate(year, month, date) {
    const dateArr = [year, month, date]

    for (let i = 1; i < dateArr.length; i++) {
        dateArr[i] < 10 && (dateArr[i] = '0' + dateArr[i])
    }
    return dateArr.join('-')
}

/**
 * 
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
function getCurrentDayArr(year, month) {
    let currentCount = getMonthDayCount(year, month)
    let currentMonthArr = []
    for (let i = 1; i <= currentCount; i++) {
        currentMonthArr.push(i)
    }

    return currentMonthArr
}

/**
 * 获取今天的日期
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
function getToday(year, month, day) {
    let date = new Date(year, month - 1, day)
    return date.getTime()
}

function beforeDisableDay(day){

}


export {
    getFirstWeekDay,
    getMonthDayCount,
    getLastMonthRestDays,
    getNextMonthRestDay,
    getDateInfo,
    getFormatDate,
    getCurrentDayArr,
    getToday,
    beforeDisableDay
}