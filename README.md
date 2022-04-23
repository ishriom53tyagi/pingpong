# pingpong

# This project contains 5 API.

1. Add players ( Two player can not have same name )
2. Get Players. ( Get each player full details )
3. Add Matches. ( Matches can be played only with the player exists ) 
4. Get Matches. ( Get all matches list , by default 5 ) ( we can also pass in query like list=10 )
5. Get Top Performers. ( Get top performers among last games , by default 5 ) ( we can also pass in query like list=10 )

# Players Name should be unique and case insenstive 
example : Shriom , sHriom , sHRiom consider same Name.

# Setting up Dev
```
git clone https://github.com/ishriom53tyagi/pingpong.git
cd pingpong/
npm install --save
```
# Building

```
npm start
```

# Testing 
```
some command 
```
# Postman Link 
```https://www.getpostman.com/collections/0fb88d83ded07b3ad059 ```

# API URL
``` 
Add players localhost:8081/add/players (POST) 

{
    "firstPlayerName" : "Shriom" ,
    "secondPlayerName" : "David"
}

Add Matches localhost:8081/add/matches (POST)

{
    "firstPlayerName" : "Shriom" ,
    "secondPlayerName" : "David",
    "firstPlayerWins" : 6 ,
    "secondPlayerWins" : 10
}

Get Player localhost:8081/getPlayer (POST)
 {
     "playerName" : "Shriom"
 }

Get Matches localhost:8081/getMatches?list=5 (GET)


Get TopPerformers localhost:8081/getTopPerformers (GET)

