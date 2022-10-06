Feature: As a content editor, I would like to identify content for users to find that are related to their search term, in order to aid them in their search for cancer information.

    Background:
        Given "language" is set to "es"
        Given "title" is set to "Resultados"

    Scenario: Single best bet with sinlge link
        Given the user navigates to "/?swKeyword=Medicamentos%20para%20el%20cancer"
        Then the page title is "Resultados"
        And the system displays "Resultados para: " "Medicamentos para el cancer" as an "h3" tag
        And a box for Best Bets appears below the subtitle
        And the system displays best bet number 1 title "Mejores resultados para Medicamentos para el cáncer" as an "h2" tag
        And the title of the related item number 1 appears as a link with text "Formulación y aprobación de medicamentos"
        And the description of the item number 1 appears below the title
        And the title of the related item number 2 appears as a link with text "Medicamentos aprobados para diferentes tipos de cáncer"
        And the description of the item number 2 appears below the title
        And the title of the related item number 3 appears as a link with text "Medicamentos aprobados para enfermedades relacionadas con el cáncer"
        And the description of the item number 3 appears below the title
        And the system displays best bet number 2 title "Mejores resultados para ¿Qué es el cáncer?" as an "h2" tag
        And the title of the related item number 4 appears as a link with text "¿Qué es el cáncer?"
        And the description of the item number 4 appears below the title
        And the system displays "Resultados 1-20 de 1337 para: " "Medicamentos para el cancer" as an "h4" tag
        And the system displays 20 results per page
        When user navigates to the next page
        Then a box for Best Bets is not displayed
