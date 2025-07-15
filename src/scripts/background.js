let notificationId = "motivation-notification";

// Interval: 5 minutes
let NOTIFICATION_INTERVAL = 1; // in minutes
let CLEAR_INTERVAL = 5; // in seconds

// Create the repeating alarm
chrome.alarms.create("motivationTimer", {
  periodInMinutes: NOTIFICATION_INTERVAL,
});


// Show a fixed motivational message when the alarm triggers
chrome.alarms.onAlarm.addListener(() => {
  const message = "🌟 Keep going, you're doing great!";

  chrome.notifications.create(notificationId, {
    type: "basic",
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOluJeiw1hiy4RZaQ4XdQU9fqEdBmSil7sg&s", // make sure icon.png exists
    title: "💡 Motivation",
    message: message,
  });

  setTimeout(() => {
    chrome.notifications.clear(notificationId, () => {
      console.log("Motivation notification cleared automatically.");
    });
  },1000 * CLEAR_INTERVAL);
});