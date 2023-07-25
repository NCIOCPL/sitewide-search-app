Feature: As a DOC site owner, I want to be able to configure the site filter to return results from multiple sites.

	Background:
		Given "searchCollection" is set to "doc"
		And "searchSiteFilter" is set to "cancercontrol.cancer.gov,staffprofiles.cancer.gov/brp/prgmStaffHome.do,staffprofiles-sg.cancer.gov/brp/granteeList.do,grantees-cancercontrol.cancer.gov/od/investigatorList.do,maps.cancer.gov/overview/index.jsp,maps.cancer.gov/overview/map/index.jsp,epi.grants.cancer.gov,surveillance.cancer.gov,healthcaredelivery.cancer.gov"
		And "title" is set to "DCCPS Search Results"
		And "glossaryEndpoint" is set to "null"
		And "bestbetsEndpoint" is set to "null"


	Scenario: NCI-Connect Results Page
		Given the user navigates to "/?swKeyword=tumor"
		And the page title is "DCCPS Search Results"
		And definition box does not appear on the page
		And the system displays "Results for: " "tumor" as an "h3" tag
		And the system displays "Results 1-20 of 390 for: " "tumor" as an "h4" tag
		And the system displays 20 results per page
		And each result item displays the title of an item as a link
		And each result item displays the description of an item
		And each result item displays the full URL of an item
		And the results include 5 items from "https://cancercontrol.cancer.gov"
		And the results include 5 items from "https://epi.grants.cancer.gov"
		And the results include 5 items from "https://healthcaredelivery.cancer.gov"
		And the results include 5 items from "https://surveillance.cancer.gov"
