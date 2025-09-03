/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// DropZone has been replaced with slot fields

export default function Section({
  backgroundColor = "#000",
  padding = "32",
  marginTop = "0",
  marginBottom = "16",
  borderRadius = "8",
  borderWidth = "0",
  borderColor = "#e2e8f0",
  borderStyle = "none",
  minHeight = "200",
  title = "Section",
  showTitle = true,
  titleColor = "#1a202c",
  titleSize = "18",
  // Container options
  maxWidth = "none",
  containerCentered = false,
  // Flexbox options
  displayType = "block",
  flexDirection = "column",
  justifyContent = "flex-start",
  alignItems = "stretch",
  flexWrap = "nowrap",
  gap = "16",
  content: Content,
  puck
}) {
  const sectionStyle = {
    backgroundColor,
    padding: `${padding}px`,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    borderRadius: `${borderRadius}px`,
    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
    minHeight: `${minHeight}px`,
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    // Container styles
    maxWidth: maxWidth === "none" ? "none" : `${maxWidth}px`,
    marginLeft: containerCentered ? 'auto' : undefined,
    marginRight: containerCentered ? 'auto' : undefined,
    width: containerCentered && maxWidth !== "none" ? '100%' : undefined
  };

  const titleStyle = {
    color: titleColor,
    fontSize: `${titleSize}px`,
    fontWeight: '600',
    marginBottom: '16px',
    display: showTitle ? 'block' : 'none'
  };

  return (
    <div style={sectionStyle}>
      {showTitle && (
        <h3 style={titleStyle}>{title}</h3>
      )}
      <Content 
        style={{
          minHeight: showTitle ? `${Math.max(0, parseInt(minHeight) - 60)}px` : `${minHeight}px`,
          borderRadius: '4px',
          padding: '16px',
          backgroundColor: backgroundColor,
          position: 'relative',
          // Flexbox styles
          display: displayType,
          flexDirection: displayType === 'flex' ? flexDirection : undefined,
          justifyContent: displayType === 'flex' ? justifyContent : undefined,
          alignItems: displayType === 'flex' ? alignItems : undefined,
          flexWrap: displayType === 'flex' ? flexWrap : undefined,
          gap: displayType === 'flex' ? `${gap}px` : undefined
        }}
        minEmptyHeight={showTitle ? Math.max(0, parseInt(minHeight) - 60) : parseInt(minHeight)}
      />
    </div>
  );
}