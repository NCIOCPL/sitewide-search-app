Feature: As a user I would like to see the Definition box when I navigate to the search homepage

	Background:
		Given "language" is set to "es"
		Given "dictionaryUrl" is set to "https://www.cancer.gov/espanol/publicaciones/diccionario"
		Given "title" is set to "Resultados"

	Scenario: Spanish Dictionary Definition Display
		Given the user navigates to "/?cfg=1&swKeyword=c%C3%A1ncer%20de%20mama"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "cáncer de mama" appears in the definition box with the audio icon
		And the definition "Cáncer que se forma en los tejidos del seno (mama)." appears in the definition box
		And link to the definition page with text "Más información" and href "/espanol/publicaciones/diccionario/def/cancer-de-mama" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Ocultar toda la definición"
		Given user is viewing the second page of results for "cáncer de mama"
		Then the definition box no longer appears on the page

	Scenario: Spanish Dictionary Definition Display - no more information link
		Given the user navigates to "/?cfg=1&swKeyword=tumor"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "tumor" appears in the definition box with the audio icon
		And the definition "Masa anormal de tejido que aparece cuando las células se multiplican más de lo debido o no se destruyen en el momento apropiado." appears in the definition box
		And link to the definition page with text "Más información" does not display
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Ocultar toda la definición"

	Scenario: Spanish Dictionary Definition Display - no show/hide full definition button
		Given the user navigates to "/?cfg=1&swKeyword=c%C3%A1ncer%20de%20la%20vagina%20en%20estadio%20lll"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "cáncer de la vagina en estadio lll" appears in the definition box with the audio icon
		And the definition "El cáncer se diseminó hasta la pared de la pelvis." appears in the definition box
		And link to the definition page with text "Más información" and href "/espanol/publicaciones/diccionario/def/cancer-de-la-vagina-en-estadio-lll" in the definition box
		And button to toggle the full definition in the definition box labelled "Mostrar toda la definición" does not display

	Scenario: Spanish Dictionary Definition Display - genético with full definition and dictionary link
		Given the user navigates to "/?cfg=1&swKeyword=gen%C3%A9tico"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "genético" appears in the definition box with the audio icon
		And the definition "Relacionado con los genes." appears in the definition box
		And link to the definition page with text "Más información" and href "/espanol/publicaciones/diccionario/def/genetico" in the definition box
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"
		When user clicks on the full definition toggle button in the definition box
		Then full definition toggle button text turns to "Ocultar toda la definición"

	Scenario: Spanish Dictionary Definition Display - vitamina soluble en grasas with full definition and no dictionary link
		Given the user navigates to "/?cfg=1&swKeyword=vitamina soluble en grasas"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "vitamina soluble en grasas" appears in the definition box with the audio icon
		And the definition "Vitamina que se disuelve en grasas y aceites." appears in the definition box
		And link to the definition page with text "Más información" does not display
		And a button to toggle the full definition appears in the definition box labelled "Mostrar toda la definición"

	Scenario: Spanish Dictionary Definition Display - de novo with no dictionary link and no full definition toggle
		Given the user navigates to "/?cfg=1&swKeyword=de novo"
		Then the page title is "Resultados"
		And definition box appears with title "Definición:"
		And the word "de novo" appears in the definition box with the audio icon
		And the definition "En cáncer, presentación por primera vez de cáncer en el cuerpo." appears in the definition box
		And link to the definition page with text "Más información" does not display
		And button to toggle the full definition in the definition box labelled "Mostrar toda la definición" does not display
