Feature: As a user, I want to be able to see my search results, navigate to the results items and know if an item is an infographic or video page so that I may easily find the content I am searching for

    Scenario: English Results Page
        Given the user navigates to "/?swKeyword=tumor&from=1&pageunit=20"
        And the page title is "NCI Search Results"
        And the system displays "Results for: " "tumor" as an "h3" tag
        And the system displays "Results 1-20 of 11189 for: " "tumor" as an "h4" tag
        And the system displays 20 results per page
        And each result item displays the title of an item as a link
        And each result item displays the description of an item
        And each result item displays the full URL of an item

    Scenario: Results type of infographic
        Given the user navigates to "/?swKeyword=tumor&from=1&pageunit=20"
        And the page title is "NCI Search Results"
        And the system displays "Results for: " "tumor" as an "h3" tag
        And the system displays "Results 1-20 of 11189 for: " "tumor" as an "h4" tag
        And number 1 result item displays "(Infographic)" label

    Scenario: Results type of video
        Given the user navigates to "/?swKeyword=tumor&from=1&pageunit=20"
        And the page title is "NCI Search Results"
        And the system displays "Results for: " "tumor" as an "h3" tag
        And the system displays "Results 1-20 of 11189 for: " "tumor" as an "h4" tag
        And number 5 result item displays "(Video)" label


    Scenario: Results page metadata
        Given the user navigates to "/?swKeyword=tumor&from=1&pageunit=20"
        Then "<meta name='robots' content='noindex' />" exists in the data for the page URL of "/?swKeyword=tumor&from=1&pageunit=20"