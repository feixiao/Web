const canvas = new fabric.Canvas("canvas", {
  width: window.innerWidth,
  height: window.innerHeight,
});
const myShadow = {
  color: "black",
  blur: 1,
  offsetX: 1,
  offsetY: 1,
};

const $ = (id) => document.getElementById(id);
const drawingOptionArea = $("drawingOptionArea");
const clearBtn = $("clear");
const modeBtn = $("mode");
const addBtn = $("add");
const lineWidthInput = $("lineWidthInput");
const lineWidthValue = $("lineWidthValue");
const lineColorInput = $("lineColorInput");
const shadowColorInput = $("shadowColorInput");
const shadowBlurInput = $("shadowBlurInput");
const shadowBlurValue = $("shadowBlurValue");
const shadowOffsetXInput = $("shadowOffsetXInput");
const shadowOffsetXValue = $("shadowOffsetXValue");
const shadowOffsetYInput = $("shadowOffsetYInput");
const shadowOffsetYValue = $("shadowOffsetYValue");
const outputJpegBtn = $("outputJpgBtn");
const outputPngBtn = $("outputPngBtn");
const brushSelector = $("brushSelect");

function toggleMode() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
  if (!canvas.isDrawingMode) {
    modeBtn.innerHTML = "切換成畫筆模式";
    drawingOptionArea.style.display = "none";
  } else {
    modeBtn.innerHTML = "切換成物件模式";
    drawingOptionArea.style.display = "";
  }
}

function changeLineWidth() {
  const newWidth = parseInt(this.value, 10) || 1;
  canvas.freeDrawingBrush.width = newWidth;
  lineWidthValue.innerHTML = newWidth;
}

function changeLineColor() {
  canvas.freeDrawingBrush.color = this.value;
}

function changeShadowBlur() {
  myShadow.blur = this.value;
  canvas.freeDrawingBrush.setShadow(myShadow);
  shadowBlurValue.innerHTML = this.value;
}

function changeShadowColor() {
  myShadow.color = this.value;
  canvas.freeDrawingBrush.setShadow(myShadow);
}

function changeShadowOffsetX() {
  myShadow.offsetX = this.value;
  canvas.freeDrawingBrush.setShadow(myShadow);
  shadowOffsetXValue.innerHTML = this.value;
}

function changeShadowOffsetY() {
  myShadow.offsetY = this.value;
  canvas.freeDrawingBrush.setShadow(myShadow);
  shadowOffsetYValue.innerHTML = this.value;
}

function changeShadowColor() {
  myShadow.color = this.value;
  canvas.freeDrawingBrush.setShadow(myShadow);
  canvas.freeDrawingBrush.shadow.color = this.value;
}

function clearCanvas() {
  canvas.clear();
}

function output(formatType) {
  const dataURL = canvas.toDataURL({
    format: `image/${formatType}`,
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    multiplier: 1,
    quality: 0.1,
  });
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = `output.${formatType}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function selectBrush() {
  if (this.value === "Square") {
    const squareBrush = new fabric.PatternBrush(canvas);
    // getPatternSrc  取得要重複繪製的圖形 Canvas
    squareBrush.getPatternSrc = function () {
      const squareWidth = 30;
      const squareDistance = 2;
      // 創立一個暫存 canvas 來繪製要畫的圖案
      const patternCanvas = fabric.document.createElement("canvas");
      // canvas 總大小為每一格畫筆的大小
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      const ctx = patternCanvas.getContext("2d");
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);
      // 回傳繪製完畢的 canvas
      return patternCanvas;
    };

    canvas.freeDrawingBrush = squareBrush;
  } else {
    canvas.freeDrawingBrush = new fabric[this.value + "Brush"](canvas);
  }
  canvas.freeDrawingBrush.color = lineColorInput.value;
  canvas.freeDrawingBrush.width = parseInt(lineWidthInput.value, 10) || 1;
  canvas.freeDrawingBrush.setShadow(myShadow);
}

modeBtn.addEventListener("click", toggleMode);
addBtn.addEventListener("click", function () {
  var circle1 = new fabric.Circle({
    radius: 65,
    fill: "#039BE5",
    left: 100,
    top: 300,
    stroke: "rgba(255,0,0,1)",
    strokeWidth: 3,
  });

  canvas.add(circle1);
});
lineWidthInput.addEventListener("change", changeLineWidth);
lineColorInput.addEventListener("change", changeLineColor);
shadowColorInput.addEventListener("change", changeShadowColor);
shadowBlurInput.addEventListener("change", changeShadowBlur);
shadowOffsetXInput.addEventListener("change", changeShadowOffsetX);
shadowOffsetYInput.addEventListener("change", changeShadowOffsetY);
clearBtn.addEventListener("click", clearCanvas);
outputJpegBtn.addEventListener("click", () => output("jpeg"));
outputPngBtn.addEventListener("click", () => output("png"));
brushSelector.addEventListener("change", selectBrush);
canvas.isDrawingMode = true;
