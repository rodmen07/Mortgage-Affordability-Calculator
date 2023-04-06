Background
==========

My project is an interactive demo for a home affordability calculator.
This is hosted on GitHub pages here: https://rodmen07.github.io/JavaScript-Project/

On the initial landing page, the user would select the different categories for their income (average of last 3-5 years), credit score range, monthly debts/obligations, and down payment available. The page would then display the different amounts that a prospective borrower would qualify for at various (Debt to Income) DTI categories, and then show which states in the US have average home prices within the borrower's affordability range.

**Functionality**
========================

In the home affordability calculator, users will be able to:

-   Complete a borrower profile by entering relevant financial information
-   View their affordability range based on the provided information.
-   View a list of US states with average home prices within the borrower's affordability range
-   View the average home price for a state within the generated list.
-   { Bonus *feature* } Adjust results based on Cost of Living adjustments.
-   { Bonus *feature* } Expand search to include major US cities.

In addition, this project will include:

-   README
    -   To-Do List
    -   Planned Future Developments

**Wireframes**
==============

Initial landing page, includes greeting, author, transparent background image, and background color of light blue. The background image and color should persist through the entire session.

![Untitled](/wireframe/Wireframe1.png)

I'd like for each of the lines below to appear on screen sequentially one at a time, where the user can move forward by pressing the space button.

![Untitled](/wireframe/Wireframe2.png)

Again I would like for each form element to appear on the page sequentially, with the user entering information for each input/field, and continuing by pressing the enter button. Once finished, should display a screen recapping the information provided and having a submit button to confirm and submit the form.

![Untitled](/wireframe/Wireframe3.png)

Once submitted, the page should render the following information:

![Untitled](/wireframe/Wireframe4.png)

Next, based on this range, a list of states with the average home price within the given range should be displayed. Listed states should be shown as green, with non-listed states shaded grey. The states should also appear on the right, with the user able to select a specific state and display the average home price on the map to the right.

![Untitled](/wireframe/Wireframe5.png)

**Technologies, Libraries, APIs**
=================================

I reference Nerd Wallet's mortgage calculator for affordability formula:

[](https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford)<https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford>

I source the data to find US states with average housing prices within the given range as well as average mortgage rates by using the FRED API from the Federal Reserve Bank of St. Louis:

[](https://fred.stlouisfed.org/docs/api/fred/)<https://fred.stlouisfed.org/docs/api/fred/>

Finally, I utilize the D3 library and HTML/CSS stylings to generate the visualizations.

[](https://d3js.org/)<https://d3js.org/>


**Implementation Timeline**
===========================

-   Friday Afternoon: Start working on initial landing page/informational pages/transitions
-   Saturday: Start working on form functionality for user data
-   Sunday: Start working on affordability formula, print DTIs, and query results
-   Monday: Start working on map visualizations, state-specific visualizations
-   Tuesday: Continue working on incomplete features/address any roadblocks
-   Wednesday: Finish working on incomplete features/address any roadblocks
-   Thursday Morning: Finalize project/prepare for presentation

**FUTURE IMPLEMENTATION/TO-DOs**
=============
-   Implement mapping in visualization.
-   { Bonus *feature* } Adjust results based on Cost of Living adjustments.
-   { Bonus *feature* } Expand search to include major US cities.

**Live Project**
----------------

-   [X] Includes links to your portfolio website, Github, and LinkedIn.
-   [X] Landing page/modal with obvious, clear instructions.
-   [X] Interactivity of some kind.
-   [X] Well styled, clean frontend.
-   [N/A] If it has music, the option to mute or stop it.

**Production README**
---------------------

-   [X] Link to live version.
-   [X] Instructions on how to play/interact with the project.
-   [X] List of technologies / libraries / APIs used.
-   [ ] Technical implementation details with (good-looking) code snippets.
-   [X] To-dos / future features.
-   [X] No **.DS_Store** files / debuggers / console.logs.
-   [*] Organized file structure, with **/src** and **/dist** directories. (Refactor for modularization, readability in progress)
