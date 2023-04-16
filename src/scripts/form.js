const form = document.querySelector("form");

export function handleEnterForm1(event) {
    if (event.code === "Enter") {
      form.classList.add("visible2");
      form.classList.remove("hidden");
    }
}

