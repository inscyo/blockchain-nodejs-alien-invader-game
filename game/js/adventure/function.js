export const ifInstanceHasLength = (instance, callback) => {
  if (instance.length > 0) {
    for (let index = 0; index < instance.length; index++) {
      callback(instance, index);
    }
  }
};

export const probability = (min = 0.01, max = 0.99) => {
  return Math.random() * (max - min) + min;
};

export const getMousePos = function (canvas, evt) {
  var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

  return [
    (evt.clientX - rect.left) * scaleX,
    (evt.clientY - rect.top) * scaleY,
  ];
};

export const strb64 = function (string) {
  let img = new Image();
  img.src = string;
  return img;
};

export const multib64 = function (arr) {
  let img = [];
  for (let i in arr) {
    img.push(strb64(arr[i]));
  }
  return img;
};

export const percentage = function (f, s) {
  return (f / s) * 100;
};
