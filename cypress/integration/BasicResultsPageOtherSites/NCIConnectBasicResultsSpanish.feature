Feature: As a user, I want to be able to see my search results when on Spanish NCI-Connect, navigate to the results items and know if an item is an infographic or video page so that I may easily find the content I am searching for.

    Background:
        Given "searchCollection" is set to "doc"
        And "searchSiteFilter" is set to "www.cancer.gov/rare-brain-spine-tumor"
        And "title" is set to "NCI-Connect Resultados"
        And "glossaryEndpoint" is set to "null"
        And "language" is set to "es"

    Scenario: NCI-Connect Results Page
        Given the user navigates to "/?swKeyword=tumor"
        And the page title is "NCI-Connect Resultados"
        And definition box does not appear on the page
        And the system displays "Resultados para: " "tumor" as an "h3" tag
        And the system displays "Resultados 1-20 de 21 para: " "tumor" as an "h4" tag
        And the system displays 20 results per page
        And each result item displays the title of an item as a link
        And each result item displays the description of an item
        And each result item displays the full URL of an item

    Scenario: Results type of infographic
        Given the user navigates to "/?swKeyword=tumor"
        And the page title is "NCI-Connect Resultados"
        And definition box does not appear on the page
        And the system displays "Resultados para: " "tumor" as an "h3" tag
        And the system displays "Resultados 1-20 de 21 para: " "tumor" as an "h4" tag
        And number 1 result item displays "(Infografía)" label

    Scenario: Results type of video
        Given the user navigates to "/?swKeyword=tumor"
        And the page title is "NCI-Connect Resultados"
        And definition box does not appear on the page
        And the system displays "Resultados para: " "tumor" as an "h3" tag
        And the system displays "Resultados 1-20 de 21 para: " "tumor" as an "h4" tag
        And number 3 result item displays "(Video)" label

    Scenario: Results page metadata
        Given the user navigates to "/?swKeyword=tumor"
        Then "<meta name='robots' content='noindex' />" exists in the data for the page URL of "/?swKeyword=tumor"