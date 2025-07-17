import { getRandomInt } from "../utilities/utils";
import generateMessage from "./generateMessages";

let notificationId = "motivation-notification";
let moodReminderId = "mood-reminder-notification";
let CLEAR_INTERVAL = 70; // seconds

// --- Function to schedule the motivational notification ---
function scheduleNextMotivationNotification() {
  const interval = getRandomInt(30, 90); // random minutes

  chrome.alarms.create("motivationTimer", {
    delayInMinutes: interval,
  });
  console.log(`Next motivational notification in ${interval} minutes.`);
}

// --- Schedule mood reminder every 30 minutes ---
chrome.alarms.create("moodReminder", {
  periodInMinutes: 30,
});
console.log("Mood reminder set for every 30 minutes.");

// --- Initial call ---
chrome.alarms.create("motivationTimer", {
  delayInMinutes: 2,
});
chrome.alarms.create("moodReminder", {
  delayInMinutes: 1,
});
// scheduleNextMotivationNotification();

// --- Handle all alarms ---
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "motivationTimer") {
    const output = await generateMessage();

    const title = output.notificationTitle || "Stay Positive!";
    const message =
      output.notificationMessage || "Keep going! You're doing great!";

    chrome.notifications.create(notificationId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/icon128.png"),
      title: title,
      message: message,
    });

    console.log("Motivation notification created:", title, message);

    setTimeout(() => {
      chrome.notifications.clear(notificationId, () => {
        console.log("Motivation notification cleared automatically.");
      });
    }, CLEAR_INTERVAL * 1000);

    scheduleNextMotivationNotification(); // Schedule next random one
  }

  if (alarm.name === "moodReminder") {
    const title = "Mood Check-in";
    const message = "How are you feeling? Log your mood in the tracker!";

    chrome.notifications.create(moodReminderId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/icon128.png"),
      title: title,
      message: message,
    });

    console.log("Mood reminder notification created.");

    setTimeout(() => {
      chrome.notifications.clear(moodReminderId, () => {
        console.log("Mood reminder notification cleared.");
      });
    }, 15 * 1000); // clear after 15 seconds
  }
});
