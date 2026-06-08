"use client";

import { useEffect, useState } from "react";
import ReactJoyride, { CallBackProps, STATUS, Step } from "react-joyride";
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

  const styles = {
    options: {
        zIndex: 10000,
        primaryColor: theme === 'dark' ? '#ff79c6' : '#ea580c',
        textColor: theme === 'dark' ? '#f5f5f5' : '#1f2937',
        backgroundColor: theme === 'dark' ? '#1D1E23' : '#ffffff',
        arrowColor: theme === 'dark' ? '#1D1E23' : '#ffffff',
    },
    tooltip: {
        borderRadius: '0.75rem',
        padding: '1rem',
        border: theme === 'dark' ? '1px dashed rgba(255, 255, 255, 0.1)' : 'none',
    },
    buttonNext: {
        backgroundColor: theme === 'dark' ? '#24262C' : '#ea580c',
        borderRadius: '0.5rem',
        color: '#fff',
        fontWeight: 600,
        padding: '0.5rem 1rem',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
    },
    buttonBack: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        marginRight: '0.5rem',
    },
    buttonSkip: {
        color: theme === 'dark' ? '#ff79c6' : '#dc2626',
    }
  };

  return (
    <ReactJoyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={styles}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  );
}
