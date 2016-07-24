document.addEventListener('DOMContentLoaded', function(){


  console.log('kleiser app js FE file loaded...');


//get elements


var gobutton = document.getElementById('show-phrases');

var url = 'http://localhost:3000';

gobutton.addEventListener('click', function (){
  $.ajax({
    url: url + '/usefulphrases',
    dataType: 'json'
  }).done(function(response) {
    document.createElement('p')
    console.log(response);
  });
});

/************************************
get random id for phrase collection
Generate a random number between 0 and limit
presently 100 useful phrases available
**************************************/

function randomRecord(documentCount, numResults) {
  //random number between 0 - 64
  var recIdArr = [];
  for (var i = 0; i < numResults; i++){
    var recId = Math.floor(Math.random() * (documentCount - 0));
    recIdArr.push(recId);
  }
  console.log(recIdArr);
  return recIdArr;
};

//   console.log(clickDefine[0]);
// var definitionFirstWord = document.getElementById('p1d1');
// var definitionSecondWord = document.getElementById('p1d2');
// clickDefine.addEventListener(
});
