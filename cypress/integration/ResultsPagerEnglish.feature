Feature: As a user, I would like to be able to page through search results from both the top and bottom of the page so that I can browse my search results.

  Scenario: English Search Results Pager
    Given the user navigates to "/?swKeyword=tumor"
    Given screen breakpoint is set to "mobile"
    Then the system returns the results page for "tumor"
    Then the system displays "Results 1-20 of 11556 for: " "tumor" as an "h4" tag
    Then the results are displayed
    And the pager has a border on top and bottom
    And both pagers display numbers 1 and 2, followed by "...", the last page number and the option to click "Next >" and "Go to Page" for screen readers
    And user clicks "Next" and displays "< Previous", 1, 2, and 3 followed by "...", and 2 highlighted as the page they are on and "Go to Page" for screen readers and 578 and "Next >"
    And the last page number to be visible
    And the option for "< Previous" appears before the page numbers
    And user clicks "Next" and displays "< Previous", 1, 2, 3, and 4 followed by "...", and 3 highlighted as the page they are on and "Go to Page" for screen readers
    And the last page number to be visible
    And the option for "< Previous" appears before the page numbers
    And user clicks "Next" and displays "< Previous", 1, 2, 3, 4, and 5 followed by "...", and 4 highlighted as the page they are on and "Go to Page" for screen readers
    And the last page number to be visible
    And the option for "< Previous" appears before the page numbers
    And user clicks "Next" and displays "< Previous", 1 followed by "...", 4, 5, 6 followed by "...", and 5 highlighted as the page they are on and 578 the last page and "Go to Page" for screen readers
    And the last page number to be visible
    And the option for "< Previous" appears before the page numbers

  Scenario: English Search Results Pager
    Given the user navigates to "/?swKeyword=mynci"
    Then the system returns the results page for "mynci"
    Then the system displays "Results 1-8 of 8 for: " "mynci" as an "h4" tag
    And no pager is shown