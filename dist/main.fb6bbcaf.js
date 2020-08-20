// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
(function () {
  var yOffset = 0; // window.pageYOffset 대신 쓸 변수

  var prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합

  var currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  var enterNewScene = false; // 새로운 scene이 시작된 순간 true

  var acc = 0.2;
  var delayedYOffset = 0;
  var rafId;
  var rafState;
  var sceneInfo = [{
    // 0
    type: 'sticky',
    heightNum: 5,
    // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-0'),
      messageA: document.querySelector('#scroll-section-0 .main-message.a'),
      messageB: document.querySelector('#scroll-section-0 .main-message.b'),
      messageC: document.querySelector('#scroll-section-0 .main-message.c'),
      messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      canvas: document.querySelector('#video-canvas-0'),
      context: document.querySelector('#video-canvas-0').getContext('2d'),
      videoImages: []
    },
    values: {
      videoImageCount: 300,
      imageSequence: [0, 299],
      canvas_opacity: [1, 0, {
        start: 0.9,
        end: 1
      }],
      messageA_opacity_in: [0, 1, {
        start: 0.1,
        end: 0.2
      }],
      messageB_opacity_in: [0, 1, {
        start: 0.3,
        end: 0.4
      }],
      messageC_opacity_in: [0, 1, {
        start: 0.5,
        end: 0.6
      }],
      messageD_opacity_in: [0, 1, {
        start: 0.7,
        end: 0.8
      }],
      messageA_translateY_in: [20, 0, {
        start: 0.1,
        end: 0.2
      }],
      messageB_translateY_in: [20, 0, {
        start: 0.3,
        end: 0.4
      }],
      messageC_translateY_in: [20, 0, {
        start: 0.5,
        end: 0.6
      }],
      messageD_translateY_in: [20, 0, {
        start: 0.7,
        end: 0.8
      }],
      messageA_opacity_out: [1, 0, {
        start: 0.25,
        end: 0.3
      }],
      messageB_opacity_out: [1, 0, {
        start: 0.45,
        end: 0.5
      }],
      messageC_opacity_out: [1, 0, {
        start: 0.65,
        end: 0.7
      }],
      messageD_opacity_out: [1, 0, {
        start: 0.85,
        end: 0.9
      }],
      messageA_translateY_out: [0, -20, {
        start: 0.25,
        end: 0.3
      }],
      messageB_translateY_out: [0, -20, {
        start: 0.45,
        end: 0.5
      }],
      messageC_translateY_out: [0, -20, {
        start: 0.65,
        end: 0.7
      }],
      messageD_translateY_out: [0, -20, {
        start: 0.85,
        end: 0.9
      }]
    }
  }, {
    // 1
    type: 'normal',
    // heightNum: 5, // type normal에서는 필요 없음
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-1')
    }
  }, {
    // 2
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-2'),
      messageA: document.querySelector('#scroll-section-2 .a'),
      messageB: document.querySelector('#scroll-section-2 .b'),
      messageC: document.querySelector('#scroll-section-2 .c'),
      pinB: document.querySelector('#scroll-section-2 .b .pin'),
      pinC: document.querySelector('#scroll-section-2 .c .pin'),
      canvas: document.querySelector('#video-canvas-1'),
      context: document.querySelector('#video-canvas-1').getContext('2d'),
      videoImages: []
    },
    values: {
      videoImageCount: 960,
      imageSequence: [0, 959],
      canvas_opacity_in: [0, 1, {
        start: 0,
        end: 0.1
      }],
      canvas_opacity_out: [1, 0, {
        start: 0.95,
        end: 1
      }],
      messageA_translateY_in: [20, 0, {
        start: 0.15,
        end: 0.2
      }],
      messageB_translateY_in: [30, 0, {
        start: 0.6,
        end: 0.65
      }],
      messageC_translateY_in: [30, 0, {
        start: 0.87,
        end: 0.92
      }],
      messageA_opacity_in: [0, 1, {
        start: 0.25,
        end: 0.3
      }],
      messageB_opacity_in: [0, 1, {
        start: 0.6,
        end: 0.65
      }],
      messageC_opacity_in: [0, 1, {
        start: 0.87,
        end: 0.92
      }],
      messageA_translateY_out: [0, -20, {
        start: 0.4,
        end: 0.45
      }],
      messageB_translateY_out: [0, -20, {
        start: 0.68,
        end: 0.73
      }],
      messageC_translateY_out: [0, -20, {
        start: 0.95,
        end: 1
      }],
      messageA_opacity_out: [1, 0, {
        start: 0.4,
        end: 0.45
      }],
      messageB_opacity_out: [1, 0, {
        start: 0.68,
        end: 0.73
      }],
      messageC_opacity_out: [1, 0, {
        start: 0.95,
        end: 1
      }],
      pinB_scaleY: [0.5, 1, {
        start: 0.6,
        end: 0.65
      }],
      pinC_scaleY: [0.5, 1, {
        start: 0.87,
        end: 0.92
      }]
    }
  }, {
    // 3
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-3'),
      canvasCaption: document.querySelector('.canvas-caption'),
      canvas: document.querySelector('.image-blend-canvas'),
      context: document.querySelector('.image-blend-canvas').getContext('2d'),
      imagesPath: ['./images/blend-image-1.jpg', './images/blend-image-2.jpg'],
      images: []
    },
    values: {
      rect1X: [0, 0, {
        start: 0,
        end: 0
      }],
      rect2X: [0, 0, {
        start: 0,
        end: 0
      }],
      blendHeight: [0, 0, {
        start: 0,
        end: 0
      }],
      canvas_scale: [0, 0, {
        start: 0,
        end: 0
      }],
      canvasCaption_opacity: [0, 1, {
        start: 0,
        end: 0
      }],
      canvasCaption_translateY: [20, 0, {
        start: 0,
        end: 0
      }],
      rectStartY: 0
    }
  }];

  function setCanvasImages() {
    var imgElem;

    for (var i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = "./video/001/IMG_".concat(6726 + i, ".JPG");
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    var imgElem2;

    for (var _i = 0; _i < sceneInfo[2].values.videoImageCount; _i++) {
      imgElem2 = new Image();
      imgElem2.src = "./video/002/IMG_".concat(7027 + _i, ".JPG");
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    var imgElem3;

    for (var _i2 = 0; _i2 < sceneInfo[3].objs.imagesPath.length; _i2++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagesPath[_i2];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  }

  function checkMenu() {
    if (yOffset > 44) {
      document.body.classList.add('local-nav-sticky');
    } else {
      document.body.classList.remove('local-nav-sticky');
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (var i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.height = "".concat(sceneInfo[i].scrollHeight, "px");
    }

    yOffset = window.pageYOffset;
    var totalScrollHeight = 0;

    for (var _i3 = 0; _i3 < sceneInfo.length; _i3++) {
      totalScrollHeight += sceneInfo[_i3].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = _i3;
        break;
      }
    }

    document.body.setAttribute('id', "show-scene-".concat(currentScene));
    var heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = "translate3d(-50%, -50%, 0) scale(".concat(heightRatio, ")");
    sceneInfo[2].objs.canvas.style.transform = "translate3d(-50%, -50%, 0) scale(".concat(heightRatio, ")");
  }

  function calcValues(values, currentYOffset) {
    var rv; // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기

    var scrollHeight = sceneInfo[currentScene].scrollHeight;
    var scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      var partScrollStart = values[2].start * scrollHeight;
      var partScrollEnd = values[2].end * scrollHeight;
      var partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    var objs = sceneInfo[currentScene].objs;
    var values = sceneInfo[currentScene].values;
    var currentYOffset = yOffset - prevScrollHeight;
    var scrollHeight = sceneInfo[currentScene].scrollHeight;
    var scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_in, currentYOffset), "%, 0)");
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_out, currentYOffset), "%, 0)");
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_in, currentYOffset), "%, 0)");
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_out, currentYOffset), "%, 0)");
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_in, currentYOffset), "%, 0)");
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_out, currentYOffset), "%, 0)");
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = "translate3d(0, ".concat(calcValues(values.messageD_translateY_in, currentYOffset), "%, 0)");
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = "translate3d(0, ".concat(calcValues(values.messageD_translateY_out, currentYOffset), "%, 0)");
        }

        break;

      case 2:
        // console.log('2 play');
        // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        if (scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          // out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_in, currentYOffset), "%, 0)");
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_out, currentYOffset), "%, 0)");
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_in, currentYOffset), "%, 0)");
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = "scaleY(".concat(calcValues(values.pinB_scaleY, currentYOffset), ")");
        } else {
          // out
          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_out, currentYOffset), "%, 0)");
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = "scaleY(".concat(calcValues(values.pinB_scaleY, currentYOffset), ")");
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_in, currentYOffset), "%, 0)");
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = "scaleY(".concat(calcValues(values.pinC_scaleY, currentYOffset), ")");
        } else {
          // out
          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_out, currentYOffset), "%, 0)");
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = "scaleY(".concat(calcValues(values.pinC_scaleY, currentYOffset), ")");
        } // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작


        if (scrollRatio > 0.9) {
          var _objs = sceneInfo[3].objs;
          var _values = sceneInfo[3].values;

          var _widthRatio = window.innerWidth / _objs.canvas.width;

          var _heightRatio = window.innerHeight / _objs.canvas.height;

          var _canvasScaleRatio;

          if (_widthRatio <= _heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            _canvasScaleRatio = _heightRatio;
          } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            _canvasScaleRatio = _widthRatio;
          }

          _objs.canvas.style.transform = "scale(".concat(_canvasScaleRatio, ")");
          _objs.context.fillStyle = 'white';

          _objs.context.drawImage(_objs.images[0], 0, 0); // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight


          var _recalculatedInnerWidth = document.body.offsetWidth / _canvasScaleRatio;

          var _recalculatedInnerHeight = window.innerHeight / _canvasScaleRatio;

          var _whiteRectWidth = _recalculatedInnerWidth * 0.15;

          _values.rect1X[0] = (_objs.canvas.width - _recalculatedInnerWidth) / 2;
          _values.rect1X[1] = _values.rect1X[0] - _whiteRectWidth;
          _values.rect2X[0] = _values.rect1X[0] + _recalculatedInnerWidth - _whiteRectWidth;
          _values.rect2X[1] = _values.rect2X[0] + _whiteRectWidth; // 좌우 흰색 박스 그리기

          _objs.context.fillRect(parseInt(_values.rect1X[0]), 0, parseInt(_whiteRectWidth), _objs.canvas.height);

          _objs.context.fillRect(parseInt(_values.rect2X[0]), 0, parseInt(_whiteRectWidth), _objs.canvas.height);
        }

        break;

      case 3:
        // console.log('3 play');
        var step = 0; // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)

        var widthRatio = window.innerWidth / objs.canvas.width;
        var heightRatio = window.innerHeight / objs.canvas.height;
        var canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = "scale(".concat(canvasScaleRatio, ")");
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0); // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight

        var recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        var recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        var whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth; // 좌우 흰색 박스 그리기

        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

        if (scrollRatio < values.rect1X[2].end) {
          step = 1; // console.log('캔버스 닿기 전');

          objs.canvas.classList.remove('sticky');
        } else {
          step = 2; // console.log('캔버스 닿은 후');
          // 이미지 블렌드
          // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]

          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          var blendHeight = calcValues(values.blendHeight, currentYOffset);
          objs.context.drawImage(objs.images[1], 0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight, 0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);
          objs.canvas.classList.add('sticky');
          objs.canvas.style.top = "".concat(-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2, "px");

          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
            objs.canvas.style.transform = "scale(".concat(calcValues(values.canvas_scale, currentYOffset), ")");
            objs.canvas.style.marginTop = 0;
          }

          if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = "".concat(scrollHeight * 0.4, "px");
            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
            values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
            values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
            objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
            objs.canvasCaption.style.transform = "translate3d(0, ".concat(calcValues(values.canvasCaption_translateY, currentYOffset), "%, 0)");
          }
        }

        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (var i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;

      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }

      document.body.setAttribute('id', "show-scene-".concat(currentScene));
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)

      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id', "show-scene-".concat(currentScene));
    }

    if (enterNewScene) return;
    playAnimation();
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      if (currentScene === 0 || currentScene === 2) {
        var currentYOffset = delayedYOffset - prevScrollHeight;
        var objs = sceneInfo[currentScene].objs;
        var values = sceneInfo[currentScene].values;
        var sequence = Math.round(calcValues(values.imageSequence, currentYOffset));

        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    } // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행


    if (delayedYOffset < 1) {
      scrollLoop();
      sceneInfo[0].objs.canvas.style.opacity = 1;
      sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    } // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결


    if (document.body.offsetHeight - window.innerHeight - delayedYOffset < 1) {
      var tempYOffset = yOffset;
      scrollTo(0, tempYOffset - 1);
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener('load', function () {
    document.body.classList.remove('before-load');
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0); // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기

    var tempYOffset = yOffset;
    var tempScrollCount = 0;

    if (tempYOffset > 0) {
      var siId = setInterval(function () {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }

        tempScrollCount++;
      }, 20);
    }

    window.addEventListener('scroll', function () {
      yOffset = window.pageYOffset;
      scrollLoop();
      checkMenu();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        setLayout();
        sceneInfo[3].values.rectStartY = 0;
      } // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
      // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
      // 리사이즈에 일일이 대응시키기가 까다롭습니다.
      // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
      // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
      // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.


      if (currentScene === 3 && window.innerWidth > 450) {
        var _tempYOffset = yOffset;
        var _tempScrollCount = 0;

        if (_tempYOffset > 0) {
          var _siId = setInterval(function () {
            scrollTo(0, _tempYOffset);
            _tempYOffset -= 50;

            if (_tempScrollCount > 20) {
              clearInterval(_siId);
            }

            _tempScrollCount++;
          }, 20);
        }
      }
    });
    window.addEventListener('orientationchange', function () {
      setTimeout(setLayout, 500);
    });
    document.querySelector('.loading').addEventListener('transitionend', function (e) {
      document.body.removeChild(e.currentTarget);
    });
  });
  setCanvasImages();
})();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49929" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map