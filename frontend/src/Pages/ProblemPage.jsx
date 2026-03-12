// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { PROBLEMS } from "../data/problems";
// import MainNav from "../components/MainNav";
// import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
// import ProblemDescription from "../components/ProblemDescription";
// import CodeEditorPanel from "../components/CodeEditorPanel";
// import OutputPanel from "../components/OutputPanel";
// import { executeCode } from "../lib/piston";
// import toast from "react-hot-toast";

// const ProblemPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [currentProblemId, setCurrentProblemId] = useState("two-sum");
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
//   const [code, setCode] = useState(
//     PROBLEMS[currentProblemId].starterCode.javascript,
//   );
//   const [output, setOutput] = useState(null);
//   const [isRunning, setIsRunning] = useState(false);
//   const currentProblem = PROBLEMS[currentProblemId];

//   useEffect(() => {
//     if (id && PROBLEMS[id]) {
//       setCurrentProblemId(id);
//       setCode(PROBLEMS[id].starterCode[selectedLanguage]);
//       setOutput(null);
//     }
//   }, [id, selectedLanguage]);

//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setSelectedLanguage(newLang);
//     setCode(currentProblem.starterCode[newLang]);
//     setOutput(null);
//   };
//   const handleProblemChange = (newProblemId) =>
//     navigate(`/problem/${newProblemId}`);
//   const triggerConfetti = () => {};
//   const normalizeOutput = () => {
//     return output
//       .trim()
//       .split("\n")
//       .map((line) =>
//         line
//           .trim()
//           // remove spaces after [ and before ]
//           .replace(/\[\s+/g, "[")
//           .replace(/\s+\]/g, "]")
//           // normalize spaces around commas to single space after comma
//           .replace(/\s*,\s*/g, ","),
//       )
//       .filter((line) => line.length > 0)
//       .join("\n");
//   };

//   const checkIfTestsPassed = (actualOutput, expectedOutput) => {
//     const normalizedActual = normalizeOutput(actualOutput);
//     const normalizedExpected = normalizeOutput(expectedOutput);

//     return normalizedActual == normalizedExpected;
//   };
//   const handleRunCode = async () => {
//     setIsRunning(true);
//     setOutput(null);
//     const result = await executeCode(selectedLanguage, code);
//     setOutput(result);
//     setIsRunning(false);

//     //check the code output correct or not
//     if (result.success) {
//       const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
//       const testPassed = checkIfTestsPassed(result.output, expectedOutput);
//       if (testPassed) {
//         toast.success("Congratulations! all test cases passed");
//       } else {
//         toast.error("Failed! check your code");
//       }
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col overflow-hidden relative">
//       {/* Grid background */}
//       <div
//         className="absolute inset-0 opacity-10 pointer-events-none"
//         style={{
//           backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }}
//       />

//       {/* Orbs */}
//       <div
//         className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
//         style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
//       />
//       <div
//         className="absolute bottom-[-5%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
//         style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
//       />

//       {/* Nav */}
//       <div className="relative z-10 flex-shrink-0">
//         <MainNav />
//       </div>

//       {/* Panel area — fills remaining height, no overflow */}
//       <div className="relative z-10 flex-1 overflow-hidden">
//         <PanelGroup direction="horizontal" className="h-full">
//           {/* Left panel — ProblemDescription scrolls internally */}
//           <Panel
//             defaultSize={40}
//             minSize={30}
//             className="h-full overflow-hidden"
//           >
//             <div className="h-full overflow-hidden bg-gray-900/60 backdrop-blur-sm border-r border-green-500/15">
//               <ProblemDescription
//                 problem={currentProblem}
//                 currentProblemId={currentProblemId}
//                 onProblemChange={handleProblemChange}
//                 allProblems={Object.values(PROBLEMS)}
//               />
//             </div>
//           </Panel>

//           {/* Resize handle */}
//           <PanelResizeHandle className="w-1.5 bg-green-500/10 hover:bg-green-500/40 active:bg-green-500/60 transition-colors duration-200 cursor-col-resize" />

