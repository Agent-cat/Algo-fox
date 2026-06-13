"use client";

import { useEffect, useState } from "react";
import ReactJoyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from "react-joyride";
import { useTheme } from "next-themes";

export default function ProblemTour() {
  const { theme } = useTheme();
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if tour has been seen
    const seenTour = localStorage.getItem("algofox_problem_tour_seen");
    if (!seenTour) {
      // Small delay to ensure everything is mounted
      const timer = setTimeout(() => {
        setRun(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      localStorage.setItem("algofox_problem_tour_seen", "true");
    }
  };

  const steps: Step[] = [
    {
      target: "#problem-list-toggle",
      content: "Click here to toggle the problem list and navigate between problems easily.",
      disableBeacon: true,
    },
    {
       target: "#problem-description",
       content: "Read the problem statement, examples, and constraints here.",
    },
    {
      target: "#solutions-tab",
      content: "Stuck? Check out official and community solutions here (unlocks after solving!).",
    },
    {
      target: "#language-dropdown",
      content: "Choose your preferred programming language from the dropdown.",
    },
    {
      target: "#code-editor",
      content: "Write your solution code here. It supports syntax highlighting and auto-completion.",
    },
    {
      target: "#run-button",
      content: "Test your code against sample test cases before submitting.",
    },
    {
      target: "#test-cases",
      content: "View the results of your test cases here.",
    },
    {
      target: "#submit-button",
      content: "Ready? Submit your solution to see if it passes all hidden test cases!",
    },
  ];

  const CustomTooltip = ({
    index,
    step,
    backProps,
    closeProps,
    primaryProps,
    skipProps,
    tooltipProps,
    isLastStep,
  }: TooltipRenderProps) => (
    <div
      {...tooltipProps}
      className="bg-white dark:bg-[#24262C] p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 max-w-[320px] font-sans"
    >
      {step.title && (
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
          {step.title}
        </h3>
      )}
      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-6 leading-relaxed">
        {step.content}
      </div>
      <div className="flex items-center justify-between mt-4">
        {skipProps && (
            <button
            {...skipProps}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
            Skip Tour
            </button>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {index > 0 && (
            <button
              {...backProps}
              className="px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#1D1E23] hover:bg-gray-200 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            {...primaryProps}
            className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-500/20 rounded-lg transition-all cursor-pointer"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );

  const styles = {
    options: {
        zIndex: 10000,
        primaryColor: '#ea580c',
        textColor: theme === 'dark' ? '#f5f5f5' : '#1f2937',
        backgroundColor: theme === 'dark' ? '#24262C' : '#ffffff',
        arrowColor: theme === 'dark' ? '#24262C' : '#ffffff',
    }
  };

  return (
    <ReactJoyride
      steps={steps}
      run={run}
      continuous
      showProgress={false}
      showSkipButton
      callback={handleJoyrideCallback}
      styles={styles}
      tooltipComponent={CustomTooltip}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  );
}
