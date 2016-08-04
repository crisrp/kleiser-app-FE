document.addEventListener('DOMContentLoaded', function(){
  console.log('kleiser app js FE file loaded...');

  //get elements
  var resultBox = document.querySelector('.wrap');
  var newPhraseButton = document.getElementById('go-button');
  var showSavedButton = document.getElementById('see-saved-button');
  var phraseContainer = document.querySelector('.task');
  var detailsContainer = document.querySelector('.details__inner');
  var saveButton = document.getElementById('save-button');


  // var url = 'https://infinite-harbor-70858.herokuapp.com';
  var url = 'http://localhost:3000';

  /* get new phrase from usefulphrases db */
  newPhraseButton.addEventListener('click', function (){
    document.querySelector('.wrap').classList.remove('hidden');

    $.ajax({
      url: url + '/usefulphrases',
      dataType: 'json'
    }).done(function(response) {
        console.log(response);
        var phrase = document.getElementById('phrase-text');
        phrase.innerHTML = response[0].phrase;
        var phraseText = response[0].phrase;
        var words = phraseText.split(" ");
        console.log(words);

        /* CALL TO API FOR EACH WORD IN THE PHRASE */
        for (var i= 0; i < 2; i++){
          var data = {word: words[i]};
          $.ajax({
            url: url+ '/usefulphrases/wordgetid',
            data: data,
            method: 'POST',
          }).done(function(response) {
              var returnedObject = JSON.parse(response);
              console.log(response);
              var entryId = returnedObject.results[0].entryId;
              console.log(entryId);
              var data = {entryId:entryId};
              console.log(data);
              $.ajax({
                url: url+'/usefulphrases/wordgetdef',
                data: data,
                dataType: 'json',
                method: 'POST'
              }).done(function(response){
                console.log(response);
                var htmlContent = response.entryContent;
                var definition = document.createElement('p');
                definition.innerHTML = htmlContent;
                detailsContainer.appendChild(definition);
              });
          });
        }; // for loop
      });
  }); // close show phrases listener

  saveButton.addEventListener('click', function(event){
      var phrase = document.getElementById('phrase-text').innerHTML;
      console.log("phrase 2 words: ",phrase);
      var data = {phrase: phrase};
      $.ajax({
        url: url + '/usefulphrases/save',
        method: 'POST',
        dataType: 'json',
        data: data
      }).done(function(response){
        console.log("You've saved the phrase");
        console.log(response);
      });
    });

  showSavedButton.addEventListener('click', function(){
    document.querySelector('.wrap').classList.add('hidden');
    $.ajax({
      url: url + '/usefulphrases/saved',
      dataType: 'json',
      method: 'GET'
    }).done(function(response){
        console.log(response);
      if (response.length) {
        var titleText = document.createElement('h2')
        titleText.innerHTML = "Saved Phrases";
        document.body.appendChild(titleText);
        for (var i=0; i < response.length; i++){
          var savedPhraseContainer = document.createElement('div');
          var phrase = document.createElement('h3');
          var deleteButton = document.createElement('button');
          savedPhraseContainer.classList.add('saved-phrases-container');
          savedPhraseContainer.setAttribute("id", "spc"+ response[i]._id);
          deleteButton.classList.add('delete-phrase-button');
          deleteButton.classList.add('btn');
          deleteButton.classList.add('btn-danger');
          deleteButton.setAttribute("id", response[i]._id);
          deleteButton.innerHTML = "DELETE PHRASE";
          phrase.innerHTML = response[i].phrase;
          savedPhraseContainer.appendChild(phrase);
          savedPhraseContainer.appendChild(deleteButton);

          document.body.appendChild(savedPhraseContainer);

          deleteButton.addEventListener('click', function(event){
            console.log(event);
            var data = {_id: event.srcElement.id};
            $.ajax({
              url: url + '/usefulphrases/removeSaved',
              dataType: 'json',
              method: 'DELETE',
              data: data
            }).done(function(response){
                console.log(response);
                var spc = document.getElementById('spc'+ event.srcElement.id);
                spc.classList.add('hidden');
            })
          });
        }
      } else {
          var savedPhraseContainer = document.createElement('div');
          var phrase = document.createElement('h2');
          phrase.innerHTML = "You haven't saved any phrases yet...";
          savedPhraseContainer.appendChild(phrase);
          document.body.appendChild(savedPhraseContainer);
      }
    })
  });


}); // DOM listener
