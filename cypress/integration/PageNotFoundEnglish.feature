Feature: Page Not Found Error

	Scenario: Page not found should be displayed when a user visits the home page
		Given the user visits the home page
		Then page title on error page is "Page Not Found"
		And the following links and texts exist on the page
			| https://www.cancer.gov         | homepage     |
			| https://www.cancer.gov/types   | cancer type  |
			| https://www.cancer.gov/contact | Get in touch |
