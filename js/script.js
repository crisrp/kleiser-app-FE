document.addEventListener('DOMContentLoaded', function(){
  console.log('kleiser app js FE file loaded...');
  //get elements

  var resultBox = document.querySelector('.wrap');
  var gobutton = document.getElementById('go-button');
  var phraseContainer = document.querySelector('.task');
  var firstWordDefinition = document.getElementById('defineWord1');
  var secondWordDefinition = document.getElementById('defineWord2');
  var detailsContainer = document.querySelector('.details__inner');
  resultBox.style.visibility = 'hidden';
  phraseContainer.style.visibility = 'hidden';

  // var url = 'https://infinite-harbor-70858.herokuapp.com';
  var url = 'http://localhost:3000';

  var entryIdArr = [];

  gobutton.addEventListener('click', function (){
    resultBox.style.visibility = 'hidden';
    phraseContainer.style.visibility = 'hidden';
    detailsContainer.innerHTML = "";
    $.ajax({
      url: url + '/usefulphrases',
      dataType: 'json'
    }).done(function(response) {
      console.log(response);

      var phrase = document.getElementById('phrase-text');
      phrase.innerHTML = response[0].phrase;
      resultBox.style.visibility = 'visible';
      phraseContainer.style.visibility = 'visible';

      var phraseText = response[0].phrase;
      var words = phraseText.split(" ");
      console.log(words);

      /* CALL TO API FOR EACH WORD IN THE PHRASE */
      for (var i= 0; i < 2; i++){
        var data = words[i];
        $.ajax({
          url: url+ '/usefulphrases/wordgetid',
          processData: false,
          contentType: 'text/plain',
          data: data,
          method: 'POST',
        }).done(function(response) {
            var returnedObject = JSON.parse(response);
            var entryId = returnedObject.results[0].entryId;
            console.log(entryId);
            var data = entryId;
            $.ajax({
              url: url+'/usefulphrases/wordgetdef',
              processData:false,
              contentType:'text/plain',
              data: data,
              method: 'POST'
            }).done(function(response){
              var returnedObject = JSON.parse(response);
              console.log(returnedObject);
              var htmlContent = returnedObject.entryContent;
              var definition = document.createElement('p');
              definition.innerHTML = htmlContent;
              detailsContainer.appendChild(definition);
            });
        });
      }; // for loop
    });
  }); // close show phrases listener


}); // DOM listener
