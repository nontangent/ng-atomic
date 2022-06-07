'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.addPanel = void 0;

var _addons = require('@storybook/addons');

var _components = require('@storybook/components');

var _panel = require('./panel');

var _react = _interopRequireDefault(require('react'));

var _localFileSystemLoader = require('./local-file-system-loader');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

var ADDON_ID = 'myaddon';
var PANEL_ID = ''.concat(ADDON_ID, '/panel');

var addPanel = function addPanel() {};

exports.addPanel = addPanel;

_addons.addons.register(
  ADDON_ID,
  /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(api) {
        var loader;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                loader = new _localFileSystemLoader.LocalFileSystemLoader();

                _addons.addons.add('HTML', {
                  type: _addons.types.PANEL,
                  title: 'Component(HTML)',
                  render: function render(_ref2) {
                    var active = _ref2.active,
                      key = _ref2.key;
                    console.debug('api:', api);
                    return /*#__PURE__*/ _react['default'].createElement(
                      _components.AddonPanel,
                      {
                        active: active,
                        key: key,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _panel.EditorPanel,
                        {
                          active: active,
                          key: key,
                          language: 'html',
                          type: 'template.html',
                          loader: loader,
                          api: api,
                        }
                      )
                    );
                  },
                });

                _addons.addons.add(PANEL_ID, {
                  type: _addons.types.PANEL,
                  title: 'Component(SCSS)',
                  render: function render(_ref3) {
                    var active = _ref3.active,
                      key = _ref3.key;
                    return /*#__PURE__*/ _react['default'].createElement(
                      _components.AddonPanel,
                      {
                        active: active,
                        key: key,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _panel.EditorPanel,
                        {
                          active: active,
                          key: key,
                          language: 'scss',
                          type: 'template.scss',
                          loader: loader,
                          api: api,
                        }
                      )
                    );
                  },
                });

                _addons.addons.add('COMPONENT_TS', {
                  type: _addons.types.PANEL,
                  title: 'Component(TS)',
                  render: function render(_ref4) {
                    var active = _ref4.active,
                      key = _ref4.key;
                    return /*#__PURE__*/ _react['default'].createElement(
                      _components.AddonPanel,
                      {
                        active: active,
                        key: key,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _panel.EditorPanel,
                        {
                          active: active,
                          key: key,
                          language: 'typescript',
                          type: 'template.ts',
                          loader: loader,
                          api: api,
                        }
                      )
                    );
                  },
                });

                _addons.addons.add('MODULE_TS', {
                  type: _addons.types.PANEL,
                  title: 'Module(TS)',
                  render: function render(_ref5) {
                    var active = _ref5.active,
                      key = _ref5.key;
                    return /*#__PURE__*/ _react['default'].createElement(
                      _components.AddonPanel,
                      {
                        active: active,
                        key: key,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _panel.EditorPanel,
                        {
                          active: active,
                          key: key,
                          language: 'typescript',
                          type: 'module.ts',
                          loader: loader,
                          api: api,
                        }
                      )
                    );
                  },
                });

                _addons.addons.add('STORIES_TSX', {
                  type: _addons.types.PANEL,
                  title: 'Stories(TSX)',
                  render: function render(_ref6) {
                    var active = _ref6.active,
                      key = _ref6.key;
                    console.debug('active:', active, key);
                    return /*#__PURE__*/ _react['default'].createElement(
                      _components.AddonPanel,
                      {
                        active: active,
                        key: key,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _panel.EditorPanel,
                        {
                          active: active,
                          key: key,
                          language: 'typescript',
                          type: 'stories.ts',
                          loader: loader,
                          api: api,
                        }
                      )
                    );
                  },
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })()
);
