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
