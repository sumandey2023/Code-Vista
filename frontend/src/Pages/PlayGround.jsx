import React, { useState, useCallback } from "react";
import MainNav from "../components/MainNav";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PlayGroundCodeEditor from "../components/PlayGroundCodeEditor";
import PlayGroundOutput from "../components/PlayGroundOutput";
import { executeCode } from "../lib/judge0";
import { LANGUAGE_CONFIG } from "../data/problems";

const PlayGround = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(LANGUAGE_CONFIG.javascript.boilerplate);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Handle language change and reset code to boilerplate
  const handleLanguageChange = useCallback((newLanguage) => {
    setSelectedLanguage(newLanguage);
    setCode(LANGUAGE_CONFIG[newLanguage].boilerplate);
    setOutput(null);
  }, []);

  // Handle code changes
  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  // Handle running code
  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  }, [selectedLanguage, code]);

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

      <div className="relative z-10 flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel
            defaultSize={100}
            minSize={100}
            className="h-full overflow-hidden"
          >
            <PanelGroup direction="vertical" className="h-full">
              {/* Editor */}
              <Panel defaultSize={60} minSize={30} className="overflow-hidden">
                <div className="h-full bg-gray-900/60 backdrop-blur-sm border border-green-500/15">
                  <PlayGroundCodeEditor
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={handleCodeChange}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-green-500/10 hover:bg-green-500/40 cursor-row-resize" />

              {/* Output */}
              <Panel defaultSize={40} minSize={20} className="overflow-hidden">
                <div className="h-full bg-gray-900/60 backdrop-blur-sm border-t border-green-500/15">
                  <PlayGroundOutput
                    output={output}
                    isRunning={isRunning}
                    testPassed={null}
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

export default PlayGround;
