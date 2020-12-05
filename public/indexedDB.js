
    // create budget db + bulk (pending) collectiopn

const request  = require("express");

    // activate -> 

    // saveRecord -> save to indexedDB

    // listen online and send records

    //schema
    //if online check DB
    // deal with it
    //save record to db if offline
    // back online, send to mongo and clear pending (indexedDB)
    //listen for appcoming backonline

    request.onupgradeneeded = () => {

    }


    request.onsuccess = () => {
        
    }


    request.onerror = () => {
        
    }


    request.saveRecord = () => {
        
    }

    request.checkDatabase = () => {
        
    }

    window.addEventListener("online", checkDatabase)