Feature: Basic search results Page Load


    Scenario: Page Load Analytics fires when a user views search result page
        Given "resultsPageTitle" is set to "NCI Search Results"
        And "searchCollection" is set to "cgov"
        And "language" is set to "en"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Search"
        And "analyticsContentGroup" is set to "Global Search"
        And "analyticsPublishedDate" is set to "02/02/2011"
        When the user navigates to "/?swKeyword=tumor"
        And the system displays "Results 1-20 of 11556 for: " "tumor" as an "h4" tag
        And browser waits
        Then there should be an analytics event with the following details
            | key                                  | value                                          |
            | type                                 | PageLoad                                       |
            | event                                | SiteWideSearchApp:Load:Results                 |
            | page.name                            | www.cancer.gov/?swKeyword=tumor                |
            | page.title                           | NCI Search Results                             |
            | page.metaTitle                       | NCI Search Results - National Cancer Institute |
            | page.language                        | english                                        |
            | page.type                            | nciAppModulePage                               |
            | page.channel                         | Search                                         |
            | page.contentGroup                    | Global Search                                  |
            | page.publishedDate                   | 02/02/2011                                     |
            | page.additionalDetails.numberResults | (int)11556                                     |
            | page.additionalDetails.searchKeyword | tumor                                          |
            | page.additionalDetails.itemsPerPage  | (int)20                                        |
            | page.additionalDetails.pageNum       | (int)1                                         |