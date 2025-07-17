const moods = [
  {
    emoji: "😭",
    label: "Rona aarha hai",
    bg: "hover:scale-115 hover:bg-[rgba(239,68,68,0.6)]",
    name: "Very Sad",
  },
  {
    emoji: "😔",
    label: "Ehhhh",
    bg: "hover:scale-115 hover:bg-[rgba(251,146,60,0.6)]",
    name: "Somewhat Sad",
  },
  {
    emoji: "😑",
    label: "Theek theek",
    bg: "hover:scale-115 hover:bg-[rgba(156,163,175,0.6)]",
    name: "Neutral",
  },
  {
    emoji: "😊",
    label: "Me HAPPY!",
    bg: "hover:scale-115 hover:bg-[rgba(74,222,128,0.6)]",
    name: "Happy",
  },
  {
    emoji: "😄",
    label: "LESSGOOO! WOOHOO!!!",
    bg: "hover:scale-115 hover:bg-[rgba(253,224,71,0.6)]",
    name: "Very Happy",
  },
];

function MoodDialog() {
  const handleMoodClick = (name) => {
    let now = new Date();
    const formatted =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");

    const moodEntry = {
      mood: name,
      time: formatted,
    };

    chrome.storage.local.get(["moodLogs"], (result) => {
      const logs = result.moodLogs || [];
      logs.push(moodEntry);

      chrome.storage.local.set({ moodLogs: logs }, () => {
        console.log("Mood logged:", moodEntry);
      });
    });
  };

  return (
    <div className="text-gray-300 font-mono">
      <div className="font-bold text-xl mb-4 text-center pt-4">
        How are you feeling?
      </div>

      <div className="flex justify-around items-center gap-2 px-2">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`emoji transition-all duration-200 ease-in-out text-3xl p-2 rounded-full cursor-pointer ${mood.bg}`}
            title={mood.name}
            onClick={() => handleMoodClick(mood.name)}
          >
            {mood.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodDialog;
