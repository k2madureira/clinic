

# Clinic ![node](https://user-images.githubusercontent.com/26586585/75612422-f747e380-5b01-11ea-9213-ec9742b66a47.png)

### Structure:

```
  clinic
    |_ public
        |_ __tests__
        |_ docs
        |_ postman
    |_ src
        |_ app
            |_ config
                  |_ > database.js
            |_ controllers
                  |_ > ruleController.js
            |_ models
                  |_ > Rule.js
        |_ database
              |_ > rules.json
        |_ > app.js
        |_ > routes.js
        |_ > server.js
```

### Docs:

1. PostMan ( https://documenter.getpostman.com/view/9357385/SzKZsbor )
2. PostMan Collection ( public/postman/Clinic.postman_collection.json ) 
3. docs
4. Code Coverage ( -tests-/coverage/lcov-report/index.html )

### Setting up local environment:

1. Install **Yarn**;
2. Using terminal, navigate to the folder where the project was cloned and run:<br> **git clone https://github.com/k2madureira/clinic.git** 
3. Using terminal, access the **clinic** folder and Run **yarn install**, to download all necessary dependencies;
4. Using terminal run **yarn start**, to start the server on port **3334**;
5. For testing, the **insomnia** software is recommended;
6. To perform the unit test **yarn test**

### Tests:
- [x] **Jest**
- [x] **Code coverage**

### code formatter / Extensions:

- [x] **Eslint** (Airbnb)
- [x] **Eslint** (Visual Studio Code - Extension)
- [x] **Prettier**
- [x] **EditorConfig** (Visual Studio Code - Extension)


### Endpoints:

|Number| Type | Route | Definition |
|-|------|-------|------------|
|1| *Get* | / | List All rules |
|1.1| *Get* | /rules | List All rules |
|2| *Post* | /rules/type | Create a new Rule |
|3| *Get* | /rules/period | List All rules in a period |
|4| *Delete* | /rules/5 | Delete rule by **ID** |



#### Exemples:


1. http://localhost:3334/ or http://localhost:3334/rules **(get)**

##### Response

```
[{
  "id": 1,
  "type": "daily",
  "date": null,
  "days": [],
  "hours": [
     {
     "start": "08:00",
     "end": "10:05"
     }
  }]
 ```

 ------------------------------------------------------------

  2. http://localhost:3334/rules/daily **(post)**

 #### Conditions :
 * If **days** is empty and **date** is filled it is considered a specific rule. That is, registration of a specific day;
 * If **days** and **date** is empty, is considered a daily rule;
 * If **date** empty, is considered a weekly rule;
 * If a specific day has already been registered. A time check is performed for the addition of a new time.


 ##### req.query

```
	http://localhost:3334/rules/daily
	type: daily
	types = ['specific', 'daily', 'weekly']

 ```



 ##### Exemples req.body (JSON)

 1. Daily
```
     {
	"days": [],
	"date_start": "2020-03-05 13:00:00",
	"date_end": "2020-03-05 14:05:00"
     }
 ```

2. Weekly
```
     {
	"days": ["Sun","Mon"],
	"date_start": "2020-03-05 09:00:00",
	"date_end": "2020-03-05 10:00:00"
     }
 ```

 3. Specific
```
     {
	"days": [],
	"date_start": "2020-03-05 17:00:00",
	"date_end": "2020-03-05 18:00:00"
     }
 ```

##### Responses

1. Daily
```
   {
  	"menssage": "Successfully updated rule!",
	"update":
            [{
	      "id": 1,
	      "type": "daily",
	      "date": null,
	      "days": [],
	      "hours": [
		{
		  "start": "13:00",
		  "end": "14:05"
	    }]
    }
 ```
 2. Weekly
```
   {
  	"menssage": "Successfully updated rule!",
	"update":
            [{
	      "id": 2,
	      "type": "Weekly",
	      "date": null,
	      "days": ["Sun", "Mon"],
	      "hours": [
		{
		  "start": "09:00",
		  "end": "10:00"
	    }]
    }
 ```

 3. Specific
```
   {
  	"menssage": "Successfully updated rule!",
	"update":
            [{
	      "id": 1,
	      "type": "daily",
	      "date": "2020-03-05",
	      "days": [],
	      "hours": [
		{
		  "start": "12:40",
		  "end": "13:20"
	        },
		{
		  "start": "17:00",
		  "end": "18:00"
	        }
	    ]
    }
 ```

 ------------------------------------------------------


  3. http://localhost:3334/period **(post)**

 * This route receives two dates for the verification of the rules registered for the chosen days.


#####  req.body (JSON)

```
   {
	"since":"2019-11-01",
	"until":"2019-11-13"
   }
 ```


##### Response

```
[
  {
    "id": 2,
    "type": "specific",
    "date": "01-11-2019",
    "days": [],
    "hours": [
      {
        "start": "14:20",
        "end": "15:05"
      },
      {
        "start": "08:20",
        "end": "10:05"
      }
    ]
  },
  {
    "id": 4,
    "type": "specific",
    "date": "10-11-2019",
    "days": [],
    "hours": [
      {
        "start": "08:20",
        "end": "10:05"
      }
    ]
  },
  {
    "id": 5,
    "type": "specific",
    "date": "09-11-2019",
    "days": [],
    "hours": [
      {
        "start": "08:20",
        "end": "10:05"
      }
    ]
  }
]
 ```


 4. http://localhost:3334/rules/5 **(delete)**

##### Res

```
	true

 ```

##### req.query

```
	http://localhost:3334/rules/5
	"id": 5

 ```

