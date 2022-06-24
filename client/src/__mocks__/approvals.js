import { v4 as uuid } from "uuid";

// function randomTime() {
//   var hrs = Math.round(Math.random() * 24);
//   var mins = Math.round(Math.random() * 60);
//   var hFormat = hrs < 10 ? "0" : "";
//   var mFormat = mins < 10 ? "0" : "";
//   var amPm = hrs < 12 ? "AM" : "PM";
//   var is12 = hrs % 12 === 0;

//   return amPm === "AM" && !is12
//     ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm)
//     : "AM" && is12
//     ? String(12 + ":" + mFormat + mins + " " + amPm)
//     : is12
//     ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm)
//     : String(hFormat + (hrs - 12) + ":" + mFormat + mins + " " + amPm);
// }

function randomTime(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = [
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
  {
    id: uuid(),
    name: "task1",
    user: "ABC",
    from: 1555016400000,
    due: 1556017800022,
    time: randomTime(),
    marks: 10,
  },
];
