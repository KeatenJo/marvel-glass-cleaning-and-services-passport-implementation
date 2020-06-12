## This is a web application that support CRUD operations.
	Implemented in Express.js, VUE.js, HTML, CSS#
	
## Conforms to Rest API standards, as well as CORS. 

![Screenshot (30)](https://user-images.githubusercontent.com/31744894/84464508-ed219f00-ac31-11ea-8f71-baf45d3f02e0.png)
![Screenshot (31)](https://user-images.githubusercontent.com/31744894/84464513-ef83f900-ac31-11ea-9b61-46f5eb28a73f.png)
![Screenshot (32)](https://user-images.githubusercontent.com/31744894/84464519-f3178000-ac31-11ea-89d2-fb96fb500c05.png)
![Screenshot (33)](https://user-images.githubusercontent.com/31744894/84464523-f4e14380-ac31-11ea-9e72-dcfa375f7ea2.png)

# Resource Name
## Appointments


# Attributes

### _id
### Name
### Date
### Time
### Address
### Email
### Phone
### Notes



# REST Endpoints #

| HTTP Method | Name | Path |
| ------------ | ---- | --------- |
| GET | READ | /appointments |
| GET | READ (MEMBER) | /appointments/id |
| POST | Create | /appointments |
| PUT | Update | /appointments/id |
| DELETE | Delete | /appointments/id |

# SCHEMA: #
Appointments:
1. date
	* type: String
	* required: true
2. time
	* type: String
	* required: true
3. name	
	* type: String
	* required: true
4. address
	* type: String
	* required: true
5. phone
	* type: String
	* required: true
6. email
	* type: String
	* required: false
7. notes
	* type: String
	* required: true

# Heroku Link #
https://marvel-glass-cleaning-passport.herokuapp.com/public/
