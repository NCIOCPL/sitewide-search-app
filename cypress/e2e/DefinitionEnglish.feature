Feature: As a user I would like to see the Definition box when I navigate to the search homepage

	Scenario: English Dictionary Definition Display
		Given the user navigates to "/?swKeyword=metastasis"
		Then the page title is "NCI Search Results"
		And definition box appears with title "Definition:"
		And the word "metastasis" appears in the definition box, with the audio icon and pronunciation
		And the definition "The spread of cancer cells from the place where they first formed to another part of the body." appears in the definition box
		And link to the definition page with text "More information on dictionary page" and href "/publications/dictionaries/cancer-terms/def/metastasis" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Show full definition"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Hide full definition"
		Given user is viewing the second page of results for "metastasis"
		Then the definition box no longer appears on the page

	Scenario: English Dictionary Definition Display - no more information link
		Given the user navigates to "/?swKeyword=tumor"
		Then the page title is "NCI Search Results"
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
		And definition box appears with title "Definition:"
		And the word "caloric intake" appears in the definition box, with the audio icon and pronunciation
		And the definition "Refers to the number of calories (energy content) consumed." appears in the definition box
		And link to the definition page with text "More information on dictionary page" does not display
		And button to toggle the full definition in the definition box labelled "Show full definition" does not display

	Scenario: English Dictionary Definition Display - do not show definition box
		Given the user navigates to "/?swKeyword=dceg"
		Then the page title is "NCI Search Results"
		And definition box does not appear on the page

	Scenario: English Dictionary Definition Display - lung cancer with full definition and dictionary link
		Given the user navigates to "/?swKeyword=lung cancer"
		Then the page title is "NCI Search Results"
		And definition box appears with title "Definition:"
		And the word "lung cancer" appears in the definition box, with the audio icon and pronunciation
		And the definition "Cancer that forms in tissues of the lung, usually in the cells lining air passages." appears in the definition box
		And link to the definition page with text "More information on dictionary page" and href "/publications/dictionaries/cancer-terms/def/lung-cancer" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Show full definition"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Hide full definition"

	Scenario: English Dictionary Definition Display - fat-soluble vitamin with full definition and no dictionary link
		Given the user navigates to "/?swKeyword=fat-soluble vitamin"
		Then the page title is "NCI Search Results"
		And definition box appears with title "Definition:"
		And the word "fat-soluble vitamin" appears in the definition box, with the audio icon and pronunciation
		And the definition "A vitamin that can dissolve in fats and oils." appears in the definition box
		And link to the definition page with text "More information on dictionary page" does not display
		And a button to toggle the full definition appears in the definition box labelled "Show full definition"

	Scenario: English Dictionary Definition Display - dialysis with no dictionary link and no full definition toggle
		Given the user navigates to "/?swKeyword=dialysis"
		Then the page title is "NCI Search Results"
		And definition box appears with title "Definition:"
		And the word "dialysis" appears in the definition box, with the audio icon and pronunciation
		And the definition "The process of filtering the blood when the kidneys are not able to cleanse it." appears in the definition box
		And link to the definition page with text "More information on dictionary page" does not display
		And button to toggle the full definition in the definition box labelled "Show full definition" does not display

	Scenario: English Dictionary Definition Display - long search keyword
		Given the user navigates to "/?swKeyword=adenosine deaminase-deficient severe combined immunodeficiency"
		Then the page title is "NCI Search Results"
		And definition box appears with title "Definition:"
		And the word "adenosine deaminase-deficient severe combined immunodeficiency" appears in the definition box, with the audio icon and pronunciation
		And the definition "A rare, inherited disorder in which the immune system is damaged, causing a person to have a complete lack of B lymphocytes and T lymphocytes (types of white blood cells that help the body fight infection)." appears in the definition box


