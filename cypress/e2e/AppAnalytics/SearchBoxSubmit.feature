Feature: As a user, when I submit a search from the results-page search box an analytics event should be raised so the website owner can gather data on my search behavior. (issue #223)


    Scenario: Analytics fires when a user submits an edited search from the results search box
        Given "resultsPageTitle" is set to "NCI Search Results"
        And "searchCollection" is set to "cgov"
        And "language" is set to "en"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Search"
        And "analyticsContentGroup" is set to "Global Search"
        And "analyticsPublishedDate" is set to "02/02/2011"
        When the user navigates to "/?swKeyword=breast+cancer"
        And user types "lung cancer" in the results search box
        And user submits the results search box
        Then the SearchBox:Submit EDDL event is raised with previousTerm "breast cancer" and searchTerm "lung cancer"
