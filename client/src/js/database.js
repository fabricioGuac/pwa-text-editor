// Imports the idb dependency
import { openDB } from 'idb';

// Creates a function to start up the database
const initdb = async () =>
  // Gives the database a name and a version number
  openDB('jate', 1, {
    // Sets the database schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates an objec store for the data and an id key that will autoincrement
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Creates a function that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('Adding content to the database');
    
    // Sets a conection to the jate database version 1
    const jate_db = await openDB('jate', 1);

  // Create a new transaction with readwrite data privileges
    const tx = jate_db.transaction('jate', 'readwrite');

    // Open the object target store 
    const store = tx.objectStore('jate');

    // Uses the put method to update the item with the id 1 to the new content
    const request = store.put({id:1,value: content});

    // Gets the result of the request operation
    const result = await request;

    console.log(`New content added ${result}`);
}

// Creates a function that gets all the content from the database
export const getDb = async () => {
    console.log('Getting the information from the database');

    // Sets a conection to the jate database version 1
    const jate_db = await openDB('jate', 1);

    // Create a new transaction with readonly data privileges
    const tx = jate_db.transaction('jate', 'readonly');

    // Open the object target store 
    const store = tx.objectStore('jate');

    // Uses the getAll() method to get the data from the database
    const request =  store.getAll();

    // Gets the result of the request operation
    const result = await request;

    // Gets the result of the request operation
    console.log(`Results`, result);

    // Returns the value of the latest result from the database
    return result[result.length - 1].value;
}

// Calls the function to start the database
initdb();