//           {/* Right panel */}
//           <Panel
//             defaultSize={60}
//             minSize={30}
//             className="h-full overflow-hidden"
//           >
//             <PanelGroup direction="vertical" className="h-full">
//               {/* Code editor */}
//               <Panel defaultSize={70} minSize={30} className="overflow-hidden">
//                 <div className="h-full overflow-hidden bg-gray-900/60 backdrop-blur-sm border border-green-500/15 rounded-none">
//                   <CodeEditorPanel
//                     selectedLanguage={selectedLanguage}
//                     code={code}
//                     isRunning={isRunning}
//                     onLanguageChange={handleLanguageChange}
//                     onCodeChange={setCode}
//                     onRunCode={handleRunCode}
//                   />
//                 </div>
//               </Panel>

//               {/* Vertical resize handle */}
//               <PanelResizeHandle className="h-1.5 bg-green-500/10 hover:bg-green-500/40 active:bg-green-500/60 transition-colors duration-200 cursor-row-resize" />

//               {/* Output panel */}
//               <Panel defaultSize={30} minSize={20} className="overflow-hidden">
//                 <div className="h-full overflow-hidden bg-gray-900/60 backdrop-blur-sm border-t border-green-500/15">
//                   <OutputPanel />
//                 </div>
//               </Panel>
//             </PanelGroup>
//           </Panel>
//         </PanelGroup>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import MainNav from "../components/MainNav";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import { executeCode } from "../lib/judge0"; // judge0 executor
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [testPassed, setTestPassed] = useState(null);

  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual === normalizedExpected;
  };

  //   const handleRunCode = async () => {
  //     setIsRunning(true);
  //     setOutput(null);

  //     try {
  //       const result = await executeCode(selectedLanguage, code);

  //       if (result.success) {
  //         setOutput(result.output);

  //         const expectedOutput = currentProblem.expectedOutput[selectedLanguage];

  //         const testPassed = checkIfTestsPassed(result.output, expectedOutput);

  //         if (testPassed) {
  //           triggerConfetti();
  //           toast.success("🎉 Congratulations! All test cases passed");
  //           triggerConfetti();
  //         } else {
  //           toast.error("❌ Failed! Check your code");
  //         }
  //       } else {
  //         setOutput(result.error);
  //         toast.error("Code execution failed");
  //       }
  //     } catch (error) {
  //       setOutput(error.message);
  //       toast.error("Something went wrong");
  //     }

  //     setIsRunning(false);
  //   };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setTestPassed(null);

    try {
      const result = await executeCode(selectedLanguage, code);

      setOutput(result);

      if (result.success) {
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage];

        const passed = checkIfTestsPassed(result.output, expectedOutput);

        setTestPassed(passed);

        if (passed) {
          triggerConfetti();
          toast.success("🎉 All test cases passed");
        } else {
          toast.error("❌ Test cases failed");
        }
      } else {
        setTestPassed(false);
      }
    } catch (error) {
      setOutput({
        success: false,
        error: error.message,
      });
      setTestPassed(false);
    }

    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />

      <div
        className="absolute bottom-[-5%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />

      {/* Navbar */}
      <div className="relative z-10 flex-shrink-0">
        <MainNav />
      </div>

      {/* Panels */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Problem Panel */}
          <Panel
            defaultSize={40}
            minSize={30}
            className="h-full overflow-hidden"
          >
            <div className="h-full overflow-hidden bg-gray-900/60 backdrop-blur-sm border-r border-green-500/15">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-green-500/10 hover:bg-green-500/40 cursor-col-resize" />

          {/* Editor + Output */}
          <Panel
            defaultSize={60}
            minSize={30}
            className="h-full overflow-hidden"
          >
            <PanelGroup direction="vertical" className="h-full">
              {/* Editor */}
              <Panel defaultSize={70} minSize={30} className="overflow-hidden">
                <div className="h-full bg-gray-900/60 backdrop-blur-sm border border-green-500/15">
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-green-500/10 hover:bg-green-500/40 cursor-row-resize" />

              {/* Output */}
              <Panel defaultSize={30} minSize={20} className="overflow-hidden">
                <div className="h-full bg-gray-900/60 backdrop-blur-sm border-t border-green-500/15">
                  <OutputPanel
                    output={output}
                    isRunning={isRunning}
                    testPassed={testPassed}
                  />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default ProblemPage;
