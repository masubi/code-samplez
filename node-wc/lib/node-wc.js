#! /usr/bin/env node
/*!
 * wc - lib/wc.js
 * Copyright(c) 2015 masubi
 * MIT Licensed
 *
 * wc - print the number of lines, words, bytes
 * USAGE:  node index.js [-c][-m][-l][-w] filename
 * ‘-c’ Print only the byte counts.
 * ‘-m’ Print only the character counts.
 * ‘-w’ Print only the word counts.
 * ‘-l’ Print only the newline counts.
 *
 */

"use strict";

/**
 * Module dependencies.
 */
var usage = function(){
    console.log("wc - print the number of lines, words, bytes");
    console.log("USAGE:  node index.js [-c][-m][-l][-w] filename");
};

var readFile = function(filename, callback){
    var fs = require('fs');
    fs.readFile(filename, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        callback(data);
    });
};

var countWords = function(fileName){
    readFile(fileName, function(data){
        var arr=data.split(/\n/);
        var count = 0;
        arr.forEach(function(line,index){ // each line
            if(line.length >0){
                line.split(' ').forEach(function(word){
                    if(word.length>0){
                        count++;
                    }
                });
                //console.log(index+":"+index+", count:"+count +", element.length: "+line.length);
            }
        });
        console.log(count + " words");
    });
};

if(process.argv.length !== 4){
    usage();
    throw new Error("incorrect number of args");
}

var rawOption = process.argv[2];
var fileName = process.argv[3];
try {
    switch (rawOption) {
        case "-c":
            readFile(fileName, function(data){
                console.log(Buffer.byteLength(data, 'utf8')+" bytes");
            });
            break;

        case "-m":
            readFile(fileName, function(data){
                console.log(data.length + " chars");
            });
            break;

        case "-w":
            countWords(fileName);
            break;

        case "-l":
            readFile(fileName, function(data){
                // length-1 because newline chars, not necessarily # of lines
                console.log(data.split('\n').length-1 + " newlines");
            });
            break;

        default:
            throw("option not understood");
            usage();
            break;
    }
}catch(e){
    console.error(e);
    usage();
}

