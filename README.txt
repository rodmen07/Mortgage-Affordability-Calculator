# Background

My project is an interactive demo for a home affordability calculator.

On the initial landing page, the user would select the different categories for their income (average of last 3-5 years), credit score range, monthly debts/obligations, and down payment available. The page would then display the different amounts that a prospective borrower would qualify for at various (Debt to Income) DTI categories, and then show which states  in the US have average home prices within the borrower’s affordability range.

# ****Functionality & MVPs****

In the home affordability calculator, users will be able to:

- Complete a borrower profile by entering relevant financial information
- View their affordability range based on the provided information.
- View a list of US cities with average home prices within the borrower’s affordability range
- View the average home price for a city within the generated list.
- { Bonus *feature* } Adjust results based on Cost of Living adjustments.
- { Bonus *feature* } Forward borrower information to prospective lenders.

In addition, this project will include:

- README
- To-Do List
- Planned Future Developments

# ****Wireframes****

# ****Technologies, Libraries, APIs****

I reference Nerd Wallet’s mortgage calculator for affordability formula:

[https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford](https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford)

I plan to source the data to find US cities with average housing prices within the given range by using the FRED API from the  Federal Reserve Bank of St. Louis:

[https://fred.stlouisfed.org/docs/api/fred/](https://fred.stlouisfed.org/docs/api/fred/)

Finally, I plan to utilize the D3 library and HTML/CSS stylings to generate the visualizations.

[https://d3js.org/](https://d3js.org/)

# ****Implementation Timeline****

- Friday Afternoon: Finish Final Proposal
- Saturday: Start working on initial landing page/transitions
- Sunday: Start working on form functionality for user data
- Monday: Start working on affordability formula and query results
- Tuesday: Start working on map visualizations, state-specific visualizations
- Wednesday: Finish working on incomplete features/address any roadblocks
- Thursday Morning: Finalize project/prepare for presentation

# ****Checklist****

## **Live Project**

- [ ]  Includes links to your portfolio website, Github, and LinkedIn.
- [ ]  Landing page/modal with obvious, clear instructions.
- [ ]  Interactivity of some kind.
- [ ]  Well styled, clean frontend.
- [ ]  If it has music, the option to mute or stop it.

## **Production README**

- [ ]  Link to live version.
- [ ]  Instructions on how to play/interact with the project.
- [ ]  List of technologies / libraries / APIs used.
- [ ]  Technical implementation details with (good-looking) code snippets.
- [ ]  To-dos / future features.
- [ ]  No **.DS_Store** files / debuggers / console.logs.
- [ ]  Organized file structure, with **/src** and **/dist** directories.
