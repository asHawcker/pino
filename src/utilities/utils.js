function getRandomInt(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min)) + min;
}

function readMoodData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["moodLogs"], (result) => {
      const moodArray = result.moodLogs || [];

      const sorted = moodArray.slice(-5);

      console.log("Sorted mood data:", sorted);

      const moodString = sorted.map((m) => `${m.mood} at ${m.time}`).join("\n");

      console.log("readMoodData returned:\n", moodString);
      resolve(moodString);
    });
  });
}

export { readMoodData, getRandomInt };
