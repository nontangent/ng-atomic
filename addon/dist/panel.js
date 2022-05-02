"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _monacoEditor = require("monaco-editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// let id = 0;
// const PARAM_KEY = 'myAddon';
// const errorHandler = (error) => console.error(error);
// window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
// window.requestFileSystem(PERSISTENT, 1024*1024, onInit, errorHandler);
// function onInit(fs) {
//   fs.root.getFile('log.txt', {}, function(fileEntry) {
//     // Get a File object representing the file,
//     // then use FileReader to read its contents.
//     fileEntry.file(function(file) {
//        var reader = new FileReader();
//        reader.onloadend = function(e) {
//          alert('intialized!');
//          var txtArea = document.createElement('textarea');
//          txtArea.value = this.result;
//          document.body.appendChild(txtArea);
//        };
//        reader.readAsText(file);
//     }, errorHandler);
//   }, errorHandler);
// }
var MyPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(MyPanel, _React$Component);

  var _super = _createSuper(MyPanel);

  function MyPanel() {
    _classCallCheck(this, MyPanel);

    return _super.apply(this, arguments);
  }

  _createClass(MyPanel, [{
    key: "loadFile",
    value: function loadFile() {
      console.debug(''); // const [fileHandle] = await window.showOpenFilePicker();
      // const file = await fileHandle.getFile();
      // const contents = await file.text();
      // alert(contents);
      // initializeEditor(contents);

      this.initializeEditor();
      return;
    }
  }, {
    key: "initializeEditor",
    value: function initializeEditor() {
      var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var el = document.getElementById("monaco-editor-".concat(MyPanel.id));
      console.debug(el);

      var _editor = _monacoEditor.editor.create(el, {
        value: contents,
        // language: 'html',
        // lineNumbers: 'off',
        // roundedSelection: false,
        // scrollBeyondLastLine: false,
        // readOnly: false,
        theme: 'vs-dark'
      }); // setTimeout(function () {
      //   _editor.updateOptions({
      //     lineNumbers: 'on'
      //   });
      // }, 500);

    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      MyPanel.id += 1;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return _this.loadFile();
        }
      }, "start edit"), /*#__PURE__*/_react["default"].createElement("div", {
        id: "monaco-editor-".concat(MyPanel.id),
        style: {
          height: "500px"
        }
      }));
    }
  }]);

  return MyPanel;
}(_react["default"].Component);

exports.MyPanel = MyPanel;

_defineProperty(MyPanel, "id", 0);