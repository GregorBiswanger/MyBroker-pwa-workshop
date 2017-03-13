(function () {
    'use strict';
    var stocks = [];
    var stockData = [];
    var db = new PouchDB('my_database');

    document.querySelector('.nav-wrapper.container').addEventListener('click', function (eventArgs) {
        if (eventArgs.srcElement.innerHTML === 'loop' ||
            eventArgs.srcElement.innerText === 'loopAktualisieren') {
            loadStockData();
        } else if (eventArgs.srcElement.innerHTML === 'add' ||
            eventArgs.srcElement.innerText === 'addHinzufügen') {
            document.getElementById('newStock').classList.remove('hide');
            document.getElementById('stocks').classList.add('hide');
        }
    });

    document.getElementById('addStock').addEventListener('click', function () {
        var stockName = document.getElementById('name').value;
        if (stockName) {
            stocks.push(stockName);

            db.get('stocks').catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: 'stocks'
                    };
                }
            }).then(function (data) {
                data.stocks = stocks;
                db.put(data);
            });

            loadStockData();
        }
        document.getElementById('name').value = '';
        document.getElementById('newStock').classList.add('hide');
        document.getElementById('stocks').classList.remove('hide');
    });

    function loadStockData() {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var response = httpRequest.response.replace('//', '');
                    var result = JSON.parse(response);
                    var quoteData = result.query.results.quote;

                    if (Array.isArray(quoteData)) {
                        stockData = quoteData;
                    } else {
                        stockData.push(quoteData);
                    }
                    renderStockUI();
                }
            }
        };

        httpRequest.open('GET', getServiceUrl());
        httpRequest.send();
    }

    function getServiceUrl() {
        var yqlQuery = 'select Name,symbol,LastTradeDate,LastTradeTime,LastTradePriceOnly,Currency,Change,ChangeinPercent from yahoo.finance.quotes where symbol in';
        var url = 'http://query.yahooapis.com/v1/public/yql?env=store://datatables.org/alltableswithkeys&format=json&q=' + yqlQuery + '("' + stocks.join(',') + '")';

        return encodeURI(url);
    }

    function renderStockUI() {
        var cardTemplate = document.getElementById('cardTemplate');
        var fragment = document.createDocumentFragment();

        stockData.forEach(function (stock) {
            var card = cardTemplate.cloneNode(true);
            card.querySelector('.card-title').textContent = stock.Name + ' (' + stock.symbol + ')';
            card.querySelector('#DateTime').textContent = stock.LastTradeDate + ' - ' + stock.LastTradeTime;
            card.querySelector('#LastTradePrice').textContent = stock.LastTradePriceOnly + ' ' + stock.Currency;
            card.querySelector('#Change').textContent = stock.Change;
            card.querySelector('#Change').className += stock.Change.indexOf('+') > -1 ? ' green' : ' red';
            card.querySelector('#ChangeinPercent').textContent = stock.ChangeinPercent;
            card.removeAttribute('hidden');
            fragment.appendChild(card);
        });

        document.getElementById('stocks').innerHTML = '';
        document.getElementById('stocks').appendChild(fragment);
    }

    db.get('stocks').catch(function (error) {
        if (error.name === 'not_found') {
            return {
                _id: 'stocks',
                stocks: ['MSFT', 'AAPL']
            };
        }
    }).then(function (data) {
        stocks = data.stocks;
        loadStockData();
    }).catch(function () {
        loadStockData();
    });

    // TODO add service worker code here
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
}());
