"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dpContext = /*#__PURE__*/(0, _react.createContext)();

var RDropdownButton = /*#__PURE__*/function (_Component) {
  _inherits(RDropdownButton, _Component);

  var _super = _createSuper(RDropdownButton);

  function RDropdownButton(props) {
    var _this;

    _classCallCheck(this, RDropdownButton);

    _this = _super.call(this, props);
    _this.state = {
      open: _this.props.open || false,
      searchValue: ''
    };
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.touch = 'ontouchstart' in document.documentElement;
    return _this;
  }

  _createClass(RDropdownButton, [{
    key: "toggle",
    value: function toggle() {
      var _this2 = this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.state.open;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(function () {
        if (state === _this2.state.open) {
          return;
        }

        _this2.setState({
          open: state,
          searchValue: ''
        });

        if (state) {
          (0, _jquery.default)('body').addClass('rdb-open');
        } else {
          (0, _jquery.default)('body').removeClass('rdb-open');
        }

        var onBackdropClick = _this2.props.onBackdropClick;

        if (onBackdropClick) {
          onBackdropClick(_this2.props);
        }
      }, 100);
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
    }
  }, {
    key: "click",
    value: function click(e) {
      if ((0, _jquery.default)(e.target).parents('.rdb-checkeds').length !== 0) {
        return;
      }

      var _this$props = this.props,
          items = _this$props.items,
          _this$props$onClick = _this$props.onClick,
          onClick = _this$props$onClick === void 0 ? function () {} : _this$props$onClick;

      if (items) {
        this.toggle(true);
      } else {
        onClick(this.props);
      }
    }
  }, {
    key: "showPopup",
    value: function showPopup() {
      var items = this.props.items;
      var open = this.state.open;

      if (!open) {
        return false;
      }

      if (items !== undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: "getIcon",
    value: function getIcon(icon, iconClass, iconStyle) {
      if (icon) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'rdb-icon',
          style: this.getValue(iconStyle)
        }, this.getValue(icon));
      }

      if (iconClass) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'rdb-icon ' + this.getValue(iconClass),
          style: this.getValue(iconStyle)
        });
      }

      return null;
    }
  }, {
    key: "getBadge",
    value: function getBadge(badge) {
      if (badge === undefined) {
        return null;
      }

      var badge = parseInt(this.getValue(this.props.badge));

      if (isNaN(badge)) {
        console.error('RDropdownButton => badge props is not an number');
        return null;
      }

      if (badge < 1) {
        return null;
      }

      if (badge > 99) {
        badge = '+99';
      }

      var badgeStyle = this.getValue(this.props.badgeStyle);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-badge",
        style: badgeStyle
      }, badge);
    }
  }, {
    key: "getText",
    value: function getText(text, icon) {
      if (text === undefined || text === '') {
        return '';
      }

      if (icon === null) {
        return text;
      }

      var _this$props$gap = this.props.gap,
          gap = _this$props$gap === void 0 ? 6 : _this$props$gap;
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-gap",
        style: {
          width: gap
        }
      }), text);
    }
  }, {
    key: "getHoverEnabled",
    value: function getHoverEnabled() {
      if (this.touch) {
        return false;
      }

      return this.getValue(this.props.hover);
    }
  }, {
    key: "itemClick",
    value: function itemClick(index, e) {
      if ((0, _jquery.default)(e.target).parents('.rdb-list-item-after').length !== 0) {
        return;
      }

      var item = this.items[index];
      var _this$props2 = this.props,
          onClick = _this$props2.onClick,
          checkField = _this$props2.checkField;
      var disabled = this.getValue(item.disabled);

      if (disabled) {
        return;
      }

      var checked = this.getValue(item[checkField]);

      if (item.onClick) {
        item.onClick(item, index, this.context);
      } else if (onClick) {
        onClick(item, index, this.context);
      }

      if (item.close !== false && checked === undefined) {
        this.toggle();
      }
    }
  }, {
    key: "getCaret",
    value: function getCaret() {
      var _this$props3 = this.props,
          items = _this$props3.items,
          caret = _this$props3.caret;

      if (!items || !caret) {
        return '';
      }

      if (caret === true) {
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            flex: 1
          }
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "rdb-caret default"
        }));
      }

      if (typeof caret === 'string') {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: caret
        });
      }

      return caret;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var id = this.getValue(this.props.id);
      var disabled = this.getValue(this.props.disabled);
      var title = this.getValue(this.props.title);
      var className = this.getValue(this.props.className);
      var rtl = this.getValue(this.props.rtl);
      var style = this.getValue(this.props.style);
      var icon = this.getValue(this.props.icon);
      var text = this.getValue(this.props.text);
      var Icon = this.getIcon(icon, this.props.iconClass, this.props.iconStyle);
      var Text = this.getText(text, Icon);
      var hover = this.getHoverEnabled();
      var badge = this.getValue(this.props.badge);
      var after = this.getValue(this.props.after);
      var After = after ? /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-after"
      }, after) : '';

      var _this$props4 = this.props,
          items = _this$props4.items,
          type = _this$props4.type,
          _this$props4$onClick = _this$props4.onClick,
          _onClick = _this$props4$onClick === void 0 ? function () {} : _this$props4$onClick,
          checkField = _this$props4.checkField,
          caret = _this$props4.caret;

      var searchValue = this.state.searchValue;
      var content = typeof items === 'function' ? items(this.context) : items;
      var checks = [];
      var Items;

      if (!Array.isArray(content)) {
        Items = content;
      } else {
        var filteredItems = content.filter(function (item) {
          if (item[checkField]) {
            checks.push(item);
          }

          if (!searchValue) {
            return true;
          }

          if (item.text === undefined) {
            return true;
          }

          return item.text.indexOf(searchValue) !== -1;
        });
        this.items = filteredItems;
        Items = filteredItems.map(function (item, i) {
          if (item.html) {
            return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
              key: i
            }, _this3.getValue(item.html));
          }

          return /*#__PURE__*/_react.default.createElement(ListItem, {
            key: i,
            item: item,
            index: i
          });
        });
      }

      var contextValue = { ...this.props,
        items: Items,
        getIcon: this.getIcon.bind(this),
        getText: this.getText.bind(this)
      };
      contextValue.toggle = this.toggle.bind(this);

      contextValue.SetState = function (obj) {
        return _this3.setState(obj);
      };

      contextValue.getValue = this.getValue.bind(this);
      contextValue.itemClick = this.itemClick.bind(this);
      contextValue.hover = hover;
      var props = {
        id: id,
        className: "r-dropdown-button ".concat(rtl ? 'rtl' : 'ltr').concat(className ? ' ' + className : ''),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, this.getValue(style)),
        disabled: disabled,
        title: title,
        ref: this.dom,
        onClick: this.click.bind(this),
        onMouseEnter: hover ? function () {
          return _this3.toggle(true);
        } : undefined,
        onMouseLeave: hover ? function () {
          return _this3.toggle(false);
        } : undefined,
        tabIndex: 0
      };
      var Caret = this.getCaret();
      var Badge = this.getBadge(badge);
      return /*#__PURE__*/_react.default.createElement(dpContext.Provider, {
        value: contextValue
      }, type === 'multiselect' && /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-multiselect",
        style: {
          width: props.style.width
        }
      }, /*#__PURE__*/_react.default.createElement("button", props, Icon, " ", Text, " ", Caret, " ", after, " ", Badge), checks.length !== 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: 'rdb-checkeds' + (rtl ? ' rtl' : '')
      }, checks.map(function (check) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rdb-checked",
          onClick: function onClick() {
            return _onClick(check);
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "rdb-checked-close"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "rdb-checked-text"
        }, check.text));
      }))), type !== 'multiselect' && /*#__PURE__*/_react.default.createElement("button", props, Icon, " ", Text, " ", Caret, " ", after, Badge), this.showPopup() && /*#__PURE__*/_react.default.createElement(Popup, {
        ref: this.popup
      }));
    }
  }]);

  return RDropdownButton;
}(_react.Component);

RDropdownButton.defaultProps = {
  checkField: 'checked'
};

var Popup = /*#__PURE__*/function (_Component2) {
  _inherits(Popup, _Component2);

  var _super2 = _createSuper(Popup);

  function Popup(props) {
    var _this4;

    _classCallCheck(this, Popup);

    _this4 = _super2.call(this, props);
    _this4.dom = /*#__PURE__*/(0, _react.createRef)();
    _this4.activeIndex = false;
    return _this4;
  }

  _createClass(Popup, [{
    key: "getLimit",
    value: function getLimit(dom) {
      var offset = dom.offset();
      var left = offset.left - window.pageXOffset;
      var top = offset.top - window.pageYOffset;
      var width = dom.outerWidth();
      var height = dom.outerHeight();
      var right = left + width;
      var bottom = top + height;
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: width,
        height: height
      };
    }
  }, {
    key: "update",
    value: function update() {
      var _this$context = this.context,
          rtl = _this$context.rtl,
          openRelatedTo = _this$context.openRelatedTo,
          animate = _this$context.animate,
          dropdownType = _this$context.dropdownType,
          type = _this$context.type;
      var popup = (0, _jquery.default)(this.dom.current);
      var button = type === 'multiselect' ? popup.prev().find('.r-dropdown-button') : popup.prev();
      var parent = openRelatedTo ? popup.parents(openRelatedTo) : undefined;
      parent = Array.isArray(parent) && parent.length === 0 ? undefined : parent;
      var bodyWidth = window.innerWidth;
      var bodyHeight = window.innerHeight;
      var parentLimit = parent ? this.getLimit(parent) : {
        left: 0,
        top: 0,
        right: bodyWidth,
        bottom: bodyHeight
      };

      if (parentLimit.left < 0) {
        parentLimit.left = 0;
      }

      if (parentLimit.right > bodyWidth) {
        parentLimit.right = bodyWidth;
      }

      if (parentLimit.top < 0) {
        parentLimit.top = 0;
      }

      if (parentLimit.bottom > bodyHeight) {
        parentLimit.bottom = bodyHeight;
      }

      var buttonLimit = this.getLimit(button);
      var popupLimit = this.getLimit(popup);
      var left,
          right,
          top,
          bottom,
          style = {};
      top = buttonLimit.bottom;
      bottom = top + popupLimit.height;

      if (dropdownType === 'fit') {
        style.left = buttonLimit.left;
        style.width = buttonLimit.width;
      } else if (dropdownType === 'center') {
        style.left = "calc(50% - ".concat(popupLimit.width / 2, "px)");
      } else if (rtl) {
        right = buttonLimit.right;
        left = right - popupLimit.width;

        if (left < parentLimit.left) {
          style.left = parentLimit.left;
        } else {
          style.left = left;
        }
      } else {
        left = buttonLimit.left;
        right = left + popupLimit.width;

        if (right > parentLimit.right) {
          style.left = parentLimit.right - popupLimit.width;
        } else {
          style.left = left;
        }
      }

      if (dropdownType === 'center') {
        style.top = "calc(50% - ".concat(popupLimit.height / 2, "px)");
      } else if (bottom > parentLimit.bottom) {
        if (popupLimit.height > buttonLimit.top - parentLimit.top) {
          style.top = parentLimit.bottom - popupLimit.height;
        } else {
          style.top = buttonLimit.top - popupLimit.height;
        }
      } else {
        style.top = buttonLimit.bottom;
      }

      if (animate) {
        popup.css({ ...style,
          opacity: 0,
          top: style.top + 60
        });
        popup.animate({
          top: style.top,
          opacity: 1
        }, {
          duration: 150
        });
      } else {
        popup.css(style);
      }

      popup.focus();
      (0, _jquery.default)('body').addClass('rdb-open');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var rtl = this.context.rtl;
      return {
        direction: rtl ? 'rtl' : 'ltr'
      };
    }
  }, {
    key: "getBackDropStyle",
    value: function getBackDropStyle() {
      var backdropStyle = this.context.backdropStyle;
      return {
        height: '100%',
        width: '100%',
        right: 0,
        top: 0,
        position: 'fixed',
        background: 'rgba(0,0,0,0)',
        ...backdropStyle
      };
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      console.log(e.keyCode);

      if (e.keyCode === 40) {
        e.preventDefault();
        var items = (0, _jquery.default)(this.dom.current).find('.rdb-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          this.activeIndex = 0;
          items.eq(0).addClass('active');
        } else {
          var index = active.attr('dataindex');
          index++;

          if (index >= items.length) {
            index = 0;
          }

          items.removeClass('active');
          this.activeIndex = index;
          items.eq(index).addClass('active').focus();
        }
      } else if (e.keyCode === 38) {
        e.preventDefault();
        var items = (0, _jquery.default)(this.dom.current).find('.rdb-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          this.activeIndex = items.length - 1;
          items.eq(items.length - 1).addClass('active');
        } else {
          var _index = active.attr('dataindex');

          _index--;

          if (_index < 0) {
            _index = items.length - 1;
          }

          items.removeClass('active');
          this.activeIndex = _index;
          items.eq(_index).addClass('active').focus();
        }
      } else if (e.keyCode === 13) {
        var itemClick = this.context.itemClick;

        if (this.activeIndex !== false) {
          itemClick(this.activeIndex);
        }
      } else if (e.keyCode === 27) {
        var toggle = this.context.toggle;
        toggle();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$context2 = this.context,
          search = _this$context2.search,
          items = _this$context2.items,
          toggle = _this$context2.toggle,
          getValue = _this$context2.getValue,
          rtl = _this$context2.rtl,
          hover = _this$context2.hover,
          popupClassName = _this$context2.popupClassName,
          searchValue = _this$context2.searchValue,
          SetState = _this$context2.SetState,
          placeHolder = _this$context2.placeHolder;
      var popupStyle = getValue(this.context.popupStyle);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-popup-container " + (popupClassName ? ' ' + popupClassName : '') + (rtl ? ' rtl' : ' ltr'),
        ref: this.dom,
        style: this.getStyle(),
        onMouseEnter: function onMouseEnter() {
          if (hover) {
            toggle(true);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (hover) {
            toggle(false);
          }
        },
        onKeyDown: this.keyDown.bind(this),
        tabIndex: 0
      }, !hover && /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-backdrop",
        onClick: function onClick() {
          return toggle(false);
        },
        style: this.getBackDropStyle()
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-popup",
        style: popupStyle
      }, search && /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-search"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'rdb-search-icon' + (searchValue ? ' rdb-search-icon-filled' : ''),
        onClick: function onClick() {
          _this5.setState({
            searchValue: ''
          });
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: searchValue,
        placeholder: placeHolder,
        onChange: function onChange(e) {
          if (typeof search === 'function') {
            search(e.target.value);
            return;
          }

          SetState({
            searchValue: e.target.value
          });
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-items"
      }, items)));
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
    key: "getText",
    value: function getText(text, icon) {
      if (text === undefined || text === '') {
        return '';
      }

      if (icon === null) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rdb-text",
          title: text
        }, text);
      }

      var _this$props$gap2 = this.props.gap,
          gap = _this$props$gap2 === void 0 ? 6 : _this$props$gap2;
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-gap",
        style: {
          width: gap
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-text",
        title: text
      }, text));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          item = _this$props5.item,
          index = _this$props5.index;
      var _this$context3 = this.context,
          getValue = _this$context3.getValue,
          getIcon = _this$context3.getIcon,
          itemClick = _this$context3.itemClick,
          _this$context3$gap = _this$context3.gap,
          gap = _this$context3$gap === void 0 ? 8 : _this$context3$gap,
          rtl = _this$context3.rtl,
          checkField = _this$context3.checkField;
      var disabled = getValue(item.disabled);
      var text = getValue(item.text);
      var checked = getValue(item[checkField]);
      var after = getValue(item.after);
      var After = after ? /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-list-item-after"
      }, after) : '';
      this.checked = checked;
      var Icon = getIcon(item.icon, item.iconClass, item.iconStyle);
      var Text = this.getText(text, Icon);
      var CheckIcon = checked !== undefined ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: 'rdb-check-icon' + (checked ? ' checked' : '')
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "rdb-gap",
        style: {
          width: gap
        }
      })) : null;
      var href = getValue(item.href);
      var className = getValue(item.className);
      var props = {
        className: "rdb-list-item".concat(className ? ' ' + className : '').concat(disabled ? ' disabled' : ''),
        style: getValue(item.style),
        onClick: function onClick(e) {
          return itemClick(index, e);
        },
        title: '',
        dataindex: index,
        tabIndex: 0
      };
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, item.splitter && /*#__PURE__*/_react.default.createElement("div", {
        className: 'rdb-splitter ' + (rtl ? 'rtl' : 'ltr')
      }, item.splitter), href ? /*#__PURE__*/_react.default.createElement("a", _extends({
        href: href
      }, props), Icon, Text, After) : /*#__PURE__*/_react.default.createElement("div", props, CheckIcon, Icon, Text, After));
    }
  }]);

  return ListItem;
}(_react.Component);

_defineProperty(ListItem, "contextType", dpContext);

var _default = RDropdownButton;
exports.default = _default;