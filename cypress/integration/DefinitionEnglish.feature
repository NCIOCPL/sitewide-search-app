Feature: As a user I would like to see the Definition box when I navigate to the search homepage

	Scenario: English Dictionary Definition Display
		Given the user navigates to "/?swKeyword=metastasis"
		Then the page title is "NCI Search Results"
		And page subtitle "Results for: metastasis" appears below the page title
		And definition box appears with title "Definition:"
		And the word "metastasis" appears in the definition box, with the audio icon and pronunciation
		And the definition "The spread of cancer cells from the place where they first formed to another part of the body." appears in the definition box
		And link to the definition page with text "More information on dictionary page" and href "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/46710" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Show full definition"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Hide full definition"
		Given user is viewing the second page of results for "metastasis"
		And page subtitle "Results for: metastasis" appears below the page title
		Then the definition box no longer appears on the page

	Scenario: English Dictionary Definition Display - no more information link
		Given the user navigates to "/?swKeyword=tumor"
		Then the page title is "NCI Search Results"
		And page subtitle "Results for: tumor" appears below the page title
		And definition box appears with title "Definition:"
		And the word "tumor" appears in the definition box, with the audio icon and pronunciation
		And the definition "An abnormal mass of tissue that results when cells divide more than they should or do not die when they should." appears in the definition box
		And link to the definition page with text "More information on dictionary page" does not display
		And a button to toggle the full definition appears in the definition box labelled "Show full definition"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Hide full definition"

	Scenario: English Dictionary Definition Display - no show/hide full definition button
		Given the user navigates to "/?swKeyword=caloric intake"
		Then the page title is "NCI Search Results"
		And page subtitle "Results for: caloric intake" appears below the page title
		And definition box appears with title "Definition:"
		And the word "caloric intake" appears in the definition box, with the audio icon and pronunciation
		And the definition "Refers to the number of calories (energy content) consumed." appears in the definition box
		And link to the definition page with text "More information on dictionary page" does not display
		And button to toggle the full definition in the definition box labelled "Show full definition" does not display


