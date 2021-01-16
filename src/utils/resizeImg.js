const reader = new FileReader();

const dataURItoBlob = dataURI => {
  let bytes =
    dataURI.split(",")[0].indexOf("base64") >= 0
      ? atob(dataURI.split(",")[1])
      : unescape(dataURI.split(",")[1]);
  let mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
  let max = bytes.length;
  let ia = new Uint8Array(max);
  for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};

const resize = (image, maxSize) => {
  let { width, height } = image;
  const canvas = document.createElement("canvas");

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  let dataUrl = canvas.toDataURL("image/webp", 1);
  return dataURItoBlob(dataUrl);
};

export const resizeImg = ({ file, maxSize }) => {
  let image = new Image();

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) return no(new Error("Not an image"));

    reader.onload = readerEvent => {
      image.onload = () => ok(resize(image, maxSize));
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};
