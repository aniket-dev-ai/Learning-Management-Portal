import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize AI Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const courseReasonAi = async (req, res) => {
  try {
    const { courseName } = req.body;
    console.log("📩 Course Received:", courseName);

    if (!courseName) {
      return res.status(400).json({ message: "❌ Course name is required!" });
    }

    // ✅ Load Gemini 1.5 Pro Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Give a strong reason in under 100 words why a student should buy the course: "${courseName}". 
      Make it engaging, informative, and persuasive. Keep it within 100 words without any additional text or markdown formatting.
      easy ensligh and humour and student ko intreset aa jana chahiye ki kyu buy krna chahiye ye course`;

    const result = await model.generateContent([prompt]);

    // ✅ Extract AI Response
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("❌ AI response format is incorrect.");
    }

    console.log("📝 AI Reason:", responseText);

    res.json({ success: true, reason: responseText });
  } catch (error) {
    console.error("🚨 AI Generation Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate course reason",
      error: error.message,
    });
  }
};


export const courseAi = async (req, res) => {
  try {
    const { topic } = req.body;
    console.log("📩 Received Topic:", topic);

    if (!topic) {
      return res.status(400).json({ message: "❌ Topic is required!" });
    }

    // ✅ Load Gemini 1.5 Pro Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Generate a structured course for the topic: "${topic}".
      Provide a valid JSON output ONLY with these fields:
      {
        "courseTitle": "string",
        "subTitle": "string",
        "description": "string",
        "category": "string",
        "courseLevel": "string",
        "coursePrice": "number"
      }
      Note: Ensure "coursePrice" is always a number greater than 999 and does NOT include any currency symbols.
      Only return a valid JSON object without extra text, explanations, or markdown formatting.`;

    const result = await model.generateContent([prompt]);

    // ✅ Extract AI Response
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("❌ AI response format is incorrect.");
    }

    console.log("📝 AI Response:", responseText);

    // ✅ Extract JSON Using Better Regex
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("❌ AI response does not contain a valid JSON.");
    }

    let aiGeneratedData;
    try {
      aiGeneratedData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      throw new Error("❌ AI response is not valid JSON.");
    }

    console.log("✅ Parsed AI Data:", aiGeneratedData);
    res.json({ success: true, courseDetails: aiGeneratedData });
  } catch (error) {
    console.error("🚨 AI Generation Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate course details",
      error: error.message,
    });
  }
};
