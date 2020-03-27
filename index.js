"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var dpContext = (0, _react.createContext)();

var RDropdownButton = /*#__PURE__*/function (_Component) {
  _inherits(RDropdownButton, _Component);

  var _super = _createSuper(RDropdownButton);

  function RDropdownButton(props) {
    var _this;

    _classCallCheck(this, RDropdownButton);

    _this = _super.call(this, props);
    _this.state = {
      open: _this.props.open || false
    };
    _this.dom = (0, _react.createRef)();
    return _this;
  }

  _createClass(RDropdownButton, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
    }
  }, {
    key: "click",
    value: function click(e) {
      var parent = (0, _jquery.default)(e.target).parents('.r-dropdown-button-popup');

      if (parent.length !== 0) {
        return;
      }

      var _this$props = this.props,
          items = _this$props.items,
          _this$props$onClick = _this$props.onClick,
          onClick = _this$props$onClick === void 0 ? function () {} : _this$props$onClick;

      if (items) {
        this.toggle();
      } else {
        onClick(this.props);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.props.items;
      var disabled = this.getValue(this.props.disabled);
      var title = this.getValue(this.props.title);
      var text = this.getValue(this.props.text);
      var iconClass = this.getValue(this.props.iconClass);
      var iconStyle = this.getValue(this.props.iconStyle);
      var className = this.getValue(this.props.className);
      var badge = this.getValue(this.props.badge);
      var badgeStyle = this.getValue(this.props.badgeStyle);
      var rtl = this.getValue(this.props.rtl);
      var style = this.getValue(this.props.style);
      var open = this.state.open;
      var contextValue = { ...this.props
      };
      contextValue.toggle = this.toggle.bind(this);
      contextValue.getValue = this.getValue.bind(this);
      var props = {
        className: "r-dropdown-button ".concat(rtl ? 'rtl' : 'ltr').concat(className ? ' ' + className : ''),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, this.getValue(style)),
        disabled: disabled,
        title: title,
        ref: this.dom,
        onClick: this.click.bind(this)
      };
      return /*#__PURE__*/_react.default.createElement(dpContext.Provider, {
        value: contextValue
      }, /*#__PURE__*/_react.default.createElement("button", props, parseInt(badge) > 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: "badge",
        style: badgeStyle
      }, badge > 99 ? '+99' : badge), iconClass && /*#__PURE__*/_react.default.createElement("div", {
        className: 'button-icon ' + iconClass,
        style: {
          margin: text === undefined ? 0 : undefined,
          ...iconStyle
        }
      }), text !== undefined && text, open && Array.isArray(items) && items.length > 0 && /*#__PURE__*/_react.default.createElement(Popup, null), open && typeof items === 'function' && /*#__PURE__*/_react.default.createElement(Popup, null)));
    }
  }]);

  return RDropdownButton;
}(_react.Component);

RDropdownButton.defaultProps = {
  items: []
};

