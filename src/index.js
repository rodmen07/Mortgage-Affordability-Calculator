import { renderHeader } from "./scripts/header.js";
import { handleEnterForm1 } from "./scripts/form.js";
import calculateDTIRange from "./scripts/calculation.js";

// The following code will fade in the header element on start.
renderHeader();

// The following code creates an event listener for enter to transition the form element onto the page.
document.addEventListener("keydown", handleEnterForm1);

// The following code calculates the user's 20% and 40% DTI once the user submits the form data, and displays the results.
calculateDTIRange();
