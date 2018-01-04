define({ "api": [
  {
    "type": "post",
    "url": "/music",
    "title": "Add a new music",
    "name": "CreateMusic",
    "group": "Music",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Music.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Link of the mp3 sound.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover",
            "description": "<p>Image url.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Array of names.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album",
            "description": "<p>Album name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t \"title\": \"h\",\n\t \"url\": \"test\",\n\t \"cover\": \"http://abc.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"message\": \"Success\",\n    \"data\": {\n        \"__v\": 0,\n        \"updatedAt\": \"2017-07-22T12:33:04.727Z\",\n        \"createdAt\": \"2017-07-22T12:33:04.727Z\",\n        \"title\": \"h\",\n        \"description\": \"test\",\n        \"image\": \"http://abc.com\",\n        \"_id\": \"597346007e04a312d3f5e08d\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 100 Error while finding user\n{\n  \"success\": false,\n  \"message\": \"Some technical error. Please try after some time\",\n  \"data\": {},\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/docs/music.js",
    "groupTitle": "Music"
  },
  {
    "type": "get",
    "url": "/music/",
    "title": "Get Music",
    "name": "FetchingMusicList",
    "group": "Music",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\ttotal: 1,\n\tmessage: \"Success\",\n\tdata: -[-{\n\t\t_id: \"597346007e04a312d3f5e08d\",\n\t\tupdatedAt: \"2017-07-22T12:33:04.727Z\",\n\t\tcreatedAt: \"2017-07-22T12:33:04.727Z\",\n\t\ttitle: \"h\",\n\t\turl: \"test\",\n\t\tcover: \"http://abc.com\",\n\t\t__v: 0\n\t}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 100 Error while adding\n{\n  \"success\": false,\n  \"message\": \"Server is not running.\",\n  \"data\": {},\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/docs/music.js",
    "groupTitle": "Music"
  }
] });
