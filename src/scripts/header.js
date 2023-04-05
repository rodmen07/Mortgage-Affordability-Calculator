const header = document.querySelector("header");
const mainParagraph = document.getElementById("main-paragraph");
const userPrompt = document.getElementById("user-prompt1");
const headerElements = [header, mainParagraph, userPrompt];

export function renderHeader(){
    headerElements.forEach(element => {
        element.classList.remove("hidden");
    });
    header.classList.add("visible1");
    mainParagraph.classList.add("visible2");
    userPrompt.classList.add("visible3");
}
