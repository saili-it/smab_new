/* eslint-disable react/prop-types */

/**
 * Video component for embedding YouTube, Vimeo, or direct video links.
 * Props: url, width, height, autoplay
 */
const Video = ({ url = "", width = 560, height = 315, autoplay = false }) => {
  if (!url) return null;

  // YouTube
  const ytMatch = url.match(
    /(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
  );
  if (ytMatch) {
    return (
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=${autoplay ? 1 : 0}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // Vimeo
  const vimeoMatch = url.match(
    /vimeo.com\/(?:video\/)?([0-9]+)/
  );
  if (vimeoMatch) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoplay ? 1 : 0}`}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo video player"
      />
    );
  }

  // Direct video file
  return (
    <video width={width} height={height} controls autoPlay={autoplay}>
      <source src={url} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
