// on click button display the definition
var clickDefine = document.getElementById('wordset1-define')
var definitionFirstWord = document.getElementById('p1d1');
var definitionSecondWord = document.getElementById('p1d2');
clickDefine.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('clicked');
    console.log(event);
    definitionFirstWord.removeAttribute('class','hidden');
    definitionSecondWord.removeAttribute('class','hidden');
});
