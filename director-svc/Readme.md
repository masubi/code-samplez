director-svc
=======

## Description

Simple api for registering directors, updating thier information, and listing registered directors.  
The create and modify api endpoints will first authenticate against livestream api to check that a livestream_id 
correctly exists.

## Install

* npm install 

## Run

```
node index.js
```

This should start both the ajax service and the webserver which can be navigated to
via localhost:3000/static/

##REST API Calls

### Register a director
POST localhost:3000/directors

Example Body:
```JSON
{
    "livestream_id":"0",
    "full_name":"Steven ",
    "favorite_camera":"sony",
    "favorite_movies":"saving private ryna",
    "do not add":"do not add"
}
```

### update a director
POST localhost:3000/update

Example Body:
```JSON
{
    "livestream_id":"1235",
    "full_name":"Steven 2",
    "favorite_camera":"sony2",
    "favorite_movies":"saving private ryna",
    "do not add":"do not add"
}
```


NOTE:  only 'favorite_camera' and 'favorite_movies' are mutable

### list directors
GET localhost:3000/list

Example response:
```JSON
{
 "1235": {
  "full_name": "Steven ",
  "favorite_camera": "sony",
  "favorite_movies": "saving private ryna",
  "livestream_id": "1235"
 }
}
```

## Limitations/Notes
- uses fakeredis to persist an in the storage.js, this was done since didn't want to include the entire redis server
- list endpoint has some odd behavior when nothing is added

## TODO's
- unit tests!
- check livestream api for name rather than just livestream id
