Feature: Search Results Analytics
	Scenario: A user clicks on a search result on the first page
		Given the user navigates to "/?swKeyword=tumor"
		When the system displays "Results 1-20 of 11556 for: " "tumor" as an "h4" tag
		And the user clicks on the second result
		Then there should be an analytics event with the following details
			| key              | value                                                              |
			| type             | Other                                                              |
			| event            | SitewideSearchApp:Other:ResultClick                                |
			| linkName         | SiteWideSearchResults                                              |
			| data.resultIndex | (int)2                                                             |
			| data.resultUrl   | https://www.cancer.gov/types/pancreatic/patient/pnet-treatment-pdq |

	Scenario: A user clicks on a search result on the second page
		Given the user navigates to "/?swKeyword=tumor&page=2&pageunit=20"
		When the system displays "Results 21-40 of 11556 for: " "tumor" as an "h4" tag
		And the user clicks on the second result
		Then there should be an analytics event with the following details
			| key              | value                                                                          |
			| type             | Other                                                                          |
			| event            | SitewideSearchApp:Other:ResultClick                                            |
			| linkName         | SiteWideSearchResults                                                          |
			| data.resultIndex | (int)22                                                                        |
			| data.resultUrl   | https://www.cancer.gov/pediatric-adult-rare-tumor/rare-tumors/rare-bone-tumors |
