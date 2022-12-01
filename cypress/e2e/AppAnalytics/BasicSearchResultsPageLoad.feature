Feature: Basic search results Page Load

	Scenario: Page Load Analytics fires when a user views search result page with Best Bet and Definition
		Given "resultsPageTitle" is set to "NCI Search Results"
		And "searchCollection" is set to "cgov"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Search"
		And "analyticsContentGroup" is set to "Global Search"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/?swKeyword=tumor"
		And the system displays "Results 1-20 of 11556 for: " "tumor" as an "h4" tag
		And browser waits
		Then there should be an analytics event with the following details
			| key                                      | value                                          |
			| type                                     | PageLoad                                       |
			| event                                    | SiteWideSearchApp:Load:Results                 |
			| page.name                                | www.cancer.gov/								                |
			| page.title                               | NCI Search Results                             |
			| page.metaTitle                           | NCI Search Results - National Cancer Institute |
			| page.language                            | english                                        |
			| page.type                                | nciAppModulePage                               |
			| page.channel                             | Search                                         |
			| page.contentGroup                        | Global Search                                  |
			| page.publishedDate                       | 02/02/2011                                     |
			| page.additionalDetails.numberResults     | (int)11556                                     |
			| page.additionalDetails.searchKeyword     | tumor                                          |
			| page.additionalDetails.itemsPerPage      | (int)20                                        |
			| page.additionalDetails.pageNum           | (int)1                                         |
			| page.additionalDetails.showingBestBets   | (bool)true                                     |
			| page.additionalDetails.showingDefinition | (bool)true                                     |

	Scenario: Page Load Analytics fires when a user views second page search result with Best Bet and Definition not displayed
		Given "resultsPageTitle" is set to "NCI Search Results"
		And "searchCollection" is set to "cgov"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Search"
		And "analyticsContentGroup" is set to "Global Search"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/?swKeyword=tumor&page=2&pageunit=20"
		And the system displays "Results 21-40 of 11556 for: " "tumor" as an "h4" tag
		And browser waits
		Then there should be an analytics event with the following details
			| key                                      | value                                              |
			| type                                     | PageLoad                                           |
			| event                                    | SiteWideSearchApp:Load:Results                     |
			| page.name                                | www.cancer.gov/																	  |
			| page.title                               | NCI Search Results                                 |
			| page.metaTitle                           | NCI Search Results - National Cancer Institute     |
			| page.language                            | english                                            |
			| page.type                                | nciAppModulePage                                   |
			| page.channel                             | Search                                             |
			| page.contentGroup                        | Global Search                                      |
			| page.publishedDate                       | 02/02/2011                                         |
			| page.additionalDetails.numberResults     | (int)11556                                         |
			| page.additionalDetails.searchKeyword     | tumor                                              |
			| page.additionalDetails.itemsPerPage      | (int)20                                            |
			| page.additionalDetails.pageNum           | (int)2                                             |
			| page.additionalDetails.showingBestBets   | (bool)false                                        |
			| page.additionalDetails.showingDefinition | (bool)false                                        |

	Scenario: Page Load Analytics fires when a user views search result page with Best Bet not displayed and Definition displayed
		Given "resultsPageTitle" is set to "NCI Search Results"
		And "searchCollection" is set to "cgov"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Search"
		And "analyticsContentGroup" is set to "Global Search"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/?swKeyword=cancer"
		And the system displays "Results 1-20 of 30283 for: " "cancer" as an "h4" tag
		And browser waits
		Then there should be an analytics event with the following details
			| key                                      | value                                          |
			| type                                     | PageLoad                                       |
			| event                                    | SiteWideSearchApp:Load:Results                 |
			| page.name                                | www.cancer.gov/								                |
			| page.title                               | NCI Search Results                             |
			| page.metaTitle                           | NCI Search Results - National Cancer Institute |
			| page.language                            | english                                        |
			| page.type                                | nciAppModulePage                               |
			| page.channel                             | Search                                         |
			| page.contentGroup                        | Global Search                                  |
			| page.publishedDate                       | 02/02/2011                                     |
			| page.additionalDetails.numberResults     | (int)30283                                     |
			| page.additionalDetails.searchKeyword     | cancer                                         |
			| page.additionalDetails.itemsPerPage      | (int)20                                        |
			| page.additionalDetails.pageNum           | (int)1                                         |
			| page.additionalDetails.showingBestBets   | (bool)false                                    |
			| page.additionalDetails.showingDefinition | (bool)true                                     |

	Scenario: Page Load Analytics fires when a user views search result page with Best Bet displayed and Definition not displayed
		Given "resultsPageTitle" is set to "NCI Search Results"
		And "searchCollection" is set to "cgov"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Search"
		And "analyticsContentGroup" is set to "Global Search"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/?swKeyword=ctep"
		And the system displays "Results 1-20 of 799 for: " "ctep" as an "h4" tag
		And browser waits
		Then there should be an analytics event with the following details
			| key                                      | value                                          |
			| type                                     | PageLoad                                       |
			| event                                    | SiteWideSearchApp:Load:Results                 |
			| page.name                                | www.cancer.gov/							                  |
			| page.title                               | NCI Search Results                             |
			| page.metaTitle                           | NCI Search Results - National Cancer Institute |
			| page.language                            | english                                        |
			| page.type                                | nciAppModulePage                               |
			| page.channel                             | Search                                         |
			| page.contentGroup                        | Global Search                                  |
			| page.publishedDate                       | 02/02/2011                                     |
			| page.additionalDetails.numberResults     | (int)799                                       |
			| page.additionalDetails.searchKeyword     | ctep                                           |
			| page.additionalDetails.itemsPerPage      | (int)20                                        |
			| page.additionalDetails.pageNum           | (int)1                                         |
			| page.additionalDetails.showingBestBets   | (bool)true                                     |
			| page.additionalDetails.showingDefinition | (bool)false                                    |

