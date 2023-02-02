"use strict"

function Timespan(timestamp, config) {
	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = 365.25
	const now = new Date()
	const extraDay = isLeapYear(timestamp) ? 1 : 0

	this.end = new Date(timestamp)
	this.expiration = this.end - now
	this.totalDays = Math.ceil(this.expiration / day)
	this.years = Math.floor(this.totalDays / year)
	this.remainingDays = Math.floor(this.totalDays - (this.years * year)) - extraDay
	this.totalMonths = Math.floor((this.remainingDays / year) * 12)
	this.months = !config.years ? Math.floor((this.totalDays / year) * 12) : this.totalMonths
	this.days = this.expiration < 864e5 || (!config.years && !config.months) ? Math.floor(this.expiration / day)
		: !config.months ? this.remainingDays
		: Math.ceil(this.totalDays - (this.years * year + (this.totalMonths / 12 * year)));
	this.hours = Math.floor((this.expiration % day) / hour)
	this.minutes = Math.floor((this.expiration % hour) / minute)
	this.seconds = Math.floor((this.expiration % minute) / second)
}

const isLeapYear = (timestamp) => {
	const year = new Date(timestamp).getFullYear
	return (year & 3) == 0 && ((year % 25) != 0 || (year & 15) == 0)
}

const convertTimestamp = (timestamp) => {
	if (Number(timestamp).toString().length === 10) {
		return Number(timestamp) * 1000
	}
	return Number(timestamp)
}

const setConfig = (config) => {
	config.years ??= false
	config.months ??= false
	config.days ??= true
	config.remove ??= false
	return config
}

const addElement = (config, timespan) => {
	const elements = document.querySelectorAll(".countdown, .header-countdown")
	elements.forEach(countdown => {
		if (config.years && timespan.years > 0) {
			countdown.innerHTML += `<section><span class="years">0</span><span>Years</span></section>`
		}
		if (config.months && timespan.months > 0) {
			countdown.innerHTML += `<section><span class="months">0</span><span>Months</span></section>`
		}
		if (config.days && timespan.expiration > 864e5) {
			countdown.innerHTML += `<section><span class="days">0</span><span>Days</span></section>`
		}
		countdown.innerHTML += `<section><span class="hours">0</span><span>Hours</span></section>`
		countdown.innerHTML += `<section><span class="minutes">0</span><span>Minutes</span></section>`
		countdown.innerHTML += `<section><span class="seconds">0</span><span>Seconds</span></section>`
	})
}

const removeElement = () => {
	const elements = document.querySelectorAll(".countdown, .header-countdown")
	elements.forEach(countdown => {
		countdown.remove()
	})
}

const startCountDown = (timestamp = new Date().getTime() + 864e5, config = {}) => {
	timestamp = convertTimestamp(timestamp)
	config = setConfig(config)
	addElement(config, new Timespan(timestamp, config))

	const interval = setInterval(() => {
		const timespan = new Timespan(timestamp, config)
		if (timespan.expiration > 0) {
			if (config.years) {
				document.querySelectorAll(".years").forEach(el => {el.innerText = timespan.years})
			}
			if (config.months) {
				document.querySelectorAll(".months").forEach(el => {el.innerText = timespan.months})
			}
			if (config.days) {
				document.querySelectorAll(".days").forEach(el => {el.innerText = timespan.days})
			}
			document.querySelectorAll(".hours").forEach(el => {
				el.innerText = String(timespan.hours).padStart(2, "0")
			})
			document.querySelectorAll(".minutes").forEach(el => {
				el.innerText = String(timespan.minutes).padStart(2, "0")
			})
			document.querySelectorAll(".seconds").forEach(el => {
				el.innerText = String(timespan.seconds).padStart(2, "0")
			})
		} else {
			if (config.remove) removeElement()
			clearInterval(interval);
		}
	})
}