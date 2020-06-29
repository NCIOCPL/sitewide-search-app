Feature: As a user I would like to have the No Results Found page displayed

	Scenario: English No Results Found Page with keyword
		Given the user navigates to "/?swKeyword=achoo"
		Then the system returns the no results found page
		And the page displays "0 results found for: achoo"
		And the page displays "Please check your spelling or try another search using a different word."
	Scenario: English No Results Found Page
		Given the user navigates to "/"
		Then the system returns the no results found page
		And the page displays "0 results found for:"
		And the page displays "Please check your spelling or try another search using a different word."
	Scenario: No results found page metadata
		Given user is viewing the no results found page on any site
		Then the page contains meta tags with the following names
			| name   | content |
			| robots | noindex |
