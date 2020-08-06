Feature: As a user, when I click on BestBets link I should be raising an analytics event so that the website owner may gather data on my user behavior.


    Scenario: Analytics fires when a user clicks on a BestBet title link with one best bet
        Given "resultsPageTitle" is set to "NCI Search Results"
        And "searchCollection" is set to "cgov"
        And "language" is set to "en"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Search"
        And "analyticsContentGroup" is set to "Global Search"
        And "analyticsPublishedDate" is set to "02/02/2011"
        When the user navigates to "/?swKeyword=ctep"
        And the system displays "Results 1-20 of 799 for: " "ctep" as an "h4" tag
        When user clicks on a title of related item number 1
        Then there should be an analytics event with the following details
            | key                   | value                                    |
            | type                  | Other                                    |
            | event                 | SitewideSearchApp:Other:BestBetClick     |
            | linkName              | BestBetResult                            |
            | data.bestBetIndex     | (int)1                                   |
            | data.bestBetUrl       | http://ctep.cancer.gov/                  |
            | data.categoryName     | Cancer Therapy Evaluation Program (CTEP) |
            | data.categoryPosition | (int)1                                   |

    Scenario: Analytics fires when a user clicks on a BestBet title link with multiple best bets
        Given "resultsPageTitle" is set to "NCI Search Results"
        And "searchCollection" is set to "cgov"
        And "language" is set to "en"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Search"
        And "analyticsContentGroup" is set to "Global Search"
        And "analyticsPublishedDate" is set to "02/02/2011"
        When the user navigates to "/?swKeyword=visual+dcis"
        When user clicks on a title of related item number 3
        Then there should be an analytics event with the following details
            | key                   | value                                |
            | type                  | Other                                |
            | event                 | SitewideSearchApp:Other:BestBetClick |
            | linkName              | BestBetResult                        |
            | data.bestBetIndex     | (int)1                               |
            | data.bestBetUrl       | http://visualsonline.cancer.gov/     |
            | data.categoryName     | Cancer Images                        |
            | data.categoryPosition | (int)2                               |
