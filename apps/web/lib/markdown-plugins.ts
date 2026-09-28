import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

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
  value?: string;
}


export function remarkSolutionDirective() {
  return (tree: ContentNode) => {
    const traverse = (node: ContentNode) => {
      if (!node.children) return;

      // First, recurse into all children to process nested directives
      node.children.forEach(child => traverse(child));

      const newChildren: ContentNode[] = [];
      let i = 0;

      while (i < node.children.length) {
        const child = node.children[i];

        if (child.type === 'containerDirective' && child.name === 'solution') {
          // Found a solution, now see how many follow it
          const group: ContentNode[] = [child];
          let j = i + 1;

          while (j < node.children.length) {
            const current = node.children[j];
            if (current.type === 'containerDirective' && current.name === 'solution') {
              group.push(current);
              j++;
            } else if (current.type === 'thematicBreak') {
              // Check if another solution follows
              let foundNext = false;
              for (let k = j + 1; k < node.children.length; k++) {
                const next = node.children[k];
                if (next.type === 'containerDirective' && next.name === 'solution') {
                  foundNext = true;
                  break;
                } else if (next.type === 'text' && (!next.value || !next.value.trim())) {
                  continue;
                } else {
                  break;
                }
              }
              if (foundNext) {
                j++; // Skip HR
              } else {
                break;
              }
            } else if (current.type === 'text' && (!current.value || /^\s*$/.test(current.value))) {
              j++; // Skip whitespace nodes including multiple newlines
            } else {
              break;
            }
          }

          if (group.length > 1) {
            // Transform each solution in the group
            group.forEach(n => {
                const data = n.data || (n.data = {});
                const attributes = n.attributes || {};
                data.hName = 'solution-group';
                data.hProperties = {
                    title: attributes.title || "Solution",
                    ...attributes,
                };
            });

            const tabsNode: ContentNode = {
              type: 'containerDirective',
              name: 'solution-tabs',
              children: group,
              data: {
                hName: 'solution-tabs',
                hProperties: {
                  titles: JSON.stringify(group.map(g => g.data?.hProperties?.title || "Solution"))
                }
              }
            };
            newChildren.push(tabsNode);
            i = j;
          } else {
            // Single solution
            const data = child.data || (child.data = {});
            const attributes = child.attributes || {};
            data.hName = 'solution-group';
            data.hProperties = {
                title: attributes.title || "Solution",
                ...attributes,
            };
            newChildren.push(child);
            i++;
          }
        } else {
          newChildren.push(child);
          i++;
        }
      }
      node.children = newChildren;
    };

    traverse(tree);
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
