/* eslint-disable react/prop-types */
import RichTextRenderer from './RichTextRenderer.jsx';

/**
 * A flexible list component for creating ordered and unordered lists in the editor.
 * Supports custom styling, list types, and dynamic list items.
 */
const List = ({ items, listType, textColor, fontSize, fontWeight, lineHeight, marginTop, marginBottom, marginLeft, marginRight, paddingLeft, bulletColor, numberColor }) => {
  const listStyle = {
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    paddingLeft: `${paddingLeft}px`,
    listStyleType: listType === 'ordered' ? 'decimal' : 'disc'
  };

  const itemStyle = {
    marginBottom: '8px',
    color: listType === 'ordered' ? numberColor : bulletColor
  };

  const textStyle = {
    color: textColor
  };

  const ListTag = listType === 'ordered' ? 'ol' : 'ul';

  return (
    <ListTag style={listStyle}>
      {items.map((item, index) => (
        <li key={index} style={itemStyle}>
          <span style={textStyle}>
            <RichTextRenderer content={item} />
          </span>
        </li>
      ))}
    </ListTag>
  );
};

export default List;