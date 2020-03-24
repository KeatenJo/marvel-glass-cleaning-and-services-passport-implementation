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
https://marvel-glass-cleaning-services.herokuapp.com/static/
