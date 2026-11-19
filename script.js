const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");
const themeToggle = document.querySelector("#theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "lenin-portfolio-theme";

if (themeToggle) {
  let savedTheme = null;

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      savedTheme = storedTheme;
    }
  } catch (error) {
    console.error("Unable to read the saved theme preference.", error);
  }

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    if (themeMeta) {
      themeMeta.content = theme === "dark" ? "#252724" : "#f7f4ef";
    }
  };

  setTheme(savedTheme || (colorScheme.matches ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    savedTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(savedTheme);

    try {
      window.localStorage.setItem(themeStorageKey, savedTheme);
    } catch (error) {
      console.error("Unable to save the theme preference.", error);
    }
  });

  colorScheme.addEventListener("change", (event) => {
    if (savedTheme === null) {
      setTheme(event.matches ? "dark" : "light");
    }
  });
}

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "Email address copied.";
    } catch (error) {
      copyStatus.textContent = "Copy failed. Please select and copy the email address.";
    }
  });
}
