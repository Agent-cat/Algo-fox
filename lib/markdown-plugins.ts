import { visit } from 'unist-util-visit';
import { Node } from 'unist';

// Type definitions for the tree structure since we are working with unist
interface ContentNode extends Node {
  name?: string;
  attributes?: Record<string, any>;
  children?: ContentNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, any>;
  };
  type: string;
}


export function remarkSolutionDirective() {
  return (tree: ContentNode) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name === 'solution') {
          // Verify we have attributes
          const data = node.data || (node.data = {});
          const attributes = node.attributes || {};
          const title = attributes.title || "Solution";

          // Transform this node into a custom 'solution-group' element for React Markdown to pick up
          // react-markdown will see this as a customized element
          data.hName = 'solution-group';
          data.hProperties = {
            title,
            ...attributes,
          };
        }
      }
    });
  };
}

export function remarkMcqDirective() {
  return (tree: ContentNode) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'mcq') {
        const children = node.children || [];

        // Find list
        const listIndex = children.findIndex(c => c.type === 'list');
        if (listIndex === -1) return; // invalid mcq

        // Question is everything before list
        const questionNodes = children.slice(0, listIndex);

        // Simple extraction of question text
        let question = "";

        // Helper to extract text recursively
        const extractText = (n: any) : string => {
            if (n.value) return n.value;
            if (n.children) return n.children.map(extractText).join("");
            return "";
        };

        question = questionNodes.map(extractText).join("\n");

        const list = children[listIndex];
        const options = list.children?.map((li: any, index: number) => {
            // li is listItem
            // We assume remark-gfm runs before this to populate checked
            // Or we check textual content if checked is null
            let isCorrect = li.checked === true;

            // Extract text from list item children (usually paragraph)
            let text = "";
            if (li.children) {
                // If the first child is a paragraph, extract its content
                // If checked is null, maybe the Checkbox wasn't parsed by GFM?
                // But if the user writes [x], GFM should catch it if enabled.

                // Exclude the checkbox from text if it's there but raw?
                // If GFM processed it, the checkbox is removed from text logic typically or handled as a separate property.
                text = li.children.map(extractText).join(" ");
            }

            return {
                id: `opt-${index}`,
                text: text.replace(/^\[[ x]\]\s*/, ''), // Clean up if raw
                isCorrect
            };
        }) || [];

        const data = node.data || (node.data = {});
        data.hName = 'mcq-widget';
        data.hProperties = {
            data: JSON.stringify({
                question,
                options
            })
        };

        // Clear children so they don't render internally
        node.children = [];
      }
    });
  };
}
