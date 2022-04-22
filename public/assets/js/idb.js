// IndexedDB Connetion
// create variable to hold db connection
// the db variable will store connected database object when the connection is complete.
let db;

// establish a connection to IndexedDB database called 'pizza hunt' and set it to version 1
// request variable to act as an event listener for the database.
// the event listener is created when we open connection to the databse using indexDB.open(method)
// takes two parameters IndexedDB('name of the database you want to create', number to determine whether the database structure has changed)
const request = indexedDB.open('pizza_hunt', 1);


// Add the object store. The containter that stores the data

//this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc..)
// on-upgraded-needed
request.onupgradeneeded = function(event) {
    // save a refernce to the database
    const db = event.target.result;
    // create an object stoe (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true })
}

// upon a scuessfull request

request.onsuccess = function(event) {
    // when db is sucessfully created with its object store (from onupgradedneeded event above) or simply established a connection, save refernce to db in global variable. 
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function ti sebd akk kicak db data to api
    if (navigator.online) {
        uploadPizza();
    }
};

request.onerror = function(event) {
    //log error here
    console.log(event.target.errorCode);
};

// Pizza without internet: This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions.
    // transaction is a temporary connection to the database. this will help he IndexedDB database maintain an accurated reading of the data.
    const transaction = db.transaction(['new_pizza'], 'readwrite')

    // access the object store `new_pizza`
    const pizzaObjectStore = transaction.objectStore('new_pizza')
    
    // add record to your store with add method
    pizzaObjectStore.add(record)
}

function uploadPizza() {
    // open a transaction on your db
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access your object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // get all records from store and set to a varaible
    const getAll = pizzaObjectStore.getAll();

    // upon a successful .getAll() exeuection, run this function
    getAll.onsuccess = function () {
        // if there was data in dexedDb's store, let's send it to the api server
        if (getAll.result.lenght > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then (response => response.json())
            .then (serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                // open one more transaction
                const transaction = db.transaction(['new pizza'], 'readwrite');
                // access the new_pibbz object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                // clear all tiems in your store
                pizzaObjectStore.clear();

                alert('All saved pizzza has been submitted!');
            })
            .catch (err =>
                console.log(err))
        }
    }
}

// lisen for app coming back online
window.addEventListener('online', uploadPizza);