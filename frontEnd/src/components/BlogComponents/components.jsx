/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */

import websiteContentService from '../../services/websiteContentService.js';
import Section from '../blog/Section.jsx';
import Divider from '../blog/Divider.jsx';
import Video from '../blog/Video.jsx';
import List from '../blog/List.jsx';
import RichTextRenderer from '../blog/RichTextRenderer.jsx';

export const components = {
  Heading: {
    defaultProps: {
      text: "Add your heading",
      level: "h1",
      textColor: "#1a1a1a",
      fontSize: "32",
      fontWeight: "600",
      textAlign: "left",
      marginTop: "0",
      marginBottom: "16",
      marginLeft: "0",
      marginRight: "0",
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: "0",
      paddingRight: "0"
    },
    fields: {
      text: {
        type: "text",
        label: "Heading Text (Supports links: [text](url) and line breaks)"
      },
      level: {
        type: "select",
        label: "Heading Level",
        options: [
          { label: "H1", value: "h1" },
          { label: "H2", value: "h2" },
          { label: "H3", value: "h3" }
        ]
      },
      textColor: {
        type: "text",
        label: "Text Color",
        inputType: "color"
      },
      fontSize: {
        type: "number",
        label: "Font Size (px)",
        min: 12,
        max: 96
      },
      fontWeight: {
        type: "select",
        label: "Font Weight",
        options: [
          { label: "Light (300)", value: "300" },
          { label: "Normal (400)", value: "400" },
          { label: "Medium (500)", value: "500" },
          { label: "Semi-bold (600)", value: "600" },
          { label: "Bold (700)", value: "700" },
          { label: "Extra Bold (800)", value: "800" }
        ]
      },
      textAlign: {
        type: "select",
        label: "Text Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" }
        ]
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 200
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 200
      },
      paddingTop: {
        type: "number",
        label: "Padding Top (px)",
        min: 0,
        max: 200
      },
      paddingBottom: {
        type: "number",
        label: "Padding Bottom (px)",
        min: 0,
        max: 200
      },
      paddingLeft: {
        type: "number",
        label: "Padding Left (px)",
        min: 0,
        max: 200
      },
      paddingRight: {
        type: "number",
        label: "Padding Right (px)",
        min: 0,
        max: 200
      }
    },
    render: ({ text, level, textColor, fontSize, fontWeight, textAlign, marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight }) => {
      const Tag = level;
      const style = {
        color: textColor,
        fontSize: `${fontSize}px`,
        textAlign,
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        fontWeight
      };
      return (
        <Tag style={style}>
          <RichTextRenderer content={text} />
        </Tag>
      );
    }
  },
  Paragraph: {
    defaultProps: {
      content: "Start writing your content...",
      textColor: "#4a5568",
      fontSize: "16",
      fontWeight: "400",
      textAlign: "left",
      marginTop: "0",
      marginBottom: "16",
      marginLeft: "0",
      marginRight: "0",
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: "0",
      paddingRight: "0",
      lineHeight: "1.6"
    },
    fields: {
      content: {
        type: "textarea",
        label: "Content (Supports links: [text](url) and line breaks)"
      },
      textColor: {
        type: "text",
        label: "Text Color",
        inputType: "color"
      },
      fontSize: {
        type: "number",
        label: "Font Size (px)",
        min: 12,
        max: 96
      },
      fontWeight: {
        type: "select",
        label: "Font Weight",
        options: [
          { label: "Light (300)", value: "300" },
          { label: "Normal (400)", value: "400" },
          { label: "Medium (500)", value: "500" },
          { label: "Semi-bold (600)", value: "600" },
          { label: "Bold (700)", value: "700" },
          { label: "Extra Bold (800)", value: "800" }
        ]
      },
      textAlign: {
        type: "select",
        label: "Text Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" }
        ]
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 200
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 200
      },
      paddingTop: {
        type: "number",
        label: "Padding Top (px)",
        min: 0,
        max: 200
      },
      paddingBottom: {
        type: "number",
        label: "Padding Bottom (px)",
        min: 0,
        max: 200
      },
      paddingLeft: {
        type: "number",
        label: "Padding Left (px)",
        min: 0,
        max: 200
      },
      paddingRight: {
        type: "number",
        label: "Padding Right (px)",
        min: 0,
        max: 200
      },
      lineHeight: {
        type: "number",
        label: "Line Height",
        min: 1,
        max: 3,
        step: 0.1
      }
    },
    render: ({ content, textColor, fontSize, fontWeight, textAlign, marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight, lineHeight }) => {
      const style = {
        color: textColor,
        fontSize: `${fontSize}px`,
        fontWeight,
        textAlign,
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        lineHeight
      };
      return (
        <p style={style}>
          <RichTextRenderer content={content} />
        </p>
      );
    }
  },
  Image: {
    defaultProps: {
      src: null,
      alt: "",
      caption: "",
      width: "100",
      borderRadius: "8",
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowBlur: "10",
      shadowSpread: "0",
      marginTop: "16",
      marginBottom: "16",
      marginLeft: "0",
      marginRight: "0",
      captionColor: "#4a5568",
      captionSize: "14"
    },
    fields: {
      src: {
        type: "custom",
        label: "Image Source",
        render: ({ value, onChange }) => {
          const handleFileChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              try {
                const url = await websiteContentService.uploadMediaFile(file);
                onChange(url);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            }
          };

          return (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="src"
              />
              <label 
                htmlFor="src"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Choose Image
              </label>
              {value && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={value} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '100px', 
                        objectFit: 'cover' 
                      }} 
                    />
                    <button
                      onClick={async () => {
                        try {
                          if (value) {
                            // Extract fileId from URL (format: API_URL/media/fileId)
                            const fileId = value.split('/media/').pop();
                            if (fileId) {
                              await websiteContentService.deleteMediaFile(fileId);
                            }
                          }
                          onChange('');
                        } catch (error) {
                          console.error('Error removing image:', error);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        }
      },
      alt: {
        type: "text",
        label: "Alt Text"
      },
      caption: {
        type: "text",
        label: "Caption"
      },
      width: {
        type: "number",
        label: "Width (%)",
        min: 1,
        max: 100
      },
      borderRadius: {
        type: "number",
        label: "Border Radius (px)",
        min: 0,
        max: 100
      },
      shadowColor: {
        type: "text",
        label: "Shadow Color",
        inputType: "color"
      },
      shadowBlur: {
        type: "number",
        label: "Shadow Blur (px)",
        min: 0,
        max: 100
      },
      shadowSpread: {
        type: "number",
        label: "Shadow Spread (px)",
        min: -50,
        max: 50
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 200
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 200
      },
      captionColor: {
        type: "text",
        label: "Caption Color",
        inputType: "color"
      },
      captionSize: {
        type: "number",
        label: "Caption Size (px)",
        min: 10,
        max: 24
      }
    },
    render: ({ src, alt, caption, width, borderRadius, shadowColor, shadowBlur, shadowSpread, marginTop, marginBottom, marginLeft, marginRight, captionColor, captionSize }) => {
      const figureStyle = {
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        textAlign: 'center'
      };
      
      const imageStyle = {
        width: `${width}%`,
        borderRadius: `${borderRadius}px`,
        boxShadow: `0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
        margin: '0 auto',
        display: 'block'
      };

      const captionStyle = {
        marginTop: '8px',
        color: captionColor,
        fontSize: `${captionSize}px`,
        textAlign: 'center'
      };

      return (
        <figure style={figureStyle}>
          <img 
            src={src || ''} 
            alt={alt} 
            style={imageStyle}
          />
          {caption && (
            <figcaption style={captionStyle}>
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }
  },
  Button: {
    defaultProps: {
      text: "Click me",
      url: "#",
      backgroundColor: "#3182ce",
      textColor: "#ffffff",
      hoverBackgroundColor: "#2c5282",
      hoverTextColor: "#ffffff",
      fontSize: "16",
      paddingX: "24",
      paddingY: "8",
      marginTop: "8",
      marginBottom: "8",
      marginLeft: "0",
      marginRight: "0",
      borderRadius: "8",
      borderWidth: "0",
      borderColor: "transparent",
      width: "auto",
      alignment: "left"
    },
    fields: {
      text: { 
        type: "text",
        label: "Button Text"
      },
      url: { 
        type: "text",
        label: "Button URL"
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
        inputType: "color"
      },
      textColor: {
        type: "text",
        label: "Text Color",
        inputType: "color"
      },
      hoverBackgroundColor: {
        type: "text",
        label: "Hover Background Color",
        inputType: "color"
      },
      hoverTextColor: {
        type: "text",
        label: "Hover Text Color",
        inputType: "color"
      },
      fontSize: {
        type: "number",
        label: "Font Size (px)",
        min: 12,
        max: 32
      },
      paddingX: {
        type: "number",
        label: "Horizontal Padding (px)",
        min: 0,
        max: 100
      },
      paddingY: {
        type: "number",
        label: "Vertical Padding (px)",
        min: 0,
        max: 100
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 100
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 100
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 100
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 100
      },
      borderRadius: {
        type: "number",
        label: "Border Radius (px)",
        min: 0,
        max: 50
      },
      borderWidth: {
        type: "number",
        label: "Border Width (px)",
        min: 0,
        max: 10
      },
      borderColor: {
        type: "text",
        label: "Border Color",
        inputType: "color"
      },
      width: {
        type: "select",
        label: "Width",
        options: [
          { label: "Auto", value: "auto" },
          { label: "Full Width", value: "100%" }
        ]
      },
      alignment: {
        type: "select",
        label: "Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" }
        ]
      }
    },
    render: ({ text, url, backgroundColor, textColor, hoverBackgroundColor, hoverTextColor, fontSize, paddingX, paddingY, marginTop, marginBottom, marginLeft, marginRight, borderRadius, borderWidth, borderColor, width, alignment }) => {
      const containerStyle = {
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        textAlign: alignment
      };

      const buttonStyle = {
        display: 'inline-block',
        backgroundColor,
        color: textColor,
        fontSize: `${fontSize}px`,
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        width: width,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      };

      return (
        <div style={containerStyle}>
          <a 
            href={url}
            style={buttonStyle}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = hoverBackgroundColor;
              e.currentTarget.style.color = hoverTextColor;
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = backgroundColor;
              e.currentTarget.style.color = textColor;
            }}
          >
            {text}
          </a>
        </div>
      );
    }
  },
  Section: {
    defaultProps: {
      backgroundColor: "#fff",
      padding: "32",
      marginTop: "0",
      marginBottom: "16",
      borderRadius: "8",
      borderWidth: "0",
      borderColor: "#e2e8f0",
      borderStyle: "none",
      minHeight: "200",
      title: "Section",
      showTitle: true,
      titleColor: "#1a202c",
      titleSize: "18",
      // Container options
      maxWidth: "none",
      containerCentered: false,
      // Flexbox options
      displayType: "block",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "nowrap",
      gap: "16"
    },
    fields: {
      title: {
        type: "text",
        label: "Section Title"
      },
      showTitle: {
        type: "radio",
        label: "Show Title",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]
      },
      titleColor: {
        type: "text",
        label: "Title Color",
        inputType: "color"
      },
      titleSize: {
        type: "number",
        label: "Title Size (px)",
        min: 12,
        max: 48
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
        inputType: "color"
      },
      padding: {
        type: "number",
        label: "Padding (px)",
        min: 0,
        max: 100
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      borderRadius: {
        type: "number",
        label: "Border Radius (px)",
        min: 0,
        max: 50
      },
      borderWidth: {
        type: "number",
        label: "Border Width (px)",
        min: 0,
        max: 10
      },
      borderColor: {
        type: "text",
        label: "Border Color",
        inputType: "color"
      },
      borderStyle: {
        type: "select",
        label: "Border Style",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
          { label: "None", value: "none" }
        ]
      },
      minHeight: {
        type: "number",
        label: "Minimum Height (px)",
        min: 100,
        max: 800
      },
      // Container fields
      maxWidth: {
        type: "select",
        label: "Max Width",
        options: [
          { label: "None", value: "none" },
          { label: "Small (640px)", value: "640" },
          { label: "Medium (768px)", value: "768" },
          { label: "Large (1024px)", value: "1024" },
          { label: "Extra Large (1280px)", value: "1280" },
          { label: "Full Width (1536px)", value: "1536" }
        ]
      },
      containerCentered: {
        type: "radio",
        label: "Center Container",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]
      },
      // Layout fields
      displayType: {
        type: "select",
        label: "Display Type",
        options: [
          { label: "Block", value: "block" },
          { label: "Flex", value: "flex" }
        ]
      },
      flexDirection: {
        type: "select",
        label: "Flex Direction",
        options: [
          { label: "Row", value: "row" },
          { label: "Column", value: "column" },
          { label: "Row Reverse", value: "row-reverse" },
          { label: "Column Reverse", value: "column-reverse" }
        ]
      },
      justifyContent: {
        type: "select",
        label: "Justify Content",
        options: [
          { label: "Flex Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "Flex End", value: "flex-end" },
          { label: "Space Between", value: "space-between" },
          { label: "Space Around", value: "space-around" },
          { label: "Space Evenly", value: "space-evenly" }
        ]
      },
      alignItems: {
        type: "select",
        label: "Align Items",
        options: [
          { label: "Stretch", value: "stretch" },
          { label: "Flex Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "Flex End", value: "flex-end" },
          { label: "Baseline", value: "baseline" }
        ]
      },
      flexWrap: {
        type: "select",
        label: "Flex Wrap",
        options: [
          { label: "No Wrap", value: "nowrap" },
          { label: "Wrap", value: "wrap" },
          { label: "Wrap Reverse", value: "wrap-reverse" }
        ]
      },
      gap: {
        type: "number",
        label: "Gap (px)",
        min: 0,
        max: 100
      },
      // Slot field for nested components
      content: {
        type: "slot"
      }
    },
    render: Section
  },
  Divider: {
    defaultProps: {
      color: "#e2e8f0",
      thickness: 2,
      margin: 24
    },
    fields: {
      color: {
        type: "text",
        label: "Color",
        inputType: "color"
      },
      thickness: {
        type: "number",
        label: "Thickness (px)",
        min: 1,
        max: 10
      },
      margin: {
        type: "number",
        label: "Margin (px)",
        min: 0,
        max: 100
      }
    },
    render: Divider
  },
  Video: {
    defaultProps: {
      url: "",
      width: 560,
      height: 315,
      autoplay: false
    },
    fields: {
      url: {
        type: "text",
        label: "Video URL"
      },
      width: {
        type: "number",
        label: "Width (px)",
        min: 100,
        max: 1920
      },
      height: {
        type: "number",
        label: "Height (px)",
        min: 100,
        max: 1080
      },
      autoplay: {
        type: "select",
        label: "Autoplay",
        options: [
          { label: "No", value: false },
          { label: "Yes", value: true }
        ]
      }
    },
    render: Video
  },
  Container: {
    defaultProps: {
      backgroundColor: "#ffffff",
      padding: "16",
      marginTop: "0",
      marginBottom: "16",
      marginLeft: "0",
      marginRight: "0",
      borderRadius: "8",
      borderWidth: "1",
      borderColor: "#e2e8f0",
      borderStyle: "solid"
    },
    fields: {
      content: {
        type: "slot",
        label: "Content"
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
        inputType: "color"
      },
      padding: {
        type: "number",
        label: "Padding (px)",
        min: 0,
        max: 100
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 200
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 200
      },
      borderRadius: {
        type: "number",
        label: "Border Radius (px)",
        min: 0,
        max: 50
      },
      borderWidth: {
        type: "number",
        label: "Border Width (px)",
        min: 0,
        max: 10
      },
      borderColor: {
        type: "text",
        label: "Border Color",
        inputType: "color"
      },
      borderStyle: {
        type: "select",
        label: "Border Style",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
          { label: "None", value: "none" }
        ]
      }
    },
    render: ({ content: Content, backgroundColor, padding, marginTop, marginBottom, marginLeft, marginRight, borderRadius, borderWidth, borderColor, borderStyle }) => {
      const containerStyle = {
        backgroundColor,
        padding: `${padding}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        borderRadius: `${borderRadius}px`,
        border: borderStyle !== 'none' ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none'
      };
      
      return (
        <div style={containerStyle}>
          <Content />
        </div>
      );
    }
  },
  List: {
    defaultProps: {
      items: ["First item", "Second item", "Third item"],
      listType: "unordered",
      textColor: "#4a5568",
      fontSize: "16",
      fontWeight: "400",
      lineHeight: "1.6",
      marginTop: "0",
      marginBottom: "16",
      marginLeft: "0",
      marginRight: "0",
      paddingLeft: "20",
      bulletColor: "#4a5568",
      numberColor: "#4a5568"
    },
    fields: {
      items: {
        type: "array",
        label: "List Items",
        arrayFields: {
          item: {
            type: "text",
            label: "Item"
          }
        },
        getItemSummary: (item) => item.item || "Empty item"
      },
      listType: {
        type: "select",
        label: "List Type",
        options: [
          { label: "Unordered (Bullets)", value: "unordered" },
          { label: "Ordered (Numbers)", value: "ordered" }
        ]
      },
      textColor: {
        type: "text",
        label: "Text Color",
        inputType: "color"
      },
      fontSize: {
        type: "number",
        label: "Font Size (px)",
        min: 12,
        max: 32
      },
      fontWeight: {
        type: "select",
        label: "Font Weight",
        options: [
          { label: "Light (300)", value: "300" },
          { label: "Normal (400)", value: "400" },
          { label: "Medium (500)", value: "500" },
          { label: "Semi-bold (600)", value: "600" },
          { label: "Bold (700)", value: "700" },
          { label: "Extra Bold (800)", value: "800" }
        ]
      },
      lineHeight: {
        type: "number",
        label: "Line Height",
        min: 1,
        max: 3,
        step: 0.1
      },
      marginTop: {
        type: "number",
        label: "Margin Top (px)",
        min: 0,
        max: 200
      },
      marginBottom: {
        type: "number",
        label: "Margin Bottom (px)",
        min: 0,
        max: 200
      },
      marginLeft: {
        type: "number",
        label: "Margin Left (px)",
        min: 0,
        max: 200
      },
      marginRight: {
        type: "number",
        label: "Margin Right (px)",
        min: 0,
        max: 200
      },
      paddingLeft: {
        type: "number",
        label: "Left Padding (px)",
        min: 0,
        max: 100
      },
      bulletColor: {
        type: "text",
        label: "Bullet Color",
        inputType: "color"
      },
      numberColor: {
        type: "text",
        label: "Number Color",
        inputType: "color"
      }
    },
    render: ({ items, listType, textColor, fontSize, fontWeight, lineHeight, marginTop, marginBottom, marginLeft, marginRight, paddingLeft, bulletColor, numberColor }) => {
      // Convert array format from Puck to simple string array
      const itemsArray = items.map(item => typeof item === 'string' ? item : item.item);
      
      return (
        <List
          items={itemsArray}
          listType={listType}
          textColor={textColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
          marginRight={marginRight}
          paddingLeft={paddingLeft}
          bulletColor={bulletColor}
          numberColor={numberColor}
        />
      );
    }
  }
};
