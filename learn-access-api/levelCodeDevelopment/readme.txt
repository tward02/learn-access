This folder does not actually contain any code that is run as part of the application, this was just used to record my progress of ideation and development of each level

To generate the level code and tests some things were adapted from other sources, the main ones being:
1. The official Playwright documentation - https://playwright.dev/docs/intro
2. The official Jest documentation - https://archive.jestjs.io/docs/en/22.x/getting-started.html
3. The official WCAG documentation - https://www.w3.org/WAI/standards-guidelines/wcag/docs/
4. The official React accessibility documentation - https://legacy.reactjs.org/docs/accessibility.html
5. Any more specific references can be found in the individual files where they are used
6. Refer to the code actually being used in the server.js file explaining how and why the render method was chosen and the justification for the libraries used

Each Level Folder Contains:
1. Initial.js - this is the initial React code that will be stored in the database and loaded when a level is started
2. Styles.css - this is the initial CSS code that will be stored in the database and loaded when a level is started (if this does not exist then the CSS si not something the user can change in this level)
5. App.test.js - the Jest test suite run to check if the level has been passed
6. playwrightTest.spec.js - the playwright test suite run to check if the level has been passed
