const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();

console.log(`Today: ${year}-${month}-${date}`);

const xmas = new Date(year, 11, 25);
const msPerDay = 24 * 60 * 60 * 1000;
const daysToXmas = Math.ceil((xmas.getTime() - now.getTime()) / msPerDay);

if (daysToXmas < 0) {
  console.log(`Christmas passed ${Math.abs(daysToXmas)} days ago`);
} else if (daysToXmas === 0) {
  console.log(`Merry Christmas!`);
} else {
  console.log(`There are ${daysToXmas} days until Christmas`);
}

const fmtDate = now.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "short",
});

console.log(`Today: ${fmtDate}`);