var Popup = /*#__PURE__*/function (_Component2) {
  _inherits(Popup, _Component2);

  var _super2 = _createSuper(Popup);

  function Popup(props) {
    var _this2;

    _classCallCheck(this, Popup);

    _this2 = _super2.call(this, props);
    _this2.dom = (0, _react.createRef)();
    _this2.state = {
      searchValue: ''
    };
    return _this2;
  }

  _createClass(Popup, [{
    key: "update",
    value: function update() {
      var rtl = this.context.rtl;
      var popup = (0, _jquery.default)(this.dom.current);
      var popupWidth = popup.width();
      var popupHeight = popup.height();
      var bodyWidth = window.innerWidth;
      var bodyHeight = window.innerHeight;
      var offset = popup.offset();
      var popupLeft = offset.left;
      var popupRight = popupLeft + popupWidth;
      var popupTop = offset.top;
      var popupBottom = popupTop + popupHeight;

      if (rtl && popupLeft < 0) {
        popup.css('right', popupLeft - 36);
      } else if (!rtl && popupRight > bodyWidth) {
        popup.css('left', bodyWidth - popupRight - 36);
      }

      if (popupBottom > bodyHeight) {
        popup.css({
          'bottom': '100%',
          'top': 'unset'
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "getStyle",
    value: function getStyle(style) {
      var rtl = this.context.rtl;
      return _jquery.default.extend({}, _defineProperty({
        position: 'absolute',
        zIndex: 1000,
        top: '100%',
        direction: rtl ? 'rtl' : 'ltr'
      }, rtl ? 'right' : 'left', 0), style);
    }
  }, {
    key: "getBackDropStyle",
    value: function getBackDropStyle() {
      return {
        height: '100%',
        width: '100%',
        right: 0,
        top: 0,
        position: 'fixed'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$context = this.context,
          search = _this$context.search,
          items = _this$context.items,
          toggle = _this$context.toggle,
          getValue = _this$context.getValue;
      var popupStyle = getValue(this.context.popupStyle);
      var searchValue = this.state.searchValue;
      var Items = typeof items === 'function' ? items(this.context) : items.filter(function (item) {
        if (!searchValue) {
          return true;
        }

        return item.text.indexOf(searchValue) !== -1;
      }).map(function (item, i) {
        return /*#__PURE__*/_react.default.createElement(ListItem, {
          key: i,
          item: item,
          index: i
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-dropdown-button-popup",
        ref: this.dom,
        style: this.getStyle(popupStyle)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "back-drop",
        onClick: toggle,
        style: this.getBackDropStyle()
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "for-drop",
        style: popupStyle
      }, search && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-dropdown-search"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "search-icon"
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: searchValue,
        onChange: function onChange(e) {
          return _this3.setState({
            searchValue: e.target.value
          });
        }
      })), Items));
    }
  }]);

  return Popup;
}(_react.Component);

_defineProperty(Popup, "contextType", dpContext);

var ListItem = /*#__PURE__*/function (_Component3) {
  _inherits(ListItem, _Component3);

  var _super3 = _createSuper(ListItem);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _super3.apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: "click",
    value: function click() {
      var _this$props2 = this.props,
          item = _this$props2.item,
          index = _this$props2.index;
      var _this$context2 = this.context,
          toggle = _this$context2.toggle,
          onClick = _this$context2.onClick,
          getValue = _this$context2.getValue;
      var disabled = getValue(item.disabled);

      if (disabled) {
        return;
      }

      if (item.onClick) {
        item.onClick(item, index, this.context);
      } else if (onClick) {
        onClick(item, index, this.context);
      }

      if (item.close !== false) {
        toggle();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var _this$context3 = this.context,
          checkable = _this$context3.checkable,
          rtl = _this$context3.rtl,
          getValue = _this$context3.getValue;
      var disabled = getValue(item.disabled);
      var iconClass = getValue(item.iconClass);
      var iconStyle = getValue(item.iconStyle);
      var href = getValue(item.href);
      var checked = getValue(item.checked);
      var className = getValue(item.className);
      var text = getValue(item.text);
      var Item = href ? /*#__PURE__*/_react.default.createElement("a", {
        className: "list-item".concat(className ? ' ' + className : '').concat(disabled ? ' disabled' : ''),
        href: href,
        style: {
          textAlign: rtl ? 'right' : 'left'
        }
      }, iconClass && /*#__PURE__*/_react.default.createElement("div", {
        className: 'popup-icon ' + iconClass,
        style: {
          margin: text === undefined ? 0 : undefined,
          ...iconStyle
        }
      }), text) : /*#__PURE__*/_react.default.createElement("div", {
        className: "list-item".concat(className ? ' ' + className : '').concat(disabled ? ' disabled' : ''),
        onClick: this.click.bind(this),
        style: {
          textAlign: rtl ? 'right' : 'left'
        }
      }, checked !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "check-icon",
        style: {
          opacity: checked ? 1 : 0
        }
      }), iconClass && /*#__PURE__*/_react.default.createElement("div", {
        className: 'popup-icon ' + iconClass,
        style: {
          margin: text === undefined ? 0 : undefined,
          ...iconStyle
        }
      }), text);
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, item.splitter && /*#__PURE__*/_react.default.createElement("div", {
        className: "splitter"
      }, item.splitter), Item);
    }
  }]);

  return ListItem;
}(_react.Component);

_defineProperty(ListItem, "contextType", dpContext);

var _default = RDropdownButton;
exports.default = _default;