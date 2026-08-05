Feature: As a Spanish user, the results-page search box offers autosuggestions as I type so I can refine my search. (issue #220)


    Scenario: Autosuggest options appear, with the typed text bold, when typing 3 or more characters
        Given "language" is set to "es"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns "adrenocortical|adrenalectomía|adrenalina"
        When the user navigates to "/?swKeyword=video"
        And user types "adre" in the results search box
        Then the results search box dropdown displays the options:
            | adrenocortical |
            | adrenalectomía |
            | adrenalina     |
        And the typed text "adre" is bold in each results search box option

    Scenario: A hint is shown below the minimum character count
        Given "language" is set to "es"
        When the user navigates to "/?swKeyword=video"
        And user types "ad" in the results search box
        Then the results search box dropdown displays the message "Ingrese 3 o más caracteres"

    Scenario: No dropdown is shown when the typed text matches no suggestions (issue #232)
        Given "language" is set to "es"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns no results
        When the user navigates to "/?swKeyword=video"
        And user types "arrr" in the results search box
        Then the results search box dropdown is not displayed

    Scenario: Selecting an autosuggest option populates the search box
        Given "language" is set to "es"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns "adrenocortical|adrenalectomía|adrenalina"
        When the user navigates to "/?swKeyword=video"
        And user types "adre" in the results search box
        And user selects the autosuggest option "adrenalectomía"
        Then the results search box contains "adrenalectomía"
