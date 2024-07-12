import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('Adding content to the database');
    
    const jate_db = await openDB('jate', 1);

    const tx = jate_db.transaction('jate', 'readwrite');

    const store = tx.objectStore('jate');

    const request = store.put({id:1,value: content});

    const result = await request;

    console.log(`New content added ${result}`);
}

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('Getting the information from the database');

    const jate_db = await openDB('jate', 1);

    const tx = jate_db.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');

    const request =  store.getAll();

    const result = await request;

    console.log(`Results`, result);

    return result[result.length - 1].value;
}


initdb();
