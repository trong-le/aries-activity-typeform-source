![alt text](/img/logo.jpeg "Aries Integration for Typeform")


#Aries Integration for [Typeform](https://www.typeform.com/help/data-api/)

Typeform is a web-based platform where users can create online forms. Users will then be able to monitor and track answers associated with each form.

##Methods
This integration has one method that is called by default.

###1) Get Typeform Data
`getTypeformData` - Returns the question and responses of the given UID, or unique identifier, of the typeform or all typeforms. Returned format will be an array of objects. Each object are questions/answer pairs for each user 


##Configuration

###UID
The UID is the unique identifier of the typeform you want results for. The UID can be found by viewing the Typeform, NOT the edit page, and obtaining the end of the url like so: `https://astronomer.typeform.com/to/typeformUID`. To fetch all forms, set the UID equal to 'forms'.
```javascript
"uid": "AcFQ3B"
```

###API Key
The API Key is the unique key associated with your developer account. The API key can be found by going to [My Account](https://admin.typeform.com/account) and scrolling down to, Your API Key. The API key will allow you to access the typeform data created with the corresponding account.
```javascript
"apiKey": "943af478d3ff3d4d760020c11af102b79c440513"
```

###Completed
The completed field gets either only completed (=true) or not completed results (=false). This filter can be used to see who did or did not finish the typeform. By default, completed and not-completed typeforms will be returned.
```javascript
"completed": "true"
```

###Since
The since field gets results after a specific date ordered from oldest-to-newest. Format is in Unix time/timestamp. A generator can be found [here](http://www.timestampgenerator.com/)
```javascript
"since": "1441703930"
```

###Until
The until field gets results before a specific date ordered from oldest-to-newest. Format is in Unix time/timestamp. A generator can be found [here](http://www.timestampgenerator.com/)
```javascript
"until": "1441703930"
```

###Offset
The offset field gets all results except the first specified amount. Especially useful for pagination.
```javascript
"offset": "20"
```

###Limit
The limit field gets only the specified amount. Especially useful for pagination.
```javascript
"limit": "20"
```

###Token
The token field fetches a single result specified by its token.
```javascript
"token": "31f62937ba8723aa2a6198331d2ef11d"
```

###Order By
The order by includes one of the following:
* completed
	* Show not-completed results first (before completed results).
	```javascript
	"order_by": "completed"
	```
* date_land
	* Order results by when the form was loaded (i.e. “landed on”) by the respondent.
	* Default order = date ascending (oldest-to-newest). 
	```javascript
	"order_by": "date_land"
	```
* date_submit
	* Order results by when the form was submitted by the respondent.
	* Default order = date ascending (oldest-to-newest). 
	```javascript
	"order_by": "date_submit"
	```
* To have a descending order for date_land or date_submit:
```javascript
"order_by": "date_lane,desc"
```

##Raw Response
This is an example response when a query is made with only the 'completed = true' option:
```javascript
{
  "http_status": 200,
  "stats": {
	"responses": {
	  "showing": 2,
	  "total": 3,
	  "completed": 2
	}
  },
  "questions": [
	{
	  "id": "listimage_23566421_choice",
	  "question": "What is your gender?",
	  "field_id": 23566421
	},
	{
	  "id": "list_23566423_choice",
	  "question": "What is your age?",
	  "field_id": 23566423
	},
	{
	  "id": "dropdown_23566429",
	  "question": "In which country were you born?",
	  "field_id": 23566429
	},
	{
	  "id": "list_23566424_choice",
	  "question": "What is your ethnicity?",
	  "field_id": 23566424
	},
	{
	  "id": "list_23566425_choice",
	  "question": "What is your marital status?",
	  "field_id": 23566425
	},
	{
	  "id": "rating_23566431",
	  "question": "How many people, including yourself, live in your household?",
	  "field_id": 23566431
	},
	{
	  "id": "listimage_23566422_choice",
	  "question": "Which form of transport do you use the most?",
	  "field_id": 23566422
	},
	{
	  "id": "list_23566426_choice",
	  "question": "What is the highest level of education you have completed?",
	  "field_id": 23566426
	},
	{
	  "id": "dropdown_23566430",
	  "question": "Which industry do you work in or are most involved with?",
	  "field_id": 23566430
	},
	{
	  "id": "list_23566427_choice",
	  "question": "What is your income level?",
	  "field_id": 23566427
	}
  ],
  "responses": [
	{
	  "completed": "1",
	  "token": "472c8ee90347415ade3823488b0ecd78",
	  "metadata": {
		"browser": "default",
		"platform": "other",
		"date_land": "2016-06-02 21:04:34",
		"date_submit": "2016-06-02 21:04:58",
		"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
		"referer": "https://HOSTNAME.typeform.com/to/aKfEsQ",
		"network_id": "b1ac2747b7bf5b33fed5c0e8a5495kf4r3568ec7"
	  },
	  "hidden": [],
	  "answers": {
		"listimage_23566421_choice": "Female",
		"list_23566423_choice": "25 to 34",
		"dropdown_23566429": "Algeria",
		"list_23566424_choice": "American Indian",
		"list_23566425_choice": "Widowed",
		"rating_23566431": "3",
		"listimage_23566422_choice": "Bus",
		"list_23566426_choice": "Master's degree",
		"dropdown_23566430": "Computer Games",
		"list_23566427_choice": "$50,000 - $75,000"
	  }
	}
  ]
}
```

##Astronomer Formatted Response
```javascript
[
  {
    "What_is_your_gender": "Male",
    "What_is_your_age": "18 to 24",
    "What_is_the_highest_level_of_education_you_have_completed": "Bachelor's degree",
    "In_which_country_were_you_born": "United States of America",
    "What_is_your_ethnicity": "Asian",
    "What_is_your_marital_status": "Single (never married)",
    "What_is_your_height": "5'3\" - 5'7\"",
    "Which_of_the_following_brands_do_you_wear": "Nike",
    "Which_of_the_following_brands_do_you_wear_1": "Adidas",
    "Which_of_the_following_brands_do_you_wear_2": "Under Armour",
    "Which_of_the_following_brands_do_you_wear_3": "North Face",
    "How_many_shoes_have_you_bought_in_the_past_year": "1",
    "How_much_have_you_spent_on_athletic_apparel_in_the_past_year": "$101 - $150",
    "What_sports_do_you_frequently_follow": "Football",
    "What_sports_do_you_frequently_follow_1": "Basketball",
    "What_sports_do_you_frequently_follow_2": "Tennis",
    "Where_do_you_learn_about_new_athletic_products": "Television",
    "Where_do_you_learn_about_new_athletic_products_1": "Magazines",
    "Where_do_you_learn_about_new_athletic_products_2": "Friends & Family",
    "timestamp": "2016-07-12T03:43:01.319Z"
  },
  {
    "What_is_your_gender": "Male",
    "What_is_your_age": "25 to 34",
    "What_is_the_highest_level_of_education_you_have_completed": "Bachelor's degree",
    "In_which_country_were_you_born": "United States of America",
    "What_is_your_ethnicity": "White",
    "What_is_your_marital_status": "Single (never married)",
    "What_is_your_height": "5'3\" - 5'7\"",
    "Which_of_the_following_brands_do_you_wear": "Nike",
    "Which_of_the_following_brands_do_you_wear_1": "Adidas",
    "Which_of_the_following_brands_do_you_wear_2": "Under Armour",
    "How_many_shoes_have_you_bought_in_the_past_year": "2",
    "How_much_have_you_spent_on_athletic_apparel_in_the_past_year": "$101 - $150",
    "What_sports_do_you_frequently_follow": "Football",
    "What_sports_do_you_frequently_follow_1": "Basketball",
    "What_sports_do_you_frequently_follow_2": "Golf",
    "Where_do_you_learn_about_new_athletic_products": "Friends & Family",
    "timestamp": "2016-07-12T03:43:01.319Z"
  }
 ]
 ```
