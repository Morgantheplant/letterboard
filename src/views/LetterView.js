define(function(require, exports, module) {

  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var GridLayout = require("famous/views/GridLayout");
  var Transitionable = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  var Flipper = require('famous/views/Flipper');
  var Timer = require('famous/utilities/Timer');

  Transitionable.registerMethod('spring', SpringTransition);

  var spring = {
    method: 'spring',
    period: 500,
    dampingRatio: 0.3
  };
  


  function LetterView() {

    View.apply(this, arguments);
     this.dotHash = {}
    
    _createDots.call(this)

    this._eventInput.on('show_letter', function(data){
      this.displayLetter(data.letter)
    }.bind(this))

    this.timeBetweenEvents = 1000;

  }


  LetterView.prototype = Object.create(View.prototype);
  LetterView.prototype.constructor = LetterView;

  LetterView.DEFAULT_OPTIONS = {};
  
  


  function _createDots(){

    var grid = new GridLayout({
      dimensions: [5, 7],
      gutterSize:[1,1]
    });
    
    this.letterHash = {
      A:['0111111','1000100','1000100','1000100','0111111'],
      B:['0110110','1001001','1001001','1001001','1111111'],
      C:['0100010','1000001','1000001','1000001','0111110'],
      D:['0111110','1000001','1000001','1000001','1111111'],
      E:['1000001','1001001','1001001','1001001','1111111']
    }
    
   

    //keep track of content so we can newBoard/reassign blocks later
   
    this.dots = [];

    grid.sequenceFrom(this.dots);

    for(var i = 0, row=0, col=0; i < 35; i++){
      
      var key = col + 'key'+ row 

      var flipper = new Flipper({
        origin:[0.5,0.5]
      })
  

      var turnOn =  new Surface({
        size: [undefined, undefined],
        properties: {
          backgroundColor: "#8BD843",
        }
      })

      var turnOff =  new Surface({
        size: [undefined, undefined],
        properties: {
          backgroundColor: "#222A1E"
        }
      })

      flipper.setFront(turnOn)
      flipper.setBack(turnOff)
      
      this.dotHash[key]= {
        flipper: flipper,
        on: true,
        key: key
      }
     // console.log(col + 'key' + row)
      
      if(col===4  ){
        col = -1;
        row++
      }
      
      col++;


      this.dots.push(flipper);
      flipper.flip()
    }
    
    this.add(grid)
  }
  



  LetterView.prototype.displayLetter = function(letter){

    var letterAry = this.letterHash[letter];
    console.log(letterAry)
    nextStep.call(this)
    var end = false;
    var step = 0

    function nextStep(){

      this.chunkTimer = Timer.setTimeout(function(){         
        if(step < letterAry.length){
          callColumn.call(this, letterAry[step], end)
          nextStep.call(this)
          step++;
        }
        if(step+1 === 5){
          end = true;
        } 
      }.bind(this), this.timeBetweenEvents)
    }
  }

  function callColumn(str, end){
    var letterChunk = str.split('');
    var column = 0
    
    eachColumn.call(this, column)
   
    function eachColumn(col){

      this.shiftTimer = Timer.setTimeout(function(){
        if(+col < 5){  
          var column = '' + col
          console.log('calling letter chunk')
          letterChunk.forEach(function(item, index){
            var dot = this.dotHash[column+'key'+index]
            
            if(item==='0' && !dot.on){
              dot.flipper.flip()
              dot.on = true
            } 
            if(item==='1' && dot.on){
              dot.flipper.flip()
              dot.on = false;
            }
          }.bind(this))
          
          col++;

          eachColumn.call(this, col)
          
        }

      }.bind(this), this.timeBetweenEvents)
    }
  }  



  
  

  module.exports = LetterView;

});
