const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,
  java: 62,
};

/**
 * Execute code using Judge0 API
 * @param {string} language
 * @param {string} code
 * @param {string} stdin - User input (optional)
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export async function executeCode(language, code, stdin = "") {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions/?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: stdin,
        }),
      },
    );

    const data = await response.json();

    console.log("Judge0 Response:", data);

    if (!response.ok) {
      return {
        success: false,
        error: data?.message || `HTTP Error: ${response.status}`,
      };
    }

    const stdout = data?.stdout ?? "";
    const stderr = data?.stderr ?? "";
    const compileError = data?.compile_output ?? "";

    if (stderr || compileError) {
      console.error("Error:", stderr || compileError);

      return {
        success: false,
        error: stderr || compileError,
      };
    }

    console.log("Program Output:", stdout);

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    console.error("Execution Failed:", error);

    return {
      success: false,
      error: error.message || "Code execution failed",
    };
  }
}
