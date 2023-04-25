import {
  format,
  getUnixTime,
  addMonths,
  fromUnixTime,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
//1. pop up show
//2.update the text of the calander
//3.give the function to the next btn and the previous button
//4.render the date of each month using date fns with each day of interval
//5.style the dates that lies on the current month or the previous month

const dateBtn = document.querySelector(".date-picker-button");
const popupMsg = document.querySelector(".date-picker");
let currentDate = new Date();
const datePicker = document.querySelector(".date-picker");
const nextMonth = document.querySelector(".next-month-button");
const prevMonth = document.querySelector(".prev-month-button");
const currentMonth = document.querySelector(".current-month");
const dateGrid = document.querySelector(".date-picker-grid-dates");
setupbutton(currentDate);
//show the calender popup
dateBtn.addEventListener("click", (e) => {
  popupMsg.classList.toggle("show");
});
function setupbutton(date) {
  dateBtn.innerText = format(date, "	MMMM do, yyy");
  currentMonth.innerText = format(date, "	MMMM - YYY");
  currentMonth.dataset.month = getUnixTime(date);
  setUpDatePicker(currentDate);
}
nextMonth.addEventListener("click", (e) => {
  const tempDate = addMonths(fromUnixTime(currentMonth.dataset.month), 1);
  currentMonth.innerText = format(tempDate, "	MMMM - YYY");
  currentMonth.dataset.month = getUnixTime(tempDate);
  setUpDatePicker(tempDate);
});
prevMonth.addEventListener("click", (e) => {
  const tempDate = addMonths(fromUnixTime(currentMonth.dataset.month), -1);
  currentMonth.innerText = format(tempDate, "	MMMM - YYY");
  currentMonth.dataset.month = getUnixTime(tempDate);
  setUpDatePicker(tempDate);
});

//render the calender dates
function setUpDatePicker(selectedDate) {
  dateGrid.innerHTML = "";
  const firstWeekDay = startOfWeek(startOfMonth(selectedDate));
  const lastWeekDay = endOfWeek(endOfMonth(selectedDate));
  const dates = eachDayOfInterval({ start: firstWeekDay, end: lastWeekDay });
  dates.forEach((date) => {
    const newBtn = document.createElement("button");
    newBtn.innerText = format(date, "d");
    newBtn.classList.add("date");
    if (!isSameMonth(date, selectedDate))
      newBtn.classList.add("date-picker-other-month-date");
    if (isSameDay(date, currentDate)) newBtn.classList.add("selected");
    newBtn.addEventListener("click", (e) => {
      newBtn.classList.add("selected");
      currentDate = date;
      setupbutton(currentDate);
    });
    dateGrid.append(newBtn);
  });
}
