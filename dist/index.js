'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _base = require('magnet-core/dist/base');

var _base2 = _interopRequireDefault(_base);

var _kue3 = require('./config/kue');

var _kue4 = _interopRequireDefault(_kue3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MagnetKue = function (_Base) {
  _inherits(MagnetKue, _Base);

  function MagnetKue() {
    _classCallCheck(this, MagnetKue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MagnetKue).apply(this, arguments));
  }

  _createClass(MagnetKue, [{
    key: 'setup',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var queues, folderPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.kueConfig = Object.assign(_kue4.default, this.config.kue);
                queues = {};
                _context2.prev = 2;
                folderPath = process.cwd() + '/server/job_queues';
                _context2.next = 6;
                return _fs2.default.exists(folderPath);

              case 6:
                queues = (0, _requireAll2.default)(folderPath);
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                this.log.warn(_context2.t0);

              case 12:

                this.app.queue = _kue2.default.createQueue(this.kueConfig);

                // https://github.com/Automattic/kue#error-handling
                this.app.queue.on('error', function (err) {
                  _this2.log.error(err);
                });

                // https://github.com/Automattic/kue#unstable-redis-connections
                this.app.queue.watchStuckJobs(this.kueConfig.watchStuckJobsInterval);

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 18;

                _loop = function _loop() {
                  var key = _step.value;

                  var queue = queues[key].default || queues[key];
                  var name = queue.name || key;
                  var processArgs = [name];
                  if (queue.concurrency) {
                    processArgs.push(queue.concurrency);
                  }

                  if (queue.process) {
                    processArgs.push(function () {
                      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, ctx, done) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return queue.process.call(_this2, _this2.app, data, ctx);

                              case 3:
                                _context.t0 = _context.sent;
                                done(null, _context.t0);
                                _context.next = 10;
                                break;

                              case 7:
                                _context.prev = 7;
                                _context.t1 = _context['catch'](0);

                                done(_context.t1);

                              case 10:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this2, [[0, 7]]);
                      }));

                      return function (_x, _x2, _x3) {
                        return ref.apply(this, arguments);
                      };
                    }());
                  } else {
                    _this2.log.warn('No process for ' + name);
                  }

                  _this2.app.queue.process.apply(_this2.app.queue, processArgs);
                };

                for (_iterator = Object.keys(queues)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
                _context2.next = 27;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t1 = _context2['catch'](18);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 27:
                _context2.prev = 27;
                _context2.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 30:
                _context2.prev = 30;

                if (!_didIteratorError) {
                  _context2.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context2.finish(30);

              case 34:
                return _context2.finish(27);

              case 35:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9], [18, 23, 27, 35], [28,, 30, 34]]);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: 'start',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.kueConfig.listen) {
                  _kue2.default.app.listen(this.kueConfig.listen);
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start() {
        return ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'teardown',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _this3 = this,
            _arguments = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', new Promise(function (resolve, reject) {
                  _this3.app.queue.shutdown(_this3.kueConfig.listen, function (err, result) {
                    _this3.app.log.error('Kue shutdown result: ', _arguments);

                    if (err) {
                      reject(err);
                      return;
                    }

                    resolve(result);
                  });
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function teardown() {
        return ref.apply(this, arguments);
      }

      return teardown;
    }()
  }]);

  return MagnetKue;
}(_base2.default);

exports.default = MagnetKue;