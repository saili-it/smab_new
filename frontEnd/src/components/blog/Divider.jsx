/* eslint-disable react/prop-types */

/**
 * Customizable divider component for use in the editor.
 * Props: color, thickness, margin
 */
const Divider = ({ color = "#e2e8f0", thickness = 2, margin = 24, style }) => (
  <hr
    style={{
      border: "none",
      borderTop: `${thickness}px solid ${color}`,
      margin: `${margin}px 0`,
      ...style
    }}
  />
);

export default Divider;
