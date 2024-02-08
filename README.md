# Countdown Timer
Countdown library written in vanilla JS with no dependencies.

## Usage
Add `countdown.js` and `countdown.css` files from the `assets` folder to your project. Add any element with the class `countdown` or `header-countdown` to your HTML and call the `startCountDown()` in your page.

See the `index.html` file as an example:
```html
<main>
  <header>
    <article class="header-countdown"></article>
  </header>
  <section>
    <article class="countdown"></article>
  </section>
</main>
```

This will render as:
![Screenshot](/screenshot.png)

By default `startCountDown()` will count down 24 hours from current time, but you can pass a unix timestamp as its first argument. For example: `startCountDown(1707423875)` will count down from the current time until this timestamp.

You can also pass a configuration object as its second parameter. Those are the default values:
```js
{
    years: false,
    months: false,
    days: true,
    remove: false
}
```

By default only days, hours, minutes, and seconds will display, and only 3 elements will display at once. So if your date is bigger than 24 hours, only days, hours and minutes are going to be visible. To override this behavior, remove the following line from CSS:
```css
.countdown section:nth-child(n+4),
.header-countdown section:nth-child(n+4) {
	display: none;
}
```

To display years and months, call the `startCountDown()` function as follows:
```js
startCountDown(1707423875, {
    years: true, months: true
})
```

The `remove` option will remove the timers from the DOM if your timestamp is in the past.

## Notes
- This was compared against similar libraries to ensure it's correct.
- Besides being lightweight and have no dependencies, it doesn't update every element of the timer like other libraries.
- This library was developed for my company and is being used in production on sites with thousands of users.