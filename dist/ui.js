'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _base = require('magnet-core/base');

var _base2 = _interopRequireDefault(_base);

var _basicAuthConnect = require('basic-auth-connect');

var _basicAuthConnect2 = _interopRequireDefault(_basicAuthConnect);

var _kue3 = require('./config/kue');

var _kue4 = _interopRequireDefault(_kue3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KueUI = function (_Base) {
  _inherits(KueUI, _Base);

  function KueUI() {
    _classCallCheck(this, KueUI);

    return _possibleConstructorReturn(this, (KueUI.__proto__ || Object.getPrototypeOf(KueUI)).apply(this, arguments));
  }

  _createClass(KueUI, [{
    key: 'setup',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config, app;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = Object.assign(_kue4.default, this.config.kue, this.options);

                if (config.ui) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return');

              case 3:
                app = (0, _express2.default)(config.ui.express);


                if (config.ui.basicAuth) {
                  app.use((0, _basicAuthConnect2.default)(config.ui.basicAuth.username, config.ui.basicAuth.password));
                }

                if (config.ui.title) {
                  _kue2.default.app.set('title', config.ui.title);
                }

                app.use(_kue2.default.app);
                app.listen(config.ui.listen);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setup() {
        return _ref.apply(this, arguments);
      }

      return setup;
    }()
  }]);

  return KueUI;
}(_base2.default);

exports.default = KueUI;