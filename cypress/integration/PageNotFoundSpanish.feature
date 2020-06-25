Feature: Page Not Found Error Spanish

	Background:
		Given "language" is set to "es"

	Scenario: Page not found should be displayed when a user visits the home page
		Given the user visits the home page
		Then page title on error page is "No se encontró la página"
		And the following links and texts exist on the page
			| https://www.cancer.gov/espanol             | página principal |
			| https://www.cancer.gov/espanol/tipos       | tipo de cáncer   |
			| https://www.cancer.gov/espanol/contactenos | Contáctenos      |
