define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function InputView() {
        View.apply(this, arguments);
    }

    InputView.prototype = Object.create(View.prototype);
    InputView.prototype.constructor = InputView;

    InputView.DEFAULT_OPTIONS = {};

    module.exports = InputView;
});
