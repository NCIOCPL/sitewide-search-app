Feature: As a analytics person, I want to capture information about when More information link clicks happen in definitions, so that we can see what users click on

    Scenario: A user clicks on a More information link in a definition with a partial definition showing
        Given the user navigates to "/?swKeyword=metastasis"
        When the page title is "NCI Search Results"
        And the system displays "Results for: " "metastasis" as an "h3" tag
        And link to the definition page with text "More information on dictionary page" and href "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/metastasis" in the definition box
        And the user clicks the "More information on dictionary page" link
        Then there should be an analytics event with the following details
            | key                       | value                                       |
            | type                      | Other                                       |
            | event                     | SitewideSearchApp:Other:DictionaryLinkClick |
            | linkName                  | glossifiedTerm                              |
            | data.glossaryTerm         | metastasis                                  |
            | data.glossaryTermId       | (int)46710                                  |
            | data.isDefinitionExpanded | false                                       |


    Scenario: A user clicks on a More information link in a definition with the full definition showing
        Given the user navigates to "/?swKeyword=metastasis"
        When the page title is "NCI Search Results"
        And the system displays "Results for: " "metastasis" as an "h3" tag
        And link to the definition page with text "More information on dictionary page" and href "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/metastasis" in the definition box
        When user clicks on the full definition toggle button in the definition box
        And the user clicks the "More information on dictionary page" link
        Then there should be an analytics event with the following details
            | key                       | value                                       |
            | type                      | Other                                       |
            | event                     | SitewideSearchApp:Other:DictionaryLinkClick |
            | linkName                  | glossifiedTerm                              |
            | data.glossaryTerm         | metastasis                                  |
            | data.glossaryTermId       | (int)46710                                  |
            | data.isDefinitionExpanded | true                                        |