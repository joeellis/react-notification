'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/jsx-no-bind */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stackedNotification = require('./stackedNotification');

var _stackedNotification2 = _interopRequireDefault(_stackedNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultBarStyleFactory(index, style) {
  return _extends({}, style, { bottom: 2 + index * 4 + 'rem' });
}

function defaultActionStyleFactory(index, style) {
  return _extends({}, style, {});
}

/**
* The notification list does not have any state, so use a
* pure function here. It just needs to return the stacked array
* of notification components.
*/
var NotificationStack = function NotificationStack(props) {
  return _react2.default.createElement(
    'div',
    { className: 'notification-list' },
    props.notifications.map(function (notification, index) {
      var isLast = index === 0 && props.notifications.length === 1;
      var dismissNow = isLast || !props.dismissInOrder;

      // Handle styles
      var barStyle = props.barStyleFactory(index, notification.barStyle, notification);
      var actionStyle = props.actionStyleFactory(index, notification.actionStyle, notification);
      var activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle, notification);

      // Allow onClick from notification stack or individual notifications
      var onClick = notification.onClick || props.onClick;
      var onDismiss = props.onDismiss;

      var dismissAfter = notification.dismissAfter;


      if (dismissAfter !== false) {
        if (dismissAfter == null) dismissAfter = props.dismissAfter;
        if (!dismissNow) dismissAfter += index * 1000;
      }

      return _react2.default.createElement(_stackedNotification2.default, _extends({}, notification, {
        key: notification.key,
        isLast: isLast,
        action: notification.action || props.action,
        dismissAfter: dismissAfter,
        onDismiss: onDismiss.bind(undefined, notification),
        onClick: onClick.bind(undefined, notification),
        activeBarStyle: activeBarStyle,
        barStyle: barStyle,
        actionStyle: actionStyle
      }));
    })
  );
};

/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types */
NotificationStack.propTypes = {
  activeBarStyleFactory: _propTypes2.default.func,
  barStyleFactory: _propTypes2.default.func,
  actionStyleFactory: _propTypes2.default.func,
  dismissInOrder: _propTypes2.default.bool,
  notifications: _propTypes2.default.array.isRequired,
  onDismiss: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func,
  action: _propTypes2.default.string
};

NotificationStack.defaultProps = {
  activeBarStyleFactory: defaultBarStyleFactory,
  barStyleFactory: defaultBarStyleFactory,
  actionStyleFactory: defaultActionStyleFactory,
  dismissInOrder: true,
  dismissAfter: 1000,
  onClick: function onClick() {}
};
/* eslint-enable no-alert, no-console */

exports.default = NotificationStack;