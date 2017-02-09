'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _base = require('magnet-core/base');

var _base2 = _interopRequireDefault(_base);

var _kue3 = require('./config/kue');

var _kue4 = _interopRequireDefault(_kue3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import requireAll from 'require-all'
// import fs from 'mz/fs'


var MagnetKue = function (_Base) {
  _inherits(MagnetKue, _Base);

  function MagnetKue() {
    _classCallCheck(this, MagnetKue);

    return _possibleConstructorReturn(this, (MagnetKue.__proto__ || Object.getPrototypeOf(MagnetKue)).apply(this, arguments));
  }

  _createClass(MagnetKue, [{
    key: 'setup',
    value: function () {
<<<<<<< Updated upstream
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
=======
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
>>>>>>> Stashed changes
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.kueConfig = Object.assign(_kue4.default, this.config.kue, this.options);

                this.app.kue = _kue2.default.createQueue(this.kueConfig);

                // https://github.com/Automattic/kue#error-handling
                this.app.kue.on('error', function (err) {
                  _this2.log.error(err);
                });

                // https://github.com/Automattic/kue#unstable-redis-connections
<<<<<<< Updated upstream
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
                      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, ctx, done) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.t0 = done;
                                _context.next = 4;
                                return queue.process.call(_this2, _this2.app, data, ctx);

                              case 4:
                                _context.t1 = _context.sent;
                                (0, _context.t0)(null, _context.t1);
                                _context.next = 11;
                                break;

                              case 8:
                                _context.prev = 8;
                                _context.t2 = _context['catch'](0);

                                done(_context.t2);

                              case 11:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this2, [[0, 8]]);
                      }));

                      return function (_x, _x2, _x3) {
                        return _ref2.apply(this, arguments);
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
=======
                this.app.kue.watchStuckJobs(this.kueConfig.watchStuckJobsInterval);

                if (this.kueConfig.removeOnComplete) {
                  this.app.kue.on('job complete', function (id, result) {
                    _kue2.default.Job.get(id, function (err, job) {
                      if (err) {
                        _this2.log.error(err);
                        return;
                      }
                      job.remove(function (err) {
                        if (err) {
                          _this2.log.error(err);
                          return;
                        }
                        _this2.log.info('removed completed job #%d', job.id);
                      });
                    });
                  });
>>>>>>> Stashed changes
                }

                // let queues = {}
                // try {
                //   const folderPath = `${process.cwd()}/server/job_queues`
                //   await fs.exists(folderPath)
                //   queues = requireAll(folderPath)
                // } catch (err) {
                //   this.log.warn(err)
                // }

                // for (let key of Object.keys(queues)) {
                //   let queue = queues[key].default || queues[key]
                //   let name = queue.name || key
                //   let processArgs = [name]
                //   if (queue.concurrency) {
                //     processArgs.push(queue.concurrency)
                //   }
                //
                //   if (queue.process) {
                //     processArgs.push(async (data, ctx, done) => {
                //       try {
                //         done(null, await queue.process.call(this, this.app, data, ctx))
                //       } catch (err) {
                //         done(err)
                //       }
                //     })
                //   } else {
                //     this.log.warn(`No process for ${name}`)
                //   }
                //
                //   this.app.kue.process.apply(this.app.kue, processArgs)
                // }

              case 5:
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
  }, {
<<<<<<< Updated upstream
    key: 'start',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
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
        return _ref3.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'teardown',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _this3 = this,
            _arguments = arguments;
=======
    key: 'teardown',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;
>>>>>>> Stashed changes

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  _this3.app.kue.shutdown(_this3.kueConfig.shuwtdownTimeout, function (err, result) {
                    if (err) {
                      _this3.app.log.error(err);
                      reject(err);
                      return;
                    }

                    resolve(result);
                  });
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function teardown() {
<<<<<<< Updated upstream
        return _ref4.apply(this, arguments);
=======
        return _ref2.apply(this, arguments);
>>>>>>> Stashed changes
      }

      return teardown;
    }()
  }]);

  return MagnetKue;
}(_base2.default);

exports.default = MagnetKue;