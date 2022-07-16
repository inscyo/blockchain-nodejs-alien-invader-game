export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

export async function loadImageFolder(url) {
  return await fetch(url)
    .then((response) => response.text())
    .then(async (html) => {
      let image = [];
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      let elements = doc.getElementsByTagName("a");
      for (let i = 0; i < elements.length; i++) {
        let href = elements[i].href.match(/\.(jpe?g|png|gif)$/);
        if (href != null) {
          let src = href.input;
          await loadImage(src).then((res) => {
            image[i] = res;
          });
        }
      }
      return image.filter((e) => e != null);
    })
    .catch(function (err) {
      console.log("Failed to fetch: ", err);
    });
}
