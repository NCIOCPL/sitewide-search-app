Feature: As a content editor, I would like to display both the best bets and definition of a term at the top of search results

    Scenario: English display Search results, Best Bets and Definition together
        Given the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "NCI Search Results"
        And the system displays "Results for: " "carcinoma" as an "h3" tag
        And a box for Best Bets appears below the subtitle
        And the system displays best bet number 1 title "Best Bets for Carcinoma" as an "h2" tag
        And the title of the related item number 1 appears as a link with text "What Is Cancer?"
        And definition box appears with title "Definition:"
        And the word "carcinoma" appears in the definition box, with the audio icon and pronunciation
        When user navigates to the next page
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page

    Scenario: Spanish display Best Bets and Definition together
        Given "language" is set to "es"
        And "dictionaryUrl" is set to "https://www.cancer.gov/espanol/publicaciones/diccionario"
        And "title" is set to "Resultados"
        When the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "Resultados"
        And the system displays "Resultados para: " "carcinoma" as an "h3" tag
        And a box for Best Bets appears below the subtitle
        And the system displays best bet number 1 title "Mejores resultados para Carcinoma (en español)" as an "h2" tag
        And the title of the related item number 1 appears as a link with text "Tipos de cáncer"
        And definition box appears with title "Definición:"
        And the word "carcinoma" appears in the definition box with the audio icon
        When user navigates to the next page
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page

    Scenario: English display Search results, Best Bets and Definition together on Mobile
        Given screen breakpoint is set to "mobile"
        Given the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "NCI Search Results"
        And the system displays "Results for: " "carcinoma" as an "h3" tag
        And a box for Best Bets appears below the subtitle
        And the system displays best bet number 1 title "Best Bets for Carcinoma" as an "h2" tag
        And the title of the related item number 1 appears as a link with text "What Is Cancer?"
        And definition box appears with title "Definition:"
        And the word "carcinoma" appears in the definition box, with the audio icon and pronunciation
        And each result item displays the title of an item as a link
        When user navigates to the next page
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page


    Scenario: English display only Search results and Definition when bestbets endpoint is not provided
        Given "bestbetsEndpoint" is set to "null"
        And the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "NCI Search Results"
        And the system displays "Results for: " "carcinoma" as an "h3" tag
        Then a box for Best Bets is not displayed
        And definition box appears with title "Definition:"
        And the word "carcinoma" appears in the definition box, with the audio icon and pronunciation
        And each result item displays the title of an item as a link
        When user navigates to the next page
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page


    Scenario: English display only Search results and BestBets when glossary endpoint is not provided
        Given "glossaryEndpoint" is set to "null"
        And the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "NCI Search Results"
        And the system displays "Results for: " "carcinoma" as an "h3" tag
        And a box for Best Bets appears below the subtitle
        And definition box does not appear on the page
        And the system displays best bet number 1 title "Best Bets for Carcinoma" as an "h2" tag
        And the title of the related item number 1 appears as a link with text "What Is Cancer?"
        And each result item displays the title of an item as a link
        When user navigates to the next page
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page

    Scenario: English display only Search results when glossary endpoint and BestBets endpoint is not provided
        Given "glossaryEndpoint" is set to "null"
        And "bestbetsEndpoint" is set to "null"
        When the user navigates to "/?swKeyword=carcinoma"
        Then the page title is "NCI Search Results"
        And the system displays "Results for: " "carcinoma" as an "h3" tag
        And the system displays "Results 1-20 of 2946 for: " "carcinoma" as an "h4" tag
        And each result item displays the title of an item as a link
        Then a box for Best Bets is not displayed
        And definition box does not appear on the page

