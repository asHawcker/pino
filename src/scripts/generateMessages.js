import { GoogleGenAI, Type } from "@google/genai";
import rolePrompt from "../prompt/role.js";
import { readMoodData } from "../utilities/utils.js";

async function generateMessage(moodData) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["apiKey"], async (result) => {
      const apikey = result.apiKey;

      if (!apikey) {
        console.error("API key is missing");
        return reject("API key is missing");
      }

      const ai = new GoogleGenAI({ apiKey: apikey });

      try {
        const role = await rolePrompt();
        const moodData = await readMoodData();

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

        const prompt =
          role + `\nRecent Mood Data:\n${moodData}\nCurrent Time: ${formatted}`;

        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                notificationTitle: { type: Type.STRING },
                notificationMessage: { type: Type.STRING },
              },
              propertyOrdering: ["notificationTitle", "notificationMessage"],
              thinkingBudget: 0,
            },
          },
        });

        const output = JSON.parse(result.text);
        console.log("Output:", output);

        resolve(output);
      } catch (err) {
        console.error("❌ Error generating message:", err);
        reject(err);
      }
    });
  });
}

export default generateMessage;
