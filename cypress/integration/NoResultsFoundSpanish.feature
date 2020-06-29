Feature: As a user I would like to have the No Results Found page displayed

	Background:
		Given "language" is set to "es"
		Given "title" is set to "Resultados"

	Scenario: Spanish No Results Found Page with keyword
		Given the user navigates to "/?swKeyword=achoo"
		Then the system returns the no results found page
		And the page displays "No hay resultados: achoo"
		And the page displays "Revise si hay errores en el texto ingresado o intente otra búsqueda."
	Scenario: Spanish No Results Found Page
		Given the user navigates to "/"
		Then the system returns the no results found page
		And the page displays "No hay resultados:"
		And the page displays "Revise si hay errores en el texto ingresado o intente otra búsqueda."
	Scenario: No results found page metadata
		Given user is viewing the no results found page on any site
		Then the page contains meta tags with the following names
			| name   | content |
			| robots | noindex |



