Feature: Feature name

    Background:
        Given "language" is set to "es"
        And "title" is set to "Resultados"

    Scenario: Spanish Results Page
        Given the user navigates to "/?swKeyword=video"
        And the page title is "Resultados"
        And the system displays "Resultados para: " "video" as an "h3" tag
        And the system displays "Resultados 1-20 de 157 para: " "video" as an "h4" tag
        And the system displays 20 results per page
        And each result item displays the title of an item as a link
        And each result item displays the description of an item
        And each result item displays the full URL of an item

    Scenario: Spanish Results type of infographic
        Given the user navigates to "/?swKeyword=video"
        And the page title is "Resultados"
        And the system displays "Resultados para: " "video" as an "h3" tag
        And the system displays "Resultados 1-20 de 157 para: " "video" as an "h4" tag
        And number 1 result item displays "(Infografía)" label

    Scenario: Spanish Results type of video
        Given the user navigates to "/?swKeyword=video"
        And the page title is "Resultados"
        And the system displays "Resultados para: " "video" as an "h3" tag
        And the system displays "Resultados 1-20 de 157 para: " "video" as an "h4" tag
        And number 5 result item displays "(Video)" label


    Scenario: Results page metadata
        Given the user navigates to "/?swKeyword=video"
        Then "<meta name='robots' content='noindex' />" exists in the data for the page URL of "/?swKeyword=video"
