# Clinic

### Docs

1. 
2. docs

### Setting up environment

1. Install **Yarn**;
2. Using terminal, navigate to the folder where the project was cloned;
3. Run **yarn install**, to download all necessary dependencies;
4. Using your code editor, I renamed the **.exemple.env** file to **.env**;
5. Using terminal run **yarn start**, to start the server on port **3334**

### Routes


1. **[Get]** -> "/" List All rules; 
2. **[Get]** -> "/rules" List All rules;
3. **[Post]** -> "/rules/:type" Create a new rule;
4. **[Get]** -> "/rules/period" List all rules in a period;
5. **[Delete]** -> "/rules/:id" Delete rule.

#### Exemple:

* Using local server with port (**3334**)

1. http://localhost:3334/ or http://localhost:3334/rules **(get)**

#### Res.json(rules)

```
[

  {
 
  "id": 1,
  "type": "daily",
  "date": null,
  "days": [],
  "hours": [
     {
     "start": "08:00",
     "end": "10:05"
     }
  }
 ]
 ```
 
 2. http://localhost:3334/rules/daily **(post)** 
 
 #### Conditions :
 * If **days** is empty and **date** is filled it is considered a specific rule. That is, registration of a specific day;
 * If **days** and **date** is empty, is considered a daily rule;
 * If **date** empty, is considered a weekly rule;
 * If a specific day has already been registered. A time check is performed for the addition of a new time.
 
 
 #### req.query 

```
	"type": daily 	

 ```
 
 
 
 #### (Daily rule, exemple) req.body  

```
{
	"date": "",
	"days": [],
	"start": "08:00", 
	"end": "10:05"	
}
 ```

#### Res.json(rules)

```
[

  {
 
  "id": 1,
  "type": "daily",
  "date": null,
  "days": [],
  "hours": [
     {
     "start": "08:00",
     "end": "10:05"
     }
  }
 ]
 ```
 
 3. http://localhost:3334/period **(get)**
 
 * This route receives two dates for the verification of the rules registered for the chosen days.
 
 
####  req.query  

```
since => 01-11-2019
until => 10-11-2019
 ```


#### Res.json(rules)

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
 
 
 4. http://localhost:3334/rules/2 **(delete)**

#### Res

```
	true 	

 ```

#### req.query 

```
	"id": 2 	

 ```

