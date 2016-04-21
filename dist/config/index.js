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
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var queues, exists;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queues = void 0;
                // console.log(this.config.paths, process.cwd());

                _context.prev = 1;
                _context.next = 4;
                return _fs2.default.exists(process.cwd() + '/server/queues');

              case 4:
                exists = _context.sent;

                queues = (0, _requireAll2.default)(process.cwd() + '/server/queues');
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);

                queues = [];
                throw _context.t0;

              case 12:

                this.config.kue.redis = this.config.kue.db;

                this.app.queue = _kue2.default.createQueue(this.config.kue);

                // for (let key in queues) {
                //   if (queues.hasOwnProperty(key)) {
                //     let queue = queues[key];
                //     let name = queue.name || key;
                //
                //     this.app.queue.process(name, queue.concurrency || 1, (data, done) => {
                //       try {
                //         let result = await queue.process.call(this, data);
                //         done(null, result);
                //       } catch (err) {
                //         done(err);
                //       }
                //     });
                //   }
                // }

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()
  }]);

  return MagnetKue;
}(_base2.default);

exports.default = MagnetKue;