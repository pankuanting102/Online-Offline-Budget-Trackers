// saveRecord -> save to indexedDB

// listen online and send records

//schema
//if online check DB
// deal with it
//save record to db if offline
// back online, send to mongo and clear pending (indexedDB)
//listen for appcoming backonline
const indexedDB =
  window.indexedDB ||
  window.mozeIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = ({ target }) => {
  let db = target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;
  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(data) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.add(data);
}

request.onerror = function(event) {
    console.log("Woops!" + event.target.errorCode)
  };

  function checkDatabase() {


    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = function() {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(() => {
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");
          store.clear();
        });
      }
    };

};

window.addEventListener("online", checkDatabase);
