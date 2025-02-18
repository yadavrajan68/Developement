const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const x = getRandomInt(0, 54);
  const y = getRandomInt(0, 6);
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date: DATE };
  console.log(`Committing on: ${DATE}`);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, () => {
        makeCommit(n - 1);
      });
  });
};

const uncommit = (n) => {
  console.log(`Undoing last ${n} commits...`);
  simpleGit()
    .reset(["HEAD~" + n, "--hard"])
    .then(() => simpleGit().push("origin", "main", ["--force"]))
    .then(() => console.log(`${n} commits removed successfully.`))
    .catch((err) => console.error(`Error: ${err}`));
};

// Usage: Change mode to "commit" or "uncommit"
const mode = process.argv[2]; // Pass argument from terminal
const count = parseInt(process.argv[3]) || 1;

if (mode === "commit") {
  makeCommit(count);
} else if (mode === "uncommit") {
  uncommit(count);
} else {
  console.error("Invalid mode! Use 'commit' or 'uncommit'.");
}
