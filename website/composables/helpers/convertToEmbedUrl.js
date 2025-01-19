function convertToEmbedUrl(url) {
  const parsedUrl = new URL(url);
  let embedUrl = "";

  switch (parsedUrl.hostname) {
    case "www.youtube.com":
    case "youtube.com":
      embedUrl = convertYouTubeUrl(parsedUrl);
      break;
    case "youtu.be":
      embedUrl = convertYouTubeShortUrl(parsedUrl);
      break;
    case "www.facebook.com":
    case "facebook.com":
    case "fb.watch":
    case "fb.com":
      embedUrl = convertFacebookUrl(parsedUrl);
      break;
    default:
      embedUrl = url;
  }

  return embedUrl;
}

function convertYouTubeUrl(url) {
  const videoId = url.searchParams.get("v");
  const startTime = url.searchParams.get("t") || 0;
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  if (startTime) {
    embedUrl.searchParams.set("start", startTime);
  }
  return embedUrl.toString();
}

function convertYouTubeShortUrl(url) {
  const videoId = url.pathname.slice(1);
  const startTime = url.searchParams.get("t") || 0;
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  if (startTime) {
    embedUrl.searchParams.set("start", startTime);
  }
  return embedUrl.toString();
}

function convertFacebookUrl(url) {
  const embedUrl = new URL(`https://www.facebook.com/plugins/video.php?href=${url}`);
  return embedUrl.toString();
}

export default convertToEmbedUrl;
