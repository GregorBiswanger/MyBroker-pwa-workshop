# MyBroker

The **MyBroker** Template should be implemented in native JavaScript.

## The MyBroker PWA
Try it with Google Chrome.  
https://gregorbiswanger.github.io/MyBroker/

## Preperations for the start
The following is required for the project:    
- [Node.js](http://www.nodejs.org "www.nodejs.org") (runs on Windows, Mac and Linux)  
- [Visual Studio Code](http://code.visualstudio.com "http://code.visualstudio.com") (runs on Windows, Mac and Linux)  
  
There has already been deposited a complete exercise project on GitHub for you:    
  
`git clone https://github.com/GregorBiswanger/NgMyBroker.git`  

Then install all necessary modules within the project with `npm install`.  

## To-do´s
You need the same default behavior of the MyBroker Web App:
- Two pages with routing
- Logic to add a new stock
- Load stock data from Web-Service (see below)
- Show stock data on dashboard
- Update stock data on a reload-button click
- Use a red or green label for the change value
  
## Bonus to-do´s
For young padawans with more experience, you can implement the next features:
- Save the stock data with the HTML5 standard database **LocalStorage**
- Implement a remove stock on dashboard
- Push a materialize **toast** for updated stocks with positive change value (see on documentation http://materializecss.com/)

## Extrem bonus Todo
For absolute Jedi Knights:
- Create a **simulation game** from this project ;)

## Dummy Web-Service
This Node.js based REST Web-Service delivers dummy stock data.  
https://stockplaceholder.herokuapp.com/api/stocks
  
### Documentation of the Web-Service
https://stockplaceholder.herokuapp.com/api-docs/

**Good luck!**