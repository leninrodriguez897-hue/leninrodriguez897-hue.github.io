const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");

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
