/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/Background.js":
/*!***************************!*\
  !*** ./app/Background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/index.mjs");
/* harmony import */ var shaders_background_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shaders/background-fragment.glsl */ "./app/shaders/background-fragment.glsl");
/* harmony import */ var shaders_background_vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shaders/background-vertex.glsl */ "./app/shaders/background-vertex.glsl");
/* harmony import */ var utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/math */ "./app/utils/math.js");




/* harmony default export */ __webpack_exports__["default"] = (class {
  constructor({
    gl,
    scene,
    viewport
  }) {
    this.gl = gl;
    this.scene = scene;
    this.viewport = viewport;
    const geometry = new ogl__WEBPACK_IMPORTED_MODULE_0__["Plane"](this.gl);
    const program = new ogl__WEBPACK_IMPORTED_MODULE_0__["Program"](this.gl, {
      vertex: shaders_background_vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"],
      fragment: shaders_background_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__["default"],
      uniforms: {
        uColor: {
          value: new ogl__WEBPACK_IMPORTED_MODULE_0__["Color"]('#c4c3b6')
        }
      },
      transparent: true
    });
    this.meshes = [];

    for (let i = 0; i < 50; i++) {
      let mesh = new ogl__WEBPACK_IMPORTED_MODULE_0__["Mesh"](this.gl, {
        geometry,
        program
      });
      const scale = Object(utils_math__WEBPACK_IMPORTED_MODULE_3__["random"])(0.75, 1);
      mesh.scale.x = 1.6 * scale;
      mesh.scale.y = 0.9 * scale;
      mesh.speed = Object(utils_math__WEBPACK_IMPORTED_MODULE_3__["random"])(0.75, 1);
      mesh.xExtra = 0;
      mesh.x = mesh.position.x = Object(utils_math__WEBPACK_IMPORTED_MODULE_3__["random"])(-this.viewport.width * 0.5, this.viewport.width * 0.5);
      mesh.y = mesh.position.y = Object(utils_math__WEBPACK_IMPORTED_MODULE_3__["random"])(-this.viewport.height * 0.5, this.viewport.height * 0.5);
      this.meshes.push(mesh);
      this.scene.addChild(mesh);
    }
  }

  update(scroll, direction) {
    this.meshes.forEach(mesh => {
      mesh.position.x = mesh.x - scroll.current * mesh.speed - mesh.xExtra;
      const viewportOffset = this.viewport.width * 0.5;
      const widthTotal = this.viewport.width + mesh.scale.x;
      mesh.isBefore = mesh.position.x < -viewportOffset;
      mesh.isAfter = mesh.position.x > viewportOffset;

      if (direction === 'right' && mesh.isBefore) {
        mesh.xExtra -= widthTotal;
        mesh.isBefore = false;
        mesh.isAfter = false;
      }

      if (direction === 'left' && mesh.isAfter) {
        mesh.xExtra += widthTotal;
        mesh.isBefore = false;
        mesh.isAfter = false;
      }

      mesh.position.y += 0.05 * mesh.speed;

      if (mesh.position.y > this.viewport.height * 0.5 + mesh.scale.y) {
        mesh.position.y -= this.viewport.height + mesh.scale.y;
      }
    });
  }

});

/***/ }),

/***/ "./app/demo-1.js":
/*!***********************!*\
  !*** ./app/demo-1.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/index.mjs");
/* harmony import */ var normalize_wheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalize-wheel */ "./node_modules/normalize-wheel/index.js");
/* harmony import */ var normalize_wheel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(normalize_wheel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/math */ "./app/utils/math.js");
/* harmony import */ var _demo_1_Media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demo-1/Media */ "./app/demo-1/Media.js");




class App {
  constructor() {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0
    };
    this.speed = 2;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGallery();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createGallery() {
    this.gallery = document.querySelector('.demo-1__gallery');
  }

  createRenderer() {
    this.renderer = new ogl__WEBPACK_IMPORTED_MODULE_0__["Renderer"]({
      alpha: true
    });
    this.gl = this.renderer.gl;
    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new ogl__WEBPACK_IMPORTED_MODULE_0__["Camera"](this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new ogl__WEBPACK_IMPORTED_MODULE_0__["Transform"]();
  }

  createGeometry() {
    this.planeGeometry = new ogl__WEBPACK_IMPORTED_MODULE_0__["Plane"](this.gl, {
      heightSegments: 10
    });
  }

  createMedias() {
    this.mediasElements = document.querySelectorAll('.demo-1__gallery__figure');
    this.medias = Array.from(this.mediasElements).map(element => {
      let media = new _demo_1_Media__WEBPACK_IMPORTED_MODULE_3__["default"]({
        element,
        geometry: this.planeGeometry,
        gl: this.gl,
        height: this.galleryHeight,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport
      });
      return media;
    });
  }
  /**
   * Events.
   */


  onTouchDown(event) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientY : event.clientY;
  }

  onTouchMove(event) {
    if (!this.isDown) return;
    const y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = (this.start - y) * 2;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(event) {
    this.isDown = false;
  }

  onWheel(event) {
    const normalized = normalize_wheel__WEBPACK_IMPORTED_MODULE_1___default()(event);
    const speed = normalized.pixelY;
    this.scroll.target += speed * 0.5;
  }
  /**
   * Resize.
   */


  onResize() {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = {
      height,
      width
    };
    this.galleryBounds = this.gallery.getBoundingClientRect();
    this.galleryHeight = this.viewport.height * this.galleryBounds.height / this.screen.height;

    if (this.medias) {
      this.medias.forEach(media => media.onResize({
        height: this.galleryHeight,
        screen: this.screen,
        viewport: this.viewport
      }));
    }
  }
  /**
   * Update.
   */


  update() {
    this.scroll.target += this.speed;
    this.scroll.current = Object(utils_math__WEBPACK_IMPORTED_MODULE_2__["lerp"])(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current > this.scroll.last) {
      this.direction = 'down';
      this.speed = 2;
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = 'up';
      this.speed = -2;
    }

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.direction));
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    });
    this.scroll.last = this.scroll.current;
    window.requestAnimationFrame(this.update.bind(this));
  }
  /**
   * Listeners.
   */


  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousewheel', this.onWheel.bind(this));
    window.addEventListener('wheel', this.onWheel.bind(this));
    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));
    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));
  }

}

/***/ }),

/***/ "./app/demo-1/Media.js":
/*!*****************************!*\
  !*** ./app/demo-1/Media.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/index.mjs");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fragment.glsl */ "./app/demo-1/fragment.glsl");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./app/demo-1/vertex.glsl");



/* harmony default export */ __webpack_exports__["default"] = (class {
  constructor({
    element,
    geometry,
    gl,
    height,
    scene,
    screen,
    viewport
  }) {
    this.element = element;
    this.image = this.element.querySelector('img');
    this.extra = 0;
    this.height = height;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.createMesh();
    this.createBounds();
    this.onResize();
  }

  createMesh() {
    const image = new Image();
    const texture = new ogl__WEBPACK_IMPORTED_MODULE_0__["Texture"](this.gl, {
      generateMipmaps: false
    });
    image.src = this.image.src;

    image.onload = _ => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
      texture.image = image;
    };

    const program = new ogl__WEBPACK_IMPORTED_MODULE_0__["Program"](this.gl, {
      fragment: _fragment_glsl__WEBPACK_IMPORTED_MODULE_1__["default"],
      vertex: _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"],
      uniforms: {
        tMap: {
          value: texture
        },
        uPlaneSizes: {
          value: [0, 0]
        },
        uImageSizes: {
          value: [0, 0]
        },
        uViewportSizes: {
          value: [this.viewport.width, this.viewport.height]
        },
        uStrength: {
          value: 0
        }
      },
      transparent: true
    });
    this.plane = new ogl__WEBPACK_IMPORTED_MODULE_0__["Mesh"](this.gl, {
      geometry: this.geometry,
      program
    });
    this.plane.setParent(this.scene);
  }

  createBounds() {
    this.bounds = this.element.getBoundingClientRect();
    this.updateScale();
    this.updateX();
    this.updateY();
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
  }

  updateScale() {
    this.plane.scale.x = this.viewport.width * this.bounds.width / this.screen.width;
    this.plane.scale.y = this.viewport.height * this.bounds.height / this.screen.height;
  }

  updateX(x = 0) {
    this.plane.position.x = -(this.viewport.width / 2) + this.plane.scale.x / 2 + (this.bounds.left - x) / this.screen.width * this.viewport.width;
  }

  updateY(y = 0) {
    this.plane.position.y = this.viewport.height / 2 - this.plane.scale.y / 2 - (this.bounds.top - y) / this.screen.height * this.viewport.height - this.extra;
  }

  update(y, direction) {
    this.updateScale();
    this.updateX();
    this.updateY(y.current);
    const planeOffset = this.plane.scale.y / 2;
    const viewportOffset = this.viewport.height / 2;
    this.isBefore = this.plane.position.y + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.y - planeOffset > viewportOffset;

    if (direction === 'up' && this.isBefore) {
      this.extra -= this.height;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === 'down' && this.isAfter) {
      this.extra += this.height;
      this.isBefore = false;
      this.isAfter = false;
    }

    this.plane.program.uniforms.uStrength.value = (y.current - y.last) / this.screen.width * 10;
  }
  /**
   * Events.
   */


  onResize(sizes) {
    this.extra = 0;

    if (sizes) {
      const {
        height,
        screen,
        viewport
      } = sizes;
      if (height) this.height = height;
      if (screen) this.screen = screen;

      if (viewport) {
        this.viewport = viewport;
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    this.createBounds();
  }

});

/***/ }),

/***/ "./app/demo-1/fragment.glsl":
/*!**********************************!*\
  !*** ./app/demo-1/fragment.glsl ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 uImageSizes;\nuniform vec2 uPlaneSizes;\nuniform sampler2D tMap;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 ratio = vec2(\n    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\n    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\n  );\n\n  vec2 uv = vec2(\n    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n  );\n\n  gl_FragColor.rgb = texture2D(tMap, uv).rgb;\n  gl_FragColor.a = 1.0;\n}\n");

/***/ }),

/***/ "./app/demo-1/vertex.glsl":
/*!********************************!*\
  !*** ./app/demo-1/vertex.glsl ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define PI 3.1415926535897932384626433832795\n\nprecision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nuniform float uStrength;\nuniform vec2 uViewportSizes;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);\n\n  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength;\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * newPosition;\n}\n");

/***/ }),

/***/ "./app/demo-2.js":
/*!***********************!*\
  !*** ./app/demo-2.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/index.mjs");
/* harmony import */ var normalize_wheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalize-wheel */ "./node_modules/normalize-wheel/index.js");
/* harmony import */ var normalize_wheel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(normalize_wheel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/math */ "./app/utils/math.js");
/* harmony import */ var _demo_2_post_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demo-2/post.glsl */ "./app/demo-2/post.glsl");
/* harmony import */ var _demo_2_Media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demo-2/Media */ "./app/demo-2/Media.js");





class App {
  constructor() {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0
    };
    this.speed = 2;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGallery();
    this.createPost();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createGallery() {
    this.gallery = document.querySelector('.demo-2__gallery');
  }

  createRenderer() {
    this.renderer = new ogl__WEBPACK_IMPORTED_MODULE_0__["Renderer"]({
      alpha: true
    });
    this.gl = this.renderer.gl;
    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new ogl__WEBPACK_IMPORTED_MODULE_0__["Camera"](this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new ogl__WEBPACK_IMPORTED_MODULE_0__["Transform"]();
  }

  createPost() {
    this.post = new ogl__WEBPACK_IMPORTED_MODULE_0__["Post"](this.gl);
    this.pass = this.post.addPass({
      fragment: _demo_2_post_glsl__WEBPACK_IMPORTED_MODULE_3__["default"],
      uniforms: {
        uResolution: this.resolution,
        uStrength: {
          value: 0
        }
      }
    });
    this.resolution = {
      value: new ogl__WEBPACK_IMPORTED_MODULE_0__["Vec2"]()
    };
  }

  createGeometry() {
    this.planeGeometry = new ogl__WEBPACK_IMPORTED_MODULE_0__["Plane"](this.gl, {
      widthSegments: 20
    });
  }

  createMedias() {
    this.mediasElements = document.querySelectorAll('.demo-2__gallery__figure');
    this.medias = Array.from(this.mediasElements).map(element => {
      let media = new _demo_2_Media__WEBPACK_IMPORTED_MODULE_4__["default"]({
        element,
        geometry: this.planeGeometry,
        gl: this.gl,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        width: this.galleryWidth
      });
      return media;
    });
  }
  /**
   * Events.
   */


  onTouchDown(event) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientX : event.clientX;
  }

  onTouchMove(event) {
    if (!this.isDown) return;
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = (this.start - x) * 2;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(event) {
    this.isDown = false;
  }

  onWheel(event) {
    const normalized = normalize_wheel__WEBPACK_IMPORTED_MODULE_1___default()(event);
    const speed = normalized.pixelY;
    this.scroll.target += speed * 0.5;
  }
  /**
   * Resize.
   */


  onResize() {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = {
      height,
      width
    };
    this.post.resize();
    this.resolution.value.set(this.gl.canvas.width, this.gl.canvas.height);
    this.galleryBounds = this.gallery.getBoundingClientRect();
    this.galleryWidth = this.viewport.width * this.galleryBounds.width / this.screen.width;

    if (this.medias) {
      this.medias.forEach(media => media.onResize({
        screen: this.screen,
        viewport: this.viewport,
        width: this.galleryWidth
      }));
    }
  }
  /**
   * Update.
   */


  update() {
    this.scroll.target += this.speed;
    this.scroll.current = Object(utils_math__WEBPACK_IMPORTED_MODULE_2__["lerp"])(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current > this.scroll.last) {
      this.direction = 'down';
      this.speed = 2;
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = 'up';
      this.speed = -2;
    }

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.direction));
    }

    this.pass.uniforms.uStrength.value = (this.scroll.current - this.scroll.last) / this.screen.width * 0.5;
    this.post.render({
      scene: this.scene,
      camera: this.camera
    });
    this.scroll.last = this.scroll.current;
    window.requestAnimationFrame(this.update.bind(this));
  }
  /**
   * Listeners.
   */


  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousewheel', this.onWheel.bind(this));
    window.addEventListener('wheel', this.onWheel.bind(this));
    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));
    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));
  }

}

/***/ }),

/***/ "./app/demo-2/Media.js":
/*!*****************************!*\
  !*** ./app/demo-2/Media.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/index.mjs");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fragment.glsl */ "./app/demo-2/fragment.glsl");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./app/demo-2/vertex.glsl");



/* harmony default export */ __webpack_exports__["default"] = (class {
  constructor({
    element,
    geometry,
    gl,
    scene,
    screen,
    viewport,
    width
  }) {
    this.element = element;
    this.image = this.element.querySelector('img');
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.width = width;
    this.createMesh();
    this.createBounds();
    this.onResize();
  }

  createMesh() {
    const image = new Image();
    const texture = new ogl__WEBPACK_IMPORTED_MODULE_0__["Texture"](this.gl, {
      generateMipmaps: false
    });
    image.src = this.image.src;

    image.onload = _ => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
      texture.image = image;
    };

    const program = new ogl__WEBPACK_IMPORTED_MODULE_0__["Program"](this.gl, {
      fragment: _fragment_glsl__WEBPACK_IMPORTED_MODULE_1__["default"],
      vertex: _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"],
      uniforms: {
        tMap: {
          value: texture
        },
        uPlaneSizes: {
          value: [0, 0]
        },
        uImageSizes: {
          value: [0, 0]
        },
        uViewportSizes: {
          value: [this.viewport.width, this.viewport.height]
        },
        uStrength: {
          value: 0
        }
      },
      transparent: true
    });
    this.plane = new ogl__WEBPACK_IMPORTED_MODULE_0__["Mesh"](this.gl, {
      geometry: this.geometry,
      program
    });
    this.plane.setParent(this.scene);
  }

  createBounds() {
    this.bounds = this.element.getBoundingClientRect();
    this.updateScale();
    this.updateX();
    this.updateY();
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
  }

  updateScale() {
    this.plane.scale.x = this.viewport.width * this.bounds.width / this.screen.width;
    this.plane.scale.y = this.viewport.height * this.bounds.height / this.screen.height;
  }

  updateX(x = 0) {
    this.plane.position.x = -(this.viewport.width / 2) + this.plane.scale.x / 2 + (this.bounds.left - x) / this.screen.width * this.viewport.width - this.extra;
  }

  updateY(y = 0) {
    this.plane.position.y = this.viewport.height / 2 - this.plane.scale.y / 2 - (this.bounds.top - y) / this.screen.height * this.viewport.height;
  }

  update(x, direction) {
    this.updateScale();
    this.updateX(x.current);
    this.updateY();
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === 'down' && this.isBefore) {
      this.extra -= this.width;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === 'up' && this.isAfter) {
      this.extra += this.width;
      this.isBefore = false;
      this.isAfter = false;
    }

    this.plane.program.uniforms.uStrength.value = (x.current - x.last) / this.screen.width * 5;
  }
  /**
   * Events.
   */


  onResize(sizes) {
    this.extra = 0;

    if (sizes) {
      const {
        width,
        screen,
        viewport
      } = sizes;
      if (width) this.width = width;
      if (screen) this.screen = screen;

      if (viewport) {
        this.viewport = viewport;
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    this.createBounds();
  }

});

/***/ }),

/***/ "./app/demo-2/fragment.glsl":
/*!**********************************!*\
  !*** ./app/demo-2/fragment.glsl ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 uImageSizes;\nuniform vec2 uPlaneSizes;\nuniform sampler2D tMap;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 ratio = vec2(\n    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\n    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\n  );\n\n  vec2 uv = vec2(\n    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n  );\n\n  gl_FragColor.rgb = texture2D(tMap, uv).rgb;\n  gl_FragColor.a = 1.0;\n}\n");

/***/ }),

/***/ "./app/demo-2/post.glsl":
/*!******************************!*\
  !*** ./app/demo-2/post.glsl ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\n\nuniform vec2 uResolution;\nuniform float uStrength;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 color;\n\n  color.r = texture2D(tMap, vec2(vUv.x + uStrength, vUv.y)).r;\n  color.g = texture2D(tMap, vUv).g;\n  color.b = texture2D(tMap, vec2(vUv.x - uStrength, vUv.y)).b;\n\n  gl_FragColor = vec4(color, 1.0);\n}\n");

/***/ }),

/***/ "./app/demo-2/vertex.glsl":
/*!********************************!*\
  !*** ./app/demo-2/vertex.glsl ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define PI 3.1415926535897932384626433832795\n\nprecision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nuniform float uStrength;\nuniform vec2 uViewportSizes;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);\n\n  newPosition.z += -abs(sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0) * uStrength);\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * newPosition;\n}\n");

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _demo_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-1 */ "./app/demo-1.js");
/* harmony import */ var _demo_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demo-2 */ "./app/demo-2.js");
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Background */ "./app/Background.js");



const demos = [_demo_1__WEBPACK_IMPORTED_MODULE_0__["default"], _demo_2__WEBPACK_IMPORTED_MODULE_1__["default"]];
const demo = document.body.getAttribute('data-id');
new demos[demo]();
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
const images = document.querySelectorAll('img:not([src*="https://tympanus.net/codrops/wp-content/banners/"])');
let imagesIndex = 0;
Array.from(images).forEach(element => {
  const image = new Image();
  image.src = element.src;

  image.onload = _ => {
    imagesIndex += 1;

    if (imagesIndex === images.length) {
      document.documentElement.classList.remove('loading');
      document.documentElement.classList.add('loaded');
    }
  };
});

/***/ }),

/***/ "./app/shaders/background-fragment.glsl":
/*!**********************************************!*\
  !*** ./app/shaders/background-fragment.glsl ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("precision highp float;\n#define GLSLIFY 1\n\nuniform float uAlpha;\nuniform vec3 uColor;\n\nvoid main() {\n  gl_FragColor.rgb = uColor;\n  gl_FragColor.a = 1.0;\n}\n");

/***/ }),

/***/ "./app/shaders/background-vertex.glsl":
/*!********************************************!*\
  !*** ./app/shaders/background-vertex.glsl ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define GLSLIFY 1\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat3 normalMatrix;\n\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n\n");

/***/ }),

/***/ "./app/utils/math.js":
/*!***************************!*\
  !*** ./app/utils/math.js ***!
  \***************************/
/*! exports provided: lerp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML; // Reference to https://github.com/sindresorhus/ansi-regex

var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete

};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete

};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});
/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */

function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  } // Cache opened sequence.


  var ansiCodes = []; // Replace with markup.

  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq];

    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      } // Open tag.


      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }

    var ct = _closeTags[seq];

    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }

    return '';
  }); // Make sure tags are closed.

  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}
/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */


ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }

  var _finalColors = {};

  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;

    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }

    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }

      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }

      var defHexColor = _defColors[key];

      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }

      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }

      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }

    _finalColors[key] = hex;
  }

  _setTags(_finalColors);
};
/**
 * Reset colors.
 */


ansiHTML.reset = function () {
  _setTags(_defColors);
};
/**
 * Expose tags, including open and close.
 * @type {Object}
 */


ansiHTML.tags = {};

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}

function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]; // inverse

  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]; // dark grey

  _openTags['90'] = 'color:#' + colors.darkgrey;

  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}

ansiHTML.reset();

/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter;
module.exports.once = once; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }

      resolve([].slice.call(arguments));
    }

    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });

    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }

      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex = {};
var numIndex = {};

(function () {
  var i = 0;
  var length = HTML_ALPHA.length;

  while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
  }
})();

var Html4Entities =
/** @class */
function () {
  function Html4Entities() {}

  Html4Entities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
      var chr;

      if (entity.charAt(0) === "#") {
        var code = entity.charAt(1).toLowerCase() === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            chr = String.fromCharCode(code);
          } else {
            chr = surrogate_pairs_1.fromCodePoint(code);
          }
        }
      } else {
        chr = alphaIndex[entity];
      }

      return chr || s;
    });
  };

  Html4Entities.decode = function (str) {
    return new Html4Entities().decode(str);
  };

  Html4Entities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var alpha = numIndex[str.charCodeAt(i)];
      result += alpha ? "&" + alpha + ";" : str.charAt(i);
      i++;
    }

    return result;
  };

  Html4Entities.encode = function (str) {
    return new Html4Entities().encode(str);
  };

  Html4Entities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var cc = str.charCodeAt(i);
      var alpha = numIndex[cc];

      if (alpha) {
        result += "&" + alpha + ";";
      } else if (cc < 32 || cc > 126) {
        if (cc >= surrogate_pairs_1.highSurrogateFrom && cc <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + cc + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  Html4Entities.encodeNonUTF = function (str) {
    return new Html4Entities().encodeNonUTF(str);
  };

  Html4Entities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
        i++;
      } else {
        result += '&#' + c + ';';
      }

      i++;
    }

    return result;
  };

  Html4Entities.encodeNonASCII = function (str) {
    return new Html4Entities().encodeNonASCII(str);
  };

  return Html4Entities;
}();

exports.Html4Entities = Html4Entities;

/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var DECODE_ONLY_ENTITIES = [['NewLine', [10]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);

var Html5Entities =
/** @class */
function () {
  function Html5Entities() {}

  Html5Entities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
      var chr;

      if (entity.charAt(0) === "#") {
        var code = entity.charAt(1) === 'x' ? parseInt(entity.substr(2).toLowerCase(), 16) : parseInt(entity.substr(1));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            chr = String.fromCharCode(code);
          } else {
            chr = surrogate_pairs_1.fromCodePoint(code);
          }
        }
      } else {
        chr = alphaIndex[entity];
      }

      return chr || s;
    });
  };

  Html5Entities.decode = function (str) {
    return new Html5Entities().decode(str);
  };

  Html5Entities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var charInfo = charIndex[str.charCodeAt(i)];

      if (charInfo) {
        var alpha = charInfo[str.charCodeAt(i + 1)];

        if (alpha) {
          i++;
        } else {
          alpha = charInfo[''];
        }

        if (alpha) {
          result += "&" + alpha + ";";
          i++;
          continue;
        }
      }

      result += str.charAt(i);
      i++;
    }

    return result;
  };

  Html5Entities.encode = function (str) {
    return new Html5Entities().encode(str);
  };

  Html5Entities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);
      var charInfo = charIndex[c];

      if (charInfo) {
        var alpha = charInfo[str.charCodeAt(i + 1)];

        if (alpha) {
          i++;
        } else {
          alpha = charInfo[''];
        }

        if (alpha) {
          result += "&" + alpha + ";";
          i++;
          continue;
        }
      }

      if (c < 32 || c > 126) {
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  Html5Entities.encodeNonUTF = function (str) {
    return new Html5Entities().encodeNonUTF(str);
  };

  Html5Entities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
        i += 2;
      } else {
        result += '&#' + c + ';';
        i++;
      }
    }

    return result;
  };

  Html5Entities.encodeNonASCII = function (str) {
    return new Html5Entities().encodeNonASCII(str);
  };

  return Html5Entities;
}();

exports.Html5Entities = Html5Entities;

function createIndexes(alphaIndex, charIndex) {
  var i = ENTITIES.length;

  while (i--) {
    var _a = ENTITIES[i],
        alpha = _a[0],
        _b = _a[1],
        chr = _b[0],
        chr2 = _b[1];
    var addChar = chr < 32 || chr > 126 || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
    var charInfo = void 0;

    if (addChar) {
      charInfo = charIndex[chr] = charIndex[chr] || {};
    }

    if (chr2) {
      alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
      addChar && (charInfo[chr2] = alpha);
    } else {
      alphaIndex[alpha] = String.fromCharCode(chr);
      addChar && (charInfo[''] = alpha);
    }
  }

  i = DECODE_ONLY_ENTITIES.length;

  while (i--) {
    var _c = DECODE_ONLY_ENTITIES[i],
        alpha = _c[0],
        _d = _c[1],
        chr = _d[0],
        chr2 = _d[1];
    alphaIndex[alpha] = String.fromCharCode(chr) + (chr2 ? String.fromCharCode(chr2) : '');
  }
}

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");

exports.XmlEntities = xml_entities_1.XmlEntities;

var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");

exports.Html4Entities = html4_entities_1.Html4Entities;

var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");

exports.Html5Entities = html5_entities_1.Html5Entities;
exports.AllHtmlEntities = html5_entities_1.Html5Entities;

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800, (astralCodePoint - 0x10000) % 0x400 + 0xDC00);
};

exports.getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 0xD800) * 0x400 + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
};
exports.highSurrogateFrom = 0xD800;
exports.highSurrogateTo = 0xDBFF;

/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");

var ALPHA_INDEX = {
  '&lt': '<',
  '&gt': '>',
  '&quot': '"',
  '&apos': '\'',
  '&amp': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': '\'',
  '&amp;': '&'
};
var CHAR_INDEX = {
  60: 'lt',
  62: 'gt',
  34: 'quot',
  39: 'apos',
  38: 'amp'
};
var CHAR_S_INDEX = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
  '&': '&amp;'
};

var XmlEntities =
/** @class */
function () {
  function XmlEntities() {}

  XmlEntities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/[<>"'&]/g, function (s) {
      return CHAR_S_INDEX[s];
    });
  };

  XmlEntities.encode = function (str) {
    return new XmlEntities().encode(str);
  };

  XmlEntities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
      if (s.charAt(1) === '#') {
        var code = s.charAt(2).toLowerCase() === 'x' ? parseInt(s.substr(3), 16) : parseInt(s.substr(2));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            return String.fromCharCode(code);
          } else {
            return surrogate_pairs_1.fromCodePoint(code);
          }
        }

        return '';
      }

      return ALPHA_INDEX[s] || s;
    });
  };

  XmlEntities.decode = function (str) {
    return new XmlEntities().decode(str);
  };

  XmlEntities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);
      var alpha = CHAR_INDEX[c];

      if (alpha) {
        result += "&" + alpha + ";";
        i++;
        continue;
      }

      if (c < 32 || c > 126) {
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  XmlEntities.encodeNonUTF = function (str) {
    return new XmlEntities().encodeNonUTF(str);
  };

  XmlEntities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
        i++;
      } else {
        result += '&#' + c + ';';
      }

      i++;
    }

    return result;
  };

  XmlEntities.encodeNonASCII = function (str) {
    return new XmlEntities().encodeNonASCII(str);
  };

  return XmlEntities;
}();

exports.XmlEntities = XmlEntities;

/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
  "use strict";

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  "use strict"; // Slightly dubious tricks to cut down minimized file size

  var noop = function () {};

  var undefinedType = "undefined";
  var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
  var logMethods = ["trace", "debug", "info", "warn", "error"]; // Cross-browser bind equivalent that works at least back to IE6

  function bindMethod(obj, methodName) {
    var method = obj[methodName];

    if (typeof method.bind === 'function') {
      return method.bind(obj);
    } else {
      try {
        return Function.prototype.bind.call(method, obj);
      } catch (e) {
        // Missing bind shim or IE8 + Modernizr, fallback to wrapping
        return function () {
          return Function.prototype.apply.apply(method, [obj, arguments]);
        };
      }
    }
  } // Trace() doesn't print the message in IE, so for that case we need to wrap it


  function traceForIE() {
    if (console.log) {
      if (console.log.apply) {
        console.log.apply(console, arguments);
      } else {
        // In old IE, native console methods themselves don't have apply().
        Function.prototype.apply.apply(console.log, [console, arguments]);
      }
    }

    if (console.trace) console.trace();
  } // Build the best logging method possible for this env
  // Wherever possible we want to bind, not wrap, to preserve stack traces


  function realMethod(methodName) {
    if (methodName === 'debug') {
      methodName = 'log';
    }

    if (typeof console === undefinedType) {
      return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
    } else if (methodName === 'trace' && isIE) {
      return traceForIE;
    } else if (console[methodName] !== undefined) {
      return bindMethod(console, methodName);
    } else if (console.log !== undefined) {
      return bindMethod(console, 'log');
    } else {
      return noop;
    }
  } // These private functions always need `this` to be set properly


  function replaceLoggingMethods(level, loggerName) {
    /*jshint validthis:true */
    for (var i = 0; i < logMethods.length; i++) {
      var methodName = logMethods[i];
      this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
    } // Define log.log as an alias for log.debug


    this.log = this.debug;
  } // In old IE versions, the console isn't present until you first open it.
  // We build realMethod() replacements here that regenerate logging methods


  function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
    return function () {
      if (typeof console !== undefinedType) {
        replaceLoggingMethods.call(this, level, loggerName);
        this[methodName].apply(this, arguments);
      }
    };
  } // By default, we use closely bound real methods wherever possible, and
  // otherwise we wait for a console to appear, and then try again.


  function defaultMethodFactory(methodName, level, loggerName) {
    /*jshint validthis:true */
    return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
  }

  function Logger(name, defaultLevel, factory) {
    var self = this;
    var currentLevel;
    var storageKey = "loglevel";

    if (typeof name === "string") {
      storageKey += ":" + name;
    } else if (typeof name === "symbol") {
      storageKey = undefined;
    }

    function persistLevelIfPossible(levelNum) {
      var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
      if (typeof window === undefinedType || !storageKey) return; // Use localStorage if available

      try {
        window.localStorage[storageKey] = levelName;
        return;
      } catch (ignore) {} // Use session cookie as fallback


      try {
        window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
      } catch (ignore) {}
    }

    function getPersistedLevel() {
      var storedLevel;
      if (typeof window === undefinedType || !storageKey) return;

      try {
        storedLevel = window.localStorage[storageKey];
      } catch (ignore) {} // Fallback to cookies if local storage gives us nothing


      if (typeof storedLevel === undefinedType) {
        try {
          var cookie = window.document.cookie;
          var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");

          if (location !== -1) {
            storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
          }
        } catch (ignore) {}
      } // If the stored level is not valid, treat it as if nothing was stored.


      if (self.levels[storedLevel] === undefined) {
        storedLevel = undefined;
      }

      return storedLevel;
    }
    /*
     *
     * Public logger API - see https://github.com/pimterry/loglevel for details
     *
     */


    self.name = name;
    self.levels = {
      "TRACE": 0,
      "DEBUG": 1,
      "INFO": 2,
      "WARN": 3,
      "ERROR": 4,
      "SILENT": 5
    };
    self.methodFactory = factory || defaultMethodFactory;

    self.getLevel = function () {
      return currentLevel;
    };

    self.setLevel = function (level, persist) {
      if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
        level = self.levels[level.toUpperCase()];
      }

      if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
        currentLevel = level;

        if (persist !== false) {
          // defaults to true
          persistLevelIfPossible(level);
        }

        replaceLoggingMethods.call(self, level, name);

        if (typeof console === undefinedType && level < self.levels.SILENT) {
          return "No console available for logging";
        }
      } else {
        throw "log.setLevel() called with invalid level: " + level;
      }
    };

    self.setDefaultLevel = function (level) {
      if (!getPersistedLevel()) {
        self.setLevel(level, false);
      }
    };

    self.enableAll = function (persist) {
      self.setLevel(self.levels.TRACE, persist);
    };

    self.disableAll = function (persist) {
      self.setLevel(self.levels.SILENT, persist);
    }; // Initialize with the right level


    var initialLevel = getPersistedLevel();

    if (initialLevel == null) {
      initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
    }

    self.setLevel(initialLevel, false);
  }
  /*
   *
   * Top-level API
   *
   */


  var defaultLogger = new Logger();
  var _loggersByName = {};

  defaultLogger.getLogger = function getLogger(name) {
    if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
      throw new TypeError("You must supply a name when creating a logger.");
    }

    var logger = _loggersByName[name];

    if (!logger) {
      logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
    }

    return logger;
  }; // Grab the current global log variable in case of overwrite


  var _log = typeof window !== undefinedType ? window.log : undefined;

  defaultLogger.noConflict = function () {
    if (typeof window !== undefinedType && window.log === defaultLogger) {
      window.log = _log;
    }

    return defaultLogger;
  };

  defaultLogger.getLoggers = function getLoggers() {
    return _loggersByName;
  }; // ES6 default export, for compatibility


  defaultLogger['default'] = defaultLogger;
  return defaultLogger;
});

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;

(function (root) {
  /** Detect free variables */
  var freeExports =  true && exports && !exports.nodeType && exports;
  var freeModule =  true && module && !module.nodeType && module;
  var freeGlobal = typeof global == 'object' && global;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
    root = freeGlobal;
  }
  /**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */


  var punycode,

  /** Highest positive signed 32-bit float value */
  maxInt = 2147483647,
      // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  base = 36,
      tMin = 1,
      tMax = 26,
      skew = 38,
      damp = 700,
      initialBias = 72,
      initialN = 128,
      // 0x80
  delimiter = '-',
      // '\x2D'

  /** Regular expressions */
  regexPunycode = /^xn--/,
      regexNonASCII = /[^\x20-\x7E]/,
      // unprintable ASCII chars + non-ASCII chars
  regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
      // RFC 3490 separators

  /** Error messages */
  errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  },

  /** Convenience shortcuts */
  baseMinusTMin = base - tMin,
      floor = Math.floor,
      stringFromCharCode = String.fromCharCode,

  /** Temporary variable */
  key;
  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */

  function error(type) {
    throw new RangeError(errors[type]);
  }
  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */


  function map(array, fn) {
    var length = array.length;
    var result = [];

    while (length--) {
      result[length] = fn(array[length]);
    }

    return result;
  }
  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */


  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';

    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    } // Avoid `split(regex)` for IE8 compatibility. See #17.


    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */


  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }
  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */


  function ucs2encode(array) {
    return map(array, function (value) {
      var output = '';

      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }

      output += stringFromCharCode(value);
      return output;
    }).join('');
  }
  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */


  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }

    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }

    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }

    return base;
  }
  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */


  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */


  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);

    for (;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }

    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */


  function decode(input) {
    // Don't use UCS-2
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,

    /** Cached calculation results */
    baseMinusT; // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);

    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }

      output.push(input.charCodeAt(j));
    } // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.


    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
    /* no final expression */
    {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base;;
      /* no condition */
      k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;

        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:

      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out; // Insert `n` at position `i` of the output

      output.splice(i++, 0, n);
    }

    return ucs2encode(output);
  }
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */


  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],

    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,

    /** Cached calculation results */
    handledCPCountPlusOne,
        baseMinusT,
        qMinusT; // Convert the input in UCS-2 to Unicode

    input = ucs2decode(input); // Cache the length

    inputLength = input.length; // Initialize the state

    n = initialN;
    delta = 0;
    bias = initialBias; // Handle the basic code points

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string - if it is not empty - with a delimiter

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow


      handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base;;
          /* no condition */
          k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

            if (q < t) {
              break;
            }

            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  }
  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */


  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  }
  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */


  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }
  /*--------------------------------------------------------------------------*/

  /** Define the public API */


  punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.4.1',

    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };
  /** Expose `punycode` */
  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return punycode;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/normalize-wheel/index.js":
/*!***********************************************!*\
  !*** ./node_modules/normalize-wheel/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/normalizeWheel.js */ "./node_modules/normalize-wheel/src/normalizeWheel.js");

/***/ }),

/***/ "./node_modules/normalize-wheel/src/ExecutionEnvironment.js":
/*!******************************************************************!*\
  !*** ./node_modules/normalize-wheel/src/ExecutionEnvironment.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */


var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */

var ExecutionEnvironment = {
  canUseDOM: canUseDOM,
  canUseWorkers: typeof Worker !== 'undefined',
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};
module.exports = ExecutionEnvironment;

/***/ }),

/***/ "./node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js":
/*!******************************************************************!*\
  !*** ./node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */
var _populated = false; // Browsers

var _ie, _firefox, _opera, _webkit, _chrome; // Actual IE browser for compatibility mode


var _ie_real_version; // Platforms


var _osx, _windows, _linux, _android; // Architectures


var _win64; // Devices


var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true; // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10

  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas); // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.

  _win64 = !!/Win64/.exec(uas);

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN; // IE compatibility mode

    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    } // grab the "true" ie version from the trident token if available


    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;
    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;

    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }

    _windows = !!os[2];
    _linux = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {
  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function () {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function () {
    return _populate() || _ie_real_version > _ie;
  },

  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function () {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function () {
    return _populate() || _firefox;
  },

  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function () {
    return _populate() || _opera;
  },

  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function () {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function () {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome: function () {
    return _populate() || _chrome;
  },

  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function () {
    return _populate() || _windows;
  },

  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function () {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function () {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function () {
    return _populate() || _iphone;
  },
  mobile: function () {
    return _populate() || _iphone || _ipad || _android || _mobile;
  },
  nativeApp: function () {
    // webviews inside of the native apps
    return _populate() || _native;
  },
  android: function () {
    return _populate() || _android;
  },
  ipad: function () {
    return _populate() || _ipad;
  }
};
module.exports = UserAgent_DEPRECATED;

/***/ }),

/***/ "./node_modules/normalize-wheel/src/isEventSupported.js":
/*!**************************************************************!*\
  !*** ./node_modules/normalize-wheel/src/isEventSupported.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */


var ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ "./node_modules/normalize-wheel/src/ExecutionEnvironment.js");

var useHasFeature;

if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */


function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = (eventName in document);

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;

/***/ }),

/***/ "./node_modules/normalize-wheel/src/normalizeWheel.js":
/*!************************************************************!*\
  !*** ./node_modules/normalize-wheel/src/normalizeWheel.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */


var UserAgent_DEPRECATED = __webpack_require__(/*! ./UserAgent_DEPRECATED */ "./node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js");

var isEventSupported = __webpack_require__(/*! ./isEventSupported */ "./node_modules/normalize-wheel/src/isEventSupported.js"); // Reasonable defaults


var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */

function normalizeWheel(
/*object*/
event)
/*object*/
{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY
  // Legacy

  if ('detail' in event) {
    sY = event.detail;
  }

  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }

  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }

  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  } // side scrolling on FF with DOMMouseScroll


  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }

  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  } // Fall-back if spin cannot be determined


  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }

  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  };
}
/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */


normalizeWheel.getEventType = function ()
/*string*/
{
  return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
};

module.exports = normalizeWheel;

/***/ }),

/***/ "./node_modules/ogl/src/core/Camera.js":
/*!*********************************************!*\
  !*** ./node_modules/ogl/src/core/Camera.js ***!
  \*********************************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _Transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");



const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
const tempVec3a = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"]();
const tempVec3b = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"]();
class Camera extends _Transform_js__WEBPACK_IMPORTED_MODULE_0__["Transform"] {
  constructor(gl, {
    near = 0.1,
    far = 100,
    fov = 45,
    aspect = 1,
    left,
    right,
    bottom,
    top,
    zoom = 1
  } = {}) {
    super();
    Object.assign(this, {
      near,
      far,
      fov,
      aspect,
      left,
      right,
      bottom,
      top,
      zoom
    });
    this.projectionMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
    this.viewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
    this.projectionViewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
    this.worldPosition = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](); // Use orthographic if left/right set, else default to perspective camera

    this.type = left || right ? 'orthographic' : 'perspective';
    if (this.type === 'orthographic') this.orthographic();else this.perspective();
  }

  perspective({
    near = this.near,
    far = this.far,
    fov = this.fov,
    aspect = this.aspect
  } = {}) {
    Object.assign(this, {
      near,
      far,
      fov,
      aspect
    });
    this.projectionMatrix.fromPerspective({
      fov: fov * (Math.PI / 180),
      aspect,
      near,
      far
    });
    this.type = 'perspective';
    return this;
  }

  orthographic({
    near = this.near,
    far = this.far,
    left = this.left,
    right = this.right,
    bottom = this.bottom,
    top = this.top,
    zoom = this.zoom
  } = {}) {
    Object.assign(this, {
      near,
      far,
      left,
      right,
      bottom,
      top,
      zoom
    });
    left /= zoom;
    right /= zoom;
    bottom /= zoom;
    top /= zoom;
    this.projectionMatrix.fromOrthogonal({
      left,
      right,
      bottom,
      top,
      near,
      far
    });
    this.type = 'orthographic';
    return this;
  }

  updateMatrixWorld() {
    super.updateMatrixWorld();
    this.viewMatrix.inverse(this.worldMatrix);
    this.worldMatrix.getTranslation(this.worldPosition); // used for sorting

    this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
    return this;
  }

  lookAt(target) {
    super.lookAt(target, true);
    return this;
  } // Project 3D coordinate to 2D point


  project(v) {
    v.applyMatrix4(this.viewMatrix);
    v.applyMatrix4(this.projectionMatrix);
    return this;
  } // Unproject 2D point to 3D coordinate


  unproject(v) {
    v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
    v.applyMatrix4(this.worldMatrix);
    return this;
  }

  updateFrustum() {
    if (!this.frustum) {
      this.frustum = [new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"](), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_2__["Vec3"]()];
    }

    const m = this.projectionViewMatrix;
    this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x

    this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x

    this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y

    this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y

    this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)

    this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

    for (let i = 0; i < 6; i++) {
      const invLen = 1.0 / this.frustum[i].distance();
      this.frustum[i].multiply(invLen);
      this.frustum[i].constant *= invLen;
    }
  }

  frustumIntersectsMesh(node) {
    // If no position attribute, treat as frustumCulled false
    if (!node.geometry.attributes.position) return true;
    if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();
    if (!node.geometry.bounds) return true;
    const center = tempVec3a;
    center.copy(node.geometry.bounds.center);
    center.applyMatrix4(node.worldMatrix);
    const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();
    return this.frustumIntersectsSphere(center, radius);
  }

  frustumIntersectsSphere(center, radius) {
    const normal = tempVec3b;

    for (let i = 0; i < 6; i++) {
      const plane = this.frustum[i];
      const distance = normal.copy(plane).dot(center) + plane.constant;
      if (distance < -radius) return false;
    }

    return true;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Geometry.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/core/Geometry.js ***!
  \***********************************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false
//     buffer - gl buffer, if buffer exists, don't need to provide data
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }
// TODO: fit in transform feedback
// TODO: when would I disableVertexAttribArray ?
// TODO: use offset/stride if exists

const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
let ID = 1;
let ATTR_ID = 1; // To stop inifinite warnings

let isBoundsWarned = false;
class Geometry {
  constructor(gl, attributes = {}) {
    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++; // Store one VAO per program attribute locations order

    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0; // Unbind current VAO so that new buffers don't get added to active mesh

    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // create the buffers

    for (let key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }

  addAttribute(key, attr) {
    this.attributes[key] = attr; // Set options

    attr.id = ATTR_ID++; // TODO: currently unused, remove?

    attr.size = attr.size || 1;
    attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array

    attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
    attr.normalized = attr.normalized || false;
    attr.stride = attr.stride || 0;
    attr.offset = attr.offset || 0;
    attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
    attr.divisor = attr.instanced || 0;
    attr.needsUpdate = false;

    if (!attr.buffer) {
      attr.buffer = this.gl.createBuffer(); // Push data to buffer

      this.updateAttribute(attr);
    } // Update geometry counts. If indexed, ignore regular attributes


    if (attr.divisor) {
      this.isInstanced = true;

      if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
        console.warn('geometry has multiple instanced buffers of different length');
        return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
      }

      this.instancedCount = attr.count * attr.divisor;
    } else if (key === 'index') {
      this.drawRange.count = attr.count;
    } else if (!this.attributes.index) {
      this.drawRange.count = Math.max(this.drawRange.count, attr.count);
    }
  }

  updateAttribute(attr) {
    if (this.glState.boundBuffer !== attr.buffer) {
      this.gl.bindBuffer(attr.target, attr.buffer);
      this.glState.boundBuffer = attr.buffer;
    }

    this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
    attr.needsUpdate = false;
  }

  setIndex(value) {
    this.addAttribute('index', value);
  }

  setDrawRange(start, count) {
    this.drawRange.start = start;
    this.drawRange.count = count;
  }

  setInstancedCount(value) {
    this.instancedCount = value;
  }

  createVAO(program) {
    this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
    this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
    this.bindAttributes(program);
  }

  bindAttributes(program) {
    // Link all attributes to program using gl.vertexAttribPointer
    program.attributeLocations.forEach((location, {
      name,
      type
    }) => {
      // If geometry missing a required shader attribute
      if (!this.attributes[name]) {
        console.warn(`active attribute ${name} not being supplied`);
        return;
      }

      const attr = this.attributes[name];
      this.gl.bindBuffer(attr.target, attr.buffer);
      this.glState.boundBuffer = attr.buffer; // For matrix attributes, buffer needs to be defined per column

      let numLoc = 1;
      if (type === 35674) numLoc = 2; // mat2

      if (type === 35675) numLoc = 3; // mat3

      if (type === 35676) numLoc = 4; // mat4

      const size = attr.size / numLoc;
      const stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
      const offset = numLoc === 1 ? 0 : numLoc * numLoc;

      for (let i = 0; i < numLoc; i++) {
        this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
        this.gl.enableVertexAttribArray(location + i); // For instanced attributes, divisor needs to be set.
        // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render

        this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
      }
    }); // Bind indices if geometry indexed

    if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
  }

  draw({
    program,
    mode = this.gl.TRIANGLES
  }) {
    if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
      if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
    } // Check if any attributes need updating


    program.attributeLocations.forEach((location, {
      name
    }) => {
      const attr = this.attributes[name];
      if (attr.needsUpdate) this.updateAttribute(attr);
    });

    if (this.isInstanced) {
      if (this.attributes.index) {
        this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2, this.instancedCount);
      } else {
        this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
      }
    } else {
      if (this.attributes.index) {
        this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
      } else {
        this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
      }
    }
  }

  getPositionArray() {
    // Use position buffer, or min/max if available
    const attr = this.attributes.position; // if (attr.min) return [...attr.min, ...attr.max];

    if (attr.data) return attr.data;
    if (isBoundsWarned) return;
    console.warn('No position buffer data found to compute bounds');
    return isBoundsWarned = true;
  }

  computeBoundingBox(array) {
    if (!array) array = this.getPositionArray();

    if (!this.bounds) {
      this.bounds = {
        min: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
        max: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
        center: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
        scale: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
        radius: Infinity
      };
    }

    const min = this.bounds.min;
    const max = this.bounds.max;
    const center = this.bounds.center;
    const scale = this.bounds.scale;
    min.set(+Infinity);
    max.set(-Infinity); // TODO: use offset/stride if exists
    // TODO: check size of position (eg triangle with Vec2)

    for (let i = 0, l = array.length; i < l; i += 3) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];
      min.x = Math.min(x, min.x);
      min.y = Math.min(y, min.y);
      min.z = Math.min(z, min.z);
      max.x = Math.max(x, max.x);
      max.y = Math.max(y, max.y);
      max.z = Math.max(z, max.z);
    }

    scale.sub(max, min);
    center.add(min, max).divide(2);
  }

  computeBoundingSphere(array) {
    if (!array) array = this.getPositionArray();
    if (!this.bounds) this.computeBoundingBox(array);
    let maxRadiusSq = 0;

    for (let i = 0, l = array.length; i < l; i += 3) {
      tempVec3.fromArray(array, i);
      maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
    }

    this.bounds.radius = Math.sqrt(maxRadiusSq);
  }

  remove() {
    if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);

    for (let key in this.attributes) {
      this.gl.deleteBuffer(this.attributes[key].buffer);
      delete this.attributes[key];
    }
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Mesh.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/core/Mesh.js ***!
  \*******************************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony import */ var _Transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat3.js */ "./node_modules/ogl/src/math/Mat3.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");



let ID = 0;
class Mesh extends _Transform_js__WEBPACK_IMPORTED_MODULE_0__["Transform"] {
  constructor(gl, {
    geometry,
    program,
    mode = gl.TRIANGLES,
    frustumCulled = true,
    renderOrder = 0
  } = {}) {
    super();
    if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
    this.gl = gl;
    this.id = ID++;
    this.geometry = geometry;
    this.program = program;
    this.mode = mode; // Used to skip frustum culling

    this.frustumCulled = frustumCulled; // Override sorting to force an order

    this.renderOrder = renderOrder;
    this.modelViewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"]();
    this.normalMatrix = new _math_Mat3_js__WEBPACK_IMPORTED_MODULE_1__["Mat3"]();
    this.beforeRenderCallbacks = [];
    this.afterRenderCallbacks = [];
  }

  onBeforeRender(f) {
    this.beforeRenderCallbacks.push(f);
    return this;
  }

  onAfterRender(f) {
    this.afterRenderCallbacks.push(f);
    return this;
  }

  draw({
    camera
  } = {}) {
    this.beforeRenderCallbacks.forEach(f => f && f({
      mesh: this,
      camera
    }));

    if (camera) {
      // Add empty matrix uniforms to program if unset
      if (!this.program.uniforms.modelMatrix) {
        Object.assign(this.program.uniforms, {
          modelMatrix: {
            value: null
          },
          viewMatrix: {
            value: null
          },
          modelViewMatrix: {
            value: null
          },
          normalMatrix: {
            value: null
          },
          projectionMatrix: {
            value: null
          },
          cameraPosition: {
            value: null
          }
        });
      } // Set the matrix uniforms


      this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
      this.program.uniforms.cameraPosition.value = camera.worldPosition;
      this.program.uniforms.viewMatrix.value = camera.viewMatrix;
      this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
      this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
      this.program.uniforms.modelMatrix.value = this.worldMatrix;
      this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
      this.program.uniforms.normalMatrix.value = this.normalMatrix;
    } // determine if faces need to be flipped - when mesh scaled negatively


    let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
    this.program.use({
      flipFaces
    });
    this.geometry.draw({
      mode: this.mode,
      program: this.program
    });
    this.afterRenderCallbacks.forEach(f => f && f({
      mesh: this,
      camera
    }));
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Program.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/core/Program.js ***!
  \**********************************************/
/*! exports provided: Program */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return Program; });
// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube
let ID = 1; // cache of typed arrays used to flatten uniform arrays

const arrayCacheF32 = {};
class Program {
  constructor(gl, {
    vertex,
    fragment,
    uniforms = {},
    transparent = false,
    cullFace = gl.BACK,
    frontFace = gl.CCW,
    depthTest = true,
    depthWrite = true,
    depthFunc = gl.LESS
  } = {}) {
    if (!gl.canvas) console.error('gl not passed as fist argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied'); // Store program state

    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {}; // set default blendFunc if transparent flagged

    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } // compile vertex shader and log errors


    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
    } // compile fragment shader and log errors


    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
    } // compile program and log errors


    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    } // Remove shader once linked


    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader); // Get active uniform locations

    this.uniformLocations = new Map();
    let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
      let uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name)); // split uniforms' names to separate array and struct declarations

      const split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];

      if (split.length === 3) {
        uniform.isStructArray = true;
        uniform.structIndex = Number(split[1]);
        uniform.structProperty = split[2];
      } else if (split.length === 2 && isNaN(Number(split[1]))) {
        uniform.isStruct = true;
        uniform.structProperty = split[1];
      }
    } // Get active attribute locations


    this.attributeLocations = new Map();
    const locations = [];
    const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
      const attribute = gl.getActiveAttrib(this.program, aIndex);
      const location = gl.getAttribLocation(this.program, attribute.name);
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }

    this.attributeOrder = locations.join('');
  }

  setBlendFunc(src, dst, srcAlpha, dstAlpha) {
    this.blendFunc.src = src;
    this.blendFunc.dst = dst;
    this.blendFunc.srcAlpha = srcAlpha;
    this.blendFunc.dstAlpha = dstAlpha;
    if (src) this.transparent = true;
  }

  setBlendEquation(modeRGB, modeAlpha) {
    this.blendEquation.modeRGB = modeRGB;
    this.blendEquation.modeAlpha = modeAlpha;
  }

  applyState() {
    if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
    if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
    if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
    if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
    this.gl.renderer.setFrontFace(this.frontFace);
    this.gl.renderer.setDepthMask(this.depthWrite);
    this.gl.renderer.setDepthFunc(this.depthFunc);
    if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
    this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
  }

  use({
    flipFaces = false
  } = {}) {
    let textureUnit = -1;
    const programActive = this.gl.renderer.currentProgram === this.id; // Avoid gl call if program already in use

    if (!programActive) {
      this.gl.useProgram(this.program);
      this.gl.renderer.currentProgram = this.id;
    } // Set only the active uniforms found in the shader


    this.uniformLocations.forEach((location, activeUniform) => {
      let name = activeUniform.uniformName; // get supplied uniform

      let uniform = this.uniforms[name]; // For structs, get the specific property instead of the entire object

      if (activeUniform.isStruct) {
        uniform = uniform[activeUniform.structProperty];
        name += `.${activeUniform.structProperty}`;
      }

      if (activeUniform.isStructArray) {
        uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
        name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
      }

      if (!uniform) {
        return warn(`Active uniform ${name} has not been supplied`);
      }

      if (uniform && uniform.value === undefined) {
        return warn(`${name} uniform is missing a value parameter`);
      }

      if (uniform.value.texture) {
        textureUnit = textureUnit + 1; // Check if texture needs to be updated

        uniform.value.update(textureUnit);
        return setUniform(this.gl, activeUniform.type, location, textureUnit);
      } // For texture arrays, set uniform as an array of texture units instead of just one


      if (uniform.value.length && uniform.value[0].texture) {
        const textureUnits = [];
        uniform.value.forEach(value => {
          textureUnit = textureUnit + 1;
          value.update(textureUnit);
          textureUnits.push(textureUnit);
        });
        return setUniform(this.gl, activeUniform.type, location, textureUnits);
      }

      setUniform(this.gl, activeUniform.type, location, uniform.value);
    });
    this.applyState();
    if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
  }

  remove() {
    this.gl.deleteProgram(this.program);
  }

}

function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  const setValue = gl.renderer.state.uniformLocations.get(location); // Avoid redundant uniform commands

  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return; // Update cached array values

      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }

  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT

    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2

    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3

    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4

    case 35670: // BOOL

    case 5124: // INT

    case 35678: // SAMPLER_2D

    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE

    case 35671: // BOOL_VEC2

    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2

    case 35672: // BOOL_VEC3

    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3

    case 35673: // BOOL_VEC4

    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4

    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2

    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3

    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  let lines = string.split('\n');

  for (let i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function flatten(a) {
  const arrayLen = a.length;
  const valueLen = a[0].length;
  if (valueLen === undefined) return a;
  const length = arrayLen * valueLen;
  let value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);

  for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);

  return value;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function setArray(a, b) {
  for (let i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}

let warnCount = 0;

function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}

/***/ }),

/***/ "./node_modules/ogl/src/core/RenderTarget.js":
/*!***************************************************!*\
  !*** ./node_modules/ogl/src/core/RenderTarget.js ***!
  \***************************************************/
/*! exports provided: RenderTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderTarget", function() { return RenderTarget; });
/* harmony import */ var _Texture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Texture.js */ "./node_modules/ogl/src/core/Texture.js");
// TODO: multi target rendering
// TODO: test stencil and depth
// TODO: destroy
// TODO: blit on resize?

class RenderTarget {
  constructor(gl, {
    width = gl.canvas.width,
    height = gl.canvas.height,
    target = gl.FRAMEBUFFER,
    color = 1,
    // number of color attachments
    depth = true,
    stencil = false,
    depthTexture = false,
    // note - stencil breaks
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    minFilter = gl.LINEAR,
    magFilter = minFilter,
    type = gl.UNSIGNED_BYTE,
    format = gl.RGBA,
    internalFormat = format,
    unpackAlignment,
    premultiplyAlpha
  } = {}) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.buffer = this.gl.createFramebuffer();
    this.target = target;
    this.gl.bindFramebuffer(this.target, this.buffer);
    this.textures = [];
    const drawBuffers = []; // create and attach required num of color textures

    for (let i = 0; i < color; i++) {
      this.textures.push(new _Texture_js__WEBPACK_IMPORTED_MODULE_0__["Texture"](gl, {
        width,
        height,
        wrapS,
        wrapT,
        minFilter,
        magFilter,
        type,
        format,
        internalFormat,
        unpackAlignment,
        premultiplyAlpha,
        flipY: false,
        generateMipmaps: false
      }));
      this.textures[i].update();
      this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0
      /* level */
      );
      drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
    } // For multi-render targets shader access


    if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers); // alias for majority of use cases

    this.texture = this.textures[0]; // note depth textures break stencil - so can't use together

    if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
      this.depthTexture = new _Texture_js__WEBPACK_IMPORTED_MODULE_0__["Texture"](gl, {
        width,
        height,
        minFilter: this.gl.NEAREST,
        magFilter: this.gl.NEAREST,
        format: this.gl.DEPTH_COMPONENT,
        internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
        type: this.gl.UNSIGNED_INT
      });
      this.depthTexture.update();
      this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0
      /* level */
      );
    } else {
      // Render buffers
      if (depth && !stencil) {
        this.depthBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
        this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
      }

      if (stencil && !depth) {
        this.stencilBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
        this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
      }

      if (depth && stencil) {
        this.depthStencilBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
        this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
      }
    }

    this.gl.bindFramebuffer(this.target, null);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Renderer.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/core/Renderer.js ***!
  \***********************************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
 // TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost
// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );

const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
let ID = 1;
class Renderer {
  constructor({
    canvas = document.createElement('canvas'),
    width = 300,
    height = 150,
    dpr = 1,
    alpha = false,
    depth = true,
    stencil = false,
    antialias = false,
    premultipliedAlpha = false,
    preserveDrawingBuffer = false,
    powerPreference = 'default',
    autoClear = true,
    webgl = 2
  } = {}) {
    const attributes = {
      alpha,
      depth,
      stencil,
      antialias,
      premultipliedAlpha,
      preserveDrawingBuffer,
      powerPreference
    };
    this.dpr = dpr;
    this.alpha = alpha;
    this.color = true;
    this.depth = depth;
    this.stencil = stencil;
    this.premultipliedAlpha = premultipliedAlpha;
    this.autoClear = autoClear;
    this.id = ID++; // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1

    if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
    this.isWebgl2 = !!this.gl;

    if (!this.gl) {
      this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    } // Attach renderer to gl so that all classes have access to internal state functions


    this.gl.renderer = this; // initialise size values

    this.setSize(width, height); // gl state stores to avoid redundant calls on methods used internally

    this.state = {};
    this.state.blendFunc = {
      src: this.gl.ONE,
      dst: this.gl.ZERO
    };
    this.state.blendEquation = {
      modeRGB: this.gl.FUNC_ADD
    };
    this.state.cullFace = null;
    this.state.frontFace = this.gl.CCW;
    this.state.depthMask = true;
    this.state.depthFunc = this.gl.LESS;
    this.state.premultiplyAlpha = false;
    this.state.flipY = false;
    this.state.unpackAlignment = 4;
    this.state.framebuffer = null;
    this.state.viewport = {
      width: null,
      height: null
    };
    this.state.textureUnits = [];
    this.state.activeTextureUnit = 0;
    this.state.boundBuffer = null;
    this.state.uniformLocations = new Map(); // store requested extensions

    this.extensions = {}; // Initialise extra format types

    if (this.isWebgl2) {
      this.getExtension('EXT_color_buffer_float');
      this.getExtension('OES_texture_float_linear');
    } else {
      this.getExtension('OES_texture_float');
      this.getExtension('OES_texture_float_linear');
      this.getExtension('OES_texture_half_float');
      this.getExtension('OES_texture_half_float_linear');
      this.getExtension('OES_element_index_uint');
      this.getExtension('OES_standard_derivatives');
      this.getExtension('EXT_sRGB');
      this.getExtension('WEBGL_depth_texture');
      this.getExtension('WEBGL_draw_buffers');
    } // Create method aliases using extension (WebGL1) or native if available (WebGL2)


    this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
    this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
    this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
    this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
    this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
    this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
    this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL'); // Store device parameters

    this.parameters = {};
    this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic') ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.gl.canvas.width = width * this.dpr;
    this.gl.canvas.height = height * this.dpr;
    Object.assign(this.gl.canvas.style, {
      width: width + 'px',
      height: height + 'px'
    });
  }

  setViewport(width, height) {
    if (this.state.viewport.width === width && this.state.viewport.height === height) return;
    this.state.viewport.width = width;
    this.state.viewport.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  enable(id) {
    if (this.state[id] === true) return;
    this.gl.enable(id);
    this.state[id] = true;
  }

  disable(id) {
    if (this.state[id] === false) return;
    this.gl.disable(id);
    this.state[id] = false;
  }

  setBlendFunc(src, dst, srcAlpha, dstAlpha) {
    if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha) return;
    this.state.blendFunc.src = src;
    this.state.blendFunc.dst = dst;
    this.state.blendFunc.srcAlpha = srcAlpha;
    this.state.blendFunc.dstAlpha = dstAlpha;
    if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);else this.gl.blendFunc(src, dst);
  }

  setBlendEquation(modeRGB, modeAlpha) {
    modeRGB = modeRGB || this.gl.FUNC_ADD;
    if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
    this.state.blendEquation.modeRGB = modeRGB;
    this.state.blendEquation.modeAlpha = modeAlpha;
    if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);else this.gl.blendEquation(modeRGB);
  }

  setCullFace(value) {
    if (this.state.cullFace === value) return;
    this.state.cullFace = value;
    this.gl.cullFace(value);
  }

  setFrontFace(value) {
    if (this.state.frontFace === value) return;
    this.state.frontFace = value;
    this.gl.frontFace(value);
  }

  setDepthMask(value) {
    if (this.state.depthMask === value) return;
    this.state.depthMask = value;
    this.gl.depthMask(value);
  }

  setDepthFunc(value) {
    if (this.state.depthFunc === value) return;
    this.state.depthFunc = value;
    this.gl.depthFunc(value);
  }

  activeTexture(value) {
    if (this.state.activeTextureUnit === value) return;
    this.state.activeTextureUnit = value;
    this.gl.activeTexture(this.gl.TEXTURE0 + value);
  }

  bindFramebuffer({
    target = this.gl.FRAMEBUFFER,
    buffer = null
  } = {}) {
    if (this.state.framebuffer === buffer) return;
    this.state.framebuffer = buffer;
    this.gl.bindFramebuffer(target, buffer);
  }

  getExtension(extension, webgl2Func, extFunc) {
    // if webgl2 function supported, return func bound to gl context
    if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl); // fetch extension once only

    if (!this.extensions[extension]) {
      this.extensions[extension] = this.gl.getExtension(extension);
    } // return extension if no function requested


    if (!webgl2Func) return this.extensions[extension]; // Return null if extension not supported

    if (!this.extensions[extension]) return null; // return extension function, bound to extension

    return this.extensions[extension][extFunc].bind(this.extensions[extension]);
  }

  sortOpaque(a, b) {
    if (a.renderOrder !== b.renderOrder) {
      return a.renderOrder - b.renderOrder;
    } else if (a.program.id !== b.program.id) {
      return a.program.id - b.program.id;
    } else if (a.zDepth !== b.zDepth) {
      return a.zDepth - b.zDepth;
    } else {
      return b.id - a.id;
    }
  }

  sortTransparent(a, b) {
    if (a.renderOrder !== b.renderOrder) {
      return a.renderOrder - b.renderOrder;
    }

    if (a.zDepth !== b.zDepth) {
      return b.zDepth - a.zDepth;
    } else {
      return b.id - a.id;
    }
  }

  sortUI(a, b) {
    if (a.renderOrder !== b.renderOrder) {
      return a.renderOrder - b.renderOrder;
    } else if (a.program.id !== b.program.id) {
      return a.program.id - b.program.id;
    } else {
      return b.id - a.id;
    }
  }

  getRenderList({
    scene,
    camera,
    frustumCull,
    sort
  }) {
    let renderList = [];
    if (camera && frustumCull) camera.updateFrustum(); // Get visible

    scene.traverse(node => {
      if (!node.visible) return true;
      if (!node.draw) return;

      if (frustumCull && node.frustumCulled && camera) {
        if (!camera.frustumIntersectsMesh(node)) return;
      }

      renderList.push(node);
    });

    if (sort) {
      const opaque = [];
      const transparent = []; // depthTest true

      const ui = []; // depthTest false

      renderList.forEach(node => {
        // Split into the 3 render groups
        if (!node.program.transparent) {
          opaque.push(node);
        } else if (node.program.depthTest) {
          transparent.push(node);
        } else {
          ui.push(node);
        }

        node.zDepth = 0; // Only calculate z-depth if renderOrder unset and depthTest is true

        if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return; // update z-depth

        node.worldMatrix.getTranslation(tempVec3);
        tempVec3.applyMatrix4(camera.projectionViewMatrix);
        node.zDepth = tempVec3.z;
      });
      opaque.sort(this.sortOpaque);
      transparent.sort(this.sortTransparent);
      ui.sort(this.sortUI);
      renderList = opaque.concat(transparent, ui);
    }

    return renderList;
  }

  render({
    scene,
    camera,
    target = null,
    update = true,
    sort = true,
    frustumCull = true,
    clear
  }) {
    if (target === null) {
      // make sure no render target bound so draws to canvas
      this.bindFramebuffer();
      this.setViewport(this.width * this.dpr, this.height * this.dpr);
    } else {
      // bind supplied render target and update viewport
      this.bindFramebuffer(target);
      this.setViewport(target.width, target.height);
    }

    if (clear || this.autoClear && clear !== false) {
      // Ensure depth buffer writing is enabled so it can be cleared
      if (this.depth && (!target || target.depth)) {
        this.enable(this.gl.DEPTH_TEST);
        this.setDepthMask(true);
      }

      this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0));
    } // updates all scene graph matrices


    if (update) scene.updateMatrixWorld(); // Update camera separately, in case not in scene graph

    if (camera) camera.updateMatrixWorld(); // Get render list - entails culling and sorting

    const renderList = this.getRenderList({
      scene,
      camera,
      frustumCull,
      sort
    });
    renderList.forEach(node => {
      node.draw({
        camera
      });
    });
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Texture.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/core/Texture.js ***!
  \**********************************************/
/*! exports provided: Texture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return Texture; });
// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads
const emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

let ID = 1;
class Texture {
  constructor(gl, {
    image,
    target = gl.TEXTURE_2D,
    type = gl.UNSIGNED_BYTE,
    format = gl.RGBA,
    internalFormat = format,
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    generateMipmaps = true,
    minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
    magFilter = gl.LINEAR,
    premultiplyAlpha = false,
    unpackAlignment = 4,
    flipY = target == gl.TEXTURE_2D ? true : false,
    anisotropy = 0,
    level = 0,
    width,
    // used for RenderTargets or Data Textures
    height = width
  } = {}) {
    this.gl = gl;
    this.id = ID++;
    this.image = image;
    this.target = target;
    this.type = type;
    this.format = format;
    this.internalFormat = internalFormat;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmaps = generateMipmaps;
    this.premultiplyAlpha = premultiplyAlpha;
    this.unpackAlignment = unpackAlignment;
    this.flipY = flipY;
    this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
    this.level = level;
    this.width = width;
    this.height = height;
    this.texture = this.gl.createTexture();
    this.store = {
      image: null
    }; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // State store to avoid redundant calls for per-texture state

    this.state = {};
    this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
    this.state.magFilter = this.gl.LINEAR;
    this.state.wrapS = this.gl.REPEAT;
    this.state.wrapT = this.gl.REPEAT;
    this.state.anisotropy = 0;
  }

  bind() {
    // Already bound to active texture unit
    if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
    this.gl.bindTexture(this.target, this.texture);
    this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
  }

  update(textureUnit = 0) {
    const needsUpdate = !(this.image === this.store.image && !this.needsUpdate); // Make sure that texture is bound to its texture unit

    if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
      // set active texture unit to perform texture functions
      this.gl.renderer.activeTexture(textureUnit);
      this.bind();
    }

    if (!needsUpdate) return;
    this.needsUpdate = false;

    if (this.flipY !== this.glState.flipY) {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
      this.glState.flipY = this.flipY;
    }

    if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
      this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
      this.glState.premultiplyAlpha = this.premultiplyAlpha;
    }

    if (this.unpackAlignment !== this.glState.unpackAlignment) {
      this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
      this.glState.unpackAlignment = this.unpackAlignment;
    }

    if (this.minFilter !== this.state.minFilter) {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
      this.state.minFilter = this.minFilter;
    }

    if (this.magFilter !== this.state.magFilter) {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
      this.state.magFilter = this.magFilter;
    }

    if (this.wrapS !== this.state.wrapS) {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
      this.state.wrapS = this.wrapS;
    }

    if (this.wrapT !== this.state.wrapT) {
      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
      this.state.wrapT = this.wrapT;
    }

    if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
      this.gl.texParameterf(this.target, this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy);
      this.state.anisotropy = this.anisotropy;
    }

    if (this.image) {
      if (this.image.width) {
        this.width = this.image.width;
        this.height = this.image.height;
      }

      if (this.target === this.gl.TEXTURE_CUBE_MAP) {
        // For cube maps
        for (let i = 0; i < 6; i++) {
          this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.level, this.internalFormat, this.format, this.type, this.image[i]);
        }
      } else if (ArrayBuffer.isView(this.image)) {
        // Data texture
        this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
      } else if (this.image.isCompressedTexture) {
        // Compressed texture
        for (let level = 0; level < this.image.length; level++) {
          this.gl.compressedTexImage2D(this.target, level, this.internalFormat, this.image[level].width, this.image[level].height, 0, this.image[level].data);
        }
      } else {
        // Regular texture
        this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
      }

      if (this.generateMipmaps) {
        // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
        if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
          this.generateMipmaps = false;
          this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
          this.minFilter = this.gl.LINEAR;
        } else {
          this.gl.generateMipmap(this.target);
        }
      } // Callback for when data is pushed to GPU


      this.onUpdate && this.onUpdate();
    } else {
      if (this.target === this.gl.TEXTURE_CUBE_MAP) {
        // Upload empty pixel for each side while no image to avoid errors while image or video loading
        for (let i = 0; i < 6; i++) {
          this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      } else if (this.width) {
        // image intentionally left null for RenderTarget
        this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
      } else {
        // Upload empty pixel if no image to avoid errors while image or video loading
        this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
      }
    }

    this.store.image = this.image;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/core/Transform.js":
/*!************************************************!*\
  !*** ./node_modules/ogl/src/core/Transform.js ***!
  \************************************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Quat.js */ "./node_modules/ogl/src/math/Quat.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _math_Euler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Euler.js */ "./node_modules/ogl/src/math/Euler.js");




class Transform {
  constructor() {
    this.parent = null;
    this.children = [];
    this.visible = true;
    this.matrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"]();
    this.worldMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"]();
    this.matrixAutoUpdate = true;
    this.position = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
    this.quaternion = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
    this.scale = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](1);
    this.rotation = new _math_Euler_js__WEBPACK_IMPORTED_MODULE_3__["Euler"]();
    this.up = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0);

    this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);

    this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
  }

  setParent(parent, notifyParent = true) {
    if (notifyParent && this.parent && parent !== this.parent) this.parent.removeChild(this, false);
    this.parent = parent;
    if (notifyParent && parent) parent.addChild(this, false);
  }

  addChild(child, notifyChild = true) {
    if (!~this.children.indexOf(child)) this.children.push(child);
    if (notifyChild) child.setParent(this, false);
  }

  removeChild(child, notifyChild = true) {
    if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
    if (notifyChild) child.setParent(null, false);
  }

  updateMatrixWorld(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();

    if (this.worldMatrixNeedsUpdate || force) {
      if (this.parent === null) this.worldMatrix.copy(this.matrix);else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
      this.worldMatrixNeedsUpdate = false;
      force = true;
    }

    for (let i = 0, l = this.children.length; i < l; i++) {
      this.children[i].updateMatrixWorld(force);
    }
  }

  updateMatrix() {
    this.matrix.compose(this.quaternion, this.position, this.scale);
    this.worldMatrixNeedsUpdate = true;
  }

  traverse(callback) {
    // Return true in callback to stop traversing children
    if (callback(this)) return;

    for (let i = 0, l = this.children.length; i < l; i++) {
      this.children[i].traverse(callback);
    }
  }

  decompose() {
    this.matrix.getTranslation(this.position);
    this.matrix.getRotation(this.quaternion);
    this.matrix.getScaling(this.scale);
    this.rotation.fromQuaternion(this.quaternion);
  }

  lookAt(target, invert = false) {
    if (invert) this.matrix.lookAt(this.position, target, this.up);else this.matrix.lookAt(target, this.position, this.up);
    this.matrix.getRotation(this.quaternion);
    this.rotation.fromQuaternion(this.quaternion);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Animation.js":
/*!**************************************************!*\
  !*** ./node_modules/ogl/src/extras/Animation.js ***!
  \**************************************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Quat.js */ "./node_modules/ogl/src/math/Quat.js");


const prevPos = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const prevRot = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
const prevScl = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const nextPos = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const nextRot = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
const nextScl = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
class Animation {
  constructor({
    objects,
    data
  }) {
    this.objects = objects;
    this.data = data;
    this.elapsed = 0;
    this.weight = 1;
    this.duration = data.frames.length - 1;
  }

  update(totalWeight = 1, isSet) {
    const weight = isSet ? 1 : this.weight / totalWeight;
    const elapsed = this.elapsed % this.duration;
    const floorFrame = Math.floor(elapsed);
    const blend = elapsed - floorFrame;
    const prevKey = this.data.frames[floorFrame];
    const nextKey = this.data.frames[(floorFrame + 1) % this.duration];
    this.objects.forEach((object, i) => {
      prevPos.fromArray(prevKey.position, i * 3);
      prevRot.fromArray(prevKey.quaternion, i * 4);
      prevScl.fromArray(prevKey.scale, i * 3);
      nextPos.fromArray(nextKey.position, i * 3);
      nextRot.fromArray(nextKey.quaternion, i * 4);
      nextScl.fromArray(nextKey.scale, i * 3);
      prevPos.lerp(nextPos, blend);
      prevRot.slerp(nextRot, blend);
      prevScl.lerp(nextScl, blend);
      object.position.lerp(prevPos, weight);
      object.quaternion.slerp(prevRot, weight);
      object.scale.lerp(prevScl, weight);
    });
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Box.js":
/*!********************************************!*\
  !*** ./node_modules/ogl/src/extras/Box.js ***!
  \********************************************/
/*! exports provided: Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _Plane_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Plane.js */ "./node_modules/ogl/src/extras/Plane.js");


class Box extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    width = 1,
    height = 1,
    depth = 1,
    widthSegments = 1,
    heightSegments = 1,
    depthSegments = 1,
    attributes = {}
  } = {}) {
    const wSegs = widthSegments;
    const hSegs = heightSegments;
    const dSegs = depthSegments;
    const num = (wSegs + 1) * (hSegs + 1) * 2 + (wSegs + 1) * (dSegs + 1) * 2 + (hSegs + 1) * (dSegs + 1) * 2;
    const numIndices = (wSegs * hSegs * 2 + wSegs * dSegs * 2 + hSegs * dSegs * 2) * 6;
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    let i = 0;
    let ii = 0; // left, right

    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii);
    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, depth, height, -width, dSegs, hSegs, 2, 1, 0, 1, -1, i += (dSegs + 1) * (hSegs + 1), ii += dSegs * hSegs); // top, bottom

    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, width, depth, height, dSegs, hSegs, 0, 2, 1, 1, 1, i += (dSegs + 1) * (hSegs + 1), ii += dSegs * hSegs);
    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, width, depth, -height, dSegs, hSegs, 0, 2, 1, 1, -1, i += (wSegs + 1) * (dSegs + 1), ii += wSegs * dSegs); // front, back

    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, width, height, -depth, wSegs, hSegs, 0, 1, 2, -1, -1, i += (wSegs + 1) * (dSegs + 1), ii += wSegs * dSegs);
    _Plane_js__WEBPACK_IMPORTED_MODULE_1__["Plane"].buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, 0, 1, 2, 1, -1, i += (wSegs + 1) * (hSegs + 1), ii += wSegs * hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    super(gl, attributes);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Curve.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Curve.js ***!
  \**********************************************/
/*! exports provided: Curve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Curve", function() { return Curve; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");

const CATMULLROM = 'catmullrom';
const CUBICBEZIER = 'cubicbezier';
const QUADRATICBEZIER = 'quadraticbezier'; // temp

const _a0 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
      _a1 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
      _a2 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
      _a3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
/**
 * Get the control points of cubic bezier curve.
 * @param {*} i
 * @param {*} a
 * @param {*} b
 */


function getCtrlPoint(points, i, a = 0.168, b = 0.168) {
  if (i < 1) {
    _a0.sub(points[1], points[0]).scale(a).add(points[0]);
  } else {
    _a0.sub(points[i + 1], points[i - 1]).scale(a).add(points[i]);
  }

  if (i > points.length - 3) {
    const last = points.length - 1;

    _a1.sub(points[last - 1], points[last]).scale(b).add(points[last]);
  } else {
    _a1.sub(points[i], points[i + 2]).scale(b).add(points[i + 1]);
  }

  return [_a0.clone(), _a1.clone()];
}

function getQuadraticBezierPoint(t, p0, c0, p1) {
  const k = 1 - t;

  _a0.copy(p0).scale(k ** 2);

  _a1.copy(c0).scale(2 * k * t);

  _a2.copy(p1).scale(t ** 2);

  const ret = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
  ret.add(_a0, _a1).add(_a2);
  return ret;
}

function getCubicBezierPoint(t, p0, c0, c1, p1) {
  const k = 1 - t;

  _a0.copy(p0).scale(k ** 3);

  _a1.copy(c0).scale(3 * k ** 2 * t);

  _a2.copy(c1).scale(3 * k * t ** 2);

  _a3.copy(p1).scale(t ** 3);

  const ret = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
  ret.add(_a0, _a1).add(_a2).add(_a3);
  return ret;
}

class Curve {
  constructor({
    points = [new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 0), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](1, 1, 0), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](1, 0, 0)],
    divisions = 12,
    type = CATMULLROM
  } = {}) {
    this.points = points;
    this.divisions = divisions;
    this.type = type;
  }

  _getQuadraticBezierPoints(divisions = this.divisions) {
    const points = [];
    const count = this.points.length;

    if (count < 3) {
      console.warn('Not enough points provided.');
      return [];
    }

    const p0 = this.points[0];
    let c0 = this.points[1],
        p1 = this.points[2];

    for (let i = 0; i <= divisions; i++) {
      const p = getQuadraticBezierPoint(i / divisions, p0, c0, p1);
      points.push(p);
    }

    let offset = 3;

    while (count - offset > 0) {
      p0.copy(p1);
      c0 = p1.scale(2).sub(c0);
      p1 = this.points[offset];

      for (let i = 1; i <= divisions; i++) {
        const p = getQuadraticBezierPoint(i / divisions, p0, c0, p1);
        points.push(p);
      }

      offset++;
    }

    return points;
  }

  _getCubicBezierPoints(divisions = this.divisions) {
    const points = [];
    const count = this.points.length;

    if (count < 4) {
      console.warn('Not enough points provided.');
      return [];
    }

    let p0 = this.points[0],
        c0 = this.points[1],
        c1 = this.points[2],
        p1 = this.points[3];

    for (let i = 0; i <= divisions; i++) {
      const p = getCubicBezierPoint(i / divisions, p0, c0, c1, p1);
      points.push(p);
    }

    let offset = 4;

    while (count - offset > 1) {
      p0.copy(p1);
      c0 = p1.scale(2).sub(c1);
      c1 = this.points[offset];
      p1 = this.points[offset + 1];

      for (let i = 1; i <= divisions; i++) {
        const p = getCubicBezierPoint(i / divisions, p0, c0, c1, p1);
        points.push(p);
      }

      offset += 2;
    }

    return points;
  }

  _getCatmullRomPoints(divisions = this.divisions, a = 0.168, b = 0.168) {
    const points = [];
    const count = this.points.length;

    if (count <= 2) {
      return this.points;
    }

    let p0;
    this.points.forEach((p, i) => {
      if (i === 0) {
        p0 = p;
      } else {
        const [c0, c1] = getCtrlPoint(this.points, i - 1, a, b);
        const c = new Curve({
          points: [p0, c0, c1, p],
          type: CUBICBEZIER
        });
        points.pop();
        points.push(...c.getPoints(divisions));
        p0 = p;
      }
    });
    return points;
  }

  getPoints(divisions = this.divisions, a = 0.168, b = 0.168) {
    const type = this.type;

    if (type === QUADRATICBEZIER) {
      return this._getQuadraticBezierPoints(divisions);
    }

    if (type === CUBICBEZIER) {
      return this._getCubicBezierPoints(divisions);
    }

    if (type === CATMULLROM) {
      return this._getCatmullRomPoints(divisions, a, b);
    }

    return this.points;
  }

}
Curve.CATMULLROM = CATMULLROM;
Curve.CUBICBEZIER = CUBICBEZIER;
Curve.QUADRATICBEZIER = QUADRATICBEZIER;

/***/ }),

/***/ "./node_modules/ogl/src/extras/Cylinder.js":
/*!*************************************************!*\
  !*** ./node_modules/ogl/src/extras/Cylinder.js ***!
  \*************************************************/
/*! exports provided: Cylinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cylinder", function() { return Cylinder; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");


class Cylinder extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    radiusTop = 0.5,
    radiusBottom = 0.5,
    height = 1,
    radialSegments = 8,
    heightSegments = 1,
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
    attributes = {}
  } = {}) {
    const rSegs = radialSegments;
    const hSegs = heightSegments;
    const tStart = thetaStart;
    const tLength = thetaLength;
    const numCaps = openEnded ? 0 : radiusBottom && radiusTop ? 2 : 1;
    const num = (rSegs + 1) * (hSegs + 1 + numCaps) + numCaps;
    const numIndices = rSegs * hSegs * 6 + numCaps * rSegs * 3;
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    let i = 0;
    let ii = 0;
    const indexArray = [];
    addHeight();

    if (!openEnded) {
      if (radiusTop) addCap(true);
      if (radiusBottom) addCap(false);
    }

    function addHeight() {
      let x, y;
      const n = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
      const slope = (radiusBottom - radiusTop) / height;

      for (y = 0; y <= hSegs; y++) {
        const indexRow = [];
        const v = y / hSegs;
        const r = v * (radiusBottom - radiusTop) + radiusTop;

        for (x = 0; x <= rSegs; x++) {
          const u = x / rSegs;
          const theta = u * tLength + tStart;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);
          position.set([r * sinTheta, (0.5 - v) * height, r * cosTheta], i * 3);
          n.set(sinTheta, slope, cosTheta).normalize();
          normal.set([n.x, n.y, n.z], i * 3);
          uv.set([u, 1 - v], i * 2);
          indexRow.push(i++);
        }

        indexArray.push(indexRow);
      }

      for (x = 0; x < rSegs; x++) {
        for (y = 0; y < hSegs; y++) {
          const a = indexArray[y][x];
          const b = indexArray[y + 1][x];
          const c = indexArray[y + 1][x + 1];
          const d = indexArray[y][x + 1];
          index.set([a, b, d, b, c, d], ii * 3);
          ii += 2;
        }
      }
    }

    function addCap(isTop) {
      let x;
      const r = isTop === true ? radiusTop : radiusBottom;
      const sign = isTop === true ? 1 : -1;
      const centerIndex = i;
      position.set([0, 0.5 * height * sign, 0], i * 3);
      normal.set([0, sign, 0], i * 3);
      uv.set([0.5, 0.5], i * 2);
      i++;

      for (x = 0; x <= rSegs; x++) {
        const u = x / rSegs;
        const theta = u * tLength + tStart;
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        position.set([r * sinTheta, 0.5 * height * sign, r * cosTheta], i * 3);
        normal.set([0, sign, 0], i * 3);
        uv.set([cosTheta * 0.5 + 0.5, sinTheta * 0.5 * sign + 0.5], i * 2);
        i++;
      }

      for (x = 0; x < rSegs; x++) {
        const j = centerIndex + x + 1;

        if (isTop) {
          index.set([j, j + 1, centerIndex], ii * 3);
        } else {
          index.set([j + 1, j, centerIndex], ii * 3);
        }

        ii++;
      }
    }

    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    super(gl, attributes);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Flowmap.js":
/*!************************************************!*\
  !*** ./node_modules/ogl/src/extras/Flowmap.js ***!
  \************************************************/
/*! exports provided: Flowmap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Flowmap", function() { return Flowmap; });
/* harmony import */ var _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/RenderTarget.js */ "./node_modules/ogl/src/core/RenderTarget.js");
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony import */ var _Triangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Triangle.js */ "./node_modules/ogl/src/extras/Triangle.js");





class Flowmap {
  constructor(gl, {
    size = 128,
    // default size of the render targets
    falloff = 0.3,
    // size of the stamp, percentage of the size
    alpha = 1,
    // opacity of the stamp
    dissipation = 0.98,
    // affects the speed that the stamp fades. Closer to 1 is slower
    type // Pass in gl.FLOAT to force it, defaults to gl.HALF_FLOAT

  } = {}) {
    const _this = this;

    this.gl = gl; // output uniform containing render target textures

    this.uniform = {
      value: null
    };
    this.mask = {
      read: null,
      write: null,
      // Helper function to ping pong the render targets and update the uniform
      swap: () => {
        let temp = _this.mask.read;
        _this.mask.read = _this.mask.write;
        _this.mask.write = temp;
        _this.uniform.value = _this.mask.read.texture;
      }
    };
    {
      createFBOs();
      this.aspect = 1;
      this.mouse = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_3__["Vec2"]();
      this.velocity = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_3__["Vec2"]();
      this.mesh = initProgram();
    }

    function createFBOs() {
      // Requested type not supported, fall back to half float
      if (!type) type = gl.HALF_FLOAT || gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES;

      let minFilter = (() => {
        if (gl.renderer.isWebgl2) return gl.LINEAR;
        if (gl.renderer.extensions[`OES_texture_${type === gl.FLOAT ? '' : 'half_'}float_linear`]) return gl.LINEAR;
        return gl.NEAREST;
      })();

      const options = {
        width: size,
        height: size,
        type,
        format: gl.RGBA,
        internalFormat: gl.renderer.isWebgl2 ? type === gl.FLOAT ? gl.RGBA32F : gl.RGBA16F : gl.RGBA,
        minFilter,
        depth: false
      };
      _this.mask.read = new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_0__["RenderTarget"](gl, options);
      _this.mask.write = new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_0__["RenderTarget"](gl, options);

      _this.mask.swap();
    }

    function initProgram() {
      return new _core_Mesh_js__WEBPACK_IMPORTED_MODULE_2__["Mesh"](gl, {
        // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
        geometry: new _Triangle_js__WEBPACK_IMPORTED_MODULE_4__["Triangle"](gl),
        program: new _core_Program_js__WEBPACK_IMPORTED_MODULE_1__["Program"](gl, {
          vertex,
          fragment,
          uniforms: {
            tMap: _this.uniform,
            uFalloff: {
              value: falloff * 0.5
            },
            uAlpha: {
              value: alpha
            },
            uDissipation: {
              value: dissipation
            },
            // User needs to update these
            uAspect: {
              value: 1
            },
            uMouse: {
              value: _this.mouse
            },
            uVelocity: {
              value: _this.velocity
            }
          },
          depthTest: false
        })
      });
    }
  }

  update() {
    this.mesh.program.uniforms.uAspect.value = this.aspect;
    this.gl.renderer.render({
      scene: this.mesh,
      target: this.mask.write,
      clear: false
    });
    this.mask.swap();
  }

}
const vertex =
/* glsl */
`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;
const fragment =
/* glsl */
`
    precision highp float;

    uniform sampler2D tMap;

    uniform float uFalloff;
    uniform float uAlpha;
    uniform float uDissipation;
    
    uniform float uAspect;
    uniform vec2 uMouse;
    uniform vec2 uVelocity;

    varying vec2 vUv;

    void main() {
        vec4 color = texture2D(tMap, vUv) * uDissipation;

        vec2 cursor = vUv - uMouse;
        cursor.x *= uAspect;

        vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
        float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;

        color.rgb = mix(color.rgb, stamp, vec3(falloff));

        gl_FragColor = color;
    }
`;

/***/ }),

/***/ "./node_modules/ogl/src/extras/GLTFAnimation.js":
/*!******************************************************!*\
  !*** ./node_modules/ogl/src/extras/GLTFAnimation.js ***!
  \******************************************************/
/*! exports provided: GLTFAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFAnimation", function() { return GLTFAnimation; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Quat.js */ "./node_modules/ogl/src/math/Quat.js");


const tmpVec3A = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const tmpVec3B = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const tmpVec3C = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const tmpVec3D = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const tmpQuatA = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
const tmpQuatB = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
const tmpQuatC = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
const tmpQuatD = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
class GLTFAnimation {
  constructor(data, weight = 1) {
    this.data = data;
    this.elapsed = 0;
    this.weight = weight; // Set to false to not apply modulo to elapsed against duration

    this.loop = true; // Get duration from largest final time in all channels

    this.duration = data.reduce((a, {
      times
    }) => Math.max(a, times[times.length - 1]), 0);
  }

  update(totalWeight = 1, isSet) {
    const weight = isSet ? 1 : this.weight / totalWeight;
    const elapsed = this.loop ? this.elapsed % this.duration : Math.min(this.elapsed, this.duration);
    this.data.forEach(({
      node,
      transform,
      interpolation,
      times,
      values
    }) => {
      // Get index of two time values elapsed is between
      const prevIndex = Math.max(1, times.findIndex(t => t > elapsed)) - 1;
      const nextIndex = prevIndex + 1; // Get linear blend/alpha between the two

      let alpha = (elapsed - times[prevIndex]) / (times[nextIndex] - times[prevIndex]);
      if (interpolation === 'STEP') alpha = 0;
      let prevVal = tmpVec3A;
      let prevTan = tmpVec3B;
      let nextTan = tmpVec3C;
      let nextVal = tmpVec3D;
      let size = 3;

      if (transform === 'quaternion') {
        prevVal = tmpQuatA;
        prevTan = tmpQuatB;
        nextTan = tmpQuatC;
        nextVal = tmpQuatD;
        size = 4;
      }

      if (interpolation === 'CUBICSPLINE') {
        // Get the prev and next values from the indices
        prevVal.fromArray(values, prevIndex * size * 3 + size * 1);
        prevTan.fromArray(values, prevIndex * size * 3 + size * 2);
        nextTan.fromArray(values, nextIndex * size * 3 + size * 0);
        nextVal.fromArray(values, nextIndex * size * 3 + size * 1); // interpolate for final value

        prevVal = this.cubicSplineInterpolate(alpha, prevVal, prevTan, nextTan, nextVal);
        if (size === 4) prevVal.normalize();
      } else {
        // Get the prev and next values from the indices
        prevVal.fromArray(values, prevIndex * size);
        nextVal.fromArray(values, nextIndex * size); // interpolate for final value

        if (size === 4) prevVal.slerp(nextVal, alpha);else prevVal.lerp(nextVal, alpha);
      } // interpolate between multiple possible animations


      if (size === 4) node[transform].slerp(prevVal, weight);else node[transform].lerp(prevVal, weight);
    });
  }

  cubicSplineInterpolate(t, prevVal, prevTan, nextTan, nextVal) {
    const t2 = t * t;
    const t3 = t2 * t;
    const s2 = 3 * t2 - 2 * t3;
    const s3 = t3 - t2;
    const s0 = 1 - s2;
    const s1 = s3 - t2 + t;

    for (let i = 0; i < prevVal.length; i++) {
      prevVal[i] = s0 * prevVal[i] + s1 * (1 - t) * prevTan[i] + s2 * nextVal[i] + s3 * t * nextTan[i];
    }

    return prevVal;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/GLTFLoader.js":
/*!***************************************************!*\
  !*** ./node_modules/ogl/src/extras/GLTFLoader.js ***!
  \***************************************************/
/*! exports provided: GLTFLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFLoader", function() { return GLTFLoader; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _core_Transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _GLTFAnimation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GLTFAnimation.js */ "./node_modules/ogl/src/extras/GLTFAnimation.js");
/* harmony import */ var _GLTFSkin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GLTFSkin.js */ "./node_modules/ogl/src/extras/GLTFSkin.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _NormalProgram_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NormalProgram.js */ "./node_modules/ogl/src/extras/NormalProgram.js");







 // Supports
// [x] Geometry
// [ ] Sparse support
// [x] Nodes and Hierarchy
// [x] Instancing
// [ ] Morph Targets
// [x] Skins
// [ ] Materials
// [x] Textures
// [x] Animation
// [ ] Cameras
// [ ] Extensions
// [x] GLB support
// TODO: Sparse accessor packing? For morph targets basically
// TODO: init accessor missing bufferView with 0s
// TODO: morph target animations
// TODO: what to do if multiple instances are in different groups? Only uses local matrices
// TODO: what if instancing isn't wanted? Eg collision maps
// TODO: ie11 fallback for TextDecoder?

const TYPE_ARRAY = {
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array,
  'image/jpeg': Uint8Array,
  'image/png': Uint8Array
};
const TYPE_SIZE = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const ATTRIBUTES = {
  POSITION: 'position',
  NORMAL: 'normal',
  TANGENT: 'tangent',
  TEXCOORD_0: 'uv',
  TEXCOORD_1: 'uv2',
  COLOR_0: 'color',
  WEIGHTS_0: 'skinWeight',
  JOINTS_0: 'skinIndex'
};
const TRANSFORMS = {
  translation: 'position',
  rotation: 'quaternion',
  scale: 'scale'
};
class GLTFLoader {
  static async load(gl, src) {
    const dir = src.split('/').slice(0, -1).join('/') + '/'; // load main description json

    const desc = await this.parseDesc(src);
    return await this.parse(gl, desc, dir);
  }

  static async parse(gl, desc, dir) {
    if (desc.asset === undefined || desc.asset.version[0] < 2) console.warn('Only GLTF >=2.0 supported. Attempting to parse.'); // Load buffers async

    const buffers = await this.loadBuffers(desc, dir); // Unbind current VAO so that new buffers don't get added to active mesh

    gl.renderer.bindVertexArray(null); // Create gl buffers from bufferViews

    const bufferViews = this.parseBufferViews(gl, desc, buffers); // Create images from either bufferViews or separate image files

    const images = this.parseImages(gl, desc, dir, bufferViews);
    const textures = this.parseTextures(gl, desc, images); // Just pass through material data for now

    const materials = this.parseMaterials(gl, desc, textures); // Fetch the inverse bind matrices for skeleton joints

    const skins = this.parseSkins(gl, desc, bufferViews); // Create geometries for each mesh primitive

    const meshes = this.parseMeshes(gl, desc, bufferViews, materials, skins); // Create transforms, meshes and hierarchy

    const nodes = this.parseNodes(gl, desc, meshes, skins); // Place nodes in skeletons

    this.populateSkins(skins, nodes); // Create animation handlers

    const animations = this.parseAnimations(gl, desc, nodes, bufferViews); // Get top level nodes for each scene

    const scenes = this.parseScenes(desc, nodes);
    const scene = scenes[desc.scene]; // Remove null nodes (instanced transforms)

    for (let i = nodes.length; i >= 0; i--) if (!nodes[i]) nodes.splice(i, 1);

    return {
      json: desc,
      buffers,
      bufferViews,
      images,
      textures,
      materials,
      meshes,
      nodes,
      animations,
      scenes,
      scene
    };
  }

  static async parseDesc(src) {
    if (!src.match(/\.glb$/)) {
      return await fetch(src).then(res => res.json());
    } else {
      return await fetch(src).then(res => res.arrayBuffer()).then(glb => this.unpackGLB(glb));
    }
  } // From https://github.com/donmccurdy/glTF-Transform/blob/e4108cc/packages/core/src/io/io.ts#L32


  static unpackGLB(glb) {
    // Decode and verify GLB header.
    const header = new Uint32Array(glb, 0, 3);

    if (header[0] !== 0x46546c67) {
      throw new Error('Invalid glTF asset.');
    } else if (header[1] !== 2) {
      throw new Error(`Unsupported glTF binary version, "${header[1]}".`);
    } // Decode and verify chunk headers.


    const jsonChunkHeader = new Uint32Array(glb, 12, 2);
    const jsonByteOffset = 20;
    const jsonByteLength = jsonChunkHeader[0];

    if (jsonChunkHeader[1] !== 0x4e4f534a) {
      throw new Error('Unexpected GLB layout.');
    } // Decode JSON.


    const jsonText = new TextDecoder().decode(glb.slice(jsonByteOffset, jsonByteOffset + jsonByteLength));
    const json = JSON.parse(jsonText); // JSON only

    if (jsonByteOffset + jsonByteLength === glb.byteLength) return json;
    const binaryChunkHeader = new Uint32Array(glb, jsonByteOffset + jsonByteLength, 2);

    if (binaryChunkHeader[1] !== 0x004e4942) {
      throw new Error('Unexpected GLB layout.');
    } // Decode content.


    const binaryByteOffset = jsonByteOffset + jsonByteLength + 8;
    const binaryByteLength = binaryChunkHeader[0];
    const binary = glb.slice(binaryByteOffset, binaryByteOffset + binaryByteLength); // Attach binary to buffer

    json.buffers[0].binary = binary;
    return json;
  } // Threejs GLTF Loader https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js#L1085


  static resolveURI(uri, dir) {
    // Invalid URI
    if (typeof uri !== 'string' || uri === '') return ''; // Host Relative URI

    if (/^https?:\/\//i.test(dir) && /^\//.test(uri)) {
      dir = dir.replace(/(^https?:\/\/[^\/]+).*/i, '$1');
    } // Absolute URI http://, https://, //


    if (/^(https?:)?\/\//i.test(uri)) return uri; // Data URI

    if (/^data:.*,.*$/i.test(uri)) return uri; // Blob URI

    if (/^blob:.*$/i.test(uri)) return uri; // Relative URI

    return dir + uri;
  }

  static async loadBuffers(desc, dir) {
    if (!desc.buffers) return null;
    return await Promise.all(desc.buffers.map(buffer => {
      // For GLB, binary buffer ready to go
      if (buffer.binary) return buffer.binary;
      const uri = this.resolveURI(buffer.uri, dir);
      return fetch(uri).then(res => res.arrayBuffer());
    }));
  }

  static parseBufferViews(gl, desc, buffers) {
    if (!desc.bufferViews) return null; // Clone to leave description pure

    const bufferViews = desc.bufferViews.map(o => Object.assign({}, o));
    desc.meshes && desc.meshes.forEach(({
      primitives
    }) => {
      primitives.forEach(({
        attributes,
        indices
      }) => {
        // Flag bufferView as an attribute, so it knows to create a gl buffer
        for (let attr in attributes) bufferViews[desc.accessors[attributes[attr]].bufferView].isAttribute = true;

        if (indices === undefined) return;
        bufferViews[desc.accessors[indices].bufferView].isAttribute = true; // Make sure indices bufferView have a target property for gl buffer binding

        bufferViews[desc.accessors[indices].bufferView].target = gl.ELEMENT_ARRAY_BUFFER;
      });
    }); // Get componentType of each bufferView from the accessors

    desc.accessors.forEach(({
      bufferView: i,
      componentType
    }) => {
      bufferViews[i].componentType = componentType;
    }); // Get mimetype of bufferView from images

    desc.images && desc.images.forEach(({
      uri,
      bufferView: i,
      mimeType
    }) => {
      if (i === undefined) return;
      bufferViews[i].mimeType = mimeType;
    }); // Push each bufferView to the GPU as a separate buffer

    bufferViews.forEach(({
      buffer: bufferIndex,
      // required
      byteOffset = 0,
      // optional
      byteLength,
      // required
      byteStride,
      // optional
      target = gl.ARRAY_BUFFER,
      // optional, added above for elements
      name,
      // optional
      extensions,
      // optional
      extras,
      // optional
      componentType,
      // optional, added from accessor above
      mimeType,
      // optional, added from images above
      isAttribute
    }, i) => {
      const TypeArray = TYPE_ARRAY[componentType || mimeType];
      const elementBytes = TypeArray.BYTES_PER_ELEMENT;
      const data = new TypeArray(buffers[bufferIndex], byteOffset, byteLength / elementBytes);
      bufferViews[i].data = data;
      bufferViews[i].originalBuffer = buffers[bufferIndex];
      if (!isAttribute) return; // Create gl buffers for the bufferView, pushing it to the GPU

      const buffer = gl.createBuffer();
      gl.bindBuffer(target, buffer);
      gl.renderer.state.boundBuffer = buffer;
      gl.bufferData(target, data, gl.STATIC_DRAW);
      bufferViews[i].buffer = buffer;
    });
    return bufferViews;
  }

  static parseImages(gl, desc, dir, bufferViews) {
    if (!desc.images) return null;
    return desc.images.map(({
      uri,
      bufferView: bufferViewIndex,
      mimeType,
      name
    }) => {
      const image = new Image();
      image.name = name;

      if (uri) {
        image.src = this.resolveURI(uri, dir);
      } else if (bufferViewIndex !== undefined) {
        const {
          data
        } = bufferViews[bufferViewIndex];
        const blob = new Blob([data], {
          type: mimeType
        });
        image.src = URL.createObjectURL(blob);
      }

      image.ready = new Promise(res => {
        image.onload = () => res();
      });
      return image;
    });
  }

  static parseTextures(gl, desc, images) {
    if (!desc.textures) return null;
    return desc.textures.map(({
      sampler: samplerIndex,
      source: sourceIndex,
      name,
      extensions,
      extras
    }) => {
      const options = {
        flipY: false,
        wrapS: gl.REPEAT,
        // Repeat by default, opposed to OGL's clamp by default
        wrapT: gl.REPEAT
      };
      const sampler = samplerIndex !== undefined ? desc.samplers[samplerIndex] : null;

      if (sampler) {
        ['magFilter', 'minFilter', 'wrapS', 'wrapT'].forEach(prop => {
          if (sampler[prop]) options[prop] = sampler[prop];
        });
      }

      const texture = new _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__["Texture"](gl, options);
      texture.name = name;
      const image = images[sourceIndex];
      image.ready.then(() => texture.image = image);
      return texture;
    });
  }

  static parseMaterials(gl, desc, textures) {
    if (!desc.materials) return null;
    return desc.materials.map(({
      name,
      extensions,
      extras,
      pbrMetallicRoughness = {},
      normalTexture,
      occlusionTexture,
      emissiveTexture,
      emissiveFactor = [0, 0, 0],
      alphaMode = 'OPAQUE',
      alphaCutoff = 0.5,
      doubleSided = false
    }) => {
      const {
        baseColorFactor = [1, 1, 1, 1],
        baseColorTexture,
        metallicFactor = 1,
        roughnessFactor = 1,
        metallicRoughnessTexture //   extensions,
        //   extras,

      } = pbrMetallicRoughness;

      if (baseColorTexture) {
        baseColorTexture.texture = textures[baseColorTexture.index]; // texCoord
      }

      if (normalTexture) {
        normalTexture.texture = textures[normalTexture.index]; // scale: 1
        // texCoord
      }

      if (metallicRoughnessTexture) {
        metallicRoughnessTexture.texture = textures[metallicRoughnessTexture.index]; // texCoord
      }

      if (occlusionTexture) {
        occlusionTexture.texture = textures[occlusionTexture.index]; // strength 1
        // texCoord
      }

      if (emissiveTexture) {
        emissiveTexture.texture = textures[emissiveTexture.index]; // texCoord
      }

      return {
        name,
        baseColorFactor,
        baseColorTexture,
        metallicFactor,
        roughnessFactor,
        metallicRoughnessTexture,
        normalTexture,
        occlusionTexture,
        emissiveTexture,
        emissiveFactor,
        alphaMode,
        alphaCutoff,
        doubleSided
      };
    });
  }

  static parseSkins(gl, desc, bufferViews) {
    if (!desc.skins) return null;
    return desc.skins.map(({
      inverseBindMatrices,
      // optional
      skeleton,
      // optional
      joints // required
      // name,
      // extensions,
      // extras,

    }) => {
      return {
        inverseBindMatrices: this.parseAccessor(inverseBindMatrices, desc, bufferViews),
        skeleton,
        joints
      };
    });
  }

  static parseMeshes(gl, desc, bufferViews, materials, skins) {
    if (!desc.meshes) return null;
    return desc.meshes.map(({
      primitives,
      // required
      weights,
      // optional
      name,
      // optional
      extensions,
      // optional
      extras // optional

    }, meshIndex) => {
      // TODO: weights stuff ?
      // Parse through nodes to see how many instances there are
      // and if there is a skin attached
      let numInstances = 0;
      let skinIndex = false;
      desc.nodes && desc.nodes.forEach(({
        mesh,
        skin
      }) => {
        if (mesh === meshIndex) {
          numInstances++;
          if (skin !== undefined) skinIndex = skin;
        }
      });
      primitives = this.parsePrimitives(gl, primitives, desc, bufferViews, materials, numInstances).map(({
        geometry,
        program,
        mode
      }) => {
        // Create either skinned mesh or regular mesh
        const mesh = typeof skinIndex === 'number' ? new _GLTFSkin_js__WEBPACK_IMPORTED_MODULE_5__["GLTFSkin"](gl, {
          skeleton: skins[skinIndex],
          geometry,
          program,
          mode
        }) : new _core_Mesh_js__WEBPACK_IMPORTED_MODULE_3__["Mesh"](gl, {
          geometry,
          program,
          mode
        });
        mesh.name = name;

        if (mesh.geometry.isInstanced) {
          // Tag mesh so that nodes can add their transforms to the instance attribute
          mesh.numInstances = numInstances; // Avoid incorrect culling for instances

          mesh.frustumCulled = false;
        }

        return mesh;
      });
      return {
        primitives,
        weights,
        name
      };
    });
  }

  static parsePrimitives(gl, primitives, desc, bufferViews, materials, numInstances) {
    return primitives.map(({
      attributes,
      // required
      indices,
      // optional
      material: materialIndex,
      // optional
      mode = 4,
      // optional
      targets,
      // optional
      extensions,
      // optional
      extras // optional

    }) => {
      const geometry = new _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"](gl); // Add each attribute found in primitive

      for (let attr in attributes) {
        geometry.addAttribute(ATTRIBUTES[attr], this.parseAccessor(attributes[attr], desc, bufferViews));
      } // Add index attribute if found


      if (indices !== undefined) {
        geometry.addAttribute('index', this.parseAccessor(indices, desc, bufferViews));
      } // Add instanced transform attribute if multiple instances


      if (numInstances > 1) {
        geometry.addAttribute('instanceMatrix', {
          instanced: 1,
          size: 16,
          data: new Float32Array(numInstances * 16)
        });
      } // TODO: materials


      const program = new _NormalProgram_js__WEBPACK_IMPORTED_MODULE_7__["NormalProgram"](gl);

      if (materialIndex !== undefined) {
        program.gltfMaterial = materials[materialIndex];
      }

      return {
        geometry,
        program,
        mode
      };
    });
  }

  static parseAccessor(index, desc, bufferViews) {
    // TODO: init missing bufferView with 0s
    // TODO: support sparse
    const {
      bufferView: bufferViewIndex,
      // optional
      byteOffset = 0,
      // optional
      componentType,
      // required
      normalized = false,
      // optional
      count,
      // required
      type,
      // required
      min,
      // optional
      max,
      // optional
      sparse // optional
      // name, // optional
      // extensions, // optional
      // extras, // optional

    } = desc.accessors[index];
    const {
      data,
      // attached in parseBufferViews
      originalBuffer,
      // attached in parseBufferViews
      buffer,
      // replaced to be the actual GL buffer
      byteOffset: bufferByteOffset = 0,
      // byteLength, // applied in parseBufferViews
      byteStride = 0,
      target // name,
      // extensions,
      // extras,

    } = bufferViews[bufferViewIndex];
    const size = TYPE_SIZE[type]; // Parse data from joined buffers

    const TypeArray = TYPE_ARRAY[componentType];
    const elementBytes = data.BYTES_PER_ELEMENT;
    const componentOffset = byteOffset / elementBytes;
    const componentStride = byteStride / elementBytes;
    const isInterleaved = !!byteStride && componentStride !== size; // TODO: interleaved

    const newData = isInterleaved ? data : new TypeArray(originalBuffer, byteOffset + bufferByteOffset, count * size); // Return attribute data

    return {
      data: newData,
      size,
      type: componentType,
      normalized,
      buffer,
      stride: byteStride,
      offset: byteOffset,
      count,
      min,
      max
    };
  }

  static parseNodes(gl, desc, meshes, skins) {
    if (!desc.nodes) return null;
    const nodes = desc.nodes.map(({
      camera,
      // optional
      children,
      // optional
      skin: skinIndex,
      // optional
      matrix,
      // optional
      mesh: meshIndex,
      // optional
      rotation,
      // optional
      scale,
      // optional
      translation,
      // optional
      weights,
      // optional
      name,
      // optional
      extensions,
      // optional
      extras // optional

    }) => {
      const node = new _core_Transform_js__WEBPACK_IMPORTED_MODULE_1__["Transform"]();
      if (name) node.name = name; // Apply transformations

      if (matrix) {
        node.matrix.copy(matrix);
        node.decompose();
      } else {
        if (rotation) node.quaternion.copy(rotation);
        if (scale) node.scale.copy(scale);
        if (translation) node.position.copy(translation);
        node.updateMatrix();
      } // Flags for avoiding duplicate transforms and removing unused instance nodes


      let isInstanced = false;
      let isFirstInstance = true; // add mesh if included

      if (meshIndex !== undefined) {
        meshes[meshIndex].primitives.forEach(mesh => {
          if (mesh.geometry.isInstanced) {
            isInstanced = true;

            if (!mesh.instanceCount) {
              mesh.instanceCount = 0;
            } else {
              isFirstInstance = false;
            }

            node.matrix.toArray(mesh.geometry.attributes.instanceMatrix.data, mesh.instanceCount * 16);
            mesh.instanceCount++;

            if (mesh.instanceCount === mesh.numInstances) {
              // Remove properties once all instances added
              delete mesh.numInstances;
              delete mesh.instanceCount; // Flag attribute as dirty

              mesh.geometry.attributes.instanceMatrix.needsUpdate = true;
            }
          } // For instances, only the first node will actually have the mesh


          if (isInstanced) {
            if (isFirstInstance) mesh.setParent(node);
          } else {
            mesh.setParent(node);
          }
        });
      } // Reset node if instanced to not duplicate transforms


      if (isInstanced) {
        // Remove unused nodes just providing an instance transform
        if (!isFirstInstance) return null; // Avoid duplicate transform for node containing the instanced mesh

        node.matrix.identity();
        node.decompose();
      }

      return node;
    });
    desc.nodes.forEach(({
      children = []
    }, i) => {
      // Set hierarchy now all nodes created
      children.forEach(childIndex => {
        if (!nodes[childIndex]) return;
        nodes[childIndex].setParent(nodes[i]);
      });
    });
    return nodes;
  }

  static populateSkins(skins, nodes) {
    if (!skins) return;
    skins.forEach(skin => {
      skin.joints = skin.joints.map((i, index) => {
        const joint = nodes[i];
        joint.bindInverse = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_6__["Mat4"](...skin.inverseBindMatrices.data.slice(index * 16, (index + 1) * 16));
        return joint;
      });
      if (skin.skeleton) skin.skeleton = nodes[skin.skeleton];
    });
  }

  static parseAnimations(gl, desc, nodes, bufferViews) {
    if (!desc.animations) return null;
    return desc.animations.map(({
      channels,
      // required
      samplers,
      // required
      name // optional
      // extensions, // optional
      // extras,  // optional

    }) => {
      const data = channels.map(({
        sampler: samplerIndex,
        // required
        target // required
        // extensions, // optional
        // extras, // optional

      }) => {
        const {
          input: inputIndex,
          // required
          interpolation = 'LINEAR',
          output: outputIndex // required
          // extensions, // optional
          // extras, // optional

        } = samplers[samplerIndex];
        const {
          node: nodeIndex,
          // optional - TODO: when is it not included?
          path // required
          // extensions, // optional
          // extras, // optional

        } = target;
        const node = nodes[nodeIndex];
        const transform = TRANSFORMS[path];
        const times = this.parseAccessor(inputIndex, desc, bufferViews).data;
        const values = this.parseAccessor(outputIndex, desc, bufferViews).data;
        return {
          node,
          transform,
          interpolation,
          times,
          values
        };
      });
      return {
        name,
        animation: new _GLTFAnimation_js__WEBPACK_IMPORTED_MODULE_4__["GLTFAnimation"](data)
      };
    });
  }

  static parseScenes(desc, nodes) {
    if (!desc.scenes) return null;
    return desc.scenes.map(({
      nodes: nodesIndices = [],
      name,
      // optional
      extensions,
      extras
    }) => {
      return nodesIndices.reduce((map, i) => {
        // Don't add null nodes (instanced transforms)
        if (nodes[i]) map.push(nodes[i]);
        return map;
      }, []);
    });
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/GLTFSkin.js":
/*!*************************************************!*\
  !*** ./node_modules/ogl/src/extras/GLTFSkin.js ***!
  \*************************************************/
/*! exports provided: GLTFSkin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFSkin", function() { return GLTFSkin; });
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");



const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
const identity = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
class GLTFSkin extends _core_Mesh_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"] {
  constructor(gl, {
    skeleton,
    geometry,
    program,
    mode = gl.TRIANGLES
  } = {}) {
    super(gl, {
      geometry,
      program,
      mode
    });
    this.skeleton = skeleton;
    this.program = program;
    this.createBoneTexture();
    this.animations = [];
  }

  createBoneTexture() {
    if (!this.skeleton.joints.length) return;
    const size = Math.max(4, Math.pow(2, Math.ceil(Math.log(Math.sqrt(this.skeleton.joints.length * 4)) / Math.LN2)));
    this.boneMatrices = new Float32Array(size * size * 4);
    this.boneTextureSize = size;
    this.boneTexture = new _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__["Texture"](this.gl, {
      image: this.boneMatrices,
      generateMipmaps: false,
      type: this.gl.FLOAT,
      internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA32F : this.gl.RGBA,
      flipY: false,
      width: size
    });
  } // addAnimation(data) {
  //     const animation = new Animation({ objects: this.bones, data });
  //     this.animations.push(animation);
  //     return animation;
  // }
  // updateAnimations() {
  //     // Calculate combined animation weight
  //     let total = 0;
  //     this.animations.forEach((animation) => (total += animation.weight));
  //     this.animations.forEach((animation, i) => {
  //         // force first animation to set in order to reset frame
  //         animation.update(total, i === 0);
  //     });
  // }


  updateUniforms() {
    // Update bone texture
    this.skeleton.joints.forEach((bone, i) => {
      // Find difference between current and bind pose
      tempMat4.multiply(bone.worldMatrix, bone.bindInverse);
      this.boneMatrices.set(tempMat4, i * 16);
    });
    if (this.boneTexture) this.boneTexture.needsUpdate = true;
  }

  draw({
    camera
  } = {}) {
    if (!this.program.uniforms.boneTexture) {
      Object.assign(this.program.uniforms, {
        boneTexture: {
          value: this.boneTexture
        },
        boneTextureSize: {
          value: this.boneTextureSize
        }
      });
    }

    this.updateUniforms(); // Switch the world matrix with identity to ignore any transforms
    // on the mesh itself - only use skeleton's transforms

    const _worldMatrix = this.worldMatrix;
    this.worldMatrix = identity;
    super.draw({
      camera
    }); // Switch back to leave identity untouched

    this.worldMatrix = _worldMatrix;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/GPGPU.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/GPGPU.js ***!
  \**********************************************/
/*! exports provided: GPGPU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GPGPU", function() { return GPGPU; });
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
/* harmony import */ var _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/RenderTarget.js */ "./node_modules/ogl/src/core/RenderTarget.js");
/* harmony import */ var _Triangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Triangle.js */ "./node_modules/ogl/src/extras/Triangle.js");





class GPGPU {
  constructor(gl, {
    // Always pass in array of vec4s (RGBA values within texture)
    data = new Float32Array(16),
    geometry = new _Triangle_js__WEBPACK_IMPORTED_MODULE_4__["Triangle"](gl),
    type // Pass in gl.FLOAT to force it, defaults to gl.HALF_FLOAT

  }) {
    this.gl = gl;
    const initialData = data;
    this.passes = [];
    this.geometry = geometry;
    this.dataLength = initialData.length / 4; // Windows and iOS only like power of 2 textures
    // Find smallest PO2 that fits data

    this.size = Math.pow(2, Math.ceil(Math.log(Math.ceil(Math.sqrt(this.dataLength))) / Math.LN2)); // Create coords for output texture

    this.coords = new Float32Array(this.dataLength * 2);

    for (let i = 0; i < this.dataLength; i++) {
      const x = i % this.size / this.size; // to add 0.5 to be center pixel ?

      const y = Math.floor(i / this.size) / this.size;
      this.coords.set([x, y], i * 2);
    } // Use original data if already correct length of PO2 texture, else copy to new array of correct length


    const floatArray = (() => {
      if (initialData.length === this.size * this.size * 4) {
        return initialData;
      } else {
        const a = new Float32Array(this.size * this.size * 4);
        a.set(initialData);
        return a;
      }
    })(); // Create output texture uniform using input float texture with initial data


    this.uniform = {
      value: new _core_Texture_js__WEBPACK_IMPORTED_MODULE_2__["Texture"](gl, {
        image: floatArray,
        target: gl.TEXTURE_2D,
        type: gl.FLOAT,
        format: gl.RGBA,
        internalFormat: gl.renderer.isWebgl2 ? gl.RGBA32F : gl.RGBA,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
        generateMipmaps: false,
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
        width: this.size,
        flipY: false
      })
    }; // Create FBOs

    const options = {
      width: this.size,
      height: this.size,
      type: type || gl.HALF_FLOAT || gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
      format: gl.RGBA,
      internalFormat: gl.renderer.isWebgl2 ? type === gl.FLOAT ? gl.RGBA32F : gl.RGBA16F : gl.RGBA,
      minFilter: gl.NEAREST,
      depth: false,
      unpackAlignment: 1
    };
    this.fbo = {
      read: new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_3__["RenderTarget"](gl, options),
      write: new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_3__["RenderTarget"](gl, options),
      swap: () => {
        let temp = this.fbo.read;
        this.fbo.read = this.fbo.write;
        this.fbo.write = temp;
        this.uniform.value = this.fbo.read.texture;
      }
    };
  }

  addPass({
    vertex = defaultVertex,
    fragment = defaultFragment,
    uniforms = {},
    textureUniform = 'tMap',
    enabled = true
  } = {}) {
    uniforms[textureUniform] = this.uniform;
    const program = new _core_Program_js__WEBPACK_IMPORTED_MODULE_0__["Program"](this.gl, {
      vertex,
      fragment,
      uniforms
    });
    const mesh = new _core_Mesh_js__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.gl, {
      geometry: this.geometry,
      program
    });
    const pass = {
      mesh,
      program,
      uniforms,
      enabled,
      textureUniform
    };
    this.passes.push(pass);
    return pass;
  }

  render() {
    const enabledPasses = this.passes.filter(pass => pass.enabled);
    enabledPasses.forEach((pass, i) => {
      this.gl.renderer.render({
        scene: pass.mesh,
        target: this.fbo.write,
        clear: false
      });
      this.fbo.swap();
    });
  }

}
const defaultVertex =
/* glsl */
`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;
const defaultFragment =
/* glsl */
`
    precision highp float;

    uniform sampler2D tMap;
    varying vec2 vUv;

    void main() {
        gl_FragColor = texture2D(tMap, vUv);
    }
`;

/***/ }),

/***/ "./node_modules/ogl/src/extras/KTXTexture.js":
/*!***************************************************!*\
  !*** ./node_modules/ogl/src/extras/KTXTexture.js ***!
  \***************************************************/
/*! exports provided: KTXTexture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTXTexture", function() { return KTXTexture; });
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
 // TODO: Support cubemaps
// Generate textures using https://github.com/TimvanScherpenzeel/texture-compressor

class KTXTexture extends _core_Texture_js__WEBPACK_IMPORTED_MODULE_0__["Texture"] {
  constructor(gl, {
    buffer,
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    anisotropy = 0,
    minFilter,
    magFilter
  } = {}) {
    super(gl, {
      generateMipmaps: false,
      wrapS,
      wrapT,
      anisotropy,
      minFilter,
      magFilter
    });
    if (buffer) return this.parseBuffer(buffer);
  }

  parseBuffer(buffer) {
    const ktx = new KhronosTextureContainer(buffer);
    ktx.mipmaps.isCompressedTexture = true; // Update texture

    this.image = ktx.mipmaps;
    this.internalFormat = ktx.glInternalFormat;

    if (ktx.numberOfMipmapLevels > 1) {
      if (this.minFilter === this.gl.LINEAR) this.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
    } else {
      if (this.minFilter === this.gl.NEAREST_MIPMAP_LINEAR) this.minFilter = this.gl.LINEAR;
    } // TODO: support cube maps
    // ktx.numberOfFaces

  }

}

function KhronosTextureContainer(buffer) {
  const idCheck = [0xab, 0x4b, 0x54, 0x58, 0x20, 0x31, 0x31, 0xbb, 0x0d, 0x0a, 0x1a, 0x0a];
  const id = new Uint8Array(buffer, 0, 12);

  for (let i = 0; i < id.length; i++) if (id[i] !== idCheck[i]) return console.error('File missing KTX identifier'); // TODO: Is this always 4? Tested: [android, macos]


  const size = Uint32Array.BYTES_PER_ELEMENT;
  const head = new DataView(buffer, 12, 13 * size);
  const littleEndian = head.getUint32(0, true) === 0x04030201;
  const glType = head.getUint32(1 * size, littleEndian);
  if (glType !== 0) return console.warn('only compressed formats currently supported');
  this.glInternalFormat = head.getUint32(4 * size, littleEndian);
  let width = head.getUint32(6 * size, littleEndian);
  let height = head.getUint32(7 * size, littleEndian);
  this.numberOfFaces = head.getUint32(10 * size, littleEndian);
  this.numberOfMipmapLevels = Math.max(1, head.getUint32(11 * size, littleEndian));
  const bytesOfKeyValueData = head.getUint32(12 * size, littleEndian);
  this.mipmaps = [];
  let offset = 12 + 13 * 4 + bytesOfKeyValueData;

  for (let level = 0; level < this.numberOfMipmapLevels; level++) {
    const levelSize = new Int32Array(buffer, offset, 1)[0]; // size per face, since not supporting array cubemaps

    offset += 4; // levelSize field

    for (let face = 0; face < this.numberOfFaces; face++) {
      const data = new Uint8Array(buffer, offset, levelSize);
      this.mipmaps.push({
        data,
        width,
        height
      });
      offset += levelSize;
      offset += 3 - (levelSize + 3) % 4; // add padding for odd sized image
    }

    width = width >> 1;
    height = height >> 1;
  }
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/NormalProgram.js":
/*!******************************************************!*\
  !*** ./node_modules/ogl/src/extras/NormalProgram.js ***!
  \******************************************************/
/*! exports provided: NormalProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NormalProgram", function() { return NormalProgram; });
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");

const vertex =
/* glsl */
`
    precision highp float;
    precision highp int;

    attribute vec3 position;
    attribute vec3 normal;

    uniform mat3 normalMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec3 vNormal;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const fragment =
/* glsl */
`
    precision highp float;
    precision highp int;

    varying vec3 vNormal;

    void main() {
        gl_FragColor.rgb = normalize(vNormal);
        gl_FragColor.a = 1.0;
    }
`;
function NormalProgram(gl) {
  return new _core_Program_js__WEBPACK_IMPORTED_MODULE_0__["Program"](gl, {
    vertex: vertex,
    fragment: fragment,
    cullFace: null
  });
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Orbit.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Orbit.js ***!
  \**********************************************/
/*! exports provided: Orbit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orbit", function() { return Orbit; });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
// Based from ThreeJS' OrbitControls class, rewritten using es6 with some additions and subtractions.
// TODO: abstract event handlers so can be fed from other sources
// TODO: make scroll zoom more accurate than just >/< zero
// TODO: be able to pass in new camera position


const STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  DOLLY_PAN: 3
};
const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
const tempVec2a = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["Vec2"]();
const tempVec2b = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["Vec2"]();
function Orbit(object, {
  element = document,
  enabled = true,
  target = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](),
  ease = 0.25,
  inertia = 0.85,
  enableRotate = true,
  rotateSpeed = 0.1,
  autoRotate = false,
  autoRotateSpeed = 1.0,
  enableZoom = true,
  zoomSpeed = 1,
  enablePan = true,
  panSpeed = 0.1,
  minPolarAngle = 0,
  maxPolarAngle = Math.PI,
  minAzimuthAngle = -Infinity,
  maxAzimuthAngle = Infinity,
  minDistance = 0,
  maxDistance = Infinity
} = {}) {
  this.enabled = enabled;
  this.target = target; // Catch attempts to disable - set to 1 so has no effect

  ease = ease || 1;
  inertia = inertia || 0;
  this.minDistance = minDistance;
  this.maxDistance = maxDistance; // current position in sphericalTarget coordinates

  const sphericalDelta = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  const sphericalTarget = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  const spherical = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  const panDelta = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"](); // Grab initial position values

  const offset = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
  offset.copy(object.position).sub(this.target);
  spherical.radius = sphericalTarget.radius = offset.distance();
  spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
  spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));
  this.offset = offset;

  this.update = () => {
    if (autoRotate) {
      handleAutoRotate();
    } // apply delta


    sphericalTarget.radius *= sphericalDelta.radius;
    sphericalTarget.theta += sphericalDelta.theta;
    sphericalTarget.phi += sphericalDelta.phi; // apply boundaries

    sphericalTarget.theta = Math.max(minAzimuthAngle, Math.min(maxAzimuthAngle, sphericalTarget.theta));
    sphericalTarget.phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, sphericalTarget.phi));
    sphericalTarget.radius = Math.max(this.minDistance, Math.min(this.maxDistance, sphericalTarget.radius)); // ease values

    spherical.phi += (sphericalTarget.phi - spherical.phi) * ease;
    spherical.theta += (sphericalTarget.theta - spherical.theta) * ease;
    spherical.radius += (sphericalTarget.radius - spherical.radius) * ease; // apply pan to target. As offset is relative to target, it also shifts

    this.target.add(panDelta); // apply rotation to offset

    let sinPhiRadius = spherical.radius * Math.sin(Math.max(0.000001, spherical.phi));
    offset.x = sinPhiRadius * Math.sin(spherical.theta);
    offset.y = spherical.radius * Math.cos(spherical.phi);
    offset.z = sinPhiRadius * Math.cos(spherical.theta); // Apply updated values to object

    object.position.copy(this.target).add(offset);
    object.lookAt(this.target); // Apply inertia to values

    sphericalDelta.theta *= inertia;
    sphericalDelta.phi *= inertia;
    panDelta.multiply(inertia); // Reset scale every frame to avoid applying scale multiple times

    sphericalDelta.radius = 1;
  }; // Updates internals with new position


  this.forcePosition = () => {
    offset.copy(object.position).sub(this.target);
    spherical.radius = sphericalTarget.radius = offset.distance();
    spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
    spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));
    object.lookAt(this.target);
  }; // Everything below here just updates panDelta and sphericalDelta
  // Using those two objects' values, the orbit is calculated


  const rotateStart = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["Vec2"]();
  const panStart = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["Vec2"]();
  const dollyStart = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["Vec2"]();
  let state = STATE.NONE;
  this.mouseButtons = {
    ORBIT: 0,
    ZOOM: 1,
    PAN: 2
  };

  function getZoomScale() {
    return Math.pow(0.95, zoomSpeed);
  }

  function panLeft(distance, m) {
    tempVec3.set(m[0], m[1], m[2]);
    tempVec3.multiply(-distance);
    panDelta.add(tempVec3);
  }

  function panUp(distance, m) {
    tempVec3.set(m[4], m[5], m[6]);
    tempVec3.multiply(distance);
    panDelta.add(tempVec3);
  }

  const pan = (deltaX, deltaY) => {
    let el = element === document ? document.body : element;
    tempVec3.copy(object.position).sub(this.target);
    let targetDistance = tempVec3.distance();
    targetDistance *= Math.tan((object.fov || 45) / 2 * Math.PI / 180.0);
    panLeft(2 * deltaX * targetDistance / el.clientHeight, object.matrix);
    panUp(2 * deltaY * targetDistance / el.clientHeight, object.matrix);
  };

  function dolly(dollyScale) {
    sphericalDelta.radius /= dollyScale;
  }

  function handleAutoRotate() {
    const angle = 2 * Math.PI / 60 / 60 * autoRotateSpeed;
    sphericalDelta.theta -= angle;
  }

  function handleMoveRotate(x, y) {
    tempVec2a.set(x, y);
    tempVec2b.sub(tempVec2a, rotateStart).multiply(rotateSpeed);
    let el = element === document ? document.body : element;
    sphericalDelta.theta -= 2 * Math.PI * tempVec2b.x / el.clientHeight;
    sphericalDelta.phi -= 2 * Math.PI * tempVec2b.y / el.clientHeight;
    rotateStart.copy(tempVec2a);
  }

  function handleMouseMoveDolly(e) {
    tempVec2a.set(e.clientX, e.clientY);
    tempVec2b.sub(tempVec2a, dollyStart);

    if (tempVec2b.y > 0) {
      dolly(getZoomScale());
    } else if (tempVec2b.y < 0) {
      dolly(1 / getZoomScale());
    }

    dollyStart.copy(tempVec2a);
  }

  function handleMovePan(x, y) {
    tempVec2a.set(x, y);
    tempVec2b.sub(tempVec2a, panStart).multiply(panSpeed);
    pan(tempVec2b.x, tempVec2b.y);
    panStart.copy(tempVec2a);
  }

  function handleTouchStartDollyPan(e) {
    if (enableZoom) {
      let dx = e.touches[0].pageX - e.touches[1].pageX;
      let dy = e.touches[0].pageY - e.touches[1].pageY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }

    if (enablePan) {
      let x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
      let y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      panStart.set(x, y);
    }
  }

  function handleTouchMoveDollyPan(e) {
    if (enableZoom) {
      let dx = e.touches[0].pageX - e.touches[1].pageX;
      let dy = e.touches[0].pageY - e.touches[1].pageY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      tempVec2a.set(0, distance);
      tempVec2b.set(0, Math.pow(tempVec2a.y / dollyStart.y, zoomSpeed));
      dolly(tempVec2b.y);
      dollyStart.copy(tempVec2a);
    }

    if (enablePan) {
      let x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
      let y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      handleMovePan(x, y);
    }
  }

  const onMouseDown = e => {
    if (!this.enabled) return;

    switch (e.button) {
      case this.mouseButtons.ORBIT:
        if (enableRotate === false) return;
        rotateStart.set(e.clientX, e.clientY);
        state = STATE.ROTATE;
        break;

      case this.mouseButtons.ZOOM:
        if (enableZoom === false) return;
        dollyStart.set(e.clientX, e.clientY);
        state = STATE.DOLLY;
        break;

      case this.mouseButtons.PAN:
        if (enablePan === false) return;
        panStart.set(e.clientX, e.clientY);
        state = STATE.PAN;
        break;
    }

    if (state !== STATE.NONE) {
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }
  };

  const onMouseMove = e => {
    if (!this.enabled) return;

    switch (state) {
      case STATE.ROTATE:
        if (enableRotate === false) return;
        handleMoveRotate(e.clientX, e.clientY);
        break;

      case STATE.DOLLY:
        if (enableZoom === false) return;
        handleMouseMoveDolly(e);
        break;

      case STATE.PAN:
        if (enablePan === false) return;
        handleMovePan(e.clientX, e.clientY);
        break;
    }
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    state = STATE.NONE;
  };

  const onMouseWheel = e => {
    if (!this.enabled || !enableZoom || state !== STATE.NONE && state !== STATE.ROTATE) return;
    e.stopPropagation();
    e.preventDefault();

    if (e.deltaY < 0) {
      dolly(1 / getZoomScale());
    } else if (e.deltaY > 0) {
      dolly(getZoomScale());
    }
  };

  const onTouchStart = e => {
    if (!this.enabled) return;
    e.preventDefault();

    switch (e.touches.length) {
      case 1:
        if (enableRotate === false) return;
        rotateStart.set(e.touches[0].pageX, e.touches[0].pageY);
        state = STATE.ROTATE;
        break;

      case 2:
        if (enableZoom === false && enablePan === false) return;
        handleTouchStartDollyPan(e);
        state = STATE.DOLLY_PAN;
        break;

      default:
        state = STATE.NONE;
    }
  };

  const onTouchMove = e => {
    if (!this.enabled) return;
    e.preventDefault();
    e.stopPropagation();

    switch (e.touches.length) {
      case 1:
        if (enableRotate === false) return;
        handleMoveRotate(e.touches[0].pageX, e.touches[0].pageY);
        break;

      case 2:
        if (enableZoom === false && enablePan === false) return;
        handleTouchMoveDollyPan(e);
        break;

      default:
        state = STATE.NONE;
    }
  };

  const onTouchEnd = () => {
    if (!this.enabled) return;
    state = STATE.NONE;
  };

  const onContextMenu = e => {
    if (!this.enabled) return;
    e.preventDefault();
  };

  function addHandlers() {
    element.addEventListener('contextmenu', onContextMenu, false);
    element.addEventListener('mousedown', onMouseDown, false);
    element.addEventListener('wheel', onMouseWheel, {
      passive: false
    });
    element.addEventListener('touchstart', onTouchStart, {
      passive: false
    });
    element.addEventListener('touchend', onTouchEnd, false);
    element.addEventListener('touchmove', onTouchMove, {
      passive: false
    });
  }

  this.remove = function () {
    element.removeEventListener('contextmenu', onContextMenu);
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('wheel', onMouseWheel);
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
    element.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  addHandlers();
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Plane.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Plane.js ***!
  \**********************************************/
/*! exports provided: Plane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return Plane; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");

class Plane extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    width = 1,
    height = 1,
    widthSegments = 1,
    heightSegments = 1,
    attributes = {}
  } = {}) {
    const wSegs = widthSegments;
    const hSegs = heightSegments; // Determine length of arrays

    const num = (wSegs + 1) * (hSegs + 1);
    const numIndices = wSegs * hSegs * 6; // Generate empty arrays once

    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    super(gl, attributes);
  }

  static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
    const io = i;
    const segW = width / wSegs;
    const segH = height / hSegs;

    for (let iy = 0; iy <= hSegs; iy++) {
      let y = iy * segH - height / 2;

      for (let ix = 0; ix <= wSegs; ix++, i++) {
        let x = ix * segW - width / 2;
        position[i * 3 + u] = x * uDir;
        position[i * 3 + v] = y * vDir;
        position[i * 3 + w] = depth / 2;
        normal[i * 3 + u] = 0;
        normal[i * 3 + v] = 0;
        normal[i * 3 + w] = depth >= 0 ? 1 : -1;
        uv[i * 2] = ix / wSegs;
        uv[i * 2 + 1] = 1 - iy / hSegs;
        if (iy === hSegs || ix === wSegs) continue;
        let a = io + ix + iy * (wSegs + 1);
        let b = io + ix + (iy + 1) * (wSegs + 1);
        let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
        let d = io + ix + iy * (wSegs + 1) + 1;
        index[ii * 6] = a;
        index[ii * 6 + 1] = b;
        index[ii * 6 + 2] = d;
        index[ii * 6 + 3] = b;
        index[ii * 6 + 4] = c;
        index[ii * 6 + 5] = d;
        ii++;
      }
    }
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Polyline.js":
/*!*************************************************!*\
  !*** ./node_modules/ogl/src/extras/Polyline.js ***!
  \*************************************************/
/*! exports provided: Polyline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return Polyline; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Color_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Color.js */ "./node_modules/ogl/src/math/Color.js");






const tmp = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_4__["Vec3"]();
class Polyline {
  constructor(gl, {
    points,
    // Array of Vec3s
    vertex = defaultVertex,
    fragment = defaultFragment,
    uniforms = {},
    attributes = {} // For passing in custom attribs

  }) {
    this.gl = gl;
    this.points = points;
    this.count = points.length; // Create buffers

    this.position = new Float32Array(this.count * 3 * 2);
    this.prev = new Float32Array(this.count * 3 * 2);
    this.next = new Float32Array(this.count * 3 * 2);
    const side = new Float32Array(this.count * 1 * 2);
    const uv = new Float32Array(this.count * 2 * 2);
    const index = new Uint16Array((this.count - 1) * 3 * 2); // Set static buffers

    for (let i = 0; i < this.count; i++) {
      side.set([-1, 1], i * 2);
      const v = i / (this.count - 1);
      uv.set([0, v, 1, v], i * 4);
      if (i === this.count - 1) continue;
      const ind = i * 2;
      index.set([ind + 0, ind + 1, ind + 2], (ind + 0) * 3);
      index.set([ind + 2, ind + 1, ind + 3], (ind + 1) * 3);
    }

    const geometry = this.geometry = new _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"](gl, Object.assign(attributes, {
      position: {
        size: 3,
        data: this.position
      },
      prev: {
        size: 3,
        data: this.prev
      },
      next: {
        size: 3,
        data: this.next
      },
      side: {
        size: 1,
        data: side
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        size: 1,
        data: index
      }
    })); // Populate dynamic buffers

    this.updateGeometry();
    if (!uniforms.uResolution) this.resolution = uniforms.uResolution = {
      value: new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_3__["Vec2"]()
    };
    if (!uniforms.uDPR) this.dpr = uniforms.uDPR = {
      value: 1
    };
    if (!uniforms.uThickness) this.thickness = uniforms.uThickness = {
      value: 1
    };
    if (!uniforms.uColor) this.color = uniforms.uColor = {
      value: new _math_Color_js__WEBPACK_IMPORTED_MODULE_5__["Color"]('#000')
    };
    if (!uniforms.uMiter) this.miter = uniforms.uMiter = {
      value: 1
    }; // Set size uniforms' values

    this.resize();
    const program = this.program = new _core_Program_js__WEBPACK_IMPORTED_MODULE_1__["Program"](gl, {
      vertex,
      fragment,
      uniforms
    });
    this.mesh = new _core_Mesh_js__WEBPACK_IMPORTED_MODULE_2__["Mesh"](gl, {
      geometry,
      program
    });
  }

  updateGeometry() {
    this.points.forEach((p, i) => {
      p.toArray(this.position, i * 3 * 2);
      p.toArray(this.position, i * 3 * 2 + 3);

      if (!i) {
        // If first point, calculate prev using the distance to 2nd point
        tmp.copy(p).sub(this.points[i + 1]).add(p);
        tmp.toArray(this.prev, i * 3 * 2);
        tmp.toArray(this.prev, i * 3 * 2 + 3);
      } else {
        p.toArray(this.next, (i - 1) * 3 * 2);
        p.toArray(this.next, (i - 1) * 3 * 2 + 3);
      }

      if (i === this.points.length - 1) {
        // If last point, calculate next using distance to 2nd last point
        tmp.copy(p).sub(this.points[i - 1]).add(p);
        tmp.toArray(this.next, i * 3 * 2);
        tmp.toArray(this.next, i * 3 * 2 + 3);
      } else {
        p.toArray(this.prev, (i + 1) * 3 * 2);
        p.toArray(this.prev, (i + 1) * 3 * 2 + 3);
      }
    });
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.prev.needsUpdate = true;
    this.geometry.attributes.next.needsUpdate = true;
  } // Only need to call if not handling resolution uniforms manually


  resize() {
    // Update automatic uniforms if not overridden
    if (this.resolution) this.resolution.value.set(this.gl.canvas.width, this.gl.canvas.height);
    if (this.dpr) this.dpr.value = this.gl.renderer.dpr;
  }

}
const defaultVertex =
/* glsl */
`
    precision highp float;

    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;
    uniform float uMiter;

    varying vec2 vUv;

    vec4 getPosition() {
        mat4 mvp = projectionMatrix * modelViewMatrix;
        vec4 current = mvp * vec4(position, 1);
        vec4 nextPos = mvp * vec4(next, 1);
        vec4 prevPos = mvp * vec4(prev, 1);

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);    
        vec2 currentScreen = current.xy / current.w * aspect;
        vec2 nextScreen = nextPos.xy / nextPos.w * aspect;
        vec2 prevScreen = prevPos.xy / prevPos.w * aspect;
    
        vec2 dir1 = normalize(currentScreen - prevScreen);
        vec2 dir2 = normalize(nextScreen - currentScreen);
        vec2 dir = normalize(dir1 + dir2);
    
        vec2 normal = vec2(-dir.y, dir.x);
        normal /= mix(1.0, max(0.3, dot(normal, vec2(-dir1.y, dir1.x))), uMiter);
        normal /= aspect;

        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
    
        return current;
    }

    void main() {
        vUv = uv;
        gl_Position = getPosition();
    }
`;
const defaultFragment =
/* glsl */
`
    precision highp float;

    uniform vec3 uColor;
    
    varying vec2 vUv;

    void main() {
        gl_FragColor.rgb = uColor;
        gl_FragColor.a = 1.0;
    }
`;

/***/ }),

/***/ "./node_modules/ogl/src/extras/Post.js":
/*!*********************************************!*\
  !*** ./node_modules/ogl/src/extras/Post.js ***!
  \*********************************************/
/*! exports provided: Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return Post; });
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/RenderTarget.js */ "./node_modules/ogl/src/core/RenderTarget.js");
/* harmony import */ var _Triangle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Triangle.js */ "./node_modules/ogl/src/extras/Triangle.js");
// TODO: Destroy render targets if size changed and exists




class Post {
  constructor(gl, {
    width,
    height,
    dpr,
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    minFilter = gl.LINEAR,
    magFilter = gl.LINEAR,
    geometry = new _Triangle_js__WEBPACK_IMPORTED_MODULE_3__["Triangle"](gl),
    targetOnly = null
  } = {}) {
    this.gl = gl;
    this.options = {
      wrapS,
      wrapT,
      minFilter,
      magFilter
    };
    this.passes = [];
    this.geometry = geometry;
    this.uniform = {
      value: null
    };
    this.targetOnly = targetOnly;
    const fbo = this.fbo = {
      read: null,
      write: null,
      swap: () => {
        let temp = fbo.read;
        fbo.read = fbo.write;
        fbo.write = temp;
      }
    };
    this.resize({
      width,
      height,
      dpr
    });
  }

  addPass({
    vertex = defaultVertex,
    fragment = defaultFragment,
    uniforms = {},
    textureUniform = 'tMap',
    enabled = true
  } = {}) {
    uniforms[textureUniform] = {
      value: this.fbo.read.texture
    };
    const program = new _core_Program_js__WEBPACK_IMPORTED_MODULE_0__["Program"](this.gl, {
      vertex,
      fragment,
      uniforms
    });
    const mesh = new _core_Mesh_js__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.gl, {
      geometry: this.geometry,
      program
    });
    const pass = {
      mesh,
      program,
      uniforms,
      enabled,
      textureUniform
    };
    this.passes.push(pass);
    return pass;
  }

  resize({
    width,
    height,
    dpr
  } = {}) {
    if (dpr) this.dpr = dpr;

    if (width) {
      this.width = width;
      this.height = height || width;
    }

    dpr = this.dpr || this.gl.renderer.dpr;
    width = (this.width || this.gl.renderer.width) * dpr;
    height = (this.height || this.gl.renderer.height) * dpr;
    this.options.width = width;
    this.options.height = height;
    this.fbo.read = new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_2__["RenderTarget"](this.gl, this.options);
    this.fbo.write = new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_2__["RenderTarget"](this.gl, this.options);
  } // Uses same arguments as renderer.render


  render({
    scene,
    camera,
    target = null,
    update = true,
    sort = true,
    frustumCull = true
  }) {
    const enabledPasses = this.passes.filter(pass => pass.enabled);
    this.gl.renderer.render({
      scene,
      camera,
      target: enabledPasses.length || !target && this.targetOnly ? this.fbo.write : target,
      update,
      sort,
      frustumCull
    });
    this.fbo.swap();
    enabledPasses.forEach((pass, i) => {
      pass.mesh.program.uniforms[pass.textureUniform].value = this.fbo.read.texture;
      this.gl.renderer.render({
        scene: pass.mesh,
        target: i === enabledPasses.length - 1 && (target || !this.targetOnly) ? target : this.fbo.write,
        clear: true
      });
      this.fbo.swap();
    });
    this.uniform.value = this.fbo.read.texture;
  }

}
const defaultVertex =
/* glsl */
`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;
const defaultFragment =
/* glsl */
`
    precision highp float;

    uniform sampler2D tMap;
    varying vec2 vUv;

    void main() {
        gl_FragColor = texture2D(tMap, vUv);
    }
`;

/***/ }),

/***/ "./node_modules/ogl/src/extras/Raycast.js":
/*!************************************************!*\
  !*** ./node_modules/ogl/src/extras/Raycast.js ***!
  \************************************************/
/*! exports provided: Raycast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Raycast", function() { return Raycast; });
/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
// TODO: barycentric code shouldn't be here, but where?
// TODO: SphereCast?



const tempVec2a = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__["Vec2"]();
const tempVec2b = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__["Vec2"]();
const tempVec2c = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__["Vec2"]();
const tempVec3a = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3b = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3c = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3d = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3e = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3f = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3g = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3h = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3i = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3j = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempVec3k = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"]();
class Raycast {
  constructor() {
    this.origin = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
    this.direction = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
  } // Set ray from mouse unprojection


  castMouse(camera, mouse = [0, 0]) {
    if (camera.type === 'orthographic') {
      // Set origin
      // Since camera is orthographic, origin is not the camera position
      const {
        left,
        right,
        bottom,
        top,
        zoom
      } = camera;
      const x = left / zoom + (right - left) / zoom * (mouse[0] * 0.5 + 0.5);
      const y = bottom / zoom + (top - bottom) / zoom * (mouse[1] * 0.5 + 0.5);
      this.origin.set(x, y, 0);
      this.origin.applyMatrix4(camera.worldMatrix); // Set direction
      // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2

      this.direction.x = -camera.worldMatrix[8];
      this.direction.y = -camera.worldMatrix[9];
      this.direction.z = -camera.worldMatrix[10];
    } else {
      // Set origin
      camera.worldMatrix.getTranslation(this.origin); // Set direction

      this.direction.set(mouse[0], mouse[1], 0.5);
      camera.unproject(this.direction);
      this.direction.sub(this.origin).normalize();
    }
  }

  intersectBounds(meshes, {
    maxDistance,
    output = []
  } = {}) {
    if (!Array.isArray(meshes)) meshes = [meshes];
    const invWorldMat4 = tempMat4;
    const origin = tempVec3a;
    const direction = tempVec3b;
    const hits = output;
    hits.length = 0;
    meshes.forEach(mesh => {
      // Create bounds
      if (!mesh.geometry.bounds || mesh.geometry.bounds.radius === Infinity) mesh.geometry.computeBoundingSphere();
      const bounds = mesh.geometry.bounds;
      invWorldMat4.inverse(mesh.worldMatrix); // Get max distance locally

      let localMaxDistance;

      if (maxDistance) {
        direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
        localMaxDistance = maxDistance * direction.len();
      } // Take world space ray and make it object space to align with bounding box


      origin.copy(this.origin).applyMatrix4(invWorldMat4);
      direction.copy(this.direction).transformDirection(invWorldMat4); // Break out early if bounds too far away from origin

      if (maxDistance) {
        if (origin.distance(bounds.center) - bounds.radius > localMaxDistance) return;
      }

      let localDistance = 0; // Check origin isn't inside bounds before testing intersection

      if (mesh.geometry.raycast === 'sphere') {
        if (origin.distance(bounds.center) > bounds.radius) {
          localDistance = this.intersectSphere(bounds, origin, direction);
          if (!localDistance) return;
        }
      } else {
        if (origin.x < bounds.min.x || origin.x > bounds.max.x || origin.y < bounds.min.y || origin.y > bounds.max.y || origin.z < bounds.min.z || origin.z > bounds.max.z) {
          localDistance = this.intersectBox(bounds, origin, direction);
          if (!localDistance) return;
        }
      }

      if (maxDistance && localDistance > localMaxDistance) return; // Create object on mesh to avoid generating lots of objects

      if (!mesh.hit) mesh.hit = {
        localPoint: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"](),
        point: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]()
      };
      mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
      mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
      mesh.hit.distance = mesh.hit.point.distance(this.origin);
      hits.push(mesh);
    });
    hits.sort((a, b) => a.hit.distance - b.hit.distance);
    return hits;
  }

  intersectMeshes(meshes, {
    cullFace = true,
    maxDistance,
    includeUV = true,
    includeNormal = true,
    output = []
  } = {}) {
    // Test bounds first before testing geometry
    const hits = this.intersectBounds(meshes, {
      maxDistance,
      output
    });
    if (!hits.length) return hits;
    const invWorldMat4 = tempMat4;
    const origin = tempVec3a;
    const direction = tempVec3b;
    const a = tempVec3c;
    const b = tempVec3d;
    const c = tempVec3e;
    const closestFaceNormal = tempVec3f;
    const faceNormal = tempVec3g;
    const barycoord = tempVec3h;
    const uvA = tempVec2a;
    const uvB = tempVec2b;
    const uvC = tempVec2c;

    for (let i = hits.length - 1; i >= 0; i--) {
      const mesh = hits[i];
      invWorldMat4.inverse(mesh.worldMatrix); // Get max distance locally

      let localMaxDistance;

      if (maxDistance) {
        direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
        localMaxDistance = maxDistance * direction.len();
      } // Take world space ray and make it object space to align with bounding box


      origin.copy(this.origin).applyMatrix4(invWorldMat4);
      direction.copy(this.direction).transformDirection(invWorldMat4);
      let localDistance = 0;
      let closestA, closestB, closestC;
      const geometry = mesh.geometry;
      const attributes = geometry.attributes;
      const index = attributes.index;
      const start = Math.max(0, geometry.drawRange.start);
      const end = Math.min(index ? index.count : attributes.position.count, geometry.drawRange.start + geometry.drawRange.count);

      for (let j = start; j < end; j += 3) {
        // Position attribute indices for each triangle
        const ai = index ? index.data[j] : j;
        const bi = index ? index.data[j + 1] : j + 1;
        const ci = index ? index.data[j + 2] : j + 2;
        a.fromArray(attributes.position.data, ai * 3);
        b.fromArray(attributes.position.data, bi * 3);
        c.fromArray(attributes.position.data, ci * 3);
        const distance = this.intersectTriangle(a, b, c, cullFace, origin, direction, faceNormal);
        if (!distance) continue; // Too far away

        if (maxDistance && distance > localMaxDistance) continue;

        if (!localDistance || distance < localDistance) {
          localDistance = distance;
          closestA = ai;
          closestB = bi;
          closestC = ci;
          closestFaceNormal.copy(faceNormal);
        }
      }

      if (!localDistance) hits.splice(i, 1); // Update hit values from bounds-test

      mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
      mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
      mesh.hit.distance = mesh.hit.point.distance(this.origin); // Add unique hit objects on mesh to avoid generating lots of objects

      if (!mesh.hit.faceNormal) {
        mesh.hit.localFaceNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
        mesh.hit.faceNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
        mesh.hit.uv = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__["Vec2"]();
        mesh.hit.localNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
        mesh.hit.normal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
      } // Add face normal data which is already computed


      mesh.hit.localFaceNormal.copy(closestFaceNormal);
      mesh.hit.faceNormal.copy(mesh.hit.localFaceNormal).transformDirection(mesh.worldMatrix); // Optional data, opt out to optimise a bit if necessary

      if (includeUV || includeNormal) {
        // Calculate barycoords to find uv values at hit point
        a.fromArray(attributes.position.data, closestA * 3);
        b.fromArray(attributes.position.data, closestB * 3);
        c.fromArray(attributes.position.data, closestC * 3);
        this.getBarycoord(mesh.hit.localPoint, a, b, c, barycoord);
      }

      if (includeUV && attributes.uv) {
        uvA.fromArray(attributes.uv.data, closestA * 2);
        uvB.fromArray(attributes.uv.data, closestB * 2);
        uvC.fromArray(attributes.uv.data, closestC * 2);
        mesh.hit.uv.set(uvA.x * barycoord.x + uvB.x * barycoord.y + uvC.x * barycoord.z, uvA.y * barycoord.x + uvB.y * barycoord.y + uvC.y * barycoord.z);
      }

      if (includeNormal && attributes.normal) {
        a.fromArray(attributes.normal.data, closestA * 3);
        b.fromArray(attributes.normal.data, closestB * 3);
        c.fromArray(attributes.normal.data, closestC * 3);
        mesh.hit.localNormal.set(a.x * barycoord.x + b.x * barycoord.y + c.x * barycoord.z, a.y * barycoord.x + b.y * barycoord.y + c.y * barycoord.z, a.z * barycoord.x + b.z * barycoord.y + c.z * barycoord.z);
        mesh.hit.normal.copy(mesh.hit.localNormal).transformDirection(mesh.worldMatrix);
      }
    }

    hits.sort((a, b) => a.hit.distance - b.hit.distance);
    return hits;
  }

  intersectSphere(sphere, origin = this.origin, direction = this.direction) {
    const ray = tempVec3c;
    ray.sub(sphere.center, origin);
    const tca = ray.dot(direction);
    const d2 = ray.dot(ray) - tca * tca;
    const radius2 = sphere.radius * sphere.radius;
    if (d2 > radius2) return 0;
    const thc = Math.sqrt(radius2 - d2);
    const t0 = tca - thc;
    const t1 = tca + thc;
    if (t0 < 0 && t1 < 0) return 0;
    if (t0 < 0) return t1;
    return t0;
  } // Ray AABB - Ray Axis aligned bounding box testing


  intersectBox(box, origin = this.origin, direction = this.direction) {
    let tmin, tmax, tYmin, tYmax, tZmin, tZmax;
    const invdirx = 1 / direction.x;
    const invdiry = 1 / direction.y;
    const invdirz = 1 / direction.z;
    const min = box.min;
    const max = box.max;
    tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
    tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
    tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
    tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
    if (tmin > tYmax || tYmin > tmax) return 0;
    if (tYmin > tmin) tmin = tYmin;
    if (tYmax < tmax) tmax = tYmax;
    tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
    tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
    if (tmin > tZmax || tZmin > tmax) return 0;
    if (tZmin > tmin) tmin = tZmin;
    if (tZmax < tmax) tmax = tZmax;
    if (tmax < 0) return 0;
    return tmin >= 0 ? tmin : tmax;
  }

  intersectTriangle(a, b, c, backfaceCulling = true, origin = this.origin, direction = this.direction, normal = tempVec3g) {
    // from https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js
    // which is from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
    const edge1 = tempVec3h;
    const edge2 = tempVec3i;
    const diff = tempVec3j;
    edge1.sub(b, a);
    edge2.sub(c, a);
    normal.cross(edge1, edge2);
    let DdN = direction.dot(normal);
    if (!DdN) return 0;
    let sign;

    if (DdN > 0) {
      if (backfaceCulling) return 0;
      sign = 1;
    } else {
      sign = -1;
      DdN = -DdN;
    }

    diff.sub(origin, a);
    let DdQxE2 = sign * direction.dot(edge2.cross(diff, edge2));
    if (DdQxE2 < 0) return 0;
    let DdE1xQ = sign * direction.dot(edge1.cross(diff));
    if (DdE1xQ < 0) return 0;
    if (DdQxE2 + DdE1xQ > DdN) return 0;
    let QdN = -sign * diff.dot(normal);
    if (QdN < 0) return 0;
    return QdN / DdN;
  }

  getBarycoord(point, a, b, c, target = tempVec3h) {
    // From https://github.com/mrdoob/three.js/blob/master/src/math/Triangle.js
    // static/instance method to calculate barycentric coordinates
    // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
    const v0 = tempVec3i;
    const v1 = tempVec3j;
    const v2 = tempVec3k;
    v0.sub(c, a);
    v1.sub(b, a);
    v2.sub(point, a);
    const dot00 = v0.dot(v0);
    const dot01 = v0.dot(v1);
    const dot02 = v0.dot(v2);
    const dot11 = v1.dot(v1);
    const dot12 = v1.dot(v2);
    const denom = dot00 * dot11 - dot01 * dot01;
    if (denom === 0) return target.set(-2, -1, -1);
    const invDenom = 1 / denom;
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return target.set(1 - u - v, v, u);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Shadow.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/extras/Shadow.js ***!
  \***********************************************/
/*! exports provided: Shadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony import */ var _core_Camera_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Camera.js */ "./node_modules/ogl/src/core/Camera.js");
/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/RenderTarget.js */ "./node_modules/ogl/src/core/RenderTarget.js");



class Shadow {
  constructor(gl, {
    light = new _core_Camera_js__WEBPACK_IMPORTED_MODULE_0__["Camera"](gl),
    width = 1024,
    height = width
  }) {
    this.gl = gl;
    this.light = light;
    this.target = new _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_2__["RenderTarget"](gl, {
      width,
      height
    });
    this.depthProgram = new _core_Program_js__WEBPACK_IMPORTED_MODULE_1__["Program"](gl, {
      vertex: defaultVertex,
      fragment: defaultFragment,
      cullFace: null
    });
    this.castMeshes = [];
  }

  add({
    mesh,
    receive = true,
    cast = true,
    vertex = defaultVertex,
    fragment = defaultFragment,
    uniformProjection = 'shadowProjectionMatrix',
    uniformView = 'shadowViewMatrix',
    uniformTexture = 'tShadow'
  }) {
    // Add uniforms to existing program
    if (receive && !mesh.program.uniforms[uniformProjection]) {
      mesh.program.uniforms[uniformProjection] = {
        value: this.light.projectionMatrix
      };
      mesh.program.uniforms[uniformView] = {
        value: this.light.viewMatrix
      };
      mesh.program.uniforms[uniformTexture] = {
        value: this.target.texture
      };
    }

    if (!cast) return;
    this.castMeshes.push(mesh); // Store program for when switching between depth override

    mesh.colorProgram = mesh.program; // Check if depth program already attached

    if (mesh.depthProgram) return; // Use global depth override if nothing custom passed in

    if (vertex === defaultVertex && fragment === defaultFragment) {
      mesh.depthProgram = this.depthProgram;
      return;
    } // Create custom override program


    mesh.depthProgram = new _core_Program_js__WEBPACK_IMPORTED_MODULE_1__["Program"](gl, {
      vertex,
      fragment,
      cullFace: null
    });
  }

  render({
    scene
  }) {
    // For depth render, replace program with depth override.
    // Hide meshes not casting shadows.
    scene.traverse(node => {
      if (!node.draw) return;

      if (!!~this.castMeshes.indexOf(node)) {
        node.program = node.depthProgram;
      } else {
        node.isForceVisibility = node.visible;
        node.visible = false;
      }
    }); // Render the depth shadow map using the light as the camera

    this.gl.renderer.render({
      scene,
      camera: this.light,
      target: this.target
    }); // Then switch the program back to the normal one

    scene.traverse(node => {
      if (!node.draw) return;

      if (!!~this.castMeshes.indexOf(node)) {
        node.program = node.colorProgram;
      } else {
        node.visible = node.isForceVisibility;
      }
    });
  }

}
const defaultVertex =
/* glsl */
`
    attribute vec3 position;
    attribute vec2 uv;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const defaultFragment =
/* glsl */
`
    precision highp float;

    vec4 packRGBA (float v) {
        vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
        pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
        return pack;
    }

    void main() {
        gl_FragColor = packRGBA(gl_FragCoord.z);
    }
`;

/***/ }),

/***/ "./node_modules/ogl/src/extras/Skin.js":
/*!*********************************************!*\
  !*** ./node_modules/ogl/src/extras/Skin.js ***!
  \*********************************************/
/*! exports provided: Skin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return Skin; });
/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var _core_Transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Animation.js */ "./node_modules/ogl/src/extras/Animation.js");





const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"]();
class Skin extends _core_Mesh_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"] {
  constructor(gl, {
    rig,
    geometry,
    program,
    mode = gl.TRIANGLES
  } = {}) {
    super(gl, {
      geometry,
      program,
      mode
    });
    this.createBones(rig);
    this.createBoneTexture();
    this.animations = [];
    Object.assign(this.program.uniforms, {
      boneTexture: {
        value: this.boneTexture
      },
      boneTextureSize: {
        value: this.boneTextureSize
      }
    });
  }

  createBones(rig) {
    // Create root so that can simply update world matrix of whole skeleton
    this.root = new _core_Transform_js__WEBPACK_IMPORTED_MODULE_1__["Transform"](); // Create bones

    this.bones = [];
    if (!rig.bones || !rig.bones.length) return;

    for (let i = 0; i < rig.bones.length; i++) {
      const bone = new _core_Transform_js__WEBPACK_IMPORTED_MODULE_1__["Transform"](); // Set initial values (bind pose)

      bone.position.fromArray(rig.bindPose.position, i * 3);
      bone.quaternion.fromArray(rig.bindPose.quaternion, i * 4);
      bone.scale.fromArray(rig.bindPose.scale, i * 3);
      this.bones.push(bone);
    } // Once created, set the hierarchy


    rig.bones.forEach((data, i) => {
      this.bones[i].name = data.name;
      if (data.parent === -1) return this.bones[i].setParent(this.root);
      this.bones[i].setParent(this.bones[data.parent]);
    }); // Then update to calculate world matrices

    this.root.updateMatrixWorld(true); // Store inverse of bind pose to calculate differences

    this.bones.forEach(bone => {
      bone.bindInverse = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__["Mat4"](...bone.worldMatrix).inverse();
    });
  }

  createBoneTexture() {
    if (!this.bones.length) return;
    const size = Math.max(4, Math.pow(2, Math.ceil(Math.log(Math.sqrt(this.bones.length * 4)) / Math.LN2)));
    this.boneMatrices = new Float32Array(size * size * 4);
    this.boneTextureSize = size;
    this.boneTexture = new _core_Texture_js__WEBPACK_IMPORTED_MODULE_3__["Texture"](this.gl, {
      image: this.boneMatrices,
      generateMipmaps: false,
      type: this.gl.FLOAT,
      internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA32F : this.gl.RGBA,
      flipY: false,
      width: size
    });
  }

  addAnimation(data) {
    const animation = new _Animation_js__WEBPACK_IMPORTED_MODULE_4__["Animation"]({
      objects: this.bones,
      data
    });
    this.animations.push(animation);
    return animation;
  }

  update() {
    // Calculate combined animation weight
    let total = 0;
    this.animations.forEach(animation => total += animation.weight);
    this.animations.forEach((animation, i) => {
      // force first animation to set in order to reset frame
      animation.update(total, i === 0);
    });
  }

  draw({
    camera
  } = {}) {
    // Update world matrices manually, as not part of scene graph
    this.root.updateMatrixWorld(true); // Update bone texture

    this.bones.forEach((bone, i) => {
      // Find difference between current and bind pose
      tempMat4.multiply(bone.worldMatrix, bone.bindInverse);
      this.boneMatrices.set(tempMat4, i * 16);
    });
    if (this.boneTexture) this.boneTexture.needsUpdate = true;
    super.draw({
      camera
    });
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Sphere.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/extras/Sphere.js ***!
  \***********************************************/
/*! exports provided: Sphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return Sphere; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");


class Sphere extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    radius = 0.5,
    widthSegments = 16,
    heightSegments = Math.ceil(widthSegments * 0.5),
    phiStart = 0,
    phiLength = Math.PI * 2,
    thetaStart = 0,
    thetaLength = Math.PI,
    attributes = {}
  } = {}) {
    const wSegs = widthSegments;
    const hSegs = heightSegments;
    const pStart = phiStart;
    const pLength = phiLength;
    const tStart = thetaStart;
    const tLength = thetaLength;
    const num = (wSegs + 1) * (hSegs + 1);
    const numIndices = wSegs * hSegs * 6;
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    let i = 0;
    let iv = 0;
    let ii = 0;
    let te = tStart + tLength;
    const grid = [];
    let n = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();

    for (let iy = 0; iy <= hSegs; iy++) {
      let vRow = [];
      let v = iy / hSegs;

      for (let ix = 0; ix <= wSegs; ix++, i++) {
        let u = ix / wSegs;
        let x = -radius * Math.cos(pStart + u * pLength) * Math.sin(tStart + v * tLength);
        let y = radius * Math.cos(tStart + v * tLength);
        let z = radius * Math.sin(pStart + u * pLength) * Math.sin(tStart + v * tLength);
        position[i * 3] = x;
        position[i * 3 + 1] = y;
        position[i * 3 + 2] = z;
        n.set(x, y, z).normalize();
        normal[i * 3] = n.x;
        normal[i * 3 + 1] = n.y;
        normal[i * 3 + 2] = n.z;
        uv[i * 2] = u;
        uv[i * 2 + 1] = 1 - v;
        vRow.push(iv++);
      }

      grid.push(vRow);
    }

    for (let iy = 0; iy < hSegs; iy++) {
      for (let ix = 0; ix < wSegs; ix++) {
        let a = grid[iy][ix + 1];
        let b = grid[iy][ix];
        let c = grid[iy + 1][ix];
        let d = grid[iy + 1][ix + 1];

        if (iy !== 0 || tStart > 0) {
          index[ii * 3] = a;
          index[ii * 3 + 1] = b;
          index[ii * 3 + 2] = d;
          ii++;
        }

        if (iy !== hSegs - 1 || te < Math.PI) {
          index[ii * 3] = b;
          index[ii * 3 + 1] = c;
          index[ii * 3 + 2] = d;
          ii++;
        }
      }
    }

    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    super(gl, attributes);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Text.js":
/*!*********************************************!*\
  !*** ./node_modules/ogl/src/extras/Text.js ***!
  \*********************************************/
/*! exports provided: Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
function Text({
  font,
  text,
  width = Infinity,
  align = 'left',
  size = 1,
  letterSpacing = 0,
  lineHeight = 1.4,
  wordSpacing = 0,
  wordBreak = false
}) {
  const _this = this;

  let glyphs, buffers;
  let fontHeight, baseline, scale;
  const newline = /\n/;
  const whitespace = /\s/;
  {
    parseFont();
    createGeometry();
  }

  function parseFont() {
    glyphs = {};
    font.chars.forEach(d => glyphs[d.char] = d);
  }

  function createGeometry() {
    fontHeight = font.common.lineHeight;
    baseline = font.common.base; // Use baseline so that actual text height is as close to 'size' value as possible

    scale = size / baseline; // Strip spaces and newlines to get actual character length for buffers

    let chars = text.replace(/[ \n]/g, '');
    let numChars = chars.length; // Create output buffers

    buffers = {
      position: new Float32Array(numChars * 4 * 3),
      uv: new Float32Array(numChars * 4 * 2),
      id: new Float32Array(numChars * 4),
      index: new Uint16Array(numChars * 6)
    }; // Set values for buffers that don't require calculation

    for (let i = 0; i < numChars; i++) {
      buffers.id[i] = i;
      buffers.index.set([i * 4, i * 4 + 2, i * 4 + 1, i * 4 + 1, i * 4 + 2, i * 4 + 3], i * 6);
    }

    layout();
  }

  function layout() {
    const lines = [];
    let cursor = 0;
    let wordCursor = 0;
    let wordWidth = 0;
    let line = newLine();

    function newLine() {
      const line = {
        width: 0,
        glyphs: []
      };
      lines.push(line);
      wordCursor = cursor;
      wordWidth = 0;
      return line;
    }

    let maxTimes = 100;
    let count = 0;

    while (cursor < text.length && count < maxTimes) {
      count++;
      const char = text[cursor]; // Skip whitespace at start of line

      if (!line.width && whitespace.test(char)) {
        cursor++;
        wordCursor = cursor;
        wordWidth = 0;
        continue;
      } // If newline char, skip to next line


      if (newline.test(char)) {
        cursor++;
        line = newLine();
        continue;
      }

      const glyph = glyphs[char] || glyphs[' ']; // Find any applicable kern pairs

      if (line.glyphs.length) {
        const prevGlyph = line.glyphs[line.glyphs.length - 1][0];
        let kern = getKernPairOffset(glyph.id, prevGlyph.id) * scale;
        line.width += kern;
        wordWidth += kern;
      } // add char to line


      line.glyphs.push([glyph, line.width]); // calculate advance for next glyph

      let advance = 0; // If whitespace, update location of current word for line breaks

      if (whitespace.test(char)) {
        wordCursor = cursor;
        wordWidth = 0; // Add wordspacing

        advance += wordSpacing * size;
      } else {
        // Add letterspacing
        advance += letterSpacing * size;
      }

      advance += glyph.xadvance * scale;
      line.width += advance;
      wordWidth += advance; // If width defined

      if (line.width > width) {
        // If can break words, undo latest glyph if line not empty and create new line
        if (wordBreak && line.glyphs.length > 1) {
          line.width -= advance;
          line.glyphs.pop();
          line = newLine();
          continue; // If not first word, undo current word and cursor and create new line
        } else if (!wordBreak && wordWidth !== line.width) {
          let numGlyphs = cursor - wordCursor + 1;
          line.glyphs.splice(-numGlyphs, numGlyphs);
          cursor = wordCursor;
          line.width -= wordWidth;
          line = newLine();
          continue;
        }
      }

      cursor++;
    } // Remove last line if empty


    if (!line.width) lines.pop();
    populateBuffers(lines);
  }

  function populateBuffers(lines) {
    const texW = font.common.scaleW;
    const texH = font.common.scaleH; // For all fonts tested, a little offset was needed to be right on the baseline, hence 0.07.

    let y = 0.07 * size;
    let j = 0;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = lines[lineIndex];

      for (let i = 0; i < line.glyphs.length; i++) {
        const glyph = line.glyphs[i][0];
        let x = line.glyphs[i][1];

        if (align === 'center') {
          x -= line.width * 0.5;
        } else if (align === 'right') {
          x -= line.width;
        } // If space, don't add to geometry


        if (whitespace.test(glyph.char)) continue; // Apply char sprite offsets

        x += glyph.xoffset * scale;
        y -= glyph.yoffset * scale; // each letter is a quad. axis bottom left

        let w = glyph.width * scale;
        let h = glyph.height * scale;
        buffers.position.set([x, y - h, 0, x, y, 0, x + w, y - h, 0, x + w, y, 0], j * 4 * 3);
        let u = glyph.x / texW;
        let uw = glyph.width / texW;
        let v = 1.0 - glyph.y / texH;
        let vh = glyph.height / texH;
        buffers.uv.set([u, v - vh, u, v, u + uw, v - vh, u + uw, v], j * 4 * 2); // Reset cursor to baseline

        y += glyph.yoffset * scale;
        j++;
      }

      y -= size * lineHeight;
    }

    _this.buffers = buffers;
    _this.numLines = lines.length;
    _this.height = _this.numLines * size * lineHeight;
  }

  function getKernPairOffset(id1, id2) {
    for (let i = 0; i < font.kernings.length; i++) {
      let k = font.kernings[i];
      if (k.first < id1) continue;
      if (k.second < id2) continue;
      if (k.first > id1) return 0;
      if (k.first === id1 && k.second > id2) return 0;
      return k.amount;
    }

    return 0;
  } // Update buffers to layout with new layout


  this.resize = function (options) {
    ({
      width
    } = options);
    layout();
  }; // Completely change text (like creating new Text)


  this.update = function (options) {
    ({
      text
    } = options);
    createGeometry();
  };
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/TextureLoader.js":
/*!******************************************************!*\
  !*** ./node_modules/ogl/src/extras/TextureLoader.js ***!
  \******************************************************/
/*! exports provided: TextureLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return TextureLoader; });
/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
/* harmony import */ var _KTXTexture_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KTXTexture.js */ "./node_modules/ogl/src/extras/KTXTexture.js");

 // For compressed textures, generate using https://github.com/TimvanScherpenzeel/texture-compressor

let cache = {};
const supportedExtensions = [];
class TextureLoader {
  static load(gl, {
    src,
    // string or object of extension:src key-values
    // {
    //     pvrtc: '...ktx',
    //     s3tc: '...ktx',
    //     etc: '...ktx',
    //     etc1: '...ktx',
    //     astc: '...ktx',
    //     webp: '...webp',
    //     jpg: '...jpg',
    //     png: '...png',
    // }
    // Only props relevant to KTXTexture
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    anisotropy = 0,
    // For regular images
    format = gl.RGBA,
    internalFormat = format,
    generateMipmaps = true,
    minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
    magFilter = gl.LINEAR,
    premultiplyAlpha = false,
    unpackAlignment = 4,
    flipY = true
  } = {}) {
    const support = this.getSupportedExtensions(gl);
    let ext = 'none'; // If src is string, determine which format from the extension

    if (typeof src === 'string') {
      ext = src.split('.').pop().split('?')[0].toLowerCase();
    } // If src is object, use supported extensions and provided list to choose best option
    // Get first supported match, so put in order of preference


    if (typeof src === 'object') {
      for (const prop in src) {
        if (support.includes(prop.toLowerCase())) {
          ext = prop.toLowerCase();
          src = src[prop];
          break;
        }
      }
    } // Stringify props


    const cacheID = src + wrapS + wrapT + anisotropy + format + internalFormat + generateMipmaps + minFilter + magFilter + premultiplyAlpha + unpackAlignment + flipY + gl.renderer.id; // Check cache for existing texture

    if (cache[cacheID]) return cache[cacheID];
    let texture;

    switch (ext) {
      case 'ktx':
      case 'pvrtc':
      case 's3tc':
      case 'etc':
      case 'etc1':
      case 'astc':
        // Load compressed texture using KTX format
        texture = new _KTXTexture_js__WEBPACK_IMPORTED_MODULE_1__["KTXTexture"](gl, {
          src,
          wrapS,
          wrapT,
          anisotropy,
          minFilter,
          magFilter
        });
        texture.loaded = this.loadKTX(src, texture);
        break;

      case 'webp':
      case 'jpg':
      case 'jpeg':
      case 'png':
        texture = new _core_Texture_js__WEBPACK_IMPORTED_MODULE_0__["Texture"](gl, {
          wrapS,
          wrapT,
          anisotropy,
          format,
          internalFormat,
          generateMipmaps,
          minFilter,
          magFilter,
          premultiplyAlpha,
          unpackAlignment,
          flipY
        });
        texture.loaded = this.loadImage(gl, src, texture);
        break;

      default:
        console.warn('No supported format supplied');
        texture = new _core_Texture_js__WEBPACK_IMPORTED_MODULE_0__["Texture"](gl);
    }

    texture.ext = ext;
    cache[cacheID] = texture;
    return texture;
  }

  static getSupportedExtensions(gl) {
    if (supportedExtensions.length) return supportedExtensions;
    const extensions = {
      pvrtc: gl.renderer.getExtension('WEBGL_compressed_texture_pvrtc') || gl.renderer.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc'),
      s3tc: gl.renderer.getExtension('WEBGL_compressed_texture_s3tc') || gl.renderer.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.renderer.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc'),
      etc: gl.renderer.getExtension('WEBGL_compressed_texture_etc'),
      etc1: gl.renderer.getExtension('WEBGL_compressed_texture_etc1'),
      astc: gl.renderer.getExtension('WEBGL_compressed_texture_astc')
    };

    for (const ext in extensions) if (extensions[ext]) supportedExtensions.push(ext); // Check for WebP support


    if (detectWebP) supportedExtensions.push('webp'); // Formats supported by all

    supportedExtensions.push('png', 'jpg');
    return supportedExtensions;
  }

  static loadKTX(src, texture) {
    return fetch(src).then(res => res.arrayBuffer()).then(buffer => texture.parseBuffer(buffer));
  }

  static loadImage(gl, src, texture) {
    return decodeImage(src).then(imgBmp => {
      // Catch non POT textures and update params to avoid errors
      if (!powerOfTwo(imgBmp.width) || !powerOfTwo(imgBmp.height)) {
        if (texture.generateMipmaps) texture.generateMipmaps = false;
        if (texture.minFilter === gl.NEAREST_MIPMAP_LINEAR) texture.minFilter = gl.LINEAR;
        if (texture.wrapS === gl.REPEAT) texture.wrapS = texture.wrapT = gl.CLAMP_TO_EDGE;
      }

      texture.image = imgBmp; // For createImageBitmap, close once uploaded

      texture.onUpdate = () => {
        if (imgBmp.close) imgBmp.close();
        texture.onUpdate = null;
      };

      return imgBmp;
    });
  }

  static clearCache() {
    cache = {};
  }

}

function detectWebP() {
  return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

function powerOfTwo(value) {
  return Math.log2(value) % 1 === 0;
}

function decodeImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = '';
    img.src = src; // Only chrome's implementation of createImageBitmap is fully supported

    const isChrome = navigator.userAgent.toLowerCase().includes('chrome');

    if (!!window.createImageBitmap && isChrome) {
      img.onload = () => {
        createImageBitmap(img, {
          imageOrientation: 'flipY',
          premultiplyAlpha: 'none'
        }).then(imgBmp => {
          resolve(imgBmp);
        });
      };
    } else {
      img.onload = () => resolve(img);
    }
  });
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Torus.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Torus.js ***!
  \**********************************************/
/*! exports provided: Torus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Torus", function() { return Torus; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
// https://github.com/mrdoob/three.js/blob/master/src/geometries/TorusGeometry.js


class Torus extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    radius = 0.5,
    tube = 0.2,
    radialSegments = 8,
    tubularSegments = 6,
    arc = Math.PI * 2,
    attributes = {}
  } = {}) {
    const num = (radialSegments + 1) * (tubularSegments + 1);
    const numIndices = radialSegments * tubularSegments * 6;
    const vertices = new Float32Array(num * 3);
    const normals = new Float32Array(num * 3);
    const uvs = new Float32Array(num * 2);
    const indices = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    const center = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
    const vertex = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
    const normal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__["Vec3"](); // generate vertices, normals and uvs

    let idx = 0;

    for (let j = 0; j <= radialSegments; j++) {
      for (let i = 0; i <= tubularSegments; i++, idx++) {
        const u = i / tubularSegments * arc;
        const v = j / radialSegments * Math.PI * 2; // vertex

        vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
        vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
        vertex.z = tube * Math.sin(v);
        vertices.set([vertex.x, vertex.y, vertex.z], idx * 3); // normal

        center.x = radius * Math.cos(u);
        center.y = radius * Math.sin(u);
        normal.sub(vertex, center).normalize();
        normals.set([normal.x, normal.y, normal.z], idx * 3); // uv

        uvs.set([i / tubularSegments, j / radialSegments], idx * 2);
      }
    } // generate indices


    idx = 0;

    for (let j = 1; j <= radialSegments; j++) {
      for (let i = 1; i <= tubularSegments; i++, idx++) {
        // indices
        const a = (tubularSegments + 1) * j + i - 1;
        const b = (tubularSegments + 1) * (j - 1) + i - 1;
        const c = (tubularSegments + 1) * (j - 1) + i;
        const d = (tubularSegments + 1) * j + i; // faces

        indices.set([a, b, d, b, c, d], idx * 6);
      }
    }

    Object.assign(attributes, {
      position: {
        size: 3,
        data: vertices
      },
      normal: {
        size: 3,
        data: normals
      },
      uv: {
        size: 2,
        data: uvs
      },
      index: {
        data: indices
      }
    });
    super(gl, attributes);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Triangle.js":
/*!*************************************************!*\
  !*** ./node_modules/ogl/src/extras/Triangle.js ***!
  \*************************************************/
/*! exports provided: Triangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return Triangle; });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");

class Triangle extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
  constructor(gl, {
    attributes = {}
  } = {}) {
    Object.assign(attributes, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });
    super(gl, attributes);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/index.mjs":
/*!****************************************!*\
  !*** ./node_modules/ogl/src/index.mjs ***!
  \****************************************/
/*! exports provided: Geometry, Program, Renderer, Camera, Transform, Mesh, Texture, RenderTarget, Color, Euler, Mat3, Mat4, Quat, Vec2, Vec3, Vec4, Plane, Box, Sphere, Cylinder, Triangle, Torus, Orbit, Raycast, Curve, Post, Skin, Animation, Text, NormalProgram, Flowmap, GPGPU, Polyline, Shadow, KTXTexture, TextureLoader, GLTFLoader, GLTFSkin */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["Geometry"]; });

/* harmony import */ var _core_Program_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Program.js */ "./node_modules/ogl/src/core/Program.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _core_Program_js__WEBPACK_IMPORTED_MODULE_1__["Program"]; });

/* harmony import */ var _core_Renderer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Renderer.js */ "./node_modules/ogl/src/core/Renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _core_Renderer_js__WEBPACK_IMPORTED_MODULE_2__["Renderer"]; });

/* harmony import */ var _core_Camera_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/Camera.js */ "./node_modules/ogl/src/core/Camera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _core_Camera_js__WEBPACK_IMPORTED_MODULE_3__["Camera"]; });

/* harmony import */ var _core_Transform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return _core_Transform_js__WEBPACK_IMPORTED_MODULE_4__["Transform"]; });

/* harmony import */ var _core_Mesh_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/Mesh.js */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _core_Mesh_js__WEBPACK_IMPORTED_MODULE_5__["Mesh"]; });

/* harmony import */ var _core_Texture_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/Texture.js */ "./node_modules/ogl/src/core/Texture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return _core_Texture_js__WEBPACK_IMPORTED_MODULE_6__["Texture"]; });

/* harmony import */ var _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/RenderTarget.js */ "./node_modules/ogl/src/core/RenderTarget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderTarget", function() { return _core_RenderTarget_js__WEBPACK_IMPORTED_MODULE_7__["RenderTarget"]; });

/* harmony import */ var _math_Color_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/Color.js */ "./node_modules/ogl/src/math/Color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _math_Color_js__WEBPACK_IMPORTED_MODULE_8__["Color"]; });

/* harmony import */ var _math_Euler_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./math/Euler.js */ "./node_modules/ogl/src/math/Euler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Euler", function() { return _math_Euler_js__WEBPACK_IMPORTED_MODULE_9__["Euler"]; });

/* harmony import */ var _math_Mat3_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./math/Mat3.js */ "./node_modules/ogl/src/math/Mat3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mat3", function() { return _math_Mat3_js__WEBPACK_IMPORTED_MODULE_10__["Mat3"]; });

/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mat4", function() { return _math_Mat4_js__WEBPACK_IMPORTED_MODULE_11__["Mat4"]; });

/* harmony import */ var _math_Quat_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./math/Quat.js */ "./node_modules/ogl/src/math/Quat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quat", function() { return _math_Quat_js__WEBPACK_IMPORTED_MODULE_12__["Quat"]; });

/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _math_Vec2_js__WEBPACK_IMPORTED_MODULE_13__["Vec2"]; });

/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _math_Vec3_js__WEBPACK_IMPORTED_MODULE_14__["Vec3"]; });

/* harmony import */ var _math_Vec4_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./math/Vec4.js */ "./node_modules/ogl/src/math/Vec4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return _math_Vec4_js__WEBPACK_IMPORTED_MODULE_15__["Vec4"]; });

/* harmony import */ var _extras_Plane_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./extras/Plane.js */ "./node_modules/ogl/src/extras/Plane.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return _extras_Plane_js__WEBPACK_IMPORTED_MODULE_16__["Plane"]; });

/* harmony import */ var _extras_Box_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./extras/Box.js */ "./node_modules/ogl/src/extras/Box.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _extras_Box_js__WEBPACK_IMPORTED_MODULE_17__["Box"]; });

/* harmony import */ var _extras_Sphere_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./extras/Sphere.js */ "./node_modules/ogl/src/extras/Sphere.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return _extras_Sphere_js__WEBPACK_IMPORTED_MODULE_18__["Sphere"]; });

/* harmony import */ var _extras_Cylinder_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./extras/Cylinder.js */ "./node_modules/ogl/src/extras/Cylinder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cylinder", function() { return _extras_Cylinder_js__WEBPACK_IMPORTED_MODULE_19__["Cylinder"]; });

/* harmony import */ var _extras_Triangle_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./extras/Triangle.js */ "./node_modules/ogl/src/extras/Triangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return _extras_Triangle_js__WEBPACK_IMPORTED_MODULE_20__["Triangle"]; });

/* harmony import */ var _extras_Torus_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./extras/Torus.js */ "./node_modules/ogl/src/extras/Torus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Torus", function() { return _extras_Torus_js__WEBPACK_IMPORTED_MODULE_21__["Torus"]; });

/* harmony import */ var _extras_Orbit_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./extras/Orbit.js */ "./node_modules/ogl/src/extras/Orbit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Orbit", function() { return _extras_Orbit_js__WEBPACK_IMPORTED_MODULE_22__["Orbit"]; });

/* harmony import */ var _extras_Raycast_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./extras/Raycast.js */ "./node_modules/ogl/src/extras/Raycast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Raycast", function() { return _extras_Raycast_js__WEBPACK_IMPORTED_MODULE_23__["Raycast"]; });

/* harmony import */ var _extras_Curve_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./extras/Curve.js */ "./node_modules/ogl/src/extras/Curve.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Curve", function() { return _extras_Curve_js__WEBPACK_IMPORTED_MODULE_24__["Curve"]; });

/* harmony import */ var _extras_Post_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./extras/Post.js */ "./node_modules/ogl/src/extras/Post.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return _extras_Post_js__WEBPACK_IMPORTED_MODULE_25__["Post"]; });

/* harmony import */ var _extras_Skin_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./extras/Skin.js */ "./node_modules/ogl/src/extras/Skin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return _extras_Skin_js__WEBPACK_IMPORTED_MODULE_26__["Skin"]; });

/* harmony import */ var _extras_Animation_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./extras/Animation.js */ "./node_modules/ogl/src/extras/Animation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _extras_Animation_js__WEBPACK_IMPORTED_MODULE_27__["Animation"]; });

/* harmony import */ var _extras_Text_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./extras/Text.js */ "./node_modules/ogl/src/extras/Text.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _extras_Text_js__WEBPACK_IMPORTED_MODULE_28__["Text"]; });

/* harmony import */ var _extras_NormalProgram_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./extras/NormalProgram.js */ "./node_modules/ogl/src/extras/NormalProgram.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NormalProgram", function() { return _extras_NormalProgram_js__WEBPACK_IMPORTED_MODULE_29__["NormalProgram"]; });

/* harmony import */ var _extras_Flowmap_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./extras/Flowmap.js */ "./node_modules/ogl/src/extras/Flowmap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Flowmap", function() { return _extras_Flowmap_js__WEBPACK_IMPORTED_MODULE_30__["Flowmap"]; });

/* harmony import */ var _extras_GPGPU_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./extras/GPGPU.js */ "./node_modules/ogl/src/extras/GPGPU.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GPGPU", function() { return _extras_GPGPU_js__WEBPACK_IMPORTED_MODULE_31__["GPGPU"]; });

/* harmony import */ var _extras_Polyline_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./extras/Polyline.js */ "./node_modules/ogl/src/extras/Polyline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return _extras_Polyline_js__WEBPACK_IMPORTED_MODULE_32__["Polyline"]; });

/* harmony import */ var _extras_Shadow_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./extras/Shadow.js */ "./node_modules/ogl/src/extras/Shadow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return _extras_Shadow_js__WEBPACK_IMPORTED_MODULE_33__["Shadow"]; });

/* harmony import */ var _extras_KTXTexture_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./extras/KTXTexture.js */ "./node_modules/ogl/src/extras/KTXTexture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KTXTexture", function() { return _extras_KTXTexture_js__WEBPACK_IMPORTED_MODULE_34__["KTXTexture"]; });

/* harmony import */ var _extras_TextureLoader_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./extras/TextureLoader.js */ "./node_modules/ogl/src/extras/TextureLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return _extras_TextureLoader_js__WEBPACK_IMPORTED_MODULE_35__["TextureLoader"]; });

/* harmony import */ var _extras_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./extras/GLTFLoader.js */ "./node_modules/ogl/src/extras/GLTFLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFLoader", function() { return _extras_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_36__["GLTFLoader"]; });

/* harmony import */ var _extras_GLTFSkin_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./extras/GLTFSkin.js */ "./node_modules/ogl/src/extras/GLTFSkin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFSkin", function() { return _extras_GLTFSkin_js__WEBPACK_IMPORTED_MODULE_37__["GLTFSkin"]; });

// Core









// Maths









// Extras
























/***/ }),

/***/ "./node_modules/ogl/src/math/Color.js":
/*!********************************************!*\
  !*** ./node_modules/ogl/src/math/Color.js ***!
  \********************************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony import */ var _functions_ColorFunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/ColorFunc.js */ "./node_modules/ogl/src/math/functions/ColorFunc.js");
 // Color stored as an array of RGB decimal values (between 0 > 1)
// Constructor and set method accept following formats:
// new Color() - Empty (defaults to black)
// new Color([0.2, 0.4, 1.0]) - Decimal Array (or another Color instance)
// new Color(0.7, 0.0, 0.1) - Decimal RGB values
// new Color('#ff0000') - Hex string
// new Color('#ccc') - Short-hand Hex string
// new Color(0x4f27e8) - Number
// new Color('red') - Color name string (short list in ColorFunc.js)

class Color extends Array {
  constructor(color) {
    if (Array.isArray(color)) return super(...color);
    return super(..._functions_ColorFunc_js__WEBPACK_IMPORTED_MODULE_0__["parseColor"](...arguments));
  }

  get r() {
    return this[0];
  }

  get g() {
    return this[1];
  }

  get b() {
    return this[2];
  }

  set r(v) {
    this[0] = v;
  }

  set g(v) {
    this[1] = v;
  }

  set b(v) {
    this[2] = v;
  }

  set(color) {
    if (Array.isArray(color)) return this.copy(color);
    return this.copy(_functions_ColorFunc_js__WEBPACK_IMPORTED_MODULE_0__["parseColor"](...arguments));
  }

  copy(v) {
    this[0] = v[0];
    this[1] = v[1];
    this[2] = v[2];
    return this;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Euler.js":
/*!********************************************!*\
  !*** ./node_modules/ogl/src/math/Euler.js ***!
  \********************************************/
/*! exports provided: Euler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Euler", function() { return Euler; });
/* harmony import */ var _functions_EulerFunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/EulerFunc.js */ "./node_modules/ogl/src/math/functions/EulerFunc.js");
/* harmony import */ var _Mat4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");


const tmpMat4 = new _Mat4_js__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
class Euler extends Array {
  constructor(x = 0, y = x, z = x, order = 'YXZ') {
    super(x, y, z);
    this.order = order;

    this.onChange = () => {};

    return this;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get z() {
    return this[2];
  }

  set x(v) {
    this[0] = v;
    this.onChange();
  }

  set y(v) {
    this[1] = v;
    this.onChange();
  }

  set z(v) {
    this[2] = v;
    this.onChange();
  }

  set(x, y = x, z = x) {
    if (x.length) return this.copy(x);
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this.onChange();
    return this;
  }

  copy(v) {
    this[0] = v[0];
    this[1] = v[1];
    this[2] = v[2];
    this.onChange();
    return this;
  }

  reorder(order) {
    this.order = order;
    this.onChange();
    return this;
  }

  fromRotationMatrix(m, order = this.order) {
    _functions_EulerFunc_js__WEBPACK_IMPORTED_MODULE_0__["fromRotationMatrix"](this, m, order);
    return this;
  }

  fromQuaternion(q, order = this.order) {
    tmpMat4.fromQuaternion(q);
    return this.fromRotationMatrix(tmpMat4, order);
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Mat3.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Mat3.js ***!
  \*******************************************/
/*! exports provided: Mat3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mat3", function() { return Mat3; });
/* harmony import */ var _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Mat3Func.js */ "./node_modules/ogl/src/math/functions/Mat3Func.js");

class Mat3 extends Array {
  constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
    super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }

  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    if (m00.length) return this.copy(m00);
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }

  translate(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["translate"](this, m, v);
    return this;
  }

  rotate(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["rotate"](this, m, v);
    return this;
  }

  scale(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, m, v);
    return this;
  }

  multiply(ma, mb) {
    if (mb) {
      _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, ma, mb);
    } else {
      _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, this, ma);
    }

    return this;
  }

  identity() {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["identity"](this);
    return this;
  }

  copy(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, m);
    return this;
  }

  fromMatrix4(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["fromMat4"](this, m);
    return this;
  }

  fromQuaternion(q) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["fromQuat"](this, q);
    return this;
  }

  fromBasis(vec3a, vec3b, vec3c) {
    this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
    return this;
  }

  inverse(m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["invert"](this, m);
    return this;
  }

  getNormalMatrix(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__["normalFromMat4"](this, m);
    return this;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Mat4.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Mat4.js ***!
  \*******************************************/
/*! exports provided: Mat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mat4", function() { return Mat4; });
/* harmony import */ var _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Mat4Func.js */ "./node_modules/ogl/src/math/functions/Mat4Func.js");

class Mat4 extends Array {
  constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
    super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return this;
  }

  get x() {
    return this[12];
  }

  get y() {
    return this[13];
  }

  get z() {
    return this[14];
  }

  get w() {
    return this[15];
  }

  set x(v) {
    this[12] = v;
  }

  set y(v) {
    this[13] = v;
  }

  set z(v) {
    this[14] = v;
  }

  set w(v) {
    this[15] = v;
  }

  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    if (m00.length) return this.copy(m00);
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return this;
  }

  translate(v, m = this) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["translate"](this, m, v);
    return this;
  }

  rotate(v, axis, m = this) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["rotate"](this, m, v, axis);
    return this;
  }

  scale(v, m = this) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, m, typeof v === 'number' ? [v, v, v] : v);
    return this;
  }

  multiply(ma, mb) {
    if (mb) {
      _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, ma, mb);
    } else {
      _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, this, ma);
    }

    return this;
  }

  identity() {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["identity"](this);
    return this;
  }

  copy(m) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, m);
    return this;
  }

  fromPerspective({
    fov,
    aspect,
    near,
    far
  } = {}) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["perspective"](this, fov, aspect, near, far);
    return this;
  }

  fromOrthogonal({
    left,
    right,
    bottom,
    top,
    near,
    far
  }) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["ortho"](this, left, right, bottom, top, near, far);
    return this;
  }

  fromQuaternion(q) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["fromQuat"](this, q);
    return this;
  }

  setPosition(v) {
    this.x = v[0];
    this.y = v[1];
    this.z = v[2];
    return this;
  }

  inverse(m = this) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["invert"](this, m);
    return this;
  }

  compose(q, pos, scale) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["fromRotationTranslationScale"](this, q, pos, scale);
    return this;
  }

  getRotation(q) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["getRotation"](q, this);
    return this;
  }

  getTranslation(pos) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["getTranslation"](pos, this);
    return this;
  }

  getScaling(scale) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["getScaling"](scale, this);
    return this;
  }

  getMaxScaleOnAxis() {
    return _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["getMaxScaleOnAxis"](this);
  }

  lookAt(eye, target, up) {
    _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["targetTo"](this, eye, target, up);
    return this;
  }

  determinant() {
    return _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__["determinant"](this);
  }

  fromArray(a, o = 0) {
    this[0] = a[o];
    this[1] = a[o + 1];
    this[2] = a[o + 2];
    this[3] = a[o + 3];
    this[4] = a[o + 4];
    this[5] = a[o + 5];
    this[6] = a[o + 6];
    this[7] = a[o + 7];
    this[8] = a[o + 8];
    this[9] = a[o + 9];
    this[10] = a[o + 10];
    this[11] = a[o + 11];
    this[12] = a[o + 12];
    this[13] = a[o + 13];
    this[14] = a[o + 14];
    this[15] = a[o + 15];
    return this;
  }

  toArray(a = [], o = 0) {
    a[o] = this[0];
    a[o + 1] = this[1];
    a[o + 2] = this[2];
    a[o + 3] = this[3];
    a[o + 4] = this[4];
    a[o + 5] = this[5];
    a[o + 6] = this[6];
    a[o + 7] = this[7];
    a[o + 8] = this[8];
    a[o + 9] = this[9];
    a[o + 10] = this[10];
    a[o + 11] = this[11];
    a[o + 12] = this[12];
    a[o + 13] = this[13];
    a[o + 14] = this[14];
    a[o + 15] = this[15];
    return a;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Quat.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Quat.js ***!
  \*******************************************/
/*! exports provided: Quat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quat", function() { return Quat; });
/* harmony import */ var _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/QuatFunc.js */ "./node_modules/ogl/src/math/functions/QuatFunc.js");

class Quat extends Array {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(x, y, z, w);

    this.onChange = () => {};

    return this;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get z() {
    return this[2];
  }

  get w() {
    return this[3];
  }

  set x(v) {
    this[0] = v;
    this.onChange();
  }

  set y(v) {
    this[1] = v;
    this.onChange();
  }

  set z(v) {
    this[2] = v;
    this.onChange();
  }

  set w(v) {
    this[3] = v;
    this.onChange();
  }

  identity() {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["identity"](this);
    this.onChange();
    return this;
  }

  set(x, y, z, w) {
    if (x.length) return this.copy(x);
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, x, y, z, w);
    this.onChange();
    return this;
  }

  rotateX(a) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["rotateX"](this, this, a);
    this.onChange();
    return this;
  }

  rotateY(a) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["rotateY"](this, this, a);
    this.onChange();
    return this;
  }

  rotateZ(a) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["rotateZ"](this, this, a);
    this.onChange();
    return this;
  }

  inverse(q = this) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["invert"](this, q);
    this.onChange();
    return this;
  }

  conjugate(q = this) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["conjugate"](this, q);
    this.onChange();
    return this;
  }

  copy(q) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, q);
    this.onChange();
    return this;
  }

  normalize(q = this) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["normalize"](this, q);
    this.onChange();
    return this;
  }

  multiply(qA, qB) {
    if (qB) {
      _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, qA, qB);
    } else {
      _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, this, qA);
    }

    this.onChange();
    return this;
  }

  dot(v) {
    return _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["dot"](this, v);
  }

  fromMatrix3(matrix3) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["fromMat3"](this, matrix3);
    this.onChange();
    return this;
  }

  fromEuler(euler) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["fromEuler"](this, euler, euler.order);
    return this;
  }

  fromAxisAngle(axis, a) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["setAxisAngle"](this, axis, a);
    return this;
  }

  slerp(q, t) {
    _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__["slerp"](this, this, q, t);
    return this;
  }

  fromArray(a, o = 0) {
    this[0] = a[o];
    this[1] = a[o + 1];
    this[2] = a[o + 2];
    this[3] = a[o + 3];
    return this;
  }

  toArray(a = [], o = 0) {
    a[o] = this[0];
    a[o + 1] = this[1];
    a[o + 2] = this[2];
    a[o + 3] = this[3];
    return a;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Vec2.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Vec2.js ***!
  \*******************************************/
/*! exports provided: Vec2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return Vec2; });
/* harmony import */ var _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Vec2Func.js */ "./node_modules/ogl/src/math/functions/Vec2Func.js");

class Vec2 extends Array {
  constructor(x = 0, y = x) {
    super(x, y);
    return this;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  set(x, y = x) {
    if (x.length) return this.copy(x);
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, x, y);
    return this;
  }

  copy(v) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, v);
    return this;
  }

  add(va, vb) {
    if (vb) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["add"](this, va, vb);else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["add"](this, this, va);
    return this;
  }

  sub(va, vb) {
    if (vb) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["subtract"](this, va, vb);else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["subtract"](this, this, va);
    return this;
  }

  multiply(v) {
    if (v.length) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, this, v);else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, v);
    return this;
  }

  divide(v) {
    if (v.length) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["divide"](this, this, v);else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, 1 / v);
    return this;
  }

  inverse(v = this) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["inverse"](this, v);
    return this;
  } // Can't use 'length' as Array.prototype uses it


  len() {
    return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["length"](this);
  }

  distance(v) {
    if (v) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["distance"](this, v);else return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["length"](this);
  }

  squaredLen() {
    return this.squaredDistance();
  }

  squaredDistance(v) {
    if (v) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["squaredDistance"](this, v);else return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["squaredLength"](this);
  }

  negate(v = this) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["negate"](this, v);
    return this;
  }

  cross(va, vb) {
    if (vb) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["cross"](va, vb);
    return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["cross"](this, va);
  }

  scale(v) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, v);
    return this;
  }

  normalize() {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["normalize"](this, this);
    return this;
  }

  dot(v) {
    return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["dot"](this, v);
  }

  equals(v) {
    return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["exactEquals"](this, v);
  }

  applyMatrix3(mat3) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["transformMat3"](this, this, mat3);
    return this;
  }

  applyMatrix4(mat4) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["transformMat4"](this, this, mat4);
    return this;
  }

  lerp(v, a) {
    _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__["lerp"](this, this, v, a);
  }

  clone() {
    return new Vec2(this[0], this[1]);
  }

  fromArray(a, o = 0) {
    this[0] = a[o];
    this[1] = a[o + 1];
    return this;
  }

  toArray(a = [], o = 0) {
    a[o] = this[0];
    a[o + 1] = this[1];
    return a;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Vec3.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Vec3.js ***!
  \*******************************************/
/*! exports provided: Vec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return Vec3; });
/* harmony import */ var _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Vec3Func.js */ "./node_modules/ogl/src/math/functions/Vec3Func.js");

class Vec3 extends Array {
  constructor(x = 0, y = x, z = x) {
    super(x, y, z);
    return this;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get z() {
    return this[2];
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  set z(v) {
    this[2] = v;
  }

  set(x, y = x, z = x) {
    if (x.length) return this.copy(x);
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, x, y, z);
    return this;
  }

  copy(v) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, v);
    return this;
  }

  add(va, vb) {
    if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["add"](this, va, vb);else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["add"](this, this, va);
    return this;
  }

  sub(va, vb) {
    if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["subtract"](this, va, vb);else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["subtract"](this, this, va);
    return this;
  }

  multiply(v) {
    if (v.length) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["multiply"](this, this, v);else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, v);
    return this;
  }

  divide(v) {
    if (v.length) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["divide"](this, this, v);else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, 1 / v);
    return this;
  }

  inverse(v = this) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["inverse"](this, v);
    return this;
  } // Can't use 'length' as Array.prototype uses it


  len() {
    return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["length"](this);
  }

  distance(v) {
    if (v) return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["distance"](this, v);else return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["length"](this);
  }

  squaredLen() {
    return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["squaredLength"](this);
  }

  squaredDistance(v) {
    if (v) return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["squaredDistance"](this, v);else return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["squaredLength"](this);
  }

  negate(v = this) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["negate"](this, v);
    return this;
  }

  cross(va, vb) {
    if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["cross"](this, va, vb);else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["cross"](this, this, va);
    return this;
  }

  scale(v) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"](this, this, v);
    return this;
  }

  normalize() {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["normalize"](this, this);
    return this;
  }

  dot(v) {
    return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["dot"](this, v);
  }

  equals(v) {
    return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["exactEquals"](this, v);
  }

  applyMatrix4(mat4) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["transformMat4"](this, this, mat4);
    return this;
  }

  scaleRotateMatrix4(mat4) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["scaleRotateMat4"](this, this, mat4);
    return this;
  }

  applyQuaternion(q) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["transformQuat"](this, this, q);
    return this;
  }

  angle(v) {
    return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["angle"](this, v);
  }

  lerp(v, t) {
    _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__["lerp"](this, this, v, t);
    return this;
  }

  clone() {
    return new Vec3(this[0], this[1], this[2]);
  }

  fromArray(a, o = 0) {
    this[0] = a[o];
    this[1] = a[o + 1];
    this[2] = a[o + 2];
    return this;
  }

  toArray(a = [], o = 0) {
    a[o] = this[0];
    a[o + 1] = this[1];
    a[o + 2] = this[2];
    return a;
  }

  transformDirection(mat4) {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
    this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
    this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
    return this.normalize();
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/Vec4.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Vec4.js ***!
  \*******************************************/
/*! exports provided: Vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return Vec4; });
/* harmony import */ var _functions_Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Vec4Func.js */ "./node_modules/ogl/src/math/functions/Vec4Func.js");

class Vec4 extends Array {
  constructor(x = 0, y = x, z = x, w = x) {
    super(x, y, z, w);
    return this;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get z() {
    return this[2];
  }

  get w() {
    return this[3];
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  set z(v) {
    this[2] = v;
  }

  set w(v) {
    this[3] = v;
  }

  set(x, y, z, w) {
    if (x.length) return this.copy(x);
    _functions_Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["set"](this, x, y, z, w);
    return this;
  }

  copy(v) {
    _functions_Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"](this, v);
    return this;
  }

  normalize() {
    _functions_Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["normalize"](this, this);
    return this;
  }

  fromArray(a, o = 0) {
    this[0] = a[o];
    this[1] = a[o + 1];
    this[2] = a[o + 2];
    this[3] = a[o + 3];
    return this;
  }

  toArray(a = [], o = 0) {
    a[o] = this[0];
    a[o + 1] = this[1];
    a[o + 2] = this[2];
    a[o + 3] = this[3];
    return a;
  }

}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/ColorFunc.js":
/*!**********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/ColorFunc.js ***!
  \**********************************************************/
/*! exports provided: hexToRGB, numberToRGB, parseColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRGB", function() { return hexToRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberToRGB", function() { return numberToRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseColor", function() { return parseColor; });
const NAMES = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  fuchsia: '#ff00ff',
  cyan: '#00ffff',
  yellow: '#ffff00',
  orange: '#ff8000'
};
function hexToRGB(hex) {
  if (hex.length === 4) hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!rgb) console.warn(`Unable to convert hex string ${hex} to rgb values`);
  return [parseInt(rgb[1], 16) / 255, parseInt(rgb[2], 16) / 255, parseInt(rgb[3], 16) / 255];
}
function numberToRGB(num) {
  num = parseInt(num);
  return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];
}
function parseColor(color) {
  // Empty
  if (color === undefined) return [0, 0, 0]; // Decimal

  if (arguments.length === 3) return arguments; // Number

  if (!isNaN(color)) return numberToRGB(color); // Hex

  if (color[0] === '#') return hexToRGB(color); // Names

  if (NAMES[color.toLowerCase()]) return hexToRGB(NAMES[color.toLowerCase()]);
  console.warn('Color format not recognised');
  return [0, 0, 0];
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/EulerFunc.js":
/*!**********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/EulerFunc.js ***!
  \**********************************************************/
/*! exports provided: fromRotationMatrix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationMatrix", function() { return fromRotationMatrix; });
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m, order = 'YXZ') {
  if (order === 'XYZ') {
    out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));

    if (Math.abs(m[8]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[10]);
      out[2] = Math.atan2(-m[4], m[0]);
    } else {
      out[0] = Math.atan2(m[6], m[5]);
      out[2] = 0;
    }
  } else if (order === 'YXZ') {
    out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));

    if (Math.abs(m[9]) < 0.99999) {
      out[1] = Math.atan2(m[8], m[10]);
      out[2] = Math.atan2(m[1], m[5]);
    } else {
      out[1] = Math.atan2(-m[2], m[0]);
      out[2] = 0;
    }
  } else if (order === 'ZXY') {
    out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));

    if (Math.abs(m[6]) < 0.99999) {
      out[1] = Math.atan2(-m[2], m[10]);
      out[2] = Math.atan2(-m[4], m[5]);
    } else {
      out[1] = 0;
      out[2] = Math.atan2(m[1], m[0]);
    }
  } else if (order === 'ZYX') {
    out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));

    if (Math.abs(m[2]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[10]);
      out[2] = Math.atan2(m[1], m[0]);
    } else {
      out[0] = 0;
      out[2] = Math.atan2(-m[4], m[5]);
    }
  } else if (order === 'YZX') {
    out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));

    if (Math.abs(m[1]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[5]);
      out[1] = Math.atan2(-m[2], m[0]);
    } else {
      out[0] = 0;
      out[1] = Math.atan2(m[8], m[10]);
    }
  } else if (order === 'XZY') {
    out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));

    if (Math.abs(m[4]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[5]);
      out[1] = Math.atan2(m[8], m[0]);
    } else {
      out[0] = Math.atan2(-m[9], m[10]);
      out[1] = 0;
    }
  }

  return out;
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Mat3Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Mat3Func.js ***!
  \*********************************************************/
/*! exports provided: fromMat4, fromQuat, copy, set, identity, transpose, invert, determinant, multiply, translate, rotate, scale, normalFromMat4, projection, add, subtract, multiplyScalar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalFromMat4", function() { return normalFromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projection", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
const EPSILON = 0.000001;
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat(out, q) {
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function invert(out, a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  let a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  let b01 = a22 * a11 - a12 * a21;
  let b11 = -a22 * a10 + a12 * a20;
  let b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  let det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  let a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  let a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  let a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  let b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  let b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  let b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */

function translate(out, a, v) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  let x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */

function normalFromMat4(out, a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Mat4Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Mat4Func.js ***!
  \*********************************************************/
/*! exports provided: copy, set, identity, transpose, invert, determinant, multiply, translate, scale, rotate, getTranslation, getScaling, getMaxScaleOnAxis, getRotation, fromRotationTranslationScale, fromQuat, perspective, ortho, targetTo, add, subtract, multiplyScalar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaling", function() { return getScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMaxScaleOnAxis", function() { return getMaxScaleOnAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScale", function() { return fromRotationTranslationScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspective", function() { return perspective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ortho", function() { return ortho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTo", function() { return targetTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
const EPSILON = 0.000001;
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a12 = a[6],
        a13 = a[7];
    let a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  let x = v[0],
      y = v[1],
      z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  let x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  let x = axis[0],
      y = axis[1],
      z = axis[2];
  let len = Math.hypot(x, y, z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getMaxScaleOnAxis(mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  const x = m11 * m11 + m12 * m12 + m13 * m13;
  const y = m21 * m21 + m22 * m22 + m23 * m23;
  const z = m31 * m31 + m32 * m32 + m33 * m33;
  return Math.sqrt(Math.max(x, y, z));
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

const getRotation = function () {
  const temp = [0, 0, 0];
  return function (out, mat) {
    let scaling = temp;
    getScaling(scaling, mat);
    let is1 = 1 / scaling[0];
    let is2 = 1 / scaling[1];
    let is3 = 1 / scaling[2];
    let sm11 = mat[0] * is1;
    let sm12 = mat[1] * is2;
    let sm13 = mat[2] * is3;
    let sm21 = mat[4] * is1;
    let sm22 = mat[5] * is2;
    let sm23 = mat[6] * is3;
    let sm31 = mat[8] * is1;
    let sm32 = mat[9] * is2;
    let sm33 = mat[10] * is3;
    let trace = sm11 + sm22 + sm33;
    let S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  };
}();
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2);
  let nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  let lr = 1 / (left - right);
  let bt = 1 / (bottom - top);
  let nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  let eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  let z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  let len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len === 0) {
    // eye and target are in the same position
    z2 = 1;
  } else {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len === 0) {
    // up and z are parallel
    if (upz) {
      upx += 1e-6;
    } else if (upy) {
      upz += 1e-6;
    } else {
      upy += 1e-6;
    }

    x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
  }

  len = 1 / Math.sqrt(len);
  x0 *= len;
  x1 *= len;
  x2 *= len;
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/QuatFunc.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/QuatFunc.js ***!
  \*********************************************************/
/*! exports provided: identity, setAxisAngle, multiply, rotateX, rotateY, rotateZ, slerp, invert, conjugate, fromMat3, fromEuler, copy, set, add, scale, dot, lerp, length, normalize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxisAngle", function() { return setAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat3", function() { return fromMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEuler", function() { return fromEuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony import */ var _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec4Func.js */ "./node_modules/ogl/src/math/functions/Vec4Func.js");

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  let bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  let by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  let bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  let omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  let a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  let invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    let i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    let j = (i + 1) % 3;
    let k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, euler, order = 'YXZ') {
  let sx = Math.sin(euler[0] * 0.5);
  let cx = Math.cos(euler[0] * 0.5);
  let sy = Math.sin(euler[1] * 0.5);
  let cy = Math.cos(euler[1] * 0.5);
  let sz = Math.sin(euler[2] * 0.5);
  let cz = Math.cos(euler[2] * 0.5);

  if (order === 'XYZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'YXZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'ZXY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'ZYX') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'YZX') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'XZY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  }

  return out;
}
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */

const copy = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["copy"];
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

const set = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["set"];
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

const add = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["add"];
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

const scale = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["scale"];
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

const dot = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["dot"];
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */

const lerp = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["lerp"];
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

const length = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["length"];
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

const normalize = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__["normalize"];

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec2Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec2Func.js ***!
  \*********************************************************/
/*! exports provided: copy, set, add, subtract, multiply, divide, scale, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, transformMat2, transformMat2d, transformMat3, transformMat4, exactEquals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2", function() { return transformMat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2d", function() { return transformMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
const EPSILON = 0.000001;
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */

function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  let x = a[0];
  let y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec3Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec3Func.js ***!
  \*********************************************************/
/*! exports provided: length, copy, set, add, subtract, multiply, divide, scale, distance, squaredDistance, squaredLength, negate, inverse, normalize, dot, cross, lerp, transformMat4, scaleRotateMat4, transformMat3, transformQuat, angle, exactEquals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleRotateMat4", function() { return scaleRotateMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
const EPSILON = 0.000001;
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  let ax = a[0],
      ay = a[1],
      az = a[2];
  let bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  let x = a[0],
      y = a[1],
      z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */

function scaleRotateMat4(out, a, m) {
  let x = a[0],
      y = a[1],
      z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  let x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  let x = a[0],
      y = a[1],
      z = a[2];
  let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  let uvx = qy * z - qz * y;
  let uvy = qz * x - qx * z;
  let uvz = qx * y - qy * x;
  let uuvx = qy * uvz - qz * uvy;
  let uuvy = qz * uvx - qx * uvz;
  let uuvz = qx * uvy - qy * uvx;
  let w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */

const angle = function () {
  const tempA = [0, 0, 0];
  const tempB = [0, 0, 0];
  return function (a, b) {
    copy(tempA, a);
    copy(tempB, b);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    let cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  };
}();
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec4Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec4Func.js ***!
  \*********************************************************/
/*! exports provided: copy, set, add, scale, length, normalize, dot, lerp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
const EPSILON = 0.000001;
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  let len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  let aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");

/***/ }),

/***/ "./node_modules/sockjs-client/dist/sockjs.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.5.1 | http://sockjs.org | MIT license */
(function (f) {
  if (true) {
    module.exports = f();
  } else { var g; }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return require(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var transportList = require('./transport-list');

        module.exports = require('./main')(transportList); // TODO can't get rid of this until all servers do

        if ('_sockjs_onload' in global) {
          setTimeout(global._sockjs_onload, 1);
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./main": 14,
      "./transport-list": 16
    }],
    2: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          Event = require('./event');

      function CloseEvent() {
        Event.call(this);
        this.initEvent('close', false, false);
        this.wasClean = false;
        this.code = 0;
        this.reason = '';
      }

      inherits(CloseEvent, Event);
      module.exports = CloseEvent;
    }, {
      "./event": 4,
      "inherits": 57
    }],
    3: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          EventTarget = require('./eventtarget');

      function EventEmitter() {
        EventTarget.call(this);
      }

      inherits(EventEmitter, EventTarget);

      EventEmitter.prototype.removeAllListeners = function (type) {
        if (type) {
          delete this._listeners[type];
        } else {
          this._listeners = {};
        }
      };

      EventEmitter.prototype.once = function (type, listener) {
        var self = this,
            fired = false;

        function g() {
          self.removeListener(type, g);

          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }

        this.on(type, g);
      };

      EventEmitter.prototype.emit = function () {
        var type = arguments[0];
        var listeners = this._listeners[type];

        if (!listeners) {
          return;
        } // equivalent of Array.prototype.slice.call(arguments, 1);


        var l = arguments.length;
        var args = new Array(l - 1);

        for (var ai = 1; ai < l; ai++) {
          args[ai - 1] = arguments[ai];
        }

        for (var i = 0; i < listeners.length; i++) {
          listeners[i].apply(this, args);
        }
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
      EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
      module.exports.EventEmitter = EventEmitter;
    }, {
      "./eventtarget": 5,
      "inherits": 57
    }],
    4: [function (require, module, exports) {
      'use strict';

      function Event(eventType) {
        this.type = eventType;
      }

      Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
        this.type = eventType;
        this.bubbles = canBubble;
        this.cancelable = cancelable;
        this.timeStamp = +new Date();
        return this;
      };

      Event.prototype.stopPropagation = function () {};

      Event.prototype.preventDefault = function () {};

      Event.CAPTURING_PHASE = 1;
      Event.AT_TARGET = 2;
      Event.BUBBLING_PHASE = 3;
      module.exports = Event;
    }, {}],
    5: [function (require, module, exports) {
      'use strict';
      /* Simplified implementation of DOM2 EventTarget.
       *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
       */

      function EventTarget() {
        this._listeners = {};
      }

      EventTarget.prototype.addEventListener = function (eventType, listener) {
        if (!(eventType in this._listeners)) {
          this._listeners[eventType] = [];
        }

        var arr = this._listeners[eventType]; // #4

        if (arr.indexOf(listener) === -1) {
          // Make a copy so as not to interfere with a current dispatchEvent.
          arr = arr.concat([listener]);
        }

        this._listeners[eventType] = arr;
      };

      EventTarget.prototype.removeEventListener = function (eventType, listener) {
        var arr = this._listeners[eventType];

        if (!arr) {
          return;
        }

        var idx = arr.indexOf(listener);

        if (idx !== -1) {
          if (arr.length > 1) {
            // Make a copy so as not to interfere with a current dispatchEvent.
            this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
          } else {
            delete this._listeners[eventType];
          }

          return;
        }
      };

      EventTarget.prototype.dispatchEvent = function () {
        var event = arguments[0];
        var t = event.type; // equivalent of Array.prototype.slice.call(arguments, 0);

        var args = arguments.length === 1 ? [event] : Array.apply(null, arguments); // TODO: This doesn't match the real behavior; per spec, onfoo get
        // their place in line from the /first/ time they're set from
        // non-null. Although WebKit bumps it to the end every time it's
        // set.

        if (this['on' + t]) {
          this['on' + t].apply(this, args);
        }

        if (t in this._listeners) {
          // Grab a reference to the listeners list. removeEventListener may alter the list.
          var listeners = this._listeners[t];

          for (var i = 0; i < listeners.length; i++) {
            listeners[i].apply(this, args);
          }
        }
      };

      module.exports = EventTarget;
    }, {}],
    6: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          Event = require('./event');

      function TransportMessageEvent(data) {
        Event.call(this);
        this.initEvent('message', false, false);
        this.data = data;
      }

      inherits(TransportMessageEvent, Event);
      module.exports = TransportMessageEvent;
    }, {
      "./event": 4,
      "inherits": 57
    }],
    7: [function (require, module, exports) {
      'use strict';

      var JSON3 = require('json3'),
          iframeUtils = require('./utils/iframe');

      function FacadeJS(transport) {
        this._transport = transport;
        transport.on('message', this._transportMessage.bind(this));
        transport.on('close', this._transportClose.bind(this));
      }

      FacadeJS.prototype._transportClose = function (code, reason) {
        iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
      };

      FacadeJS.prototype._transportMessage = function (frame) {
        iframeUtils.postMessage('t', frame);
      };

      FacadeJS.prototype._send = function (data) {
        this._transport.send(data);
      };

      FacadeJS.prototype._close = function () {
        this._transport.close();

        this._transport.removeAllListeners();
      };

      module.exports = FacadeJS;
    }, {
      "./utils/iframe": 47,
      "json3": 58
    }],
    8: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var urlUtils = require('./utils/url'),
            eventUtils = require('./utils/event'),
            JSON3 = require('json3'),
            FacadeJS = require('./facade'),
            InfoIframeReceiver = require('./info-iframe-receiver'),
            iframeUtils = require('./utils/iframe'),
            loc = require('./location');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:iframe-bootstrap');
        }

        module.exports = function (SockJS, availableTransports) {
          var transportMap = {};
          availableTransports.forEach(function (at) {
            if (at.facadeTransport) {
              transportMap[at.facadeTransport.transportName] = at.facadeTransport;
            }
          }); // hard-coded for the info iframe
          // TODO see if we can make this more dynamic

          transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
          var parentOrigin;
          /* eslint-disable camelcase */

          SockJS.bootstrap_iframe = function () {
            /* eslint-enable camelcase */
            var facade;
            iframeUtils.currentWindowId = loc.hash.slice(1);

            var onMessage = function (e) {
              if (e.source !== parent) {
                return;
              }

              if (typeof parentOrigin === 'undefined') {
                parentOrigin = e.origin;
              }

              if (e.origin !== parentOrigin) {
                return;
              }

              var iframeMessage;

              try {
                iframeMessage = JSON3.parse(e.data);
              } catch (ignored) {
                debug('bad json', e.data);
                return;
              }

              if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
                return;
              }

              switch (iframeMessage.type) {
                case 's':
                  var p;

                  try {
                    p = JSON3.parse(iframeMessage.data);
                  } catch (ignored) {
                    debug('bad json', iframeMessage.data);
                    break;
                  }

                  var version = p[0];
                  var transport = p[1];
                  var transUrl = p[2];
                  var baseUrl = p[3];
                  debug(version, transport, transUrl, baseUrl); // change this to semver logic

                  if (version !== SockJS.version) {
                    throw new Error('Incompatible SockJS! Main site uses:' + ' "' + version + '", the iframe:' + ' "' + SockJS.version + '".');
                  }

                  if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
                    throw new Error('Can\'t connect to different domain from within an ' + 'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
                  }

                  facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
                  break;

                case 'm':
                  facade._send(iframeMessage.data);

                  break;

                case 'c':
                  if (facade) {
                    facade._close();
                  }

                  facade = null;
                  break;
              }
            };

            eventUtils.attachEvent('message', onMessage); // Start

            iframeUtils.postMessage('s');
          };
        };
      }).call(this, {
        env: {}
      });
    }, {
      "./facade": 7,
      "./info-iframe-receiver": 10,
      "./location": 13,
      "./utils/event": 46,
      "./utils/iframe": 47,
      "./utils/url": 52,
      "debug": 55,
      "json3": 58
    }],
    9: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits'),
            JSON3 = require('json3'),
            objectUtils = require('./utils/object');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:info-ajax');
        }

        function InfoAjax(url, AjaxObject) {
          EventEmitter.call(this);
          var self = this;
          var t0 = +new Date();
          this.xo = new AjaxObject('GET', url);
          this.xo.once('finish', function (status, text) {
            var info, rtt;

            if (status === 200) {
              rtt = +new Date() - t0;

              if (text) {
                try {
                  info = JSON3.parse(text);
                } catch (e) {
                  debug('bad json', text);
                }
              }

              if (!objectUtils.isObject(info)) {
                info = {};
              }
            }

            self.emit('finish', info, rtt);
            self.removeAllListeners();
          });
        }

        inherits(InfoAjax, EventEmitter);

        InfoAjax.prototype.close = function () {
          this.removeAllListeners();
          this.xo.close();
        };

        module.exports = InfoAjax;
      }).call(this, {
        env: {}
      });
    }, {
      "./utils/object": 49,
      "debug": 55,
      "events": 3,
      "inherits": 57,
      "json3": 58
    }],
    10: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          EventEmitter = require('events').EventEmitter,
          JSON3 = require('json3'),
          XHRLocalObject = require('./transport/sender/xhr-local'),
          InfoAjax = require('./info-ajax');

      function InfoReceiverIframe(transUrl) {
        var self = this;
        EventEmitter.call(this);
        this.ir = new InfoAjax(transUrl, XHRLocalObject);
        this.ir.once('finish', function (info, rtt) {
          self.ir = null;
          self.emit('message', JSON3.stringify([info, rtt]));
        });
      }

      inherits(InfoReceiverIframe, EventEmitter);
      InfoReceiverIframe.transportName = 'iframe-info-receiver';

      InfoReceiverIframe.prototype.close = function () {
        if (this.ir) {
          this.ir.close();
          this.ir = null;
        }

        this.removeAllListeners();
      };

      module.exports = InfoReceiverIframe;
    }, {
      "./info-ajax": 9,
      "./transport/sender/xhr-local": 37,
      "events": 3,
      "inherits": 57,
      "json3": 58
    }],
    11: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits'),
            JSON3 = require('json3'),
            utils = require('./utils/event'),
            IframeTransport = require('./transport/iframe'),
            InfoReceiverIframe = require('./info-iframe-receiver');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:info-iframe');
        }

        function InfoIframe(baseUrl, url) {
          var self = this;
          EventEmitter.call(this);

          var go = function () {
            var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
            ifr.once('message', function (msg) {
              if (msg) {
                var d;

                try {
                  d = JSON3.parse(msg);
                } catch (e) {
                  debug('bad json', msg);
                  self.emit('finish');
                  self.close();
                  return;
                }

                var info = d[0],
                    rtt = d[1];
                self.emit('finish', info, rtt);
              }

              self.close();
            });
            ifr.once('close', function () {
              self.emit('finish');
              self.close();
            });
          }; // TODO this seems the same as the 'needBody' from transports


          if (!global.document.body) {
            utils.attachEvent('load', go);
          } else {
            go();
          }
        }

        inherits(InfoIframe, EventEmitter);

        InfoIframe.enabled = function () {
          return IframeTransport.enabled();
        };

        InfoIframe.prototype.close = function () {
          if (this.ifr) {
            this.ifr.close();
          }

          this.removeAllListeners();
          this.ifr = null;
        };

        module.exports = InfoIframe;
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./info-iframe-receiver": 10,
      "./transport/iframe": 22,
      "./utils/event": 46,
      "debug": 55,
      "events": 3,
      "inherits": 57,
      "json3": 58
    }],
    12: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits'),
            urlUtils = require('./utils/url'),
            XDR = require('./transport/sender/xdr'),
            XHRCors = require('./transport/sender/xhr-cors'),
            XHRLocal = require('./transport/sender/xhr-local'),
            XHRFake = require('./transport/sender/xhr-fake'),
            InfoIframe = require('./info-iframe'),
            InfoAjax = require('./info-ajax');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:info-receiver');
        }

        function InfoReceiver(baseUrl, urlInfo) {
          debug(baseUrl);
          var self = this;
          EventEmitter.call(this);
          setTimeout(function () {
            self.doXhr(baseUrl, urlInfo);
          }, 0);
        }

        inherits(InfoReceiver, EventEmitter); // TODO this is currently ignoring the list of available transports and the whitelist

        InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
          // determine method of CORS support (if needed)
          if (urlInfo.sameOrigin) {
            return new InfoAjax(url, XHRLocal);
          }

          if (XHRCors.enabled) {
            return new InfoAjax(url, XHRCors);
          }

          if (XDR.enabled && urlInfo.sameScheme) {
            return new InfoAjax(url, XDR);
          }

          if (InfoIframe.enabled()) {
            return new InfoIframe(baseUrl, url);
          }

          return new InfoAjax(url, XHRFake);
        };

        InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
          var self = this,
              url = urlUtils.addPath(baseUrl, '/info');
          debug('doXhr', url);
          this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
          this.timeoutRef = setTimeout(function () {
            debug('timeout');

            self._cleanup(false);

            self.emit('finish');
          }, InfoReceiver.timeout);
          this.xo.once('finish', function (info, rtt) {
            debug('finish', info, rtt);

            self._cleanup(true);

            self.emit('finish', info, rtt);
          });
        };

        InfoReceiver.prototype._cleanup = function (wasClean) {
          debug('_cleanup');
          clearTimeout(this.timeoutRef);
          this.timeoutRef = null;

          if (!wasClean && this.xo) {
            this.xo.close();
          }

          this.xo = null;
        };

        InfoReceiver.prototype.close = function () {
          debug('close');
          this.removeAllListeners();

          this._cleanup(false);
        };

        InfoReceiver.timeout = 8000;
        module.exports = InfoReceiver;
      }).call(this, {
        env: {}
      });
    }, {
      "./info-ajax": 9,
      "./info-iframe": 11,
      "./transport/sender/xdr": 34,
      "./transport/sender/xhr-cors": 35,
      "./transport/sender/xhr-fake": 36,
      "./transport/sender/xhr-local": 37,
      "./utils/url": 52,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    13: [function (require, module, exports) {
      (function (global) {
        'use strict';

        module.exports = global.location || {
          origin: 'http://localhost:80',
          protocol: 'http:',
          host: 'localhost',
          port: 80,
          href: 'http://localhost/',
          hash: ''
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    14: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        require('./shims');

        var URL = require('url-parse'),
            inherits = require('inherits'),
            JSON3 = require('json3'),
            random = require('./utils/random'),
            escape = require('./utils/escape'),
            urlUtils = require('./utils/url'),
            eventUtils = require('./utils/event'),
            transport = require('./utils/transport'),
            objectUtils = require('./utils/object'),
            browser = require('./utils/browser'),
            log = require('./utils/log'),
            Event = require('./event/event'),
            EventTarget = require('./event/eventtarget'),
            loc = require('./location'),
            CloseEvent = require('./event/close'),
            TransportMessageEvent = require('./event/trans-message'),
            InfoReceiver = require('./info-receiver');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:main');
        }

        var transports; // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface

        function SockJS(url, protocols, options) {
          if (!(this instanceof SockJS)) {
            return new SockJS(url, protocols, options);
          }

          if (arguments.length < 1) {
            throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
          }

          EventTarget.call(this);
          this.readyState = SockJS.CONNECTING;
          this.extensions = '';
          this.protocol = ''; // non-standard extension

          options = options || {};

          if (options.protocols_whitelist) {
            log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
          }

          this._transportsWhitelist = options.transports;
          this._transportOptions = options.transportOptions || {};
          this._timeout = options.timeout || 0;
          var sessionId = options.sessionId || 8;

          if (typeof sessionId === 'function') {
            this._generateSessionId = sessionId;
          } else if (typeof sessionId === 'number') {
            this._generateSessionId = function () {
              return random.string(sessionId);
            };
          } else {
            throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
          }

          this._server = options.server || random.numberString(1000); // Step 1 of WS spec - parse and validate the url. Issue #8

          var parsedUrl = new URL(url);

          if (!parsedUrl.host || !parsedUrl.protocol) {
            throw new SyntaxError("The URL '" + url + "' is invalid");
          } else if (parsedUrl.hash) {
            throw new SyntaxError('The URL must not contain a fragment');
          } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
          }

          var secure = parsedUrl.protocol === 'https:'; // Step 2 - don't allow secure origin with an insecure protocol

          if (loc.protocol === 'https:' && !secure) {
            // exception is 127.0.0.0/8 and ::1 urls
            if (!urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
              throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
            }
          } // Step 3 - check port access - no need here
          // Step 4 - parse protocols argument


          if (!protocols) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            protocols = [protocols];
          } // Step 5 - check protocols argument


          var sortedProtocols = protocols.sort();
          sortedProtocols.forEach(function (proto, i) {
            if (!proto) {
              throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
            }

            if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
              throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
            }
          }); // Step 6 - convert origin

          var o = urlUtils.getOrigin(loc.href);
          this._origin = o ? o.toLowerCase() : null; // remove the trailing slash

          parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, '')); // store the sanitized url

          this.url = parsedUrl.href;
          debug('using url', this.url); // Step 7 - start connection in background
          // obtain server info
          // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26

          this._urlInfo = {
            nullOrigin: !browser.hasDomain(),
            sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
            sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
          };
          this._ir = new InfoReceiver(this.url, this._urlInfo);

          this._ir.once('finish', this._receiveInfo.bind(this));
        }

        inherits(SockJS, EventTarget);

        function userSetCode(code) {
          return code === 1000 || code >= 3000 && code <= 4999;
        }

        SockJS.prototype.close = function (code, reason) {
          // Step 1
          if (code && !userSetCode(code)) {
            throw new Error('InvalidAccessError: Invalid code');
          } // Step 2.4 states the max is 123 bytes, but we are just checking length


          if (reason && reason.length > 123) {
            throw new SyntaxError('reason argument has an invalid length');
          } // Step 3.1


          if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
            return;
          } // TODO look at docs to determine how to set this


          var wasClean = true;

          this._close(code || 1000, reason || 'Normal closure', wasClean);
        };

        SockJS.prototype.send = function (data) {
          // #13 - convert anything non-string to string
          // TODO this currently turns objects into [object Object]
          if (typeof data !== 'string') {
            data = '' + data;
          }

          if (this.readyState === SockJS.CONNECTING) {
            throw new Error('InvalidStateError: The connection has not been established yet');
          }

          if (this.readyState !== SockJS.OPEN) {
            return;
          }

          this._transport.send(escape.quote(data));
        };

        SockJS.version = require('./version');
        SockJS.CONNECTING = 0;
        SockJS.OPEN = 1;
        SockJS.CLOSING = 2;
        SockJS.CLOSED = 3;

        SockJS.prototype._receiveInfo = function (info, rtt) {
          debug('_receiveInfo', rtt);
          this._ir = null;

          if (!info) {
            this._close(1002, 'Cannot connect to server');

            return;
          } // establish a round-trip timeout (RTO) based on the
          // round-trip time (RTT)


          this._rto = this.countRTO(rtt); // allow server to override url used for the actual transport

          this._transUrl = info.base_url ? info.base_url : this.url;
          info = objectUtils.extend(info, this._urlInfo);
          debug('info', info); // determine list of desired and supported transports

          var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
          this._transports = enabledTransports.main;
          debug(this._transports.length + ' enabled transports');

          this._connect();
        };

        SockJS.prototype._connect = function () {
          for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
            debug('attempt', Transport.transportName);

            if (Transport.needBody) {
              if (!global.document.body || typeof global.document.readyState !== 'undefined' && global.document.readyState !== 'complete' && global.document.readyState !== 'interactive') {
                debug('waiting for body');

                this._transports.unshift(Transport);

                eventUtils.attachEvent('load', this._connect.bind(this));
                return;
              }
            } // calculate timeout based on RTO and round trips. Default to 5s


            var timeoutMs = Math.max(this._timeout, this._rto * Transport.roundTrips || 5000);
            this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
            debug('using timeout', timeoutMs);
            var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
            var options = this._transportOptions[Transport.transportName];
            debug('transport url', transportUrl);
            var transportObj = new Transport(transportUrl, this._transUrl, options);
            transportObj.on('message', this._transportMessage.bind(this));
            transportObj.once('close', this._transportClose.bind(this));
            transportObj.transportName = Transport.transportName;
            this._transport = transportObj;
            return;
          }

          this._close(2000, 'All transports failed', false);
        };

        SockJS.prototype._transportTimeout = function () {
          debug('_transportTimeout');

          if (this.readyState === SockJS.CONNECTING) {
            if (this._transport) {
              this._transport.close();
            }

            this._transportClose(2007, 'Transport timed out');
          }
        };

        SockJS.prototype._transportMessage = function (msg) {
          debug('_transportMessage', msg);
          var self = this,
              type = msg.slice(0, 1),
              content = msg.slice(1),
              payload; // first check for messages that don't need a payload

          switch (type) {
            case 'o':
              this._open();

              return;

            case 'h':
              this.dispatchEvent(new Event('heartbeat'));
              debug('heartbeat', this.transport);
              return;
          }

          if (content) {
            try {
              payload = JSON3.parse(content);
            } catch (e) {
              debug('bad json', content);
            }
          }

          if (typeof payload === 'undefined') {
            debug('empty payload', content);
            return;
          }

          switch (type) {
            case 'a':
              if (Array.isArray(payload)) {
                payload.forEach(function (p) {
                  debug('message', self.transport, p);
                  self.dispatchEvent(new TransportMessageEvent(p));
                });
              }

              break;

            case 'm':
              debug('message', this.transport, payload);
              this.dispatchEvent(new TransportMessageEvent(payload));
              break;

            case 'c':
              if (Array.isArray(payload) && payload.length === 2) {
                this._close(payload[0], payload[1], true);
              }

              break;
          }
        };

        SockJS.prototype._transportClose = function (code, reason) {
          debug('_transportClose', this.transport, code, reason);

          if (this._transport) {
            this._transport.removeAllListeners();

            this._transport = null;
            this.transport = null;
          }

          if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
            this._connect();

            return;
          }

          this._close(code, reason);
        };

        SockJS.prototype._open = function () {
          debug('_open', this._transport && this._transport.transportName, this.readyState);

          if (this.readyState === SockJS.CONNECTING) {
            if (this._transportTimeoutId) {
              clearTimeout(this._transportTimeoutId);
              this._transportTimeoutId = null;
            }

            this.readyState = SockJS.OPEN;
            this.transport = this._transport.transportName;
            this.dispatchEvent(new Event('open'));
            debug('connected', this.transport);
          } else {
            // The server might have been restarted, and lost track of our
            // connection.
            this._close(1006, 'Server lost session');
          }
        };

        SockJS.prototype._close = function (code, reason, wasClean) {
          debug('_close', this.transport, code, reason, wasClean, this.readyState);
          var forceFail = false;

          if (this._ir) {
            forceFail = true;

            this._ir.close();

            this._ir = null;
          }

          if (this._transport) {
            this._transport.close();

            this._transport = null;
            this.transport = null;
          }

          if (this.readyState === SockJS.CLOSED) {
            throw new Error('InvalidStateError: SockJS has already been closed');
          }

          this.readyState = SockJS.CLOSING;
          setTimeout(function () {
            this.readyState = SockJS.CLOSED;

            if (forceFail) {
              this.dispatchEvent(new Event('error'));
            }

            var e = new CloseEvent('close');
            e.wasClean = wasClean || false;
            e.code = code || 1000;
            e.reason = reason;
            this.dispatchEvent(e);
            this.onmessage = this.onclose = this.onerror = null;
            debug('disconnected');
          }.bind(this), 0);
        }; // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
        // and RFC 2988.


        SockJS.prototype.countRTO = function (rtt) {
          // In a local environment, when using IE8/9 and the `jsonp-polling`
          // transport the time needed to establish a connection (the time that pass
          // from the opening of the transport to the call of `_dispatchOpen`) is
          // around 200msec (the lower bound used in the article above) and this
          // causes spurious timeouts. For this reason we calculate a value slightly
          // larger than that used in the article.
          if (rtt > 100) {
            return 4 * rtt; // rto > 400msec
          }

          return 300 + rtt; // 300msec < rto <= 400msec
        };

        module.exports = function (availableTransports) {
          transports = transport(availableTransports);

          require('./iframe-bootstrap')(SockJS, availableTransports);

          return SockJS;
        };
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./event/close": 2,
      "./event/event": 4,
      "./event/eventtarget": 5,
      "./event/trans-message": 6,
      "./iframe-bootstrap": 8,
      "./info-receiver": 12,
      "./location": 13,
      "./shims": 15,
      "./utils/browser": 44,
      "./utils/escape": 45,
      "./utils/event": 46,
      "./utils/log": 48,
      "./utils/object": 49,
      "./utils/random": 50,
      "./utils/transport": 51,
      "./utils/url": 52,
      "./version": 53,
      "debug": 55,
      "inherits": 57,
      "json3": 58,
      "url-parse": 61
    }],
    15: [function (require, module, exports) {
      /* eslint-disable */

      /* jscs: disable */
      'use strict'; // pulled specific shims from https://github.com/es-shims/es5-shim

      var ArrayPrototype = Array.prototype;
      var ObjectPrototype = Object.prototype;
      var FunctionPrototype = Function.prototype;
      var StringPrototype = String.prototype;
      var array_slice = ArrayPrototype.slice;
      var _toString = ObjectPrototype.toString;

      var isFunction = function (val) {
        return ObjectPrototype.toString.call(val) === '[object Function]';
      };

      var isArray = function isArray(obj) {
        return _toString.call(obj) === '[object Array]';
      };

      var isString = function isString(obj) {
        return _toString.call(obj) === '[object String]';
      };

      var supportsDescriptors = Object.defineProperty && function () {
        try {
          Object.defineProperty({}, 'x', {});
          return true;
        } catch (e) {
          /* this is ES3 */
          return false;
        }
      }(); // Define configurable, writable and non-enumerable props
      // if they don't exist.


      var defineProperty;

      if (supportsDescriptors) {
        defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && name in object) {
            return;
          }

          Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
          });
        };
      } else {
        defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && name in object) {
            return;
          }

          object[name] = method;
        };
      }

      var defineProperties = function (object, map, forceAssign) {
        for (var name in map) {
          if (ObjectPrototype.hasOwnProperty.call(map, name)) {
            defineProperty(object, name, map[name], forceAssign);
          }
        }
      };

      var toObject = function (o) {
        if (o == null) {
          // this matches both null and undefined
          throw new TypeError("can't convert " + o + ' to object');
        }

        return Object(o);
      }; //
      // Util
      // ======
      //
      // ES5 9.4
      // http://es5.github.com/#x9.4
      // http://jsperf.com/to-integer


      function toInteger(num) {
        var n = +num;

        if (n !== n) {
          // isNaN
          n = 0;
        } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }

        return n;
      }

      function ToUint32(x) {
        return x >>> 0;
      } //
      // Function
      // ========
      //
      // ES-5 15.3.4.5
      // http://es5.github.com/#x15.3.4.5


      function Empty() {}

      defineProperties(FunctionPrototype, {
        bind: function bind(that) {
          // .length is 1
          // 1. Let Target be the this value.
          var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

          if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
          } // 3. Let A be a new (possibly empty) internal list of all of the
          //   argument values provided after thisArg (arg1, arg2 etc), in order.
          // XXX slicedArgs will stand in for "A" if used


          var args = array_slice.call(arguments, 1); // for normal call
          // 4. Let F be a new native ECMAScript object.
          // 11. Set the [[Prototype]] internal property of F to the standard
          //   built-in Function prototype object as specified in 15.3.3.1.
          // 12. Set the [[Call]] internal property of F as described in
          //   15.3.4.5.1.
          // 13. Set the [[Construct]] internal property of F as described in
          //   15.3.4.5.2.
          // 14. Set the [[HasInstance]] internal property of F as described in
          //   15.3.4.5.3.

          var binder = function () {
            if (this instanceof bound) {
              // 15.3.4.5.2 [[Construct]]
              // When the [[Construct]] internal method of a function object,
              // F that was created using the bind function is called with a
              // list of arguments ExtraArgs, the following steps are taken:
              // 1. Let target be the value of F's [[TargetFunction]]
              //   internal property.
              // 2. If target has no [[Construct]] internal method, a
              //   TypeError exception is thrown.
              // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
              //   property.
              // 4. Let args be a new list containing the same values as the
              //   list boundArgs in the same order followed by the same
              //   values as the list ExtraArgs in the same order.
              // 5. Return the result of calling the [[Construct]] internal
              //   method of target providing args as the arguments.
              var result = target.apply(this, args.concat(array_slice.call(arguments)));

              if (Object(result) === result) {
                return result;
              }

              return this;
            } else {
              // 15.3.4.5.1 [[Call]]
              // When the [[Call]] internal method of a function object, F,
              // which was created using the bind function is called with a
              // this value and a list of arguments ExtraArgs, the following
              // steps are taken:
              // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
              //   property.
              // 2. Let boundThis be the value of F's [[BoundThis]] internal
              //   property.
              // 3. Let target be the value of F's [[TargetFunction]] internal
              //   property.
              // 4. Let args be a new list containing the same values as the
              //   list boundArgs in the same order followed by the same
              //   values as the list ExtraArgs in the same order.
              // 5. Return the result of calling the [[Call]] internal method
              //   of target providing boundThis as the this value and
              //   providing args as the arguments.
              // equiv: target.call(this, ...boundArgs, ...args)
              return target.apply(that, args.concat(array_slice.call(arguments)));
            }
          }; // 15. If the [[Class]] internal property of Target is "Function", then
          //     a. Let L be the length property of Target minus the length of A.
          //     b. Set the length own property of F to either 0 or L, whichever is
          //       larger.
          // 16. Else set the length own property of F to 0.


          var boundLength = Math.max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
          //   specified in 15.3.5.1.

          var boundArgs = [];

          for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
          } // XXX Build a dynamic function with desired amount of arguments is the only
          // way to set the length property of a function.
          // In environments where Content Security Policies enabled (Chrome extensions,
          // for ex.) all use of eval or Function costructor throws an exception.
          // However in all of these environments Function.prototype.bind exists
          // and so this code will never be executed.


          var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

          if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty(); // Clean up dangling references.

            Empty.prototype = null;
          } // TODO
          // 18. Set the [[Extensible]] internal property of F to true.
          // TODO
          // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
          // 20. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
          //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
          //   false.
          // 21. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
          //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
          //   and false.
          // TODO
          // NOTE Function objects created using Function.prototype.bind do not
          // have a prototype property or the [[Code]], [[FormalParameters]], and
          // [[Scope]] internal properties.
          // XXX can't delete prototype in pure-js.
          // 22. Return F.


          return bound;
        }
      }); //
      // Array
      // =====
      //
      // ES5 15.4.3.2
      // http://es5.github.com/#x15.4.3.2
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray

      defineProperties(Array, {
        isArray: isArray
      });
      var boxedString = Object('a');
      var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

      var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;

        if (method) {
          method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') {
              properlyBoxesNonStrict = false;
            }
          });
          method.call([1], function () {
            'use strict';

            properlyBoxesStrict = typeof this === 'string';
          }, 'x');
        }

        return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
      };

      defineProperties(ArrayPrototype, {
        forEach: function forEach(fun
        /*, thisp*/
        ) {
          var object = toObject(this),
              self = splitString && isString(this) ? this.split('') : object,
              thisp = arguments[1],
              i = -1,
              length = self.length >>> 0; // If no callback function or if callback is not a callable function

          if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
          }

          while (++i < length) {
            if (i in self) {
              // Invoke the callback function with call, passing arguments:
              // context, property value, property key, thisArg object
              // context
              fun.call(thisp, self[i], i, object);
            }
          }
        }
      }, !properlyBoxesContext(ArrayPrototype.forEach)); // ES5 15.4.4.14
      // http://es5.github.com/#x15.4.4.14
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf

      var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
      defineProperties(ArrayPrototype, {
        indexOf: function indexOf(sought
        /*, fromIndex */
        ) {
          var self = splitString && isString(this) ? this.split('') : toObject(this),
              length = self.length >>> 0;

          if (!length) {
            return -1;
          }

          var i = 0;

          if (arguments.length > 1) {
            i = toInteger(arguments[1]);
          } // handle negative indices


          i = i >= 0 ? i : Math.max(0, length + i);

          for (; i < length; i++) {
            if (i in self && self[i] === sought) {
              return i;
            }
          }

          return -1;
        }
      }, hasFirefox2IndexOfBug); //
      // String
      // ======
      //
      // ES5 15.5.4.14
      // http://es5.github.com/#x15.5.4.14
      // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
      // Many browsers do not split properly with regular expressions or they
      // do not perform the split correctly under obscure conditions.
      // See http://blog.stevenlevithan.com/archives/cross-browser-split
      // I've tested in many browsers and this seems to cover the deviant ones:
      //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
      //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
      //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
      //       [undefined, "t", undefined, "e", ...]
      //    ''.split(/.?/) should be [], not [""]
      //    '.'.split(/()()/) should be ["."], not ["", "", "."]

      var string_split = StringPrototype.split;

      if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
        (function () {
          var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

          StringPrototype.split = function (separator, limit) {
            var string = this;

            if (separator === void 0 && limit === 0) {
              return [];
            } // If `separator` is not a regex, use native split


            if (_toString.call(separator) !== '[object RegExp]') {
              return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + ( // Proposed for ES6
            separator.sticky ? 'y' : ''),
                // Firefox 3+
            lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
            separator2,
                match,
                lastIndex,
                lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert

            if (!compliantExecNpcg) {
              // Doesn't need flags gy, but they don't hurt
              separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */


            limit = limit === void 0 ? -1 >>> 0 : // Math.pow(2, 32) - 1
            ToUint32(limit);

            while (match = separator.exec(string)) {
              // `separator.lastIndex` is not reliable cross-browser
              lastIndex = match.index + match[0].length;

              if (lastIndex > lastLastIndex) {
                output.push(string.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for
                // nonparticipating capturing groups

                if (!compliantExecNpcg && match.length > 1) {
                  match[0].replace(separator2, function () {
                    for (var i = 1; i < arguments.length - 2; i++) {
                      if (arguments[i] === void 0) {
                        match[i] = void 0;
                      }
                    }
                  });
                }

                if (match.length > 1 && match.index < string.length) {
                  ArrayPrototype.push.apply(output, match.slice(1));
                }

                lastLength = match[0].length;
                lastLastIndex = lastIndex;

                if (output.length >= limit) {
                  break;
                }
              }

              if (separator.lastIndex === match.index) {
                separator.lastIndex++; // Avoid an infinite loop
              }
            }

            if (lastLastIndex === string.length) {
              if (lastLength || !separator.test('')) {
                output.push('');
              }
            } else {
              output.push(string.slice(lastLastIndex));
            }

            return output.length > limit ? output.slice(0, limit) : output;
          };
        })(); // [bugfix, chrome]
        // If separator is undefined, then the result array contains just one String,
        // which is the this value (converted to a String). If limit is not undefined,
        // then the output array is truncated so that it contains no more than limit
        // elements.
        // "0".split(undefined, 0) -> []

      } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
          if (separator === void 0 && limit === 0) {
            return [];
          }

          return string_split.call(this, separator, limit);
        };
      } // ECMA-262, 3rd B.2.3
      // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
      // non-normative section suggesting uniform semantics and it should be
      // normalized across all browsers
      // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE


      var string_substr = StringPrototype.substr;
      var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
      defineProperties(StringPrototype, {
        substr: function substr(start, length) {
          return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
        }
      }, hasNegativeSubstrBug);
    }, {}],
    16: [function (require, module, exports) {
      'use strict';

      module.exports = [// streaming transports
      require('./transport/websocket'), require('./transport/xhr-streaming'), require('./transport/xdr-streaming'), require('./transport/eventsource'), require('./transport/lib/iframe-wrap')(require('./transport/eventsource')) // polling transports
      , require('./transport/htmlfile'), require('./transport/lib/iframe-wrap')(require('./transport/htmlfile')), require('./transport/xhr-polling'), require('./transport/xdr-polling'), require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling')), require('./transport/jsonp-polling')];
    }, {
      "./transport/eventsource": 20,
      "./transport/htmlfile": 21,
      "./transport/jsonp-polling": 23,
      "./transport/lib/iframe-wrap": 26,
      "./transport/websocket": 38,
      "./transport/xdr-polling": 39,
      "./transport/xdr-streaming": 40,
      "./transport/xhr-polling": 41,
      "./transport/xhr-streaming": 42
    }],
    17: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits'),
            utils = require('../../utils/event'),
            urlUtils = require('../../utils/url'),
            XHR = global.XMLHttpRequest;

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:browser:xhr');
        }

        function AbstractXHRObject(method, url, payload, opts) {
          debug(method, url);
          var self = this;
          EventEmitter.call(this);
          setTimeout(function () {
            self._start(method, url, payload, opts);
          }, 0);
        }

        inherits(AbstractXHRObject, EventEmitter);

        AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
          var self = this;

          try {
            this.xhr = new XHR();
          } catch (x) {// intentionally empty
          }

          if (!this.xhr) {
            debug('no xhr');
            this.emit('finish', 0, 'no xhr support');

            this._cleanup();

            return;
          } // several browsers cache POSTs


          url = urlUtils.addQuery(url, 't=' + +new Date()); // Explorer tends to keep connection open, even after the
          // tab gets closed: http://bugs.jquery.com/ticket/5280

          this.unloadRef = utils.unloadAdd(function () {
            debug('unload cleanup');

            self._cleanup(true);
          });

          try {
            this.xhr.open(method, url, true);

            if (this.timeout && 'timeout' in this.xhr) {
              this.xhr.timeout = this.timeout;

              this.xhr.ontimeout = function () {
                debug('xhr timeout');
                self.emit('finish', 0, '');

                self._cleanup(false);
              };
            }
          } catch (e) {
            debug('exception', e); // IE raises an exception on wrong port.

            this.emit('finish', 0, '');

            this._cleanup(false);

            return;
          }

          if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
            debug('withCredentials'); // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
            // "This never affects same-site requests."

            this.xhr.withCredentials = true;
          }

          if (opts && opts.headers) {
            for (var key in opts.headers) {
              this.xhr.setRequestHeader(key, opts.headers[key]);
            }
          }

          this.xhr.onreadystatechange = function () {
            if (self.xhr) {
              var x = self.xhr;
              var text, status;
              debug('readyState', x.readyState);

              switch (x.readyState) {
                case 3:
                  // IE doesn't like peeking into responseText or status
                  // on Microsoft.XMLHTTP and readystate=3
                  try {
                    status = x.status;
                    text = x.responseText;
                  } catch (e) {// intentionally empty
                  }

                  debug('status', status); // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450

                  if (status === 1223) {
                    status = 204;
                  } // IE does return readystate == 3 for 404 answers.


                  if (status === 200 && text && text.length > 0) {
                    debug('chunk');
                    self.emit('chunk', status, text);
                  }

                  break;

                case 4:
                  status = x.status;
                  debug('status', status); // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450

                  if (status === 1223) {
                    status = 204;
                  } // IE returns this for a bad port
                  // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx


                  if (status === 12005 || status === 12029) {
                    status = 0;
                  }

                  debug('finish', status, x.responseText);
                  self.emit('finish', status, x.responseText);

                  self._cleanup(false);

                  break;
              }
            }
          };

          try {
            self.xhr.send(payload);
          } catch (e) {
            self.emit('finish', 0, '');

            self._cleanup(false);
          }
        };

        AbstractXHRObject.prototype._cleanup = function (abort) {
          debug('cleanup');

          if (!this.xhr) {
            return;
          }

          this.removeAllListeners();
          utils.unloadDel(this.unloadRef); // IE needs this field to be a function

          this.xhr.onreadystatechange = function () {};

          if (this.xhr.ontimeout) {
            this.xhr.ontimeout = null;
          }

          if (abort) {
            try {
              this.xhr.abort();
            } catch (x) {// intentionally empty
            }
          }

          this.unloadRef = this.xhr = null;
        };

        AbstractXHRObject.prototype.close = function () {
          debug('close');

          this._cleanup(true);
        };

        AbstractXHRObject.enabled = !!XHR; // override XMLHttpRequest for IE6/7
        // obfuscate to avoid firewalls

        var axo = ['Active'].concat('Object').join('X');

        if (!AbstractXHRObject.enabled && axo in global) {
          debug('overriding xmlhttprequest');

          XHR = function () {
            try {
              return new global[axo]('Microsoft.XMLHTTP');
            } catch (e) {
              return null;
            }
          };

          AbstractXHRObject.enabled = !!new XHR();
        }

        var cors = false;

        try {
          cors = 'withCredentials' in new XHR();
        } catch (ignored) {// intentionally empty
        }

        AbstractXHRObject.supportsCORS = cors;
        module.exports = AbstractXHRObject;
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/event": 46,
      "../../utils/url": 52,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    18: [function (require, module, exports) {
      (function (global) {
        module.exports = global.EventSource;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    19: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var Driver = global.WebSocket || global.MozWebSocket;

        if (Driver) {
          module.exports = function WebSocketBrowserDriver(url) {
            return new Driver(url);
          };
        } else {
          module.exports = undefined;
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    20: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          AjaxBasedTransport = require('./lib/ajax-based'),
          EventSourceReceiver = require('./receiver/eventsource'),
          XHRCorsObject = require('./sender/xhr-cors'),
          EventSourceDriver = require('eventsource');

      function EventSourceTransport(transUrl) {
        if (!EventSourceTransport.enabled()) {
          throw new Error('Transport created when disabled');
        }

        AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
      }

      inherits(EventSourceTransport, AjaxBasedTransport);

      EventSourceTransport.enabled = function () {
        return !!EventSourceDriver;
      };

      EventSourceTransport.transportName = 'eventsource';
      EventSourceTransport.roundTrips = 2;
      module.exports = EventSourceTransport;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/eventsource": 29,
      "./sender/xhr-cors": 35,
      "eventsource": 18,
      "inherits": 57
    }],
    21: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          HtmlfileReceiver = require('./receiver/htmlfile'),
          XHRLocalObject = require('./sender/xhr-local'),
          AjaxBasedTransport = require('./lib/ajax-based');

      function HtmlFileTransport(transUrl) {
        if (!HtmlfileReceiver.enabled) {
          throw new Error('Transport created when disabled');
        }

        AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
      }

      inherits(HtmlFileTransport, AjaxBasedTransport);

      HtmlFileTransport.enabled = function (info) {
        return HtmlfileReceiver.enabled && info.sameOrigin;
      };

      HtmlFileTransport.transportName = 'htmlfile';
      HtmlFileTransport.roundTrips = 2;
      module.exports = HtmlFileTransport;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/htmlfile": 30,
      "./sender/xhr-local": 37,
      "inherits": 57
    }],
    22: [function (require, module, exports) {
      (function (process) {
        'use strict'; // Few cool transports do work only for same-origin. In order to make
        // them work cross-domain we shall use iframe, served from the
        // remote domain. New browsers have capabilities to communicate with
        // cross domain iframe using postMessage(). In IE it was implemented
        // from IE 8+, but of course, IE got some details wrong:
        //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
        //    http://stevesouders.com/misc/test-postmessage.php

        var inherits = require('inherits'),
            JSON3 = require('json3'),
            EventEmitter = require('events').EventEmitter,
            version = require('../version'),
            urlUtils = require('../utils/url'),
            iframeUtils = require('../utils/iframe'),
            eventUtils = require('../utils/event'),
            random = require('../utils/random');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:transport:iframe');
        }

        function IframeTransport(transport, transUrl, baseUrl) {
          if (!IframeTransport.enabled()) {
            throw new Error('Transport created when disabled');
          }

          EventEmitter.call(this);
          var self = this;
          this.origin = urlUtils.getOrigin(baseUrl);
          this.baseUrl = baseUrl;
          this.transUrl = transUrl;
          this.transport = transport;
          this.windowId = random.string(8);
          var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
          debug(transport, transUrl, iframeUrl);
          this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
            debug('err callback');
            self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
            self.close();
          });
          this.onmessageCallback = this._message.bind(this);
          eventUtils.attachEvent('message', this.onmessageCallback);
        }

        inherits(IframeTransport, EventEmitter);

        IframeTransport.prototype.close = function () {
          debug('close');
          this.removeAllListeners();

          if (this.iframeObj) {
            eventUtils.detachEvent('message', this.onmessageCallback);

            try {
              // When the iframe is not loaded, IE raises an exception
              // on 'contentWindow'.
              this.postMessage('c');
            } catch (x) {// intentionally empty
            }

            this.iframeObj.cleanup();
            this.iframeObj = null;
            this.onmessageCallback = this.iframeObj = null;
          }
        };

        IframeTransport.prototype._message = function (e) {
          debug('message', e.data);

          if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
            debug('not same origin', e.origin, this.origin);
            return;
          }

          var iframeMessage;

          try {
            iframeMessage = JSON3.parse(e.data);
          } catch (ignored) {
            debug('bad json', e.data);
            return;
          }

          if (iframeMessage.windowId !== this.windowId) {
            debug('mismatched window id', iframeMessage.windowId, this.windowId);
            return;
          }

          switch (iframeMessage.type) {
            case 's':
              this.iframeObj.loaded(); // window global dependency

              this.postMessage('s', JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl]));
              break;

            case 't':
              this.emit('message', iframeMessage.data);
              break;

            case 'c':
              var cdata;

              try {
                cdata = JSON3.parse(iframeMessage.data);
              } catch (ignored) {
                debug('bad json', iframeMessage.data);
                return;
              }

              this.emit('close', cdata[0], cdata[1]);
              this.close();
              break;
          }
        };

        IframeTransport.prototype.postMessage = function (type, data) {
          debug('postMessage', type, data);
          this.iframeObj.post(JSON3.stringify({
            windowId: this.windowId,
            type: type,
            data: data || ''
          }), this.origin);
        };

        IframeTransport.prototype.send = function (message) {
          debug('send', message);
          this.postMessage('m', message);
        };

        IframeTransport.enabled = function () {
          return iframeUtils.iframeEnabled;
        };

        IframeTransport.transportName = 'iframe';
        IframeTransport.roundTrips = 2;
        module.exports = IframeTransport;
      }).call(this, {
        env: {}
      });
    }, {
      "../utils/event": 46,
      "../utils/iframe": 47,
      "../utils/random": 50,
      "../utils/url": 52,
      "../version": 53,
      "debug": 55,
      "events": 3,
      "inherits": 57,
      "json3": 58
    }],
    23: [function (require, module, exports) {
      (function (global) {
        'use strict'; // The simplest and most robust transport, using the well-know cross
        // domain hack - JSONP. This transport is quite inefficient - one
        // message could use up to one http request. But at least it works almost
        // everywhere.
        // Known limitations:
        //   o you will get a spinning cursor
        //   o for Konqueror a dumb timer is needed to detect errors

        var inherits = require('inherits'),
            SenderReceiver = require('./lib/sender-receiver'),
            JsonpReceiver = require('./receiver/jsonp'),
            jsonpSender = require('./sender/jsonp');

        function JsonPTransport(transUrl) {
          if (!JsonPTransport.enabled()) {
            throw new Error('Transport created when disabled');
          }

          SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
        }

        inherits(JsonPTransport, SenderReceiver);

        JsonPTransport.enabled = function () {
          return !!global.document;
        };

        JsonPTransport.transportName = 'jsonp-polling';
        JsonPTransport.roundTrips = 1;
        JsonPTransport.needBody = true;
        module.exports = JsonPTransport;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./lib/sender-receiver": 28,
      "./receiver/jsonp": 31,
      "./sender/jsonp": 33,
      "inherits": 57
    }],
    24: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            urlUtils = require('../../utils/url'),
            SenderReceiver = require('./sender-receiver');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:ajax-based');
        }

        function createAjaxSender(AjaxObject) {
          return function (url, payload, callback) {
            debug('create ajax sender', url, payload);
            var opt = {};

            if (typeof payload === 'string') {
              opt.headers = {
                'Content-type': 'text/plain'
              };
            }

            var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
            var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
            xo.once('finish', function (status) {
              debug('finish', status);
              xo = null;

              if (status !== 200 && status !== 204) {
                return callback(new Error('http status ' + status));
              }

              callback();
            });
            return function () {
              debug('abort');
              xo.close();
              xo = null;
              var err = new Error('Aborted');
              err.code = 1000;
              callback(err);
            };
          };
        }

        function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
          SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
        }

        inherits(AjaxBasedTransport, SenderReceiver);
        module.exports = AjaxBasedTransport;
      }).call(this, {
        env: {}
      });
    }, {
      "../../utils/url": 52,
      "./sender-receiver": 28,
      "debug": 55,
      "inherits": 57
    }],
    25: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter;

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:buffered-sender');
        }

        function BufferedSender(url, sender) {
          debug(url);
          EventEmitter.call(this);
          this.sendBuffer = [];
          this.sender = sender;
          this.url = url;
        }

        inherits(BufferedSender, EventEmitter);

        BufferedSender.prototype.send = function (message) {
          debug('send', message);
          this.sendBuffer.push(message);

          if (!this.sendStop) {
            this.sendSchedule();
          }
        }; // For polling transports in a situation when in the message callback,
        // new message is being send. If the sending connection was started
        // before receiving one, it is possible to saturate the network and
        // timeout due to the lack of receiving socket. To avoid that we delay
        // sending messages by some small time, in order to let receiving
        // connection be started beforehand. This is only a halfmeasure and
        // does not fix the big problem, but it does make the tests go more
        // stable on slow networks.


        BufferedSender.prototype.sendScheduleWait = function () {
          debug('sendScheduleWait');
          var self = this;
          var tref;

          this.sendStop = function () {
            debug('sendStop');
            self.sendStop = null;
            clearTimeout(tref);
          };

          tref = setTimeout(function () {
            debug('timeout');
            self.sendStop = null;
            self.sendSchedule();
          }, 25);
        };

        BufferedSender.prototype.sendSchedule = function () {
          debug('sendSchedule', this.sendBuffer.length);
          var self = this;

          if (this.sendBuffer.length > 0) {
            var payload = '[' + this.sendBuffer.join(',') + ']';
            this.sendStop = this.sender(this.url, payload, function (err) {
              self.sendStop = null;

              if (err) {
                debug('error', err);
                self.emit('close', err.code || 1006, 'Sending error: ' + err);
                self.close();
              } else {
                self.sendScheduleWait();
              }
            });
            this.sendBuffer = [];
          }
        };

        BufferedSender.prototype._cleanup = function () {
          debug('_cleanup');
          this.removeAllListeners();
        };

        BufferedSender.prototype.close = function () {
          debug('close');

          this._cleanup();

          if (this.sendStop) {
            this.sendStop();
            this.sendStop = null;
          }
        };

        module.exports = BufferedSender;
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    26: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var inherits = require('inherits'),
            IframeTransport = require('../iframe'),
            objectUtils = require('../../utils/object');

        module.exports = function (transport) {
          function IframeWrapTransport(transUrl, baseUrl) {
            IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
          }

          inherits(IframeWrapTransport, IframeTransport);

          IframeWrapTransport.enabled = function (url, info) {
            if (!global.document) {
              return false;
            }

            var iframeInfo = objectUtils.extend({}, info);
            iframeInfo.sameOrigin = true;
            return transport.enabled(iframeInfo) && IframeTransport.enabled();
          };

          IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
          IframeWrapTransport.needBody = true;
          IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

          IframeWrapTransport.facadeTransport = transport;
          return IframeWrapTransport;
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/object": 49,
      "../iframe": 22,
      "inherits": 57
    }],
    27: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter;

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:polling');
        }

        function Polling(Receiver, receiveUrl, AjaxObject) {
          debug(receiveUrl);
          EventEmitter.call(this);
          this.Receiver = Receiver;
          this.receiveUrl = receiveUrl;
          this.AjaxObject = AjaxObject;

          this._scheduleReceiver();
        }

        inherits(Polling, EventEmitter);

        Polling.prototype._scheduleReceiver = function () {
          debug('_scheduleReceiver');
          var self = this;
          var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
          poll.on('message', function (msg) {
            debug('message', msg);
            self.emit('message', msg);
          });
          poll.once('close', function (code, reason) {
            debug('close', code, reason, self.pollIsClosing);
            self.poll = poll = null;

            if (!self.pollIsClosing) {
              if (reason === 'network') {
                self._scheduleReceiver();
              } else {
                self.emit('close', code || 1006, reason);
                self.removeAllListeners();
              }
            }
          });
        };

        Polling.prototype.abort = function () {
          debug('abort');
          this.removeAllListeners();
          this.pollIsClosing = true;

          if (this.poll) {
            this.poll.abort();
          }
        };

        module.exports = Polling;
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    28: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            urlUtils = require('../../utils/url'),
            BufferedSender = require('./buffered-sender'),
            Polling = require('./polling');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:sender-receiver');
        }

        function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
          var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
          debug(pollUrl);
          var self = this;
          BufferedSender.call(this, transUrl, senderFunc);
          this.poll = new Polling(Receiver, pollUrl, AjaxObject);
          this.poll.on('message', function (msg) {
            debug('poll message', msg);
            self.emit('message', msg);
          });
          this.poll.once('close', function (code, reason) {
            debug('poll close', code, reason);
            self.poll = null;
            self.emit('close', code, reason);
            self.close();
          });
        }

        inherits(SenderReceiver, BufferedSender);

        SenderReceiver.prototype.close = function () {
          BufferedSender.prototype.close.call(this);
          debug('close');
          this.removeAllListeners();

          if (this.poll) {
            this.poll.abort();
            this.poll = null;
          }
        };

        module.exports = SenderReceiver;
      }).call(this, {
        env: {}
      });
    }, {
      "../../utils/url": 52,
      "./buffered-sender": 25,
      "./polling": 27,
      "debug": 55,
      "inherits": 57
    }],
    29: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter,
            EventSourceDriver = require('eventsource');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:receiver:eventsource');
        }

        function EventSourceReceiver(url) {
          debug(url);
          EventEmitter.call(this);
          var self = this;
          var es = this.es = new EventSourceDriver(url);

          es.onmessage = function (e) {
            debug('message', e.data);
            self.emit('message', decodeURI(e.data));
          };

          es.onerror = function (e) {
            debug('error', es.readyState, e); // ES on reconnection has readyState = 0 or 1.
            // on network error it's CLOSED = 2

            var reason = es.readyState !== 2 ? 'network' : 'permanent';

            self._cleanup();

            self._close(reason);
          };
        }

        inherits(EventSourceReceiver, EventEmitter);

        EventSourceReceiver.prototype.abort = function () {
          debug('abort');

          this._cleanup();

          this._close('user');
        };

        EventSourceReceiver.prototype._cleanup = function () {
          debug('cleanup');
          var es = this.es;

          if (es) {
            es.onmessage = es.onerror = null;
            es.close();
            this.es = null;
          }
        };

        EventSourceReceiver.prototype._close = function (reason) {
          debug('close', reason);
          var self = this; // Safari and chrome < 15 crash if we close window before
          // waiting for ES cleanup. See:
          // https://code.google.com/p/chromium/issues/detail?id=89155

          setTimeout(function () {
            self.emit('close', null, reason);
            self.removeAllListeners();
          }, 200);
        };

        module.exports = EventSourceReceiver;
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55,
      "events": 3,
      "eventsource": 18,
      "inherits": 57
    }],
    30: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var inherits = require('inherits'),
            iframeUtils = require('../../utils/iframe'),
            urlUtils = require('../../utils/url'),
            EventEmitter = require('events').EventEmitter,
            random = require('../../utils/random');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:receiver:htmlfile');
        }

        function HtmlfileReceiver(url) {
          debug(url);
          EventEmitter.call(this);
          var self = this;
          iframeUtils.polluteGlobalNamespace();
          this.id = 'a' + random.string(6);
          url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
          debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
          var constructFunc = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;
          global[iframeUtils.WPrefix][this.id] = {
            start: function () {
              debug('start');
              self.iframeObj.loaded();
            },
            message: function (data) {
              debug('message', data);
              self.emit('message', data);
            },
            stop: function () {
              debug('stop');

              self._cleanup();

              self._close('network');
            }
          };
          this.iframeObj = constructFunc(url, function () {
            debug('callback');

            self._cleanup();

            self._close('permanent');
          });
        }

        inherits(HtmlfileReceiver, EventEmitter);

        HtmlfileReceiver.prototype.abort = function () {
          debug('abort');

          this._cleanup();

          this._close('user');
        };

        HtmlfileReceiver.prototype._cleanup = function () {
          debug('_cleanup');

          if (this.iframeObj) {
            this.iframeObj.cleanup();
            this.iframeObj = null;
          }

          delete global[iframeUtils.WPrefix][this.id];
        };

        HtmlfileReceiver.prototype._close = function (reason) {
          debug('_close', reason);
          this.emit('close', null, reason);
          this.removeAllListeners();
        };

        HtmlfileReceiver.htmlfileEnabled = false; // obfuscate to avoid firewalls

        var axo = ['Active'].concat('Object').join('X');

        if (axo in global) {
          try {
            HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
          } catch (x) {// intentionally empty
          }
        }

        HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
        module.exports = HtmlfileReceiver;
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/iframe": 47,
      "../../utils/random": 50,
      "../../utils/url": 52,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    31: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var utils = require('../../utils/iframe'),
            random = require('../../utils/random'),
            browser = require('../../utils/browser'),
            urlUtils = require('../../utils/url'),
            inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter;

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:receiver:jsonp');
        }

        function JsonpReceiver(url) {
          debug(url);
          var self = this;
          EventEmitter.call(this);
          utils.polluteGlobalNamespace();
          this.id = 'a' + random.string(6);
          var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
          global[utils.WPrefix][this.id] = this._callback.bind(this);

          this._createScript(urlWithId); // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.


          this.timeoutId = setTimeout(function () {
            debug('timeout');

            self._abort(new Error('JSONP script loaded abnormally (timeout)'));
          }, JsonpReceiver.timeout);
        }

        inherits(JsonpReceiver, EventEmitter);

        JsonpReceiver.prototype.abort = function () {
          debug('abort');

          if (global[utils.WPrefix][this.id]) {
            var err = new Error('JSONP user aborted read');
            err.code = 1000;

            this._abort(err);
          }
        };

        JsonpReceiver.timeout = 35000;
        JsonpReceiver.scriptErrorTimeout = 1000;

        JsonpReceiver.prototype._callback = function (data) {
          debug('_callback', data);

          this._cleanup();

          if (this.aborting) {
            return;
          }

          if (data) {
            debug('message', data);
            this.emit('message', data);
          }

          this.emit('close', null, 'network');
          this.removeAllListeners();
        };

        JsonpReceiver.prototype._abort = function (err) {
          debug('_abort', err);

          this._cleanup();

          this.aborting = true;
          this.emit('close', err.code, err.message);
          this.removeAllListeners();
        };

        JsonpReceiver.prototype._cleanup = function () {
          debug('_cleanup');
          clearTimeout(this.timeoutId);

          if (this.script2) {
            this.script2.parentNode.removeChild(this.script2);
            this.script2 = null;
          }

          if (this.script) {
            var script = this.script; // Unfortunately, you can't really abort script loading of
            // the script.

            script.parentNode.removeChild(script);
            script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
            this.script = null;
          }

          delete global[utils.WPrefix][this.id];
        };

        JsonpReceiver.prototype._scriptError = function () {
          debug('_scriptError');
          var self = this;

          if (this.errorTimer) {
            return;
          }

          this.errorTimer = setTimeout(function () {
            if (!self.loadedOkay) {
              self._abort(new Error('JSONP script loaded abnormally (onerror)'));
            }
          }, JsonpReceiver.scriptErrorTimeout);
        };

        JsonpReceiver.prototype._createScript = function (url) {
          debug('_createScript', url);
          var self = this;
          var script = this.script = global.document.createElement('script');
          var script2; // Opera synchronous load trick.

          script.id = 'a' + random.string(8);
          script.src = url;
          script.type = 'text/javascript';
          script.charset = 'UTF-8';
          script.onerror = this._scriptError.bind(this);

          script.onload = function () {
            debug('onload');

            self._abort(new Error('JSONP script loaded abnormally (onload)'));
          }; // IE9 fires 'error' event after onreadystatechange or before, in random order.
          // Use loadedOkay to determine if actually errored


          script.onreadystatechange = function () {
            debug('onreadystatechange', script.readyState);

            if (/loaded|closed/.test(script.readyState)) {
              if (script && script.htmlFor && script.onclick) {
                self.loadedOkay = true;

                try {
                  // In IE, actually execute the script.
                  script.onclick();
                } catch (x) {// intentionally empty
                }
              }

              if (script) {
                self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
              }
            }
          }; // IE: event/htmlFor/onclick trick.
          // One can't rely on proper order for onreadystatechange. In order to
          // make sure, set a 'htmlFor' and 'event' properties, so that
          // script code will be installed as 'onclick' handler for the
          // script object. Later, onreadystatechange, manually execute this
          // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
          // set. For reference see:
          //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
          // Also, read on that about script ordering:
          //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order


          if (typeof script.async === 'undefined' && global.document.attachEvent) {
            // According to mozilla docs, in recent browsers script.async defaults
            // to 'true', so we may use it to detect a good browser:
            // https://developer.mozilla.org/en/HTML/Element/script
            if (!browser.isOpera()) {
              // Naively assume we're in IE
              try {
                script.htmlFor = script.id;
                script.event = 'onclick';
              } catch (x) {// intentionally empty
              }

              script.async = true;
            } else {
              // Opera, second sync script hack
              script2 = this.script2 = global.document.createElement('script');
              script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
              script.async = script2.async = false;
            }
          }

          if (typeof script.async !== 'undefined') {
            script.async = true;
          }

          var head = global.document.getElementsByTagName('head')[0];
          head.insertBefore(script, head.firstChild);

          if (script2) {
            head.insertBefore(script2, head.firstChild);
          }
        };

        module.exports = JsonpReceiver;
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/browser": 44,
      "../../utils/iframe": 47,
      "../../utils/random": 50,
      "../../utils/url": 52,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    32: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter;

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:receiver:xhr');
        }

        function XhrReceiver(url, AjaxObject) {
          debug(url);
          EventEmitter.call(this);
          var self = this;
          this.bufferPosition = 0;
          this.xo = new AjaxObject('POST', url, null);
          this.xo.on('chunk', this._chunkHandler.bind(this));
          this.xo.once('finish', function (status, text) {
            debug('finish', status, text);

            self._chunkHandler(status, text);

            self.xo = null;
            var reason = status === 200 ? 'network' : 'permanent';
            debug('close', reason);
            self.emit('close', null, reason);

            self._cleanup();
          });
        }

        inherits(XhrReceiver, EventEmitter);

        XhrReceiver.prototype._chunkHandler = function (status, text) {
          debug('_chunkHandler', status);

          if (status !== 200 || !text) {
            return;
          }

          for (var idx = -1;; this.bufferPosition += idx + 1) {
            var buf = text.slice(this.bufferPosition);
            idx = buf.indexOf('\n');

            if (idx === -1) {
              break;
            }

            var msg = buf.slice(0, idx);

            if (msg) {
              debug('message', msg);
              this.emit('message', msg);
            }
          }
        };

        XhrReceiver.prototype._cleanup = function () {
          debug('_cleanup');
          this.removeAllListeners();
        };

        XhrReceiver.prototype.abort = function () {
          debug('abort');

          if (this.xo) {
            this.xo.close();
            debug('close');
            this.emit('close', null, 'user');
            this.xo = null;
          }

          this._cleanup();
        };

        module.exports = XhrReceiver;
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    33: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var random = require('../../utils/random'),
            urlUtils = require('../../utils/url');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:sender:jsonp');
        }

        var form, area;

        function createIframe(id) {
          debug('createIframe', id);

          try {
            // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
            return global.document.createElement('<iframe name="' + id + '">');
          } catch (x) {
            var iframe = global.document.createElement('iframe');
            iframe.name = id;
            return iframe;
          }
        }

        function createForm() {
          debug('createForm');
          form = global.document.createElement('form');
          form.style.display = 'none';
          form.style.position = 'absolute';
          form.method = 'POST';
          form.enctype = 'application/x-www-form-urlencoded';
          form.acceptCharset = 'UTF-8';
          area = global.document.createElement('textarea');
          area.name = 'd';
          form.appendChild(area);
          global.document.body.appendChild(form);
        }

        module.exports = function (url, payload, callback) {
          debug(url, payload);

          if (!form) {
            createForm();
          }

          var id = 'a' + random.string(8);
          form.target = id;
          form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
          var iframe = createIframe(id);
          iframe.id = id;
          iframe.style.display = 'none';
          form.appendChild(iframe);

          try {
            area.value = payload;
          } catch (e) {// seriously broken browsers get here
          }

          form.submit();

          var completed = function (err) {
            debug('completed', id, err);

            if (!iframe.onerror) {
              return;
            }

            iframe.onreadystatechange = iframe.onerror = iframe.onload = null; // Opera mini doesn't like if we GC iframe
            // immediately, thus this timeout.

            setTimeout(function () {
              debug('cleaning up', id);
              iframe.parentNode.removeChild(iframe);
              iframe = null;
            }, 500);
            area.value = ''; // It is not possible to detect if the iframe succeeded or
            // failed to submit our form.

            callback(err);
          };

          iframe.onerror = function () {
            debug('onerror', id);
            completed();
          };

          iframe.onload = function () {
            debug('onload', id);
            completed();
          };

          iframe.onreadystatechange = function (e) {
            debug('onreadystatechange', id, iframe.readyState, e);

            if (iframe.readyState === 'complete') {
              completed();
            }
          };

          return function () {
            debug('aborted', id);
            completed(new Error('Aborted'));
          };
        };
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/random": 50,
      "../../utils/url": 52,
      "debug": 55
    }],
    34: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits'),
            eventUtils = require('../../utils/event'),
            browser = require('../../utils/browser'),
            urlUtils = require('../../utils/url');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:sender:xdr');
        } // References:
        //   http://ajaxian.com/archives/100-line-ajax-wrapper
        //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx


        function XDRObject(method, url, payload) {
          debug(method, url);
          var self = this;
          EventEmitter.call(this);
          setTimeout(function () {
            self._start(method, url, payload);
          }, 0);
        }

        inherits(XDRObject, EventEmitter);

        XDRObject.prototype._start = function (method, url, payload) {
          debug('_start');
          var self = this;
          var xdr = new global.XDomainRequest(); // IE caches even POSTs

          url = urlUtils.addQuery(url, 't=' + +new Date());

          xdr.onerror = function () {
            debug('onerror');

            self._error();
          };

          xdr.ontimeout = function () {
            debug('ontimeout');

            self._error();
          };

          xdr.onprogress = function () {
            debug('progress', xdr.responseText);
            self.emit('chunk', 200, xdr.responseText);
          };

          xdr.onload = function () {
            debug('load');
            self.emit('finish', 200, xdr.responseText);

            self._cleanup(false);
          };

          this.xdr = xdr;
          this.unloadRef = eventUtils.unloadAdd(function () {
            self._cleanup(true);
          });

          try {
            // Fails with AccessDenied if port number is bogus
            this.xdr.open(method, url);

            if (this.timeout) {
              this.xdr.timeout = this.timeout;
            }

            this.xdr.send(payload);
          } catch (x) {
            this._error();
          }
        };

        XDRObject.prototype._error = function () {
          this.emit('finish', 0, '');

          this._cleanup(false);
        };

        XDRObject.prototype._cleanup = function (abort) {
          debug('cleanup', abort);

          if (!this.xdr) {
            return;
          }

          this.removeAllListeners();
          eventUtils.unloadDel(this.unloadRef);
          this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;

          if (abort) {
            try {
              this.xdr.abort();
            } catch (x) {// intentionally empty
            }
          }

          this.unloadRef = this.xdr = null;
        };

        XDRObject.prototype.close = function () {
          debug('close');

          this._cleanup(true);
        }; // IE 8/9 if the request target uses the same scheme - #79


        XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
        module.exports = XDRObject;
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../../utils/browser": 44,
      "../../utils/event": 46,
      "../../utils/url": 52,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    35: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          XhrDriver = require('../driver/xhr');

      function XHRCorsObject(method, url, payload, opts) {
        XhrDriver.call(this, method, url, payload, opts);
      }

      inherits(XHRCorsObject, XhrDriver);
      XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
      module.exports = XHRCorsObject;
    }, {
      "../driver/xhr": 17,
      "inherits": 57
    }],
    36: [function (require, module, exports) {
      'use strict';

      var EventEmitter = require('events').EventEmitter,
          inherits = require('inherits');

      function XHRFake()
      /* method, url, payload, opts */
      {
        var self = this;
        EventEmitter.call(this);
        this.to = setTimeout(function () {
          self.emit('finish', 200, '{}');
        }, XHRFake.timeout);
      }

      inherits(XHRFake, EventEmitter);

      XHRFake.prototype.close = function () {
        clearTimeout(this.to);
      };

      XHRFake.timeout = 2000;
      module.exports = XHRFake;
    }, {
      "events": 3,
      "inherits": 57
    }],
    37: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          XhrDriver = require('../driver/xhr');

      function XHRLocalObject(method, url, payload
      /*, opts */
      ) {
        XhrDriver.call(this, method, url, payload, {
          noCredentials: true
        });
      }

      inherits(XHRLocalObject, XhrDriver);
      XHRLocalObject.enabled = XhrDriver.enabled;
      module.exports = XHRLocalObject;
    }, {
      "../driver/xhr": 17,
      "inherits": 57
    }],
    38: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var utils = require('../utils/event'),
            urlUtils = require('../utils/url'),
            inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter,
            WebsocketDriver = require('./driver/websocket');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:websocket');
        }

        function WebSocketTransport(transUrl, ignore, options) {
          if (!WebSocketTransport.enabled()) {
            throw new Error('Transport created when disabled');
          }

          EventEmitter.call(this);
          debug('constructor', transUrl);
          var self = this;
          var url = urlUtils.addPath(transUrl, '/websocket');

          if (url.slice(0, 5) === 'https') {
            url = 'wss' + url.slice(5);
          } else {
            url = 'ws' + url.slice(4);
          }

          this.url = url;
          this.ws = new WebsocketDriver(this.url, [], options);

          this.ws.onmessage = function (e) {
            debug('message event', e.data);
            self.emit('message', e.data);
          }; // Firefox has an interesting bug. If a websocket connection is
          // created after onunload, it stays alive even when user
          // navigates away from the page. In such situation let's lie -
          // let's not open the ws connection at all. See:
          // https://github.com/sockjs/sockjs-client/issues/28
          // https://bugzilla.mozilla.org/show_bug.cgi?id=696085


          this.unloadRef = utils.unloadAdd(function () {
            debug('unload');
            self.ws.close();
          });

          this.ws.onclose = function (e) {
            debug('close event', e.code, e.reason);
            self.emit('close', e.code, e.reason);

            self._cleanup();
          };

          this.ws.onerror = function (e) {
            debug('error event', e);
            self.emit('close', 1006, 'WebSocket connection broken');

            self._cleanup();
          };
        }

        inherits(WebSocketTransport, EventEmitter);

        WebSocketTransport.prototype.send = function (data) {
          var msg = '[' + data + ']';
          debug('send', msg);
          this.ws.send(msg);
        };

        WebSocketTransport.prototype.close = function () {
          debug('close');
          var ws = this.ws;

          this._cleanup();

          if (ws) {
            ws.close();
          }
        };

        WebSocketTransport.prototype._cleanup = function () {
          debug('_cleanup');
          var ws = this.ws;

          if (ws) {
            ws.onmessage = ws.onclose = ws.onerror = null;
          }

          utils.unloadDel(this.unloadRef);
          this.unloadRef = this.ws = null;
          this.removeAllListeners();
        };

        WebSocketTransport.enabled = function () {
          debug('enabled');
          return !!WebsocketDriver;
        };

        WebSocketTransport.transportName = 'websocket'; // In theory, ws should require 1 round trip. But in chrome, this is
        // not very stable over SSL. Most likely a ws connection requires a
        // separate SSL connection, in which case 2 round trips are an
        // absolute minumum.

        WebSocketTransport.roundTrips = 2;
        module.exports = WebSocketTransport;
      }).call(this, {
        env: {}
      });
    }, {
      "../utils/event": 46,
      "../utils/url": 52,
      "./driver/websocket": 19,
      "debug": 55,
      "events": 3,
      "inherits": 57
    }],
    39: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          AjaxBasedTransport = require('./lib/ajax-based'),
          XdrStreamingTransport = require('./xdr-streaming'),
          XhrReceiver = require('./receiver/xhr'),
          XDRObject = require('./sender/xdr');

      function XdrPollingTransport(transUrl) {
        if (!XDRObject.enabled) {
          throw new Error('Transport created when disabled');
        }

        AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
      }

      inherits(XdrPollingTransport, AjaxBasedTransport);
      XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
      XdrPollingTransport.transportName = 'xdr-polling';
      XdrPollingTransport.roundTrips = 2; // preflight, ajax

      module.exports = XdrPollingTransport;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xdr": 34,
      "./xdr-streaming": 40,
      "inherits": 57
    }],
    40: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          AjaxBasedTransport = require('./lib/ajax-based'),
          XhrReceiver = require('./receiver/xhr'),
          XDRObject = require('./sender/xdr'); // According to:
      //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
      //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/


      function XdrStreamingTransport(transUrl) {
        if (!XDRObject.enabled) {
          throw new Error('Transport created when disabled');
        }

        AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
      }

      inherits(XdrStreamingTransport, AjaxBasedTransport);

      XdrStreamingTransport.enabled = function (info) {
        if (info.cookie_needed || info.nullOrigin) {
          return false;
        }

        return XDRObject.enabled && info.sameScheme;
      };

      XdrStreamingTransport.transportName = 'xdr-streaming';
      XdrStreamingTransport.roundTrips = 2; // preflight, ajax

      module.exports = XdrStreamingTransport;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xdr": 34,
      "inherits": 57
    }],
    41: [function (require, module, exports) {
      'use strict';

      var inherits = require('inherits'),
          AjaxBasedTransport = require('./lib/ajax-based'),
          XhrReceiver = require('./receiver/xhr'),
          XHRCorsObject = require('./sender/xhr-cors'),
          XHRLocalObject = require('./sender/xhr-local');

      function XhrPollingTransport(transUrl) {
        if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
          throw new Error('Transport created when disabled');
        }

        AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
      }

      inherits(XhrPollingTransport, AjaxBasedTransport);

      XhrPollingTransport.enabled = function (info) {
        if (info.nullOrigin) {
          return false;
        }

        if (XHRLocalObject.enabled && info.sameOrigin) {
          return true;
        }

        return XHRCorsObject.enabled;
      };

      XhrPollingTransport.transportName = 'xhr-polling';
      XhrPollingTransport.roundTrips = 2; // preflight, ajax

      module.exports = XhrPollingTransport;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xhr-cors": 35,
      "./sender/xhr-local": 37,
      "inherits": 57
    }],
    42: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var inherits = require('inherits'),
            AjaxBasedTransport = require('./lib/ajax-based'),
            XhrReceiver = require('./receiver/xhr'),
            XHRCorsObject = require('./sender/xhr-cors'),
            XHRLocalObject = require('./sender/xhr-local'),
            browser = require('../utils/browser');

        function XhrStreamingTransport(transUrl) {
          if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
            throw new Error('Transport created when disabled');
          }

          AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
        }

        inherits(XhrStreamingTransport, AjaxBasedTransport);

        XhrStreamingTransport.enabled = function (info) {
          if (info.nullOrigin) {
            return false;
          } // Opera doesn't support xhr-streaming #60
          // But it might be able to #92


          if (browser.isOpera()) {
            return false;
          }

          return XHRCorsObject.enabled;
        };

        XhrStreamingTransport.transportName = 'xhr-streaming';
        XhrStreamingTransport.roundTrips = 2; // preflight, ajax
        // Safari gets confused when a streaming ajax request is started
        // before onload. This causes the load indicator to spin indefinetely.
        // Only require body when used in a browser

        XhrStreamingTransport.needBody = !!global.document;
        module.exports = XhrStreamingTransport;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../utils/browser": 44,
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xhr-cors": 35,
      "./sender/xhr-local": 37,
      "inherits": 57
    }],
    43: [function (require, module, exports) {
      (function (global) {
        'use strict';

        if (global.crypto && global.crypto.getRandomValues) {
          module.exports.randomBytes = function (length) {
            var bytes = new Uint8Array(length);
            global.crypto.getRandomValues(bytes);
            return bytes;
          };
        } else {
          module.exports.randomBytes = function (length) {
            var bytes = new Array(length);

            for (var i = 0; i < length; i++) {
              bytes[i] = Math.floor(Math.random() * 256);
            }

            return bytes;
          };
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    44: [function (require, module, exports) {
      (function (global) {
        'use strict';

        module.exports = {
          isOpera: function () {
            return global.navigator && /opera/i.test(global.navigator.userAgent);
          },
          isKonqueror: function () {
            return global.navigator && /konqueror/i.test(global.navigator.userAgent);
          } // #187 wrap document.domain in try/catch because of WP8 from file:///
          ,
          hasDomain: function () {
            // non-browser client always has a domain
            if (!global.document) {
              return true;
            }

            try {
              return !!global.document.domain;
            } catch (e) {
              return false;
            }
          }
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    45: [function (require, module, exports) {
      'use strict';

      var JSON3 = require('json3'); // Some extra characters that Chrome gets wrong, and substitutes with
      // something else on the wire.
      // eslint-disable-next-line no-control-regex, no-misleading-character-class


      var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
          extraLookup; // This may be quite slow, so let's delay until user actually uses bad
      // characters.

      var unrollLookup = function (escapable) {
        var i;
        var unrolled = {};
        var c = [];

        for (i = 0; i < 65536; i++) {
          c.push(String.fromCharCode(i));
        }

        escapable.lastIndex = 0;
        c.join('').replace(escapable, function (a) {
          unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          return '';
        });
        escapable.lastIndex = 0;
        return unrolled;
      }; // Quote string, also taking care of unicode characters that browsers
      // often break. Especially, take care of unicode surrogates:
      // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates


      module.exports = {
        quote: function (string) {
          var quoted = JSON3.stringify(string); // In most cases this should be very fast and good enough.

          extraEscapable.lastIndex = 0;

          if (!extraEscapable.test(quoted)) {
            return quoted;
          }

          if (!extraLookup) {
            extraLookup = unrollLookup(extraEscapable);
          }

          return quoted.replace(extraEscapable, function (a) {
            return extraLookup[a];
          });
        }
      };
    }, {
      "json3": 58
    }],
    46: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var random = require('./random');

        var onUnload = {},
            afterUnload = false // detect google chrome packaged apps because they don't allow the 'unload' event
        ,
            isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;
        module.exports = {
          attachEvent: function (event, listener) {
            if (typeof global.addEventListener !== 'undefined') {
              global.addEventListener(event, listener, false);
            } else if (global.document && global.attachEvent) {
              // IE quirks.
              // According to: http://stevesouders.com/misc/test-postmessage.php
              // the message gets delivered only to 'document', not 'window'.
              global.document.attachEvent('on' + event, listener); // I get 'window' for ie8.

              global.attachEvent('on' + event, listener);
            }
          },
          detachEvent: function (event, listener) {
            if (typeof global.addEventListener !== 'undefined') {
              global.removeEventListener(event, listener, false);
            } else if (global.document && global.detachEvent) {
              global.document.detachEvent('on' + event, listener);
              global.detachEvent('on' + event, listener);
            }
          },
          unloadAdd: function (listener) {
            if (isChromePackagedApp) {
              return null;
            }

            var ref = random.string(8);
            onUnload[ref] = listener;

            if (afterUnload) {
              setTimeout(this.triggerUnloadCallbacks, 0);
            }

            return ref;
          },
          unloadDel: function (ref) {
            if (ref in onUnload) {
              delete onUnload[ref];
            }
          },
          triggerUnloadCallbacks: function () {
            for (var ref in onUnload) {
              onUnload[ref]();
              delete onUnload[ref];
            }
          }
        };

        var unloadTriggered = function () {
          if (afterUnload) {
            return;
          }

          afterUnload = true;
          module.exports.triggerUnloadCallbacks();
        }; // 'unload' alone is not reliable in opera within an iframe, but we
        // can't use `beforeunload` as IE fires it on javascript: links.


        if (!isChromePackagedApp) {
          module.exports.attachEvent('unload', unloadTriggered);
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./random": 50
    }],
    47: [function (require, module, exports) {
      (function (process, global) {
        'use strict';

        var eventUtils = require('./event'),
            JSON3 = require('json3'),
            browser = require('./browser');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:utils:iframe');
        }

        module.exports = {
          WPrefix: '_jp',
          currentWindowId: null,
          polluteGlobalNamespace: function () {
            if (!(module.exports.WPrefix in global)) {
              global[module.exports.WPrefix] = {};
            }
          },
          postMessage: function (type, data) {
            if (global.parent !== global) {
              global.parent.postMessage(JSON3.stringify({
                windowId: module.exports.currentWindowId,
                type: type,
                data: data || ''
              }), '*');
            } else {
              debug('Cannot postMessage, no parent window.', type, data);
            }
          },
          createIframe: function (iframeUrl, errorCallback) {
            var iframe = global.document.createElement('iframe');
            var tref, unloadRef;

            var unattach = function () {
              debug('unattach');
              clearTimeout(tref); // Explorer had problems with that.

              try {
                iframe.onload = null;
              } catch (x) {// intentionally empty
              }

              iframe.onerror = null;
            };

            var cleanup = function () {
              debug('cleanup');

              if (iframe) {
                unattach(); // This timeout makes chrome fire onbeforeunload event
                // within iframe. Without the timeout it goes straight to
                // onunload.

                setTimeout(function () {
                  if (iframe) {
                    iframe.parentNode.removeChild(iframe);
                  }

                  iframe = null;
                }, 0);
                eventUtils.unloadDel(unloadRef);
              }
            };

            var onerror = function (err) {
              debug('onerror', err);

              if (iframe) {
                cleanup();
                errorCallback(err);
              }
            };

            var post = function (msg, origin) {
              debug('post', msg, origin);
              setTimeout(function () {
                try {
                  // When the iframe is not loaded, IE raises an exception
                  // on 'contentWindow'.
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(msg, origin);
                  }
                } catch (x) {// intentionally empty
                }
              }, 0);
            };

            iframe.src = iframeUrl;
            iframe.style.display = 'none';
            iframe.style.position = 'absolute';

            iframe.onerror = function () {
              onerror('onerror');
            };

            iframe.onload = function () {
              debug('onload'); // `onload` is triggered before scripts on the iframe are
              // executed. Give it few seconds to actually load stuff.

              clearTimeout(tref);
              tref = setTimeout(function () {
                onerror('onload timeout');
              }, 2000);
            };

            global.document.body.appendChild(iframe);
            tref = setTimeout(function () {
              onerror('timeout');
            }, 15000);
            unloadRef = eventUtils.unloadAdd(cleanup);
            return {
              post: post,
              cleanup: cleanup,
              loaded: unattach
            };
          }
          /* eslint no-undef: "off", new-cap: "off" */
          ,
          createHtmlfile: function (iframeUrl, errorCallback) {
            var axo = ['Active'].concat('Object').join('X');
            var doc = new global[axo]('htmlfile');
            var tref, unloadRef;
            var iframe;

            var unattach = function () {
              clearTimeout(tref);
              iframe.onerror = null;
            };

            var cleanup = function () {
              if (doc) {
                unattach();
                eventUtils.unloadDel(unloadRef);
                iframe.parentNode.removeChild(iframe);
                iframe = doc = null;
                CollectGarbage();
              }
            };

            var onerror = function (r) {
              debug('onerror', r);

              if (doc) {
                cleanup();
                errorCallback(r);
              }
            };

            var post = function (msg, origin) {
              try {
                // When the iframe is not loaded, IE raises an exception
                // on 'contentWindow'.
                setTimeout(function () {
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(msg, origin);
                  }
                }, 0);
              } catch (x) {// intentionally empty
              }
            };

            doc.open();
            doc.write('<html><s' + 'cript>' + 'document.domain="' + global.document.domain + '";' + '</s' + 'cript></html>');
            doc.close();
            doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
            var c = doc.createElement('div');
            doc.body.appendChild(c);
            iframe = doc.createElement('iframe');
            c.appendChild(iframe);
            iframe.src = iframeUrl;

            iframe.onerror = function () {
              onerror('onerror');
            };

            tref = setTimeout(function () {
              onerror('timeout');
            }, 15000);
            unloadRef = eventUtils.unloadAdd(cleanup);
            return {
              post: post,
              cleanup: cleanup,
              loaded: unattach
            };
          }
        };
        module.exports.iframeEnabled = false;

        if (global.document) {
          // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
          // huge delay, or not at all.
          module.exports.iframeEnabled = (typeof global.postMessage === 'function' || typeof global.postMessage === 'object') && !browser.isKonqueror();
        }
      }).call(this, {
        env: {}
      }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./browser": 44,
      "./event": 46,
      "debug": 55,
      "json3": 58
    }],
    48: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var logObject = {};
        ['log', 'debug', 'warn'].forEach(function (level) {
          var levelExists;

          try {
            levelExists = global.console && global.console[level] && global.console[level].apply;
          } catch (e) {// do nothing
          }

          logObject[level] = levelExists ? function () {
            return global.console[level].apply(global.console, arguments);
          } : level === 'log' ? function () {} : logObject.log;
        });
        module.exports = logObject;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    49: [function (require, module, exports) {
      'use strict';

      module.exports = {
        isObject: function (obj) {
          var type = typeof obj;
          return type === 'function' || type === 'object' && !!obj;
        },
        extend: function (obj) {
          if (!this.isObject(obj)) {
            return obj;
          }

          var source, prop;

          for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];

            for (prop in source) {
              if (Object.prototype.hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
              }
            }
          }

          return obj;
        }
      };
    }, {}],
    50: [function (require, module, exports) {
      'use strict';

      var crypto = require('crypto'); // This string has length 32, a power of 2, so the modulus doesn't introduce a
      // bias.


      var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
      module.exports = {
        string: function (length) {
          var max = _randomStringChars.length;
          var bytes = crypto.randomBytes(length);
          var ret = [];

          for (var i = 0; i < length; i++) {
            ret.push(_randomStringChars.substr(bytes[i] % max, 1));
          }

          return ret.join('');
        },
        number: function (max) {
          return Math.floor(Math.random() * max);
        },
        numberString: function (max) {
          var t = ('' + (max - 1)).length;
          var p = new Array(t + 1).join('0');
          return (p + this.number(max)).slice(-t);
        }
      };
    }, {
      "crypto": 43
    }],
    51: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:utils:transport');
        }

        module.exports = function (availableTransports) {
          return {
            filterToEnabled: function (transportsWhitelist, info) {
              var transports = {
                main: [],
                facade: []
              };

              if (!transportsWhitelist) {
                transportsWhitelist = [];
              } else if (typeof transportsWhitelist === 'string') {
                transportsWhitelist = [transportsWhitelist];
              }

              availableTransports.forEach(function (trans) {
                if (!trans) {
                  return;
                }

                if (trans.transportName === 'websocket' && info.websocket === false) {
                  debug('disabled from server', 'websocket');
                  return;
                }

                if (transportsWhitelist.length && transportsWhitelist.indexOf(trans.transportName) === -1) {
                  debug('not in whitelist', trans.transportName);
                  return;
                }

                if (trans.enabled(info)) {
                  debug('enabled', trans.transportName);
                  transports.main.push(trans);

                  if (trans.facadeTransport) {
                    transports.facade.push(trans.facadeTransport);
                  }
                } else {
                  debug('disabled', trans.transportName);
                }
              });
              return transports;
            }
          };
        };
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55
    }],
    52: [function (require, module, exports) {
      (function (process) {
        'use strict';

        var URL = require('url-parse');

        var debug = function () {};

        if (process.env.NODE_ENV !== 'production') {
          debug = require('debug')('sockjs-client:utils:url');
        }

        module.exports = {
          getOrigin: function (url) {
            if (!url) {
              return null;
            }

            var p = new URL(url);

            if (p.protocol === 'file:') {
              return null;
            }

            var port = p.port;

            if (!port) {
              port = p.protocol === 'https:' ? '443' : '80';
            }

            return p.protocol + '//' + p.hostname + ':' + port;
          },
          isOriginEqual: function (a, b) {
            var res = this.getOrigin(a) === this.getOrigin(b);
            debug('same', a, b, res);
            return res;
          },
          isSchemeEqual: function (a, b) {
            return a.split(':')[0] === b.split(':')[0];
          },
          addPath: function (url, path) {
            var qs = url.split('?');
            return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
          },
          addQuery: function (url, q) {
            return url + (url.indexOf('?') === -1 ? '?' + q : '&' + q);
          },
          isLoopbackAddr: function (addr) {
            return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^\[::1\]$/.test(addr);
          }
        };
      }).call(this, {
        env: {}
      });
    }, {
      "debug": 55,
      "url-parse": 61
    }],
    53: [function (require, module, exports) {
      module.exports = '1.5.1';
    }, {}],
    54: [function (require, module, exports) {
      /**
       * Helpers.
       */
      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      /**
       * Parse or format the given `val`.
       *
       * Options:
       *
       *  - `long` verbose formatting [false]
       *
       * @param {String|Number} val
       * @param {Object} [options]
       * @throws {Error} throw an error if val is not a non-empty string or a number
       * @return {String|Number}
       * @api public
       */

      module.exports = function (val, options) {
        options = options || {};
        var type = typeof val;

        if (type === 'string' && val.length > 0) {
          return parse(val);
        } else if (type === 'number' && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }

        throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
      };
      /**
       * Parse the given `str` and return milliseconds.
       *
       * @param {String} str
       * @return {Number}
       * @api private
       */


      function parse(str) {
        str = String(str);

        if (str.length > 100) {
          return;
        }

        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

        if (!match) {
          return;
        }

        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();

        switch (type) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return n * y;

          case 'weeks':
          case 'week':
          case 'w':
            return n * w;

          case 'days':
          case 'day':
          case 'd':
            return n * d;

          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return n * h;

          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return n * m;

          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return n * s;

          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return n;

          default:
            return undefined;
        }
      }
      /**
       * Short format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */


      function fmtShort(ms) {
        var msAbs = Math.abs(ms);

        if (msAbs >= d) {
          return Math.round(ms / d) + 'd';
        }

        if (msAbs >= h) {
          return Math.round(ms / h) + 'h';
        }

        if (msAbs >= m) {
          return Math.round(ms / m) + 'm';
        }

        if (msAbs >= s) {
          return Math.round(ms / s) + 's';
        }

        return ms + 'ms';
      }
      /**
       * Long format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */


      function fmtLong(ms) {
        var msAbs = Math.abs(ms);

        if (msAbs >= d) {
          return plural(ms, msAbs, d, 'day');
        }

        if (msAbs >= h) {
          return plural(ms, msAbs, h, 'hour');
        }

        if (msAbs >= m) {
          return plural(ms, msAbs, m, 'minute');
        }

        if (msAbs >= s) {
          return plural(ms, msAbs, s, 'second');
        }

        return ms + ' ms';
      }
      /**
       * Pluralization helper.
       */


      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
      }
    }, {}],
    55: [function (require, module, exports) {
      (function (process) {
        "use strict";

        function _typeof(obj) {
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
          }

          return _typeof(obj);
        }
        /* eslint-env browser */

        /**
         * This is the web browser implementation of `debug()`.
         */


        exports.log = log;
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = localstorage();
        /**
         * Colors.
         */

        exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
        /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */
        // eslint-disable-next-line complexity

        function useColors() {
          // NB: In an Electron preload script, document will be defined but not fully
          // initialized. Since we know we're in Chrome, we'll just detect this case
          // explicitly
          if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
            return true;
          } // Internet Explorer and Edge do not support colors.


          if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
          } // Is webkit? http://stackoverflow.com/a/16459606/376773
          // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


          return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
          typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
          typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */


        function formatArgs(args) {
          args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

          if (!this.useColors) {
            return;
          }

          var c = 'color: ' + this.color;
          args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
          // arguments passed either before or after the %c, so we need to
          // figure out the correct index to insert the CSS into

          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, function (match) {
            if (match === '%%') {
              return;
            }

            index++;

            if (match === '%c') {
              // We only are interested in the *last* %c
              // (the user may have provided their own)
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
        }
        /**
         * Invokes `console.log()` when available.
         * No-op when `console.log` is not a "function".
         *
         * @api public
         */


        function log() {
          var _console; // This hackery is required for IE8/9, where
          // the `console.log` function doesn't have 'apply'


          return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
        }
        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */


        function save(namespaces) {
          try {
            if (namespaces) {
              exports.storage.setItem('debug', namespaces);
            } else {
              exports.storage.removeItem('debug');
            }
          } catch (error) {// Swallow
            // XXX (@Qix-) should we be logging these?
          }
        }
        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */


        function load() {
          var r;

          try {
            r = exports.storage.getItem('debug');
          } catch (error) {} // Swallow
          // XXX (@Qix-) should we be logging these?
          // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


          if (!r && typeof process !== 'undefined' && 'env' in process) {
            r = process.env.DEBUG;
          }

          return r;
        }
        /**
         * Localstorage attempts to return the localstorage.
         *
         * This is necessary because safari throws
         * when a user disables cookies/localstorage
         * and you attempt to access it.
         *
         * @return {LocalStorage}
         * @api private
         */


        function localstorage() {
          try {
            // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
            // The Browser also has localStorage in the global context.
            return localStorage;
          } catch (error) {// Swallow
            // XXX (@Qix-) should we be logging these?
          }
        }

        module.exports = require('./common')(exports);
        var formatters = module.exports.formatters;
        /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */

        formatters.j = function (v) {
          try {
            return JSON.stringify(v);
          } catch (error) {
            return '[UnexpectedJSONParseError]: ' + error.message;
          }
        };
      }).call(this, {
        env: {}
      });
    }, {
      "./common": 56
    }],
    56: [function (require, module, exports) {
      "use strict";
      /**
       * This is the common logic for both the Node.js and web browser
       * implementations of `debug()`.
       */

      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require('ms');
        Object.keys(env).forEach(function (key) {
          createDebug[key] = env[key];
        });
        /**
        * Active `debug` instances.
        */

        createDebug.instances = [];
        /**
        * The currently active debug mode names, and names to skip.
        */

        createDebug.names = [];
        createDebug.skips = [];
        /**
        * Map of special "%n" handling functions, for the debug "format" argument.
        *
        * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
        */

        createDebug.formatters = {};
        /**
        * Selects a color for a debug namespace
        * @param {String} namespace The namespace string for the for the debug instance to be colored
        * @return {Number|String} An ANSI color code for the given namespace
        * @api private
        */

        function selectColor(namespace) {
          var hash = 0;

          for (var i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
          }

          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }

        createDebug.selectColor = selectColor;
        /**
        * Create a debugger with the given `namespace`.
        *
        * @param {String} namespace
        * @return {Function}
        * @api public
        */

        function createDebug(namespace) {
          var prevTime;

          function debug() {
            // Disabled?
            if (!debug.enabled) {
              return;
            }

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var self = debug; // Set `diff` timestamp

            var curr = Number(new Date());
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);

            if (typeof args[0] !== 'string') {
              // Anything else let's inspect with %O
              args.unshift('%O');
            } // Apply any `formatters` transformations


            var index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
              // If we encounter an escaped % then don't increase the array index
              if (match === '%%') {
                return match;
              }

              index++;
              var formatter = createDebug.formatters[format];

              if (typeof formatter === 'function') {
                var val = args[index];
                match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

                args.splice(index, 1);
                index--;
              }

              return match;
            }); // Apply env-specific formatting (colors, etc.)

            createDebug.formatArgs.call(self, args);
            var logFn = self.log || createDebug.log;
            logFn.apply(self, args);
          }

          debug.namespace = namespace;
          debug.enabled = createDebug.enabled(namespace);
          debug.useColors = createDebug.useColors();
          debug.color = selectColor(namespace);
          debug.destroy = destroy;
          debug.extend = extend; // Debug.formatArgs = formatArgs;
          // debug.rawLog = rawLog;
          // env-specific initialization logic for debug instances

          if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
          }

          createDebug.instances.push(debug);
          return debug;
        }

        function destroy() {
          var index = createDebug.instances.indexOf(this);

          if (index !== -1) {
            createDebug.instances.splice(index, 1);
            return true;
          }

          return false;
        }

        function extend(namespace, delimiter) {
          return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        }
        /**
        * Enables a debug mode by namespaces. This can include modes
        * separated by a colon and wildcards.
        *
        * @param {String} namespaces
        * @api public
        */


        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.names = [];
          createDebug.skips = [];
          var i;
          var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
          var len = split.length;

          for (i = 0; i < len; i++) {
            if (!split[i]) {
              // ignore empty strings
              continue;
            }

            namespaces = split[i].replace(/\*/g, '.*?');

            if (namespaces[0] === '-') {
              createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
            } else {
              createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
          }

          for (i = 0; i < createDebug.instances.length; i++) {
            var instance = createDebug.instances[i];
            instance.enabled = createDebug.enabled(instance.namespace);
          }
        }
        /**
        * Disable debug output.
        *
        * @api public
        */


        function disable() {
          createDebug.enable('');
        }
        /**
        * Returns true if the given mode name is enabled, false otherwise.
        *
        * @param {String} name
        * @return {Boolean}
        * @api public
        */


        function enabled(name) {
          if (name[name.length - 1] === '*') {
            return true;
          }

          var i;
          var len;

          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }

          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }

          return false;
        }
        /**
        * Coerce `val`.
        *
        * @param {Mixed} val
        * @return {Mixed}
        * @api private
        */


        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }

          return val;
        }

        createDebug.enable(createDebug.load());
        return createDebug;
      }

      module.exports = setup;
    }, {
      "ms": 54
    }],
    57: [function (require, module, exports) {
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;

            var TempCtor = function () {};

            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }, {}],
    58: [function (require, module, exports) {
      (function (global) {
        /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
        ;
        (function () {
          // Detect the `define` function exposed by asynchronous module loaders. The
          // strict `define` check is necessary for compatibility with `r.js`.
          var isLoader = typeof define === "function" && define.amd; // A set of types used to distinguish objects from primitives.

          var objectTypes = {
            "function": true,
            "object": true
          }; // Detect the `exports` object exposed by CommonJS implementations.

          var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports; // Use the `global` object exposed by Node (including Browserify via
          // `insert-module-globals`), Narwhal, and Ringo as the default context,
          // and the `window` object in browsers. Rhino exports a `global` function
          // instead.

          var root = objectTypes[typeof window] && window || this,
              freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

          if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
            root = freeGlobal;
          } // Public: Initializes JSON 3 using the given `context` object, attaching the
          // `stringify` and `parse` functions to the specified `exports` object.


          function runInContext(context, exports) {
            context || (context = root.Object());
            exports || (exports = root.Object()); // Native constructor aliases.

            var Number = context.Number || root.Number,
                String = context.String || root.String,
                Object = context.Object || root.Object,
                Date = context.Date || root.Date,
                SyntaxError = context.SyntaxError || root.SyntaxError,
                TypeError = context.TypeError || root.TypeError,
                Math = context.Math || root.Math,
                nativeJSON = context.JSON || root.JSON; // Delegate to the native `stringify` and `parse` implementations.

            if (typeof nativeJSON == "object" && nativeJSON) {
              exports.stringify = nativeJSON.stringify;
              exports.parse = nativeJSON.parse;
            } // Convenience aliases.


            var objectProto = Object.prototype,
                getClass = objectProto.toString,
                isProperty = objectProto.hasOwnProperty,
                undefined; // Internal: Contains `try...catch` logic used by other functions.
            // This prevents other functions from being deoptimized.

            function attempt(func, errorFunc) {
              try {
                func();
              } catch (exception) {
                if (errorFunc) {
                  errorFunc();
                }
              }
            } // Test the `Date#getUTC*` methods. Based on work by @Yaffle.


            var isExtended = new Date(-3509827334573292);
            attempt(function () {
              // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
              // results for certain dates in Opera >= 10.53.
              isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
            }); // Internal: Determines whether the native `JSON.stringify` and `parse`
            // implementations are spec-compliant. Based on work by Ken Snyder.

            function has(name) {
              if (has[name] != null) {
                // Return cached feature test result.
                return has[name];
              }

              var isSupported;

              if (name == "bug-string-char-index") {
                // IE <= 7 doesn't support accessing string characters using square
                // bracket notation. IE 8 only supports this for primitives.
                isSupported = "a"[0] != "a";
              } else if (name == "json") {
                // Indicates whether both `JSON.stringify` and `JSON.parse` are
                // supported.
                isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
              } else if (name == "date-serialization") {
                // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
                isSupported = has("json-stringify") && isExtended;

                if (isSupported) {
                  var stringify = exports.stringify;
                  attempt(function () {
                    isSupported = // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                    // serialize extended years.
                    stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                    stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                    // four-digit years instead of six-digit years. Credits: @Yaffle.
                    stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                    // values less than 1000. Credits: @Yaffle.
                    stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                  });
                }
              } else {
                var value,
                    serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'; // Test `JSON.stringify`.

                if (name == "json-stringify") {
                  var stringify = exports.stringify,
                      stringifySupported = typeof stringify == "function";

                  if (stringifySupported) {
                    // A test function object with a custom `toJSON` method.
                    (value = function () {
                      return 1;
                    }).toJSON = value;
                    attempt(function () {
                      stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                      // primitives as object literals.
                      stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                      // literals.
                      stringify(new Number()) === "0" && stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                      // does not define a canonical JSON representation (this applies to
                      // objects with `toJSON` properties as well, *unless* they are nested
                      // within an object or array).
                      stringify(getClass) === undefined && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                      // FF 3.1b3 pass this test.
                      stringify(undefined) === undefined && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                      // respectively, if the value is omitted entirely.
                      stringify() === undefined && // FF 3.1b1, 2 throw an error if the given value is not a number,
                      // string, array, object, Boolean, or `null` literal. This applies to
                      // objects with custom `toJSON` methods as well, unless they are nested
                      // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                      // methods entirely.
                      stringify(value) === "1" && stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                      // `"[null]"`.
                      stringify([undefined]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                      stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                      // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                      // elides non-JSON values from objects and arrays, unless they
                      // define custom `toJSON` methods.
                      stringify([undefined, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                      // where character escape codes are expected (e.g., `\b` => `\u0008`).
                      stringify({
                        "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                      }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                      stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
                    }, function () {
                      stringifySupported = false;
                    });
                  }

                  isSupported = stringifySupported;
                } // Test `JSON.parse`.


                if (name == "json-parse") {
                  var parse = exports.parse,
                      parseSupported;

                  if (typeof parse == "function") {
                    attempt(function () {
                      // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                      // Conforming implementations should also coerce the initial argument to
                      // a string prior to parsing.
                      if (parse("0") === 0 && !parse(false)) {
                        // Simple parsing test.
                        value = parse(serialized);
                        parseSupported = value["a"].length == 5 && value["a"][0] === 1;

                        if (parseSupported) {
                          attempt(function () {
                            // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                            parseSupported = !parse('"\t"');
                          });

                          if (parseSupported) {
                            attempt(function () {
                              // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                              // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                              // certain octal literals.
                              parseSupported = parse("01") !== 1;
                            });
                          }

                          if (parseSupported) {
                            attempt(function () {
                              // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                              // points. These environments, along with FF 3.1b1 and 2,
                              // also allow trailing commas in JSON objects and arrays.
                              parseSupported = parse("1.") !== 1;
                            });
                          }
                        }
                      }
                    }, function () {
                      parseSupported = false;
                    });
                  }

                  isSupported = parseSupported;
                }
              }

              return has[name] = !!isSupported;
            }

            has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

            if (!has("json")) {
              // Common `[[Class]]` name aliases.
              var functionClass = "[object Function]",
                  dateClass = "[object Date]",
                  numberClass = "[object Number]",
                  stringClass = "[object String]",
                  arrayClass = "[object Array]",
                  booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.

              var charIndexBuggy = has("bug-string-char-index"); // Internal: Normalizes the `for...in` iteration algorithm across
              // environments. Each enumerated key is yielded to a `callback` function.

              var forOwn = function (object, callback) {
                var size = 0,
                    Properties,
                    dontEnums,
                    property; // Tests for bugs in the current environment's `for...in` algorithm. The
                // `valueOf` property inherits the non-enumerable flag from
                // `Object.prototype` in older versions of IE, Netscape, and Mozilla.

                (Properties = function () {
                  this.valueOf = 0;
                }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.

                dontEnums = new Properties();

                for (property in dontEnums) {
                  // Ignore all properties inherited from `Object.prototype`.
                  if (isProperty.call(dontEnums, property)) {
                    size++;
                  }
                }

                Properties = dontEnums = null; // Normalize the iteration algorithm.

                if (!size) {
                  // A list of non-enumerable properties inherited from `Object.prototype`.
                  dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                  // properties.

                  forOwn = function (object, callback) {
                    var isFunction = getClass.call(object) == functionClass,
                        property,
                        length;
                    var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;

                    for (property in object) {
                      // Gecko <= 1.0 enumerates the `prototype` property of functions under
                      // certain conditions; IE does not.
                      if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                        callback(property);
                      }
                    } // Manually invoke the callback for each non-enumerable property.


                    for (length = dontEnums.length; property = dontEnums[--length];) {
                      if (hasProperty.call(object, property)) {
                        callback(property);
                      }
                    }
                  };
                } else {
                  // No bugs detected; use the standard `for...in` algorithm.
                  forOwn = function (object, callback) {
                    var isFunction = getClass.call(object) == functionClass,
                        property,
                        isConstructor;

                    for (property in object) {
                      if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                        callback(property);
                      }
                    } // Manually invoke the callback for the `constructor` property due to
                    // cross-environment inconsistencies.


                    if (isConstructor || isProperty.call(object, property = "constructor")) {
                      callback(property);
                    }
                  };
                }

                return forOwn(object, callback);
              }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
              // `filter` argument may specify either a function that alters how object and
              // array members are serialized, or an array of strings and numbers that
              // indicates which properties should be serialized. The optional `width`
              // argument may be either a string or number that specifies the indentation
              // level of the output.


              if (!has("json-stringify") && !has("date-serialization")) {
                // Internal: A map of control characters and their escaped equivalents.
                var Escapes = {
                  92: "\\\\",
                  34: '\\"',
                  8: "\\b",
                  12: "\\f",
                  10: "\\n",
                  13: "\\r",
                  9: "\\t"
                }; // Internal: Converts `value` into a zero-padded string such that its
                // length is at least equal to `width`. The `width` must be <= 6.

                var leadingZeroes = "000000";

                var toPaddedString = function (width, value) {
                  // The `|| 0` expression is necessary to work around a bug in
                  // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                  return (leadingZeroes + (value || 0)).slice(-width);
                }; // Internal: Serializes a date object.


                var serializeDate = function (value) {
                  var getData, year, month, date, time, hours, minutes, seconds, milliseconds; // Define additional utility methods if the `Date` methods are buggy.

                  if (!isExtended) {
                    var floor = Math.floor; // A mapping between the months of the year and the number of days between
                    // January 1st and the first of the respective month.

                    var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; // Internal: Calculates the number of days between the Unix epoch and the
                    // first day of the given month.

                    var getDay = function (year, month) {
                      return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                    };

                    getData = function (value) {
                      // Manually compute the year, month, date, hours, minutes,
                      // seconds, and milliseconds if the `getUTC*` methods are
                      // buggy. Adapted from @Yaffle's `date-shim` project.
                      date = floor(value / 864e5);

                      for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);

                      for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);

                      date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                      // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                      // to compute `A modulo B`, as the `%` operator does not
                      // correspond to the `modulo` operation for negative numbers.

                      time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                      // decomposing the time within the day. See section 15.9.1.10.

                      hours = floor(time / 36e5) % 24;
                      minutes = floor(time / 6e4) % 60;
                      seconds = floor(time / 1e3) % 60;
                      milliseconds = time % 1e3;
                    };
                  } else {
                    getData = function (value) {
                      year = value.getUTCFullYear();
                      month = value.getUTCMonth();
                      date = value.getUTCDate();
                      hours = value.getUTCHours();
                      minutes = value.getUTCMinutes();
                      seconds = value.getUTCSeconds();
                      milliseconds = value.getUTCMilliseconds();
                    };
                  }

                  serializeDate = function (value) {
                    if (value > -1 / 0 && value < 1 / 0) {
                      // Dates are serialized according to the `Date#toJSON` method
                      // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                      // for the ISO 8601 date time string format.
                      getData(value); // Serialize extended years correctly.

                      value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                      // digits; milliseconds should have three.
                      "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                      "." + toPaddedString(3, milliseconds) + "Z";
                      year = month = date = hours = minutes = seconds = milliseconds = null;
                    } else {
                      value = null;
                    }

                    return value;
                  };

                  return serializeDate(value);
                }; // For environments with `JSON.stringify` but buggy date serialization,
                // we override the native `Date#toJSON` implementation with a
                // spec-compliant one.


                if (has("json-stringify") && !has("date-serialization")) {
                  // Internal: the `Date#toJSON` implementation used to override the native one.
                  function dateToJSON(key) {
                    return serializeDate(this);
                  } // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.


                  var nativeStringify = exports.stringify;

                  exports.stringify = function (source, filter, width) {
                    var nativeToJSON = Date.prototype.toJSON;
                    Date.prototype.toJSON = dateToJSON;
                    var result = nativeStringify(source, filter, width);
                    Date.prototype.toJSON = nativeToJSON;
                    return result;
                  };
                } else {
                  // Internal: Double-quotes a string `value`, replacing all ASCII control
                  // characters (characters with code unit values between 0 and 31) with
                  // their escaped equivalents. This is an implementation of the
                  // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                  var unicodePrefix = "\\u00";

                  var escapeChar = function (character) {
                    var charCode = character.charCodeAt(0),
                        escaped = Escapes[charCode];

                    if (escaped) {
                      return escaped;
                    }

                    return unicodePrefix + toPaddedString(2, charCode.toString(16));
                  };

                  var reEscape = /[\x00-\x1f\x22\x5c]/g;

                  var quote = function (value) {
                    reEscape.lastIndex = 0;
                    return '"' + (reEscape.test(value) ? value.replace(reEscape, escapeChar) : value) + '"';
                  }; // Internal: Recursively serializes an object. Implements the
                  // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.


                  var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
                    var value, type, className, results, element, index, length, prefix, result;
                    attempt(function () {
                      // Necessary for host object support.
                      value = object[property];
                    });

                    if (typeof value == "object" && value) {
                      if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                        value = serializeDate(value);
                      } else if (typeof value.toJSON == "function") {
                        value = value.toJSON(property);
                      }
                    }

                    if (callback) {
                      // If a replacement function was provided, call it to obtain the value
                      // for serialization.
                      value = callback.call(object, property, value);
                    } // Exit early if value is `undefined` or `null`.


                    if (value == undefined) {
                      return value === undefined ? value : "null";
                    }

                    type = typeof value; // Only call `getClass` if the value is an object.

                    if (type == "object") {
                      className = getClass.call(value);
                    }

                    switch (className || type) {
                      case "boolean":
                      case booleanClass:
                        // Booleans are represented literally.
                        return "" + value;

                      case "number":
                      case numberClass:
                        // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                        // `"null"`.
                        return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";

                      case "string":
                      case stringClass:
                        // Strings are double-quoted and escaped.
                        return quote("" + value);
                    } // Recursively serialize objects and arrays.


                    if (typeof value == "object") {
                      // Check for cyclic structures. This is a linear search; performance
                      // is inversely proportional to the number of unique nested objects.
                      for (length = stack.length; length--;) {
                        if (stack[length] === value) {
                          // Cyclic structures cannot be serialized by `JSON.stringify`.
                          throw TypeError();
                        }
                      } // Add the object to the stack of traversed objects.


                      stack.push(value);
                      results = []; // Save the current indentation level and indent one additional level.

                      prefix = indentation;
                      indentation += whitespace;

                      if (className == arrayClass) {
                        // Recursively serialize array elements.
                        for (index = 0, length = value.length; index < length; index++) {
                          element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                          results.push(element === undefined ? "null" : element);
                        }

                        result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                      } else {
                        // Recursively serialize object members. Members are selected from
                        // either a user-specified list of property names, or the object
                        // itself.
                        forOwn(properties || value, function (property) {
                          var element = serialize(property, value, callback, properties, whitespace, indentation, stack);

                          if (element !== undefined) {
                            // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                            // is not the empty string, let `member` {quote(property) + ":"}
                            // be the concatenation of `member` and the `space` character."
                            // The "`space` character" refers to the literal space
                            // character, not the `space` {width} argument provided to
                            // `JSON.stringify`.
                            results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                          }
                        });
                        result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                      } // Remove the object from the traversed object stack.


                      stack.pop();
                      return result;
                    }
                  }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.


                  exports.stringify = function (source, filter, width) {
                    var whitespace, callback, properties, className;

                    if (objectTypes[typeof filter] && filter) {
                      className = getClass.call(filter);

                      if (className == functionClass) {
                        callback = filter;
                      } else if (className == arrayClass) {
                        // Convert the property names array into a makeshift set.
                        properties = {};

                        for (var index = 0, length = filter.length, value; index < length;) {
                          value = filter[index++];
                          className = getClass.call(value);

                          if (className == "[object String]" || className == "[object Number]") {
                            properties[value] = 1;
                          }
                        }
                      }
                    }

                    if (width) {
                      className = getClass.call(width);

                      if (className == numberClass) {
                        // Convert the `width` to an integer and create a string containing
                        // `width` number of space characters.
                        if ((width -= width % 1) > 0) {
                          if (width > 10) {
                            width = 10;
                          }

                          for (whitespace = ""; whitespace.length < width;) {
                            whitespace += " ";
                          }
                        }
                      } else if (className == stringClass) {
                        whitespace = width.length <= 10 ? width : width.slice(0, 10);
                      }
                    } // Opera <= 7.54u2 discards the values associated with empty string keys
                    // (`""`) only if they are used directly within an object member list
                    // (e.g., `!("" in { "": 1})`).


                    return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                  };
                }
              } // Public: Parses a JSON source string.


              if (!has("json-parse")) {
                var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
                // equivalents.

                var Unescapes = {
                  92: "\\",
                  34: '"',
                  47: "/",
                  98: "\b",
                  116: "\t",
                  110: "\n",
                  102: "\f",
                  114: "\r"
                }; // Internal: Stores the parser state.

                var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.

                var abort = function () {
                  Index = Source = null;
                  throw SyntaxError();
                }; // Internal: Returns the next token, or `"$"` if the parser has reached
                // the end of the source string. A token may be a string, number, `null`
                // literal, or Boolean literal.


                var lex = function () {
                  var source = Source,
                      length = source.length,
                      value,
                      begin,
                      position,
                      isSigned,
                      charCode;

                  while (Index < length) {
                    charCode = source.charCodeAt(Index);

                    switch (charCode) {
                      case 9:
                      case 10:
                      case 13:
                      case 32:
                        // Skip whitespace tokens, including tabs, carriage returns, line
                        // feeds, and space characters.
                        Index++;
                        break;

                      case 123:
                      case 125:
                      case 91:
                      case 93:
                      case 58:
                      case 44:
                        // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                        // the current position.
                        value = charIndexBuggy ? source.charAt(Index) : source[Index];
                        Index++;
                        return value;

                      case 34:
                        // `"` delimits a JSON string; advance to the next character and
                        // begin parsing the string. String tokens are prefixed with the
                        // sentinel `@` character to distinguish them from punctuators and
                        // end-of-string tokens.
                        for (value = "@", Index++; Index < length;) {
                          charCode = source.charCodeAt(Index);

                          if (charCode < 32) {
                            // Unescaped ASCII control characters (those with a code unit
                            // less than the space character) are not permitted.
                            abort();
                          } else if (charCode == 92) {
                            // A reverse solidus (`\`) marks the beginning of an escaped
                            // control character (including `"`, `\`, and `/`) or Unicode
                            // escape sequence.
                            charCode = source.charCodeAt(++Index);

                            switch (charCode) {
                              case 92:
                              case 34:
                              case 47:
                              case 98:
                              case 116:
                              case 110:
                              case 102:
                              case 114:
                                // Revive escaped control characters.
                                value += Unescapes[charCode];
                                Index++;
                                break;

                              case 117:
                                // `\u` marks the beginning of a Unicode escape sequence.
                                // Advance to the first character and validate the
                                // four-digit code point.
                                begin = ++Index;

                                for (position = Index + 4; Index < position; Index++) {
                                  charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                                  // insensitive) that form a single hexadecimal value.

                                  if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                    // Invalid Unicode escape sequence.
                                    abort();
                                  }
                                } // Revive the escaped character.


                                value += fromCharCode("0x" + source.slice(begin, Index));
                                break;

                              default:
                                // Invalid escape sequence.
                                abort();
                            }
                          } else {
                            if (charCode == 34) {
                              // An unescaped double-quote character marks the end of the
                              // string.
                              break;
                            }

                            charCode = source.charCodeAt(Index);
                            begin = Index; // Optimize for the common case where a string is valid.

                            while (charCode >= 32 && charCode != 92 && charCode != 34) {
                              charCode = source.charCodeAt(++Index);
                            } // Append the string as-is.


                            value += source.slice(begin, Index);
                          }
                        }

                        if (source.charCodeAt(Index) == 34) {
                          // Advance to the next character and return the revived string.
                          Index++;
                          return value;
                        } // Unterminated string.


                        abort();

                      default:
                        // Parse numbers and literals.
                        begin = Index; // Advance past the negative sign, if one is specified.

                        if (charCode == 45) {
                          isSigned = true;
                          charCode = source.charCodeAt(++Index);
                        } // Parse an integer or floating-point value.


                        if (charCode >= 48 && charCode <= 57) {
                          // Leading zeroes are interpreted as octal literals.
                          if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                            // Illegal octal literal.
                            abort();
                          }

                          isSigned = false; // Parse the integer component.

                          for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++); // Floats cannot contain a leading decimal point; however, this
                          // case is already accounted for by the parser.


                          if (source.charCodeAt(Index) == 46) {
                            position = ++Index; // Parse the decimal component.

                            for (; position < length; position++) {
                              charCode = source.charCodeAt(position);

                              if (charCode < 48 || charCode > 57) {
                                break;
                              }
                            }

                            if (position == Index) {
                              // Illegal trailing decimal.
                              abort();
                            }

                            Index = position;
                          } // Parse exponents. The `e` denoting the exponent is
                          // case-insensitive.


                          charCode = source.charCodeAt(Index);

                          if (charCode == 101 || charCode == 69) {
                            charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                            // specified.

                            if (charCode == 43 || charCode == 45) {
                              Index++;
                            } // Parse the exponential component.


                            for (position = Index; position < length; position++) {
                              charCode = source.charCodeAt(position);

                              if (charCode < 48 || charCode > 57) {
                                break;
                              }
                            }

                            if (position == Index) {
                              // Illegal empty exponent.
                              abort();
                            }

                            Index = position;
                          } // Coerce the parsed value to a JavaScript number.


                          return +source.slice(begin, Index);
                        } // A negative sign may only precede numbers.


                        if (isSigned) {
                          abort();
                        } // `true`, `false`, and `null` literals.


                        var temp = source.slice(Index, Index + 4);

                        if (temp == "true") {
                          Index += 4;
                          return true;
                        } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                          Index += 5;
                          return false;
                        } else if (temp == "null") {
                          Index += 4;
                          return null;
                        } // Unrecognized token.


                        abort();
                    }
                  } // Return the sentinel `$` character if the parser has reached the end
                  // of the source string.


                  return "$";
                }; // Internal: Parses a JSON `value` token.


                var get = function (value) {
                  var results, hasMembers;

                  if (value == "$") {
                    // Unexpected end of input.
                    abort();
                  }

                  if (typeof value == "string") {
                    if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                      // Remove the sentinel `@` character.
                      return value.slice(1);
                    } // Parse object and array literals.


                    if (value == "[") {
                      // Parses a JSON array, returning a new JavaScript array.
                      results = [];

                      for (;;) {
                        value = lex(); // A closing square bracket marks the end of the array literal.

                        if (value == "]") {
                          break;
                        } // If the array literal contains elements, the current token
                        // should be a comma separating the previous element from the
                        // next.


                        if (hasMembers) {
                          if (value == ",") {
                            value = lex();

                            if (value == "]") {
                              // Unexpected trailing `,` in array literal.
                              abort();
                            }
                          } else {
                            // A `,` must separate each array element.
                            abort();
                          }
                        } else {
                          hasMembers = true;
                        } // Elisions and leading commas are not permitted.


                        if (value == ",") {
                          abort();
                        }

                        results.push(get(value));
                      }

                      return results;
                    } else if (value == "{") {
                      // Parses a JSON object, returning a new JavaScript object.
                      results = {};

                      for (;;) {
                        value = lex(); // A closing curly brace marks the end of the object literal.

                        if (value == "}") {
                          break;
                        } // If the object literal contains members, the current token
                        // should be a comma separator.


                        if (hasMembers) {
                          if (value == ",") {
                            value = lex();

                            if (value == "}") {
                              // Unexpected trailing `,` in object literal.
                              abort();
                            }
                          } else {
                            // A `,` must separate each object member.
                            abort();
                          }
                        } else {
                          hasMembers = true;
                        } // Leading commas are not permitted, object property names must be
                        // double-quoted strings, and a `:` must separate each property
                        // name and value.


                        if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                          abort();
                        }

                        results[value.slice(1)] = get(lex());
                      }

                      return results;
                    } // Unexpected token encountered.


                    abort();
                  }

                  return value;
                }; // Internal: Updates a traversed object member.


                var update = function (source, property, callback) {
                  var element = walk(source, property, callback);

                  if (element === undefined) {
                    delete source[property];
                  } else {
                    source[property] = element;
                  }
                }; // Internal: Recursively traverses a parsed JSON object, invoking the
                // `callback` function for each value. This is an implementation of the
                // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.


                var walk = function (source, property, callback) {
                  var value = source[property],
                      length;

                  if (typeof value == "object" && value) {
                    // `forOwn` can't be used to traverse an array in Opera <= 8.54
                    // because its `Object#hasOwnProperty` implementation returns `false`
                    // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                    if (getClass.call(value) == arrayClass) {
                      for (length = value.length; length--;) {
                        update(getClass, forOwn, value, length, callback);
                      }
                    } else {
                      forOwn(value, function (property) {
                        update(value, property, callback);
                      });
                    }
                  }

                  return callback.call(source, property, value);
                }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.


                exports.parse = function (source, callback) {
                  var result, value;
                  Index = 0;
                  Source = "" + source;
                  result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.

                  if (lex() != "$") {
                    abort();
                  } // Reset the parser state.


                  Index = Source = null;
                  return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
                };
              }
            }

            exports.runInContext = runInContext;
            return exports;
          }

          if (freeExports && !isLoader) {
            // Export for CommonJS environments.
            runInContext(root, freeExports);
          } else {
            // Export for web browsers and JavaScript engines.
            var nativeJSON = root.JSON,
                previousJSON = root.JSON3,
                isRestored = false;
            var JSON3 = runInContext(root, root.JSON3 = {
              // Public: Restores the original value of the global `JSON` object and
              // returns a reference to the `JSON3` object.
              "noConflict": function () {
                if (!isRestored) {
                  isRestored = true;
                  root.JSON = nativeJSON;
                  root.JSON3 = previousJSON;
                  nativeJSON = previousJSON = null;
                }

                return JSON3;
              }
            });
            root.JSON = {
              "parse": JSON3.parse,
              "stringify": JSON3.stringify
            };
          } // Export for asynchronous module loaders.


          if (isLoader) {
            define(function () {
              return JSON3;
            });
          }
        }).call(this);
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    59: [function (require, module, exports) {
      'use strict';

      var has = Object.prototype.hasOwnProperty,
          undef;
      /**
       * Decode a URI encoded string.
       *
       * @param {String} input The URI encoded string.
       * @returns {String|Null} The decoded string.
       * @api private
       */

      function decode(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, ' '));
        } catch (e) {
          return null;
        }
      }
      /**
       * Attempts to encode a given input.
       *
       * @param {String} input The string that needs to be encoded.
       * @returns {String|Null} The encoded string.
       * @api private
       */


      function encode(input) {
        try {
          return encodeURIComponent(input);
        } catch (e) {
          return null;
        }
      }
      /**
       * Simple query string parser.
       *
       * @param {String} query The query string that needs to be parsed.
       * @returns {Object}
       * @api public
       */


      function querystring(query) {
        var parser = /([^=?&]+)=?([^&]*)/g,
            result = {},
            part;

        while (part = parser.exec(query)) {
          var key = decode(part[1]),
              value = decode(part[2]); //
          // Prevent overriding of existing properties. This ensures that build-in
          // methods like `toString` or __proto__ are not overriden by malicious
          // querystrings.
          //
          // In the case if failed decoding, we want to omit the key/value pairs
          // from the result.
          //

          if (key === null || value === null || key in result) continue;
          result[key] = value;
        }

        return result;
      }
      /**
       * Transform a query string to an object.
       *
       * @param {Object} obj Object that should be transformed.
       * @param {String} prefix Optional prefix.
       * @returns {String}
       * @api public
       */


      function querystringify(obj, prefix) {
        prefix = prefix || '';
        var pairs = [],
            value,
            key; //
        // Optionally prefix with a '?' if needed
        //

        if ('string' !== typeof prefix) prefix = '?';

        for (key in obj) {
          if (has.call(obj, key)) {
            value = obj[key]; //
            // Edge cases where we actually want to encode the value to an empty
            // string instead of the stringified value.
            //

            if (!value && (value === null || value === undef || isNaN(value))) {
              value = '';
            }

            key = encodeURIComponent(key);
            value = encodeURIComponent(value); //
            // If we failed to encode the strings, we should bail out as we don't
            // want to add invalid strings to the query.
            //

            if (key === null || value === null) continue;
            pairs.push(key + '=' + value);
          }
        }

        return pairs.length ? prefix + pairs.join('&') : '';
      } //
      // Expose the module.
      //


      exports.stringify = querystringify;
      exports.parse = querystring;
    }, {}],
    60: [function (require, module, exports) {
      'use strict';
      /**
       * Check if we're required to add a port number.
       *
       * @see https://url.spec.whatwg.org/#default-port
       * @param {Number|String} port Port number we need to check
       * @param {String} protocol Protocol we need to check against.
       * @returns {Boolean} Is it a default port for the given protocol
       * @api private
       */

      module.exports = function required(port, protocol) {
        protocol = protocol.split(':')[0];
        port = +port;
        if (!port) return false;

        switch (protocol) {
          case 'http':
          case 'ws':
            return port !== 80;

          case 'https':
          case 'wss':
            return port !== 443;

          case 'ftp':
            return port !== 21;

          case 'gopher':
            return port !== 70;

          case 'file':
            return false;
        }

        return port !== 0;
      };
    }, {}],
    61: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var required = require('requires-port'),
            qs = require('querystringify'),
            slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/,
            protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i,
            whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]',
            left = new RegExp('^' + whitespace + '+');
        /**
         * Trim a given string.
         *
         * @param {String} str String to trim.
         * @public
         */


        function trimLeft(str) {
          return (str ? str : '').toString().replace(left, '');
        }
        /**
         * These are the parse rules for the URL parser, it informs the parser
         * about:
         *
         * 0. The char it Needs to parse, if it's a string it should be done using
         *    indexOf, RegExp using exec and NaN means set as current value.
         * 1. The property we should set when parsing this value.
         * 2. Indication if it's backwards or forward parsing, when set as number it's
         *    the value of extra chars that should be split off.
         * 3. Inherit from location if non existing in the parser.
         * 4. `toLowerCase` the resulting value.
         */


        var rules = [['#', 'hash'], // Extract from the back.
        ['?', 'query'], // Extract from the back.
        function sanitize(address) {
          // Sanitize what is left of the address
          return address.replace('\\', '/');
        }, ['/', 'pathname'], // Extract from the back.
        ['@', 'auth', 1], // Extract from the front.
        [NaN, 'host', undefined, 1, 1], // Set left over value.
        [/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
        [NaN, 'hostname', undefined, 1, 1] // Set left over.
        ];
        /**
         * These properties should not be copied or inherited from. This is only needed
         * for all non blob URL's as a blob URL does not include a hash, only the
         * origin.
         *
         * @type {Object}
         * @private
         */

        var ignore = {
          hash: 1,
          query: 1
        };
        /**
         * The location object differs when your code is loaded through a normal page,
         * Worker or through a worker using a blob. And with the blobble begins the
         * trouble as the location object will contain the URL of the blob, not the
         * location of the page where our code is loaded in. The actual origin is
         * encoded in the `pathname` so we can thankfully generate a good "default"
         * location from it so we can generate proper relative URL's again.
         *
         * @param {Object|String} loc Optional default location object.
         * @returns {Object} lolcation object.
         * @public
         */

        function lolcation(loc) {
          var globalVar;
          if (typeof window !== 'undefined') globalVar = window;else if (typeof global !== 'undefined') globalVar = global;else if (typeof self !== 'undefined') globalVar = self;else globalVar = {};
          var location = globalVar.location || {};
          loc = loc || location;
          var finaldestination = {},
              type = typeof loc,
              key;

          if ('blob:' === loc.protocol) {
            finaldestination = new Url(unescape(loc.pathname), {});
          } else if ('string' === type) {
            finaldestination = new Url(loc, {});

            for (key in ignore) delete finaldestination[key];
          } else if ('object' === type) {
            for (key in loc) {
              if (key in ignore) continue;
              finaldestination[key] = loc[key];
            }

            if (finaldestination.slashes === undefined) {
              finaldestination.slashes = slashes.test(loc.href);
            }
          }

          return finaldestination;
        }
        /**
         * @typedef ProtocolExtract
         * @type Object
         * @property {String} protocol Protocol matched in the URL, in lowercase.
         * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
         * @property {String} rest Rest of the URL that is not part of the protocol.
         */

        /**
         * Extract protocol information from a URL with/without double slash ("//").
         *
         * @param {String} address URL we want to extract from.
         * @return {ProtocolExtract} Extracted information.
         * @private
         */


        function extractProtocol(address) {
          address = trimLeft(address);
          var match = protocolre.exec(address),
              protocol = match[1] ? match[1].toLowerCase() : '',
              slashes = !!(match[2] && match[2].length >= 2),
              rest = match[2] && match[2].length === 1 ? '/' + match[3] : match[3];
          return {
            protocol: protocol,
            slashes: slashes,
            rest: rest
          };
        }
        /**
         * Resolve a relative URL pathname against a base URL pathname.
         *
         * @param {String} relative Pathname of the relative URL.
         * @param {String} base Pathname of the base URL.
         * @return {String} Resolved pathname.
         * @private
         */


        function resolve(relative, base) {
          if (relative === '') return base;
          var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
              i = path.length,
              last = path[i - 1],
              unshift = false,
              up = 0;

          while (i--) {
            if (path[i] === '.') {
              path.splice(i, 1);
            } else if (path[i] === '..') {
              path.splice(i, 1);
              up++;
            } else if (up) {
              if (i === 0) unshift = true;
              path.splice(i, 1);
              up--;
            }
          }

          if (unshift) path.unshift('');
          if (last === '.' || last === '..') path.push('');
          return path.join('/');
        }
        /**
         * The actual URL instance. Instead of returning an object we've opted-in to
         * create an actual constructor as it's much more memory efficient and
         * faster and it pleases my OCD.
         *
         * It is worth noting that we should not use `URL` as class name to prevent
         * clashes with the global URL instance that got introduced in browsers.
         *
         * @constructor
         * @param {String} address URL we want to parse.
         * @param {Object|String} [location] Location defaults for relative paths.
         * @param {Boolean|Function} [parser] Parser for the query string.
         * @private
         */


        function Url(address, location, parser) {
          address = trimLeft(address);

          if (!(this instanceof Url)) {
            return new Url(address, location, parser);
          }

          var relative,
              extracted,
              parse,
              instruction,
              index,
              key,
              instructions = rules.slice(),
              type = typeof location,
              url = this,
              i = 0; //
          // The following if statements allows this module two have compatibility with
          // 2 different API:
          //
          // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
          //    where the boolean indicates that the query string should also be parsed.
          //
          // 2. The `URL` interface of the browser which accepts a URL, object as
          //    arguments. The supplied object will be used as default values / fall-back
          //    for relative paths.
          //

          if ('object' !== type && 'string' !== type) {
            parser = location;
            location = null;
          }

          if (parser && 'function' !== typeof parser) parser = qs.parse;
          location = lolcation(location); //
          // Extract protocol information before running the instructions.
          //

          extracted = extractProtocol(address || '');
          relative = !extracted.protocol && !extracted.slashes;
          url.slashes = extracted.slashes || relative && location.slashes;
          url.protocol = extracted.protocol || location.protocol || '';
          address = extracted.rest; //
          // When the authority component is absent the URL starts with a path
          // component.
          //

          if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

          for (; i < instructions.length; i++) {
            instruction = instructions[i];

            if (typeof instruction === 'function') {
              address = instruction(address);
              continue;
            }

            parse = instruction[0];
            key = instruction[1];

            if (parse !== parse) {
              url[key] = address;
            } else if ('string' === typeof parse) {
              if (~(index = address.indexOf(parse))) {
                if ('number' === typeof instruction[2]) {
                  url[key] = address.slice(0, index);
                  address = address.slice(index + instruction[2]);
                } else {
                  url[key] = address.slice(index);
                  address = address.slice(0, index);
                }
              }
            } else if (index = parse.exec(address)) {
              url[key] = index[1];
              address = address.slice(0, index.index);
            }

            url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : ''); //
            // Hostname, host and protocol should be lowercased so they can be used to
            // create a proper `origin`.
            //

            if (instruction[4]) url[key] = url[key].toLowerCase();
          } //
          // Also parse the supplied query string in to an object. If we're supplied
          // with a custom parser as function use that instead of the default build-in
          // parser.
          //


          if (parser) url.query = parser(url.query); //
          // If the URL is relative, resolve the pathname against the base URL.
          //

          if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
            url.pathname = resolve(url.pathname, location.pathname);
          } //
          // Default to a / for pathname if none exists. This normalizes the URL
          // to always have a /
          //


          if (url.pathname.charAt(0) !== '/' && url.hostname) {
            url.pathname = '/' + url.pathname;
          } //
          // We should not add port numbers if they are already the default port number
          // for a given protocol. As the host also contains the port number we're going
          // override it with the hostname which contains no port number.
          //


          if (!required(url.port, url.protocol)) {
            url.host = url.hostname;
            url.port = '';
          } //
          // Parse down the `auth` for the username and password.
          //


          url.username = url.password = '';

          if (url.auth) {
            instruction = url.auth.split(':');
            url.username = instruction[0] || '';
            url.password = instruction[1] || '';
          }

          url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null'; //
          // The href is just the compiled result.
          //

          url.href = url.toString();
        }
        /**
         * This is convenience method for changing properties in the URL instance to
         * insure that they all propagate correctly.
         *
         * @param {String} part          Property we need to adjust.
         * @param {Mixed} value          The newly assigned value.
         * @param {Boolean|Function} fn  When setting the query, it will be the function
         *                               used to parse the query.
         *                               When setting the protocol, double slash will be
         *                               removed from the final url if it is true.
         * @returns {URL} URL instance for chaining.
         * @public
         */


        function set(part, value, fn) {
          var url = this;

          switch (part) {
            case 'query':
              if ('string' === typeof value && value.length) {
                value = (fn || qs.parse)(value);
              }

              url[part] = value;
              break;

            case 'port':
              url[part] = value;

              if (!required(value, url.protocol)) {
                url.host = url.hostname;
                url[part] = '';
              } else if (value) {
                url.host = url.hostname + ':' + value;
              }

              break;

            case 'hostname':
              url[part] = value;
              if (url.port) value += ':' + url.port;
              url.host = value;
              break;

            case 'host':
              url[part] = value;

              if (/:\d+$/.test(value)) {
                value = value.split(':');
                url.port = value.pop();
                url.hostname = value.join(':');
              } else {
                url.hostname = value;
                url.port = '';
              }

              break;

            case 'protocol':
              url.protocol = value.toLowerCase();
              url.slashes = !fn;
              break;

            case 'pathname':
            case 'hash':
              if (value) {
                var char = part === 'pathname' ? '/' : '#';
                url[part] = value.charAt(0) !== char ? char + value : value;
              } else {
                url[part] = value;
              }

              break;

            default:
              url[part] = value;
          }

          for (var i = 0; i < rules.length; i++) {
            var ins = rules[i];
            if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
          }

          url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';
          url.href = url.toString();
          return url;
        }
        /**
         * Transform the properties back in to a valid and full URL string.
         *
         * @param {Function} stringify Optional query stringify function.
         * @returns {String} Compiled version of the URL.
         * @public
         */


        function toString(stringify) {
          if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
          var query,
              url = this,
              protocol = url.protocol;
          if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
          var result = protocol + (url.slashes ? '//' : '');

          if (url.username) {
            result += url.username;
            if (url.password) result += ':' + url.password;
            result += '@';
          }

          result += url.host + url.pathname;
          query = 'object' === typeof url.query ? stringify(url.query) : url.query;
          if (query) result += '?' !== query.charAt(0) ? '?' + query : query;
          if (url.hash) result += url.hash;
          return result;
        }

        Url.prototype = {
          set: set,
          toString: toString
        }; //
        // Expose the URL parser and some additional properties that might be useful for
        // others or testing.
        //

        Url.extractProtocol = extractProtocol;
        Url.location = lolcation;
        Url.trimLeft = trimLeft;
        Url.qs = qs;
        module.exports = Url;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "querystringify": 59,
      "requires-port": 60
    }]
  }, {}, [1])(1);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
  return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");

var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;
exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
} // Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.


var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    // Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that never have a hostname.
hostlessProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that always contain a // bit.
slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
},
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;
  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  } // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916


  var queryIndex = url.indexOf('?'),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);
  var rest = url; // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"

  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);

    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];

      if (simplePath[2]) {
        this.search = simplePath[2];

        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }

      return this;
    }
  }

  var proto = protocolPattern.exec(rest);

  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  } // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.


  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';

    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c
    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.
    // find the first instance of any hostEndingChars
    var hostEnd = -1;

    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    } // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.


    var auth, atSign;

    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    } // Now we have a portion which is definitely the auth.
    // Pull that off.


    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    } // the host is the remaining to the left of the first non-host char


    hostEnd = -1;

    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    } // if we still have not hit it, then the entire thing is a host.


    if (hostEnd === -1) hostEnd = rest.length;
    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd); // pull out port.

    this.parseHost(); // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.

    this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.

    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.

    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);

      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;

        if (!part.match(hostnamePartPattern)) {
          var newpart = '';

          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          } // we test again with ASCII char only


          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);

            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }

            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }

            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host; // strip [ and ] from the hostname
    // the host field still retains them, though

    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);

      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  } // now rest is set to the post-host stuff.
  // chop off any delim chars.


  if (!unsafeProtocol[lowerProto]) {
    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) continue;
      var esc = encodeURIComponent(ae);

      if (esc === ae) {
        esc = escape(ae);
      }

      rest = rest.split(ae).join(esc);
    }
  } // chop off from the tail first.


  var hash = rest.indexOf('#');

  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }

  var qm = rest.indexOf('?');

  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);

    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }

    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }

  if (rest) this.pathname = rest;

  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  } //to support http.request


  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  } // finally, reconstruct the href based on what has been validated.


  this.href = this.format();
  return this;
}; // format a parsed object into a url string


function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function () {
  var auth = this.auth || '';

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');

    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || query && '?' + query || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':'; // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.

  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');
  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function (relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);

  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  } // hash is always overridden, no matter what.
  // even href="" will remove it.


  result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.

  if (relative.href === '') {
    result.href = result.format();
    return result;
  } // hrefs like //foo/bar always cut to the protocol.


  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);

    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') result[rkey] = relative[rkey];
    } //urlParse appends trailing / to urls like http://www.example.com


    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);

      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }

      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;

    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');

      while (relPath.length && !(relative.host = relPath.shift()));

      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }

    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port; // to support http.request

    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }

    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol]; // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.

  if (psychotic) {
    result.hostname = '';
    result.port = null;

    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
    }

    result.host = '';

    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;

      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
      }

      relative.host = null;
    }

    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath; // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    result.search = relative.search;
    result.query = relative.query; //to support http.request

    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }

    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null; //to support http.request

    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }

    result.href = result.format();
    return result;
  } // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.


  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0

  var up = 0;

  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];

    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  } // if the path is allowed to go above the root, restore leading ..s


  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back

  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || result.host && srcPath.length;

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  } //to support request.http


  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }

  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);

  if (port) {
    port = port[0];

    if (port !== ':') {
      this.port = port.substr(1);
    }

    host = host.substr(0, host.length - port.length);
  }

  if (host) this.hostname = host;
};

/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function (arg) {
    return typeof arg === 'string';
  },
  isObject: function (arg) {
    return typeof arg === 'object' && arg !== null;
  },
  isNull: function (arg) {
    return arg === null;
  },
  isNullOrUndefined: function (arg) {
    return arg == null;
  }
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = /*#__PURE__*/function () {
  function BaseClient() {
    _classCallCheck(this, BaseClient);
  }

  _createClass(BaseClient, null, [{
    key: "getClientPath",
    value: function getClientPath(options) {
      throw new Error('Client needs implementation');
    }
  }]);

  return BaseClient;
}();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
/*!***********************************************************!*\
  !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

module.exports = /*#__PURE__*/function (_BaseClient) {
  _inherits(SockJSClient, _BaseClient);

  var _super = _createSuper(SockJSClient);

  function SockJSClient(url) {
    var _this;

    _classCallCheck(this, SockJSClient);

    _this = _super.call(this);
    _this.sock = new SockJS(url);

    _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
      // are reorganized to have the same directory structure
    };

    return _this;
  }

  _createClass(SockJSClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.sock.onopen = f;
    }
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.sock.onclose = f;
    } // call f with the message string as the first argument

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.sock.onmessage = function (e) {
        f(e.data);
      };
    }
  }], [{
    key: "getClientPath",
    value: function getClientPath(options) {
      return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
    }
  }]);

  return SockJSClient;
}(BaseClient);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:8080":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:8080 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {
/* global __resourceQuery WorkerGlobalScope self */

/* eslint prefer-destructuring: off */

var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

var status = {
  isUnloading: false,
  currentHash: ''
};
var options = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  useWarningOverlay: false,
  useErrorOverlay: false,
  useProgress: false
};
var socketUrl = createSocketUrl(__resourceQuery);
self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('[WDS] Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
  'progress-update': function progressUpdate(data) {
    if (options.useProgress) {
      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMessage('Close');
  }
};
socket(socketUrl, onSocketMessage);
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:8080"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
    AllHtmlEntities = _require.AllHtmlEntities;

var entities = new AllHtmlEntities();
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
var overlayIframe = null;
var overlayDiv = null;
var lastOnOverlayDivReady = null;
ansiHTML.setColors(colors);

function createOverlayIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.id = 'webpack-dev-server-client-overlay';
  iframe.src = 'about:blank';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.bottom = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = 9999999999;
  iframe.onload = onIframeLoad;
  return iframe;
}

function addOverlayDivTo(iframe) {
  var div = iframe.contentDocument.createElement('div');
  div.id = 'webpack-dev-server-client-overlay-div';
  div.style.position = 'fixed';
  div.style.boxSizing = 'border-box';
  div.style.left = 0;
  div.style.top = 0;
  div.style.right = 0;
  div.style.bottom = 0;
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  div.style.color = '#E8E8E8';
  div.style.fontFamily = 'Menlo, Consolas, monospace';
  div.style.fontSize = 'large';
  div.style.padding = '2rem';
  div.style.lineHeight = '1.2';
  div.style.whiteSpace = 'pre-wrap';
  div.style.overflow = 'auto';
  iframe.contentDocument.body.appendChild(div);
  return div;
}

function ensureOverlayDivExists(onOverlayDivReady) {
  if (overlayDiv) {
    // Everything is ready, call the callback right away.
    onOverlayDivReady(overlayDiv);
    return;
  } // Creating an iframe may be asynchronous so we'll schedule the callback.
  // In case of multiple calls, last callback wins.


  lastOnOverlayDivReady = onOverlayDivReady;

  if (overlayIframe) {
    // We've already created it.
    return;
  } // Create iframe and, when it is ready, a div inside it.


  overlayIframe = createOverlayIframe(function () {
    overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

    lastOnOverlayDivReady(overlayDiv);
  }); // Zalgo alert: onIframeLoad() will be called either synchronously
  // or asynchronously depending on the browser.
  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

  document.body.appendChild(overlayIframe);
} // Successful compilation.


function clear() {
  if (!overlayDiv) {
    // It is not there in the first place.
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(overlayIframe);
  overlayDiv = null;
  overlayIframe = null;
  lastOnOverlayDivReady = null;
} // Compilation with errors (e.g. syntax error or missing modules).


function showMessage(messages) {
  ensureOverlayDivExists(function (div) {
    // Make it look similar to our terminal.
    div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
  });
}

module.exports = {
  clear: clear,
  showMessage: showMessage
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
/* global __webpack_dev_server_client__ */

/* eslint-disable
  camelcase
*/
// this SockJSClient is here as a default fallback, in case inline mode
// is off or the client is not injected. This will be switched to
// WebsocketClient when it becomes the default
// important: the path to SockJSClient here is made to work in the 'client'
// directory, but is updated via the webpack compilation when compiled from
// the 'client-src' directory

var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
__webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
var retries = 0;
var client = null;

var socket = function initSocket(url, handlers) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var msg = JSON.parse(data);

    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  });
};

module.exports = socket;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
/*!************************************************************!*\
  !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global self */

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

function createSocketUrl(resourceQuery, currentLocation) {
  var urlParts;

  if (typeof resourceQuery === 'string' && resourceQuery !== '') {
    // If this bundle is inlined, use the resource query to get the correct url.
    // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
    urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
    .substr(1) // replace first `&` with `?` to have a valid query string
    .replace('&', '?'), true);
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptHost = getCurrentScriptSource();
    urlParts = url.parse(scriptHost || '/', true, true);
  } // Use parameter to allow passing location in unit tests


  if (typeof currentLocation === 'string' && currentLocation !== '') {
    currentLocation = url.parse(currentLocation);
  } else {
    currentLocation = self.location;
  }

  return getSocketUrl(urlParts, currentLocation);
}
/*
 * Gets socket URL based on Script Source/Location
 * (scriptSrc: URL, location: URL) -> URL
 */


function getSocketUrl(urlParts, loc) {
  var auth = urlParts.auth,
      query = urlParts.query;
  var hostname = urlParts.hostname,
      protocol = urlParts.protocol,
      port = urlParts.port;

  if (!port || port === '0') {
    port = loc.port;
  } // check ipv4 and ipv6 `all hostname`
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384


  if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
    hostname = loc.hostname;
  } // `hostname` can be empty when the script path is relative. In that case, specifying
  // a protocol would result in an invalid URL.
  // When https is used in the app, secure websockets are always necessary
  // because the browser doesn't accept non-secure websockets.


  if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
    protocol = loc.protocol;
  } // all of these sock url params are optionally passed in through
  // resourceQuery, so we need to fall back to the default if
  // they are not provided


  var sockHost = query.sockHost || hostname;
  var sockPath = query.sockPath || '/sockjs-node';
  var sockPort = query.sockPort || port;

  if (sockPort === 'location') {
    sockPort = loc.port;
  }

  return url.format({
    protocol: protocol,
    auth: auth,
    hostname: sockHost,
    port: sockPort,
    // If sockPath is provided it'll be passed in via the resourceQuery as a
    // query param so it has to be parsed out of the querystring in order for the
    // client to open the socket to the correct location.
    pathname: sockPath
  });
}

module.exports = createSocketUrl;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!*******************************************************************!*\
  !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  } // Fall back to getting all scripts in the document.


  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];

  if (currentScript) {
    return currentScript.getAttribute('src');
  } // Fail as there was no script to use.


  throw new Error('[WDS] Failed to get current script source.');
}

module.exports = getCurrentScriptSource;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!************************************************!*\
  !*** (webpack)-dev-server/client/utils/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

var INFO = 'info';
var WARN = 'warn';
var ERROR = 'error';
var DEBUG = 'debug';
var TRACE = 'trace';
var SILENT = 'silent'; // deprecated
// TODO: remove these at major released
// https://github.com/webpack/webpack-dev-server/pull/1825

var WARNING = 'warning';
var NONE = 'none'; // Set the default log level

log.setDefaultLevel(INFO);

function setLogLevel(level) {
  switch (level) {
    case INFO:
    case WARN:
    case ERROR:
    case DEBUG:
    case TRACE:
      log.setLevel(level);
      break;
    // deprecated

    case WARNING:
      // loglevel's warning name is different from webpack's
      log.setLevel('warn');
      break;
    // deprecated

    case NONE:
    case SILENT:
      log.disableAll();
      break;

    default:
      log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
  }
}

module.exports = {
  log: log,
  setLogLevel: setLogLevel
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!******************************************************!*\
  !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global WorkerGlobalScope self */

var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log;

function reloadApp(_ref, _ref2) {
  var hotReload = _ref.hotReload,
      hot = _ref.hot,
      liveReload = _ref.liveReload;
  var isUnloading = _ref2.isUnloading,
      currentHash = _ref2.currentHash;

  if (isUnloading || !hotReload) {
    return;
  }

  if (hot) {
    log.info('[WDS] App hot update...');

    var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

    hotEmitter.emit('webpackHotUpdate', currentHash);

    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentHash), '*');
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload) {
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== 'about:') {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}

module.exports = reloadApp;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!********************************************************!*\
  !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __resourceQuery WorkerGlobalScope self */
// Send messages to the outside, so plugins can consume it.

function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, '*');
  }
}

module.exports = sendMsg;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");

module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
/* eslint-disable node/no-unsupported-features/node-builtins */


var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
  logLevel = level;
};

module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;

  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 1:
/*!**************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:8080 ./app/index.js ./styles/index.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/camiloramirez/Web Dev/desiringsubjects.github.io/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:8080");
__webpack_require__(/*! /Users/camiloramirez/Web Dev/desiringsubjects.github.io/app/index.js */"./app/index.js");
module.exports = __webpack_require__(/*! /Users/camiloramirez/Web Dev/desiringsubjects.github.io/styles/index.scss */"./styles/index.scss");


/***/ })

/******/ });