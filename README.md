#Kleiser App - FE

##Links


##Overview
 The book Fifteen Thousand Useful Phrases, published in 1910, is publically available at the gutenberg project website [http://www.gutenberg.org/ebooks/18362]. It is out of copyright, but is useful still as originally intended to be educational for those interested in increasing vocabulary and improving public speaking ability. 
 
 The phrases currently appear in isolation without supporting definitions. This app is intended to supplement these useful phrases with definitions / pronunciation / usage of these words individually. It is up to the learner to decide how to use the phrase based on the entries supplied by the Cambridge British Advanced Learner's dictionary. 

## Unresolved problems
- presently the mongodb only contains the first 100 useful phrases of section 1 in the book.
- the call to the API with each individual word happens asynchronously. At times the first response is from the second word in the phrase, causing the definitions to appear out of order, i.e. the first word's definition appears after the second word's defintion. This depends on the speed of the response from the server, as some words have lengthier defintions/alternate definitions/more or less usage examples.

##Technology used

###Frontend
-HTML
-CSS(added Hover and Open card animation from Codepen user Kriszta http://codepen.io/vajkri/pen/oxRwxy)
-Javascript
-Bootstrap

###Backend
-MongoDB
-Node.js
-Express.js

##How It Works

The book Fifteen Thousand Useful Phrases, available at http://www.gutenberg.org/ebooks/18362, is a reference book out of copyright and transcribed into numerous ebook formats. By first parsing the book in HTML format, using javascript, each phrase is stored in a mongodb database. Each document has two fields: id, phrase. With a numeric ID in ascending order as each phrase is added to the database, it was then possible to generate a random number between 1 and the collection's last id, presently 100. 

On the user's first click to show a new phrase, one phrase is retrieved from the database at random, then displayed in the app's main body. The phrase generated is then split into two strings and two requests are sent back to the express server with each of the words in separate requests. The express server's response to this is a request to the Cambridge Online Dictionary API to retrieve a definition. 

The response to this first request is an object with an attribute, entryID. This value is then used to trigger a second request to another of the API's endpoints. The response is then any number of dictionary entries that match or resemble the word used in the phrase.

The definitions are returned in html format. Lastly, the entries are appended to the main content of the page as a subsection to the phrase as header.

A click of the button, save, stores the phrase displayed on the screen in the mongodb database. 

A click on the button, show all saved phrases displays a list of saved phrases.

A click of the delete button on the listing of saved phrases deletes the selected phrase.



