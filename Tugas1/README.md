<h2 align="center">
  <br>
  Soccer Scrapper
  <br>
  <br>
</h2>

### Description
This program scrape data scraper for [foxsports](https://www.foxsports.com/soccer/stats).
It gathered top player's statistic with their current team, position, and many more. 

### Specifications

1. Do web scraping to gather information from a certain web page.

2. Submit script file and JSON file with a well documented and clean code script.

3. Implement a Makefile in order for the program easily build, run, and cleaned.

4. This data will be used for analysis and data visualization.

### How to Use
To run the program :
```
npm run scrape
```

### JSON Structure
```
{
    "0":{
        "Player Number":9,
        "Name":"Alexandre Lacazette",
        "Position":"Forward",
        "Current Team":"London Arsenal",
        "Player Data":{
            "Date Of Birth":"5/28/1991",
            "Height":"5'9\"",
            "Weight":"161lbs",
            "From":"Lyon,FRA",
            "Nationality":"France"
        },
        "Team History":"Arsenal | Lyon | France"
    },
    "1":{
        "Player Number":16,
        "Name":"Alphonse Aréola",
        "Position":"Goalie",
        "Current Team":"Paris Paris SG",
        "Player Data":{
            "Date Of Birth":"2/27/1993",
            "Height":"6'5\"",
            "Weight":"207lbs",
            "From":"Paris,FRA",
            "Nationality":"France"
        },
        "Team History":"Villarreal | Paris SG | France U-20 | SC Bastia | France"
    }
}
```

### Program's screenshot
![1](https://github.com/manasye/Seleksi-2018/blob/master/Tugas1/screenshots/2.PNG)
![2](https://github.com/manasye/Seleksi-2018/blob/master/Tugas1/screenshots/1.PNG)
![3](https://github.com/manasye/Seleksi-2018/blob/master/Tugas1/screenshots/3.PNG)
![4](https://github.com/manasye/Seleksi-2018/blob/master/Tugas1/screenshots/4.PNG)

### Reference
[Web Scraping with node js](https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7)<br>
[request promise](https://www.npmjs.com/package/request-promise)<br>
[cheerio](https://www.npmjs.com/package/cheerio)<br>

### Author
##### Name : Manasye Shousen Bukit
##### NIM : 13516122
##### Website : [manasyebukit.me](http://www.manasyebukit.me/)