/* eslint-disable react/prop-types */

/**
 * A flexible container component for grouping content blocks in the editor.
 * Accepts children as slot content and optional style props.
 */
const Container = ({ children, style }) => {
  return (
    <div style={{ padding: "1rem", border: "1px solid #eee", borderRadius: 8, ...style }}>
      {children}
    </div>
  );
};

export default Container;
