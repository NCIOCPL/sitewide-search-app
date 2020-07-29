Feature: As a content editor, I would like to identify content for users to find that are related to their search term, in order to aid them in their search for cancer information.

	Scenario: Single best bet with sinlge link
		Given the user navigates to "/?swKeyword=ctep"
		Then the page title is "NCI Search Results"
		And the system displays "Results for: " "ctep" as an "h3" tag
		And a box for Best Bets appears below the subtitle
		And the system displays best bet number 1 title "Best Bets for Cancer Therapy Evaluation Program (CTEP)" as an "h2" tag
		And the title of the related item number 1 appears as a link with text "Cancer Therapy Evaluation Program (CTEP)"
		And the description of the item number 1 appears below the title
		And the system displays "Results 1-20 of 797 for: " "ctep" as an "h4" tag
		And the system displays 20 results per page
		When user navigates to the next page
		Then a box for Best Bets is not displayed

	Scenario: Single best bet with multiple links
		Given the user navigates to "/?swKeyword=cancer%20risk%20assessment%20tools"
		Then the page title is "NCI Search Results"
		And the system displays "Results for: " "cancer risk assessment tools" as an "h3" tag
		And a box for Best Bets appears below the subtitle
		And the system displays best bet number 1 title "Best Bets for Cancer Risk Assessment Tools" as an "h2" tag
		And the title of the related item number 1 appears as a link with text "Breast Cancer Risk Assessment Tool"
		And the description of the item number 1 appears below the title
		And the title of the related item number 2 appears as a link with text "Colorectal Cancer Risk Assessment Tool"
		And the description of the item number 2 appears below the title
		And the title of the related item number 3 appears as a link with text "Melanoma Risk Assessment Tool"
		And the description of the item number 3 appears below the title
		And the system displays "Results 1-20 of 18634 for: " "cancer risk assessment tools" as an "h4" tag
		And the system displays 20 results per page
		When user navigates to the next page
		Then a box for Best Bets is not displayed