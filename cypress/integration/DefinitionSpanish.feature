Feature: As a user I would like to see the Definition box when I navigate to the search homepage

	Background:
		Given "language" is set to "es"
		Given "glossaryURL" is set to "https://www.cancer.gov/espanol/publicaciones/diccionario"
		Given "title" is set to "Resultados"

	Scenario: Spanish Dictionary Definition Display
		Given the user navigates to "/?swKeyword=cáncer de mama"
		Then the page title is "Resultados"
		And page subtitle "Resultados para: cáncer de mama" appears below the page title
		And definition box appears with title "Definición:"
		And the word "cáncer de mama" appears in the definition box with the audio icon
		And the definition "Cáncer que se forma en los tejidos del seno (mama)." appears in the definition box
		And link to the definition page with text "Más información" and href "https://www.cancer.gov/espanol/publicaciones/diccionario/def/cancer-de-mama" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Ocultar toda la definición"
		Given user is viewing the second page of results for "cáncer de mama"
		And page subtitle "Resultados para: cáncer de mama" appears below the page title
		Then the definition box no longer appears on the page

	Scenario: Spanish Dictionary Definition Display - no more information link
		Given the user navigates to "/?swKeyword=tumor"
		Then the page title is "Resultados"
		And page subtitle "Resultados para: tumor" appears below the page title
		And definition box appears with title "Definición:"
		And the word "tumor" appears in the definition box with the audio icon
		And the definition "Masa anormal de tejido que aparece cuando las células se multiplican más de lo debido o no se destruyen en el momento apropiado." appears in the definition box
		And link to the definition page with text "Más información" does not display
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Ocultar toda la definición"

	Scenario: Spanish Dictionary Definition Display - no show/hide full definition button
		Given the user navigates to "/?swKeyword=cáncer de la vagina en estadio lll"
		Then the page title is "Resultados"
		And page subtitle "Resultados para: cáncer de la vagina en estadio lll" appears below the page title
		And definition box appears with title "Definición:"
		And the word "cáncer de la vagina en estadio lll" appears in the definition box with the audio icon
		And the definition "El cáncer se diseminó hasta la pared de la pelvis." appears in the definition box
		And link to the definition page with text "Más información" and href "https://www.cancer.gov/espanol/publicaciones/diccionario/def/cancer-de-la-vagina-en-estadio-lll" in the definition box
		And button to toggle the full definition in the definition box labelled "Mostrar toda la definición" does not display
