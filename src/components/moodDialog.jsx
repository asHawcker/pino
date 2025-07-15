import React from "react";

const moods = [
  { emoji: "😭", label: "Rona aarha hai", bg: "hover:bg-red-400" },
  { emoji: "😔", label: "Ehhhh", bg: "hover:bg-orange-300" },
  { emoji: "😑", label: "Theek theek", bg: "hover:bg-gray-400" },
  { emoji: "😊", label: "Me HAPPY!", bg: "hover:bg-green-300" },
  { emoji: "😄", label: "LESSGOOO! WOOHOO!!!", bg: "hover:bg-yellow-300" },
];

function MoodDialog() {
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
            title={mood.label}
          >
            {mood.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodDialog;
