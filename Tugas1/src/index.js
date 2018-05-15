// Import module required
// Request-promise to make request to website
const rp = require('request-promise');
// Cheerio to load HTML
const cheerio = require('cheerio');
// Fs to save file
const fs = require('fs');

// Main page to be scraped
var homepage = {
    uri: 'https://www.foxsports.com/soccer/stats',
    transform: function (body) {
        return cheerio.load(body);
    }
};

// Dictionary that contain all player data
var playerData = {};

rp(homepage)
    // Promise
    .then(($) => {
        var links = [];
        // Gather all links
        $('a').each(function() {
            var link = $(this).attr('href');
            // Only gather the player-stat link
            if ((link != undefined) && (link.includes('player-stats'))) {
                var checked = false;
                // Make links unique
                for (var i = 0; i < links.length; i++) {
                    if (links[i] === link)
                        checked = true;
                }
                // If it's not in links , push it!
                if (!checked) 
                    links.push(link);
            }
        });

        count = 0;
        // Add domain name to each link and crawl them
        for (var i = 0; i < links.length; i++) {
            fullURL = 'https://www.foxsports.com' + links[i];
            // Player page to be scraped
            var player = {
                uri: fullURL,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };

            rp(player)
                // Promise
                .then(($) => {
                    // Getter for player data using jQuery CSS Selector
                    var playerStat = {};
                    playerStat["Player Number"] = parseInt($('.wisbb_number').text().substr(1));
                    playerStat["Name"] = $('.wisbb_firstName').text() + ' ' + $('.wisbb_lastName').text();
                    playerStat["Position"] = $('.wisbb_secondaryInfo').find('span:first-child').text();
                    playerStat["Current Team"] = $('.wisbb_secondaryInfo').find('a').text();
                    if (playerStat["Current Team"] === '') {
                        playerStat["Current Team"] = 'Free Agent';
                    }
                    playerStat["Player Data"] = {
                        "Date Of Birth": $('.wisbb_playerData').find('tr:first-child').find('td').eq(1).text(),
                        "Height": $('.wisbb_playerData').find('tr').eq(1).find('td').eq(1).text().split(',')[0],
                        "Weight": $('.wisbb_playerData').find('tr').eq(1).find('td').eq(1).text().split(',')[1].replace(/\s/g, ''),
                        "From": $('.wisbb_playerData').find('tr').eq(2).find('td').eq(1).text().replace('\n', '').replace(/\s/g, ''),
                        "Nationality": $('.wisbb_playerData').find('tr').eq(3).find('td').eq(1).text().replace('\n', '').replace('\t', '').replace(/\s/g, '')
                    };
                    playerStat["Team History"] = '';
                    $('.wisbb_playerTeamHistory').each(function () {
                        playerStat["Team History"] += $(this).attr('title') + ' | ';
                    });
                    // Omit last '|' in team history
                    playerStat["Team History"] = playerStat["Team History"].substring(0, playerStat["Team History"].length - 3);
                    console.log(playerStat);
                    // Push playerStat to playerData array
                    playerData[count] = playerStat;
                    // Limit the data
                    if (count == 150) {
                        console.log(playerData);
                        // Save player data to JSON file
                        var writeStream = fs.createWriteStream('data/player.json');
                        fs.writeFileSync('data/player.json', JSON.stringify(playerData));
                        writeStream.end();
                        console.log('Data have been saved to player.json');
                        process.exit(-1);
                    }
                    count++;
                    console.log(count);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    .catch((err) => {
        console.log(err);
    });