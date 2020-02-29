define({ "api": [
  {
    "type": "",
    "url": "src/app/Controllers/ruleController.js",
    "title": "",
    "group": "Conditions",
    "description": "<li> If it really is a date; </li>  <li> When searching for a period, it is checked whether the order of the parameters is correct;</li>  <li> When registering a rule for a specific date, it is analyzed if it has previously registered times.</li>",
    "version": "0.0.0",
    "filename": "src/app/controllers/ruleController.js",
    "groupTitle": "Conditions",
    "name": "SrcAppControllersRulecontrollerJs"
  },
  {
    "type": "",
    "url": "http://localhost:3334/rules/:type",
    "title": "",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<blockquote> <p>:type ['specific', 'daily', 'weekly'];</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_start",
            "description": "<blockquote> <p>&quot;2020-03-05 13:00:00&quot;;</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_end",
            "description": "<blockquote> <p>&quot;2020-03-05 14:05:00&quot;;</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "days",
            "description": "<blockquote> <p>[ 'Monday', 'Friday' ];</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 05-03-2020,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/models/Rule.js",
    "groupTitle": "Create",
    "name": "HttpLocalhost3334RulesType"
  },
  {
    "type": "",
    "url": "http://localhost:3334/rules/5",
    "title": "",
    "group": "Delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<blockquote> <p>5</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\ntrue",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/models/Rule.js",
    "groupTitle": "Delete",
    "name": "HttpLocalhost3334Rules5"
  },
  {
    "type": "",
    "url": "http://localhost:3334/",
    "title": "",
    "group": "List",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules stored in the constructor rules variable</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"type\": \"daily\",\n    \"date\": null,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/models/Rule.js",
    "groupTitle": "List",
    "name": "HttpLocalhost3334"
  },
  {
    "type": "",
    "url": "http://localhost:3334/rules/period",
    "title": "",
    "group": "Period",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "since",
            "description": "<blockquote> <p>&quot;2019-11-01&quot;</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "until",
            "description": "<blockquote> <p>&quot;2019-11-13&quot;</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules in a given period;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  },\n\n   {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 10-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/models/Rule.js",
    "groupTitle": "Period",
    "name": "HttpLocalhost3334RulesPeriod"
  }
] });
