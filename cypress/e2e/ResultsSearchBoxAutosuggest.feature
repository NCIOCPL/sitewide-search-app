Feature: As a user, the results-page search box offers autosuggestions as I type so I can refine my search. (issue #220)


    Scenario: Autosuggest options appear, with the typed text bold, when typing 3 or more characters
        Given "language" is set to "en"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns "lung cancer|lung|small cell lung cancer"
        When the user navigates to "/?swKeyword=breast+cancer"
        And user types "lung" in the results search box
        Then the results search box dropdown displays the options:
            | lung cancer            |
            | lung                   |
            | small cell lung cancer |
        And the typed text "lung" is bold in each results search box option

    Scenario: A hint is shown below the minimum character count
        Given "language" is set to "en"
        When the user navigates to "/?swKeyword=breast+cancer"
        And user types "lu" in the results search box
        Then the results search box dropdown displays the message "Please enter 3 or more characters"

    Scenario: No dropdown is shown when the typed text matches no suggestions (issue #232)
        Given "language" is set to "en"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns no results
        When the user navigates to "/?swKeyword=breast+cancer"
        And user types "arrr" in the results search box
        Then the results search box dropdown is not displayed

    Scenario: Selecting an autosuggest option populates the search box
        Given "language" is set to "en"
        And "searchCollection" is set to "cgov"
        And the autosuggest service returns "lung cancer|lung|small cell lung cancer"
        When the user navigates to "/?swKeyword=breast+cancer"
        And user types "lung" in the results search box
        And user selects the autosuggest option "small cell lung cancer"
        Then the results search box contains "small cell lung cancer"
