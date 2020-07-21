Feature: As a user, I would like to be able to page through search results from both the top and bottom of the page so that I can browse my search results.

  Scenario: Spanish Search Results Pager
    Given "language" is set to "es"
    Given the user navigates to "/?cfg=1&from=1&pageunit=20&swKeyword=tumor"
      Then the system returns the results page for "tumor"
      Then the system displays "Resultados 1-20 de 11189 para: " "tumor" as an "h4" tag
      Then the results are displayed
      And both pagers display numbers 1 and 2, followed by "...", the last page number and the option to click "Siguiente >"
      And user clicks "Siguiente" and displays 1, 2, and 3 followed by "...", and 2 highlighted as the page they are on
      And the last page number to be visible
      And the option for "< Anterior" appears before the page numbers
      And user clicks "Siguiente" and displays 1, 2, 3, and 4 followed by "...", and 3 highlighted as the page they are on
      And the last page number to be visible
      And the option for "< Anterior" appears before the page numbers
      And user clicks "Siguiente" and displays 1, 2, 3, 4, and 5 followed by "...", and 4 highlighted as the page they are on
      And the last page number to be visible
      And the option for "< Anterior" appears before the page numbers
      And user clicks "Siguiente" and displays 1 followed by "...", 4, 5, 6 followed by "...", and 5 highlighted as the page they are on
      And the last page number to be visible
      And the option for "< Anterior" appears before the page numbers

