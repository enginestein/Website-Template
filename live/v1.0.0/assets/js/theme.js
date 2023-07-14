"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

var isRTL = function isRTL() {
  return document.querySelector('html').getAttribute('dir') === 'rtl';
};

var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};
/*eslint consistent-return: */


var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  if (str) {
    var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
    return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
  }
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var getColor = function getColor(name) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getComputedStyle(dom).getPropertyValue("--maatierra-".concat(name)).trim();
};

var getColors = function getColors(dom) {
  return {
    primary: getColor('primary', dom),
    secondary: getColor('secondary', dom),
    success: getColor('success', dom),
    info: getColor('info', dom),
    warning: getColor('warning', dom),
    danger: getColor('danger', dom),
    light: getColor('light', dom),
    dark: getColor('dark', dom)
  };
};

var getSoftColors = function getSoftColors(dom) {
  return {
    primary: getColor('soft-primary', dom),
    secondary: getColor('soft-secondary', dom),
    success: getColor('soft-success', dom),
    info: getColor('soft-info', dom),
    warning: getColor('soft-warning', dom),
    danger: getColor('soft-danger', dom),
    light: getColor('soft-light', dom),
    dark: getColor('soft-dark', dom)
  };
};

var getGrays = function getGrays(dom) {
  return {
    white: getColor('white', dom),
    100: getColor('100', dom),
    200: getColor('200', dom),
    300: getColor('300', dom),
    400: getColor('400', dom),
    500: getColor('500', dom),
    600: getColor('600', dom),
    700: getColor('700', dom),
    800: getColor('800', dom),
    900: getColor('900', dom),
    1000: getColor('1000', dom),
    1100: getColor('1100', dom),
    black: getColor('black', dom)
  };
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

var isElementIntoView = function isElementIntoView(el) {
  var position = el.getBoundingClientRect(); // checking whether fully visible

  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    return true;
  } // checking for partial visibility


  if (position.top < window.innerHeight && position.bottom >= 0) {
    return true;
  }
};

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }

  return breakpoint;
};

var getCurrentScreenBreakpoint = function getCurrentScreenBreakpoint() {
  var currentBreakpoint = '';

  if (window.innerWidth >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (window.innerWidth >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (window.innerWidth >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else {
    currentBreakpoint = 'sm';
  }

  var breakpointStartVal = breakpoints[currentBreakpoint];
  return {
    currentBreakpoint: currentBreakpoint,
    breakpointStartVal: breakpointStartVal
  };
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};
/* get Dates between */


var getDates = function getDates(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
  var duration = endDate - startDate;
  var steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, function (v, i) {
    return new Date(startDate.valueOf() + interval * i);
  });
};

var getPastDates = function getPastDates(duration) {
  var days;

  switch (duration) {
    case 'week':
      days = 7;
      break;

    case 'month':
      days = 30;
      break;

    case 'year':
      days = 365;
      break;

    default:
      days = duration;
  }

  var date = new Date();
  var endDate = date;
  var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};
/* Get Random Number */


var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var utils = {
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  getColor: getColor,
  getColors: getColors,
  getSoftColors: getSoftColors,
  getGrays: getGrays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace,
  getDates: getDates,
  getPastDates: getPastDates,
  getRandomNumber: getRandomNumber,
  getCurrentScreenBreakpoint: getCurrentScreenBreakpoint,
  breakpoints: breakpoints,
  isElementIntoView: isElementIntoView,
  isRTL: isRTL
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
      is = _window.is;
  var html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};
/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/


var DomNode = /*#__PURE__*/function () {
  function DomNode(node) {
    _classCallCheck(this, DomNode);

    this.node = node;
  }

  _createClass(DomNode, [{
    key: "addClass",
    value: function addClass(className) {
      this.isValidNode() && this.node.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.isValidNode() && this.node.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.isValidNode() && this.node.classList.toggle(className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      this.isValidNode() && this.node.classList.contains(className);
    }
  }, {
    key: "data",
    value: function data(key) {
      if (this.isValidNode()) {
        try {
          return JSON.parse(this.node.dataset[this.camelize(key)]);
        } catch (e) {
          return this.node.dataset[this.camelize(key)];
        }
      }

      return null;
    }
  }, {
    key: "attr",
    value: function attr(name) {
      return this.isValidNode() && this.node[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.isValidNode() && this.node.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this.isValidNode() && this.node.removeAttribute(name);
    }
  }, {
    key: "setProp",
    value: function setProp(name, value) {
      this.isValidNode() && (this.node[name] = value);
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      this.isValidNode() && this.node.addEventListener(event, cb);
    }
  }, {
    key: "isValidNode",
    value: function isValidNode() {
      return !!this.node;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "camelize",
    value: function camelize(str) {
      var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
      return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
    }
  }]);

  return DomNode;
}();
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


var navbarInit = function navbarInit() {
  var Selector = {
    NAVBAR: '[data-navbar-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  var ClassNames = {
    COLLAPSED: 'collapsed'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var DataKey = {
    NAVBAR_ON_SCROLL: 'navbar-on-scroll'
  };
  var navbar = document.querySelector(Selector.NAVBAR);

  if (navbar) {
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
    var name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
    var colorName = name || 'light';
    var color = utils.getColor(colorName);
    var bgClassName = "bg-".concat(colorName);
    var shadowName = 'shadow-transition';
    var colorRgb = utils.hexToRgb(color);

    var _window$getComputedSt = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt.backgroundImage;

    var transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 5;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
      alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? navbar.classList.add(shadowName) : navbar.classList.remove(shadowName);
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.classList.add(bgClassName);
        navbar.classList.add(shadowName);
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(bgClassName);
      navbar.classList.add(shadowName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      navbar.classList.remove(bgClassName);
      navbar.classList.remove(shadowName);
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = 'none';
    });
  }
};
/*-----------------------------------------------
|    Zanimation
-----------------------------------------------*/

/*
global CustomEase, gsap
*/


CustomEase.create('CubicBezier', '.77,0,.18,1');
/*-----------------------------------------------
|   Global Functions
-----------------------------------------------*/

var zanimationInit = function zanimationInit() {
  var filterBlur = function filterBlur() {
    var blur = 'blur(5px)'; // (window.is.iphone() || window.is.ipad() || window.is.ipod() && window.is.firefox())
    // || (window.is.mac() && window.is.firefox())

    var isIpadIphoneMacFirefox = (window.is.ios() || window.is.mac()) && window.is.firefox();

    if (isIpadIphoneMacFirefox) {
      blur = 'blur(0px)';
    }

    return blur;
  };

  var zanimationEffects = {
    "default": {
      from: {
        opacity: 0,
        y: 70
      },
      to: {
        opacity: 1,
        y: 0
      },
      ease: 'CubicBezier',
      duration: 0.8,
      delay: 0
    },
    'slide-down': {
      from: {
        opacity: 0,
        y: -70
      },
      to: {
        opacity: 1,
        y: 0
      },
      ease: 'CubicBezier',
      duration: 0.8,
      delay: 0
    },
    'slide-left': {
      from: {
        opacity: 0,
        x: 70
      },
      to: {
        opacity: 1,
        x: 0
      },
      ease: 'CubicBezier',
      duration: 0.8,
      delay: 0
    },
    'slide-right': {
      from: {
        opacity: 0,
        x: -70
      },
      to: {
        opacity: 1,
        x: 0
      },
      ease: 'CubicBezier',
      duration: 0.8,
      delay: 0
    },
    'zoom-in': {
      from: {
        scale: 0.9,
        opacity: 0,
        filter: filterBlur()
      },
      to: {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      },
      delay: 0,
      ease: 'CubicBezier',
      duration: 0.8
    },
    'zoom-out': {
      from: {
        scale: 1.1,
        opacity: 1,
        filter: filterBlur()
      },
      to: {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      },
      delay: 0,
      ease: 'CubicBezier',
      duration: 0.8
    },
    'zoom-out-slide-right': {
      from: {
        scale: 1.1,
        opacity: 1,
        x: -70,
        filter: filterBlur()
      },
      to: {
        scale: 1,
        opacity: 1,
        x: 0,
        filter: 'blur(0px)'
      },
      delay: 0,
      ease: 'CubicBezier',
      duration: 0.8
    },
    'zoom-out-slide-left': {
      from: {
        scale: 1.1,
        opacity: 1,
        x: 70,
        filter: filterBlur()
      },
      to: {
        scale: 1,
        opacity: 1,
        x: 0,
        filter: 'blur(0px)'
      },
      delay: 0,
      ease: 'CubicBezier',
      duration: 0.8
    },
    'blur-in': {
      from: {
        opacity: 0,
        filter: filterBlur()
      },
      to: {
        opacity: 1,
        filter: 'blur(0px)'
      },
      delay: 0,
      ease: 'CubicBezier',
      duration: 0.8
    }
  }; // if (utils.isRTL()) {
  //   Object.keys(zanimationEffects).forEach((key) => {
  //     if (zanimationEffects[key].from.x) {
  //       zanimationEffects[key].from.x = -zanimationEffects[key].from.x;
  //     }
  //   });
  // }

  var currentBreakpointName = utils.getCurrentScreenBreakpoint().currentBreakpoint;
  var currentBreakpointVal = utils.getCurrentScreenBreakpoint().breakpointStartVal;

  var zanimation = function zanimation(el, callback) {
    /*-----------------------------------------------
    |   Get Controller
    -----------------------------------------------*/
    var controllerZanim;

    var getController = function getController(element) {
      var options = {};
      var controller = {};

      if (element.hasAttribute("data-zanim-".concat(currentBreakpointName))) {
        controllerZanim = "zanim-".concat(currentBreakpointName);
      } else {
        /*-----------------------------------------------
        |   Set the mobile first Animation
        -----------------------------------------------*/
        var animationBreakpoints = [];
        var attributes = element.getAttributeNames();
        attributes.forEach(function (attribute) {
          if (attribute !== 'data-zanim-trigger' && attribute.startsWith('data-zanim-')) {
            var breakPointName = attribute.split('data-zanim-')[1];

            if (utils.breakpoints[breakPointName] < currentBreakpointVal) {
              animationBreakpoints.push({
                name: breakPointName,
                size: utils.breakpoints[breakPointName]
              });
            }
          }
        });
        controllerZanim = undefined;

        if (animationBreakpoints.length !== 0) {
          animationBreakpoints = animationBreakpoints.sort(function (a, b) {
            return a.size - b.size;
          });
          var activeBreakpoint = animationBreakpoints.pop();
          controllerZanim = "zanim-".concat(activeBreakpoint.name);
        }
      }

      var userOptions = utils.getData(element, controllerZanim);
      controller = window._.merge(options, userOptions);

      if (!(controllerZanim === undefined)) {
        if (userOptions.animation) {
          options = zanimationEffects[userOptions.animation];
        } else {
          options = zanimationEffects["default"];
        }
      }

      if (controllerZanim === undefined) {
        options = {
          delay: 0,
          duration: 0,
          ease: 'Expo.easeOut',
          from: {},
          to: {}
        };
      }
      /*-----------------------------------------------
      |   populating the controller
      -----------------------------------------------*/


      if (!controller.delay) {
        controller.delay = options.delay;
      }

      if (!controller.duration) {
        controller.duration = options.duration;
      }

      if (!controller.from) {
        controller.from = options.from;
      }

      if (!controller.to) {
        controller.to = options.to;
      }

      if (controller.ease) {
        controller.to.ease = controller.ease;
      } else {
        controller.to.ease = options.ease;
      }

      return controller;
    };
    /*-----------------------------------------------
    |   End of Get Controller
    -----------------------------------------------*/

    /*-----------------------------------------------
    |   For Timeline
    -----------------------------------------------*/


    var zanimTimeline = el.hasAttribute('data-zanim-timeline');

    if (zanimTimeline) {
      var timelineOption = utils.getData(el, 'zanim-timeline');
      var timeline = gsap.timeline(timelineOption); // const timeline = new TimelineMax(zanimTimeline);

      var timelineElements = el.querySelectorAll('[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]');
      timelineElements.forEach(function (timelineEl) {
        var controller = getController(timelineEl);
        timeline.fromTo(timelineEl, controller.duration, controller.from, controller.to, controller.delay).pause();
        window.imagesLoaded(timelineEl, callback(timeline));
      });
    } else if (!el.closest('[data-zanim-timeline]')) {
      /*-----------------------------------------------
      |   For single elements outside timeline
      -----------------------------------------------*/
      var controller = getController(el);
      callback(gsap.fromTo(el, controller.duration, controller.from, controller.to).delay(controller.delay).pause());
    }

    callback(gsap.timeline());
  };
  /*-----------------------------------------------
  |   Triggering zanimation when the element enters in the view
  -----------------------------------------------*/


  var triggerZanimation = function triggerZanimation() {
    var triggerElement = document.querySelectorAll("[data-zanim-trigger = 'scroll']");
    triggerElement.forEach(function (el) {
      if (utils.isElementIntoView(el) && el.hasAttribute('data-zanim-trigger')) {
        zanimation(el, function (animation) {
          return animation.play();
        });

        if (!document.querySelector('[zanim-repeat]')) {
          el.removeAttribute('data-zanim-trigger');
        }
      }
    });
  };

  triggerZanimation();
  window.addEventListener('scroll', function () {
    return triggerZanimation();
  });
};
/* -------------------------------------------------------------------------- */

/*                            Theme Initialization                            */

/* -------------------------------------------------------------------------- */


docReady(navbarInit);
docReady(detectorInit);
docReady(zanimationInit);
//# sourceMappingURL=theme.js.map
