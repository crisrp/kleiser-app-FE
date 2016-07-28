document.addEventListener('DOMContentLoaded', function(){
  console.log('kleiser app js FE file loaded...');
  //get elements

  var resultBox = document.querySelector('.wrap');
  var gobutton = document.getElementById('go-button');
  var showSavedButton = document.getElementById('see-saved-button');
  var phraseContainer = document.querySelector('.task');
  var detailsContainer = document.querySelector('.details__inner');
  var saveButton = document.getElementById('save-button');


  // var url = 'https://infinite-harbor-70858.herokuapp.com';
  var url = 'http://localhost:3000';

  gobutton.addEventListener('click', function (){
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

  // showSavedButton.addEventListener('click', function(){
  //   document.querySelector('.wrap').classList.add('hidden');
  //   $.ajax({
  //     url: url + '/usefulphrases/saved',
  //     dataType: 'json',
  //     method: 'GET'
  //   }).done(function(response){
  //     if (response.length) {
  //       var savedPhraseContainer = document.createElement('div');
  //       var phrase = document.createElement('h2');
  //       phrase.innerHTML = "Looks like you've saved some phrases already...";
  //       savedPhraseContainer.appendChild(phrase);
  //       document.body.appendChild(savedPhraseContainer)
  //     } else {
  //       var savedPhraseContainer = document.createElement('div');
  //       var phrase = document.createElement('h2');
  //       phrase.innerHTML = "You haven't saved any phrases yet...";
  //       savedPhraseContainer.appendChild(phrase);
  //       document.body.appendChild(savedPhraseContainer);
  //     }
  //   })
  // });

  saveButton.addEventListener('click', function(event){
    var phrase = document.getElementById('phrase-text').innerHTML;
    var data = {phrase: phrase};
    data = JSON.stringify(data);
    console.log
    $.ajax({
      url: url + '/usefulphrases/new',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response){
      console.log("response: "+ response);
      alert("You've saved the phrase");
    });
  });


}); // DOM listener
