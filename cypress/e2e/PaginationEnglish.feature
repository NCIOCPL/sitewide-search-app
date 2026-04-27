Feature: Pagination — English

  Scenario: User sees pagination at mobile, mobile large, and tablet breakpoints
    Given user is viewing the preview site
    And user is viewing at 879px and lower
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    Then two pagination components display
    And top pagination displays left aligned
    And bottom pagination displays left aligned

  Scenario: User sees pagination at tablet large, desktop, and widescreen breakpoints
    Given user is viewing the preview site
    And user is viewing at 880px and higher
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    Then two pagination components display
    And top pagination displays right aligned
    And bottom pagination displays right aligned

  Scenario: User sees correct colors for current page and on hover on pagination
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    Then two pagination components display
    And current page link has background color "#284976"
    And the other page links have text color "#007bbd"
    And the other page links have border color "#dfe1e2"
    And ellipsis has text color "#71767a"
    And the stylesheet defines current page hover background "#06162d"
    And the stylesheet defines other page link hover color "#004971"
    And the stylesheet defines previous and next hover color "#004971"

  Scenario: User sees pagination on page 1 of results
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0" at any breakpoint
    Then two pagination components display
    And top pagination displays page 1 link as current page
    And top pagination displays page 2 link
    And top pagination displays page 3 link
    And top pagination displays page 4 link
    And top pagination displays page 5 link
    And top pagination displays an ellipsis
    And top pagination displays page 1009 link
    And bottom pagination displays page 1 link as current page
    And bottom pagination displays page 1009 link
    And top pagination displays "Next" link after the page numbers
    And bottom pagination displays "Next" link after the page numbers
    When user clicks page 1 link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    And user clicks page 2 link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=2&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    And user clicks page 5 link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=5&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    And user clicks page 1009 link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1009&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0"
    And user clicks "Next" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=2&pageunit=20"

  Scenario: User sees pagination on page 2 of results
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=2&pageunit=20" at any breakpoint
    Then two pagination components display
    And top pagination displays page 1 link
    And top pagination displays page 2 link as current page
    And top pagination displays page 5 link
    And top pagination displays an ellipsis
    And top pagination displays page 1009 link
    And top pagination displays "Previous" link before the page numbers
    And top pagination displays "Next" link after the page numbers
    When user clicks "Previous" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=2&pageunit=20"
    And user clicks "Next" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=3&pageunit=20"

  Scenario: User sees pagination on page 5 of results
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=5&pageunit=20" at any breakpoint
    Then two pagination components display
    And top pagination displays page 1 link
    And top pagination displays page 4 link
    And top pagination displays page 5 link as current page
    And top pagination displays page 6 link
    And top pagination displays page 1009 link
    And top pagination displays an ellipsis
    And top pagination displays "Previous" link before the page numbers
    And top pagination displays "Next" link after the page numbers
    When user clicks "Previous" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=4&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=5&pageunit=20"
    And user clicks "Next" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=6&pageunit=20"

  Scenario: User sees pagination on page 1006 of results
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=1006&pageunit=20" at any breakpoint
    Then two pagination components display
    And top pagination displays page 1 link
    And top pagination displays page 1005 link
    And top pagination displays page 1006 link as current page
    And top pagination displays page 1009 link
    And top pagination displays an ellipsis
    When user clicks "Previous" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1005&pageunit=20"
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=1006&pageunit=20"
    And user clicks "Next" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1007&pageunit=20"

  Scenario: User sees pagination on page 1009 of results
    Given user is viewing the preview site
    When user navigates to "/?swKeyword=breast+cancer&cfg=0&page=1009&pageunit=20" at any breakpoint
    Then two pagination components display
    And top pagination displays page 1 link
    And top pagination displays page 1005 link
    And top pagination displays page 1009 link as current page
    And top pagination displays an ellipsis
    And top pagination displays "Previous" link before the page numbers
    When user clicks "Previous" link
    Then user is taken to "/?swKeyword=breast+cancer&cfg=0&page=1008&pageunit=20"
