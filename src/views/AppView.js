define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var LetterView = require('views/LetterView');

  function AppView() {
    View.apply(this, arguments);
      this.targetNumber = 200;

     _createLetter.call(this)

  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};

  
  function _createLetter(){

    var surface = new Surface({
      size:[200,200],
      properties:{
        backgroundColor:'gray'
      }
    })
    
    this.add(surface)
    
    surface.on('click', function(){
      letterView._eventInput.trigger('show_letter', {letter: 'A'})
    }.bind(this))

    var blockMod = new StateModifier({
      size:[200,350],
      origin:[0.5,0.5],
      align:[0.5,0.5]
    })

    var letterView = new LetterView()
    this.add(blockMod).add(letterView)

  }



  module.exports = AppView;
});
