/* eslint-disable react/prop-types */

/**
 * Rich text renderer that supports inline links and line breaks
 * Syntax:
 * - Links: [Link Text](https://example.com)
 * - Line breaks: Use \n or actual line breaks
 */
const RichTextRenderer = ({ content, style = {} }) => {
  if (!content) return null;

  const parseContent = (text) => {
    // Split by line breaks first
    const lines = text.split(/\n/);
    
    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        // Empty line - render as line break
        return <br key={`br-${lineIndex}`} />;
      }

      // Parse links in the format [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        // Add the link
        const linkText = match[1];
        const linkUrl = match[2];
        parts.push(
          <a 
            key={`link-${lineIndex}-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#3182ce',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {linkText}
          </a>
        );

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after the last link
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // If no links were found, just return the line
      if (parts.length === 0) {
        parts.push(line);
      }

      // Wrap the line content
      return (
        <span key={`line-${lineIndex}`}>
          {parts}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <span style={style}>
      {parseContent(content)}
    </span>
  );
};

export default RichTextRenderer;
