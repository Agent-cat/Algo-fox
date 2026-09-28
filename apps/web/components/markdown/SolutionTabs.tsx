"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SolutionTabsProps {
  children: React.ReactNode;
  titles?: string[];
}

export default function SolutionTabs({ children, titles = [] }: SolutionTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Extract children that are React elements (solution-group components)
  const solutions = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  ) as React.ReactElement[];

  if (solutions.length === 0) return null;

  // Ensure titles is an array of strings
  let normalizedTitles: string[] = [];
  
  if (Array.isArray(titles)) {
    normalizedTitles = titles.map(t => String(t));
  } else if (typeof titles === 'string') {
    try {
      const parsed = JSON.parse(titles);
      if (Array.isArray(parsed)) {
        normalizedTitles = parsed.map(t => String(t));
      } else {
        normalizedTitles = [String(titles)];
      }
    } catch (e) {
      // Not JSON, maybe a single title string
      normalizedTitles = [titles];
    }
  }

  const tabTitles = normalizedTitles.length === solutions.length ? normalizedTitles : solutions.map((sol, index) => {
     // Try to find title in deep props if wrapped by react-markdown
     const props = (sol.props as any) || {};
     const title = props.title || props.children?.props?.title || (sol as any).title || `Approach ${index + 1}`;
     return String(title);
  });

  // If we only found one solution after filtering, but we have multiple titles, 
  // it means something is wrong with how children are passed.
  // But usually solutions.length should match tabTitles.length.

  return (
    <div className="w-full my-8">
      {/* Active Solution Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {React.cloneElement(solutions[activeTabIndex], {
              onApproachChange: (index: number) => setActiveTabIndex(index),
              approaches: tabTitles,
              activeApproachIndex: activeTabIndex
            } as any)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
