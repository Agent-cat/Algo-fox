import { toast } from "sonner";

export interface ParsedQuestion {
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  timeLimit: number;
}

export function parseQuizMarkdown(content: string): ParsedQuestion[] {
  const lines = content.split('\n');
  const questions: ParsedQuestion[] = [];
  
  let currentQuestion: Partial<ParsedQuestion> | null = null;
  
  const finishCurrentQuestion = () => {
    if (currentQuestion && currentQuestion.text) {
      questions.push({
        text: currentQuestion.text.trim(),
        options: currentQuestion.options && currentQuestion.options.length > 0 ? currentQuestion.options : [""],
        correctOption: currentQuestion.correctOption !== undefined && currentQuestion.correctOption >= 0 ? currentQuestion.correctOption : 0,
        explanation: currentQuestion.explanation?.trim() || "",
        timeLimit: currentQuestion.timeLimit || 30
      });
    }
  };

  let inQuestionText = false;
  let questionTextLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Match headers like ## Question 1
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
    
    if (headerMatch) {
      finishCurrentQuestion();
      currentQuestion = {
        text: headerMatch[2],
        options: [],
        correctOption: -1,
        explanation: "",
        timeLimit: 30
      };
      inQuestionText = true;
      questionTextLines = [headerMatch[2]];
      continue;
    }

    if (!currentQuestion) continue;

    // Time Limit
    const timeLimitMatch = trimmed.match(/^\*\*(?:Time Limit|Time)\:\*\*\s*(\d+)/i) || trimmed.match(/^(?:Time Limit|Time)\:\s*(\d+)/i);
    if (timeLimitMatch) {
      currentQuestion.timeLimit = parseInt(timeLimitMatch[1], 10);
      inQuestionText = false;
      continue;
    }

    // Explanation
    const explanationMatch = trimmed.match(/^\*\*(?:Explanation|Explain)\:\*\*\s*(.*)/i) || trimmed.match(/^(?:Explanation|Explain)\:\s*(.*)/i);
    if (explanationMatch) {
      currentQuestion.explanation = explanationMatch[1];
      inQuestionText = false;
      continue;
    }

    // List items (options)
    const listMatch = line.match(/^(\s*)([-*+])\s+(.*)/);
    if (listMatch) {
      inQuestionText = false;
      let optionText = listMatch[3];
      
      // Check if it's the correct option
      const checkMatch = optionText.match(/^\[([xX])\]\s+(.*)/);
      if (checkMatch) {
        optionText = checkMatch[2];
        currentQuestion.correctOption = currentQuestion.options!.length;
      }

      currentQuestion.options!.push(optionText.trim());
      continue;
    }

    // If we're accumulating question text (multi-line) and haven't hit options/explanations
    if (inQuestionText && trimmed !== "") {
      questionTextLines.push(trimmed);
      currentQuestion.text = questionTextLines.join("\n");
    }
  }

  finishCurrentQuestion();
  
  if (questions.length === 0) {
    toast.error("No valid questions found in the markdown file. Ensure questions start with ##.");
  }
  
  return questions;
}
