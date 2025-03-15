function getSettingsData() {
    return JSON.parse(localStorage.getItem("settingsData")) || [];
}

document.addEventListener("DOMContentLoaded", function () {
    const settingsData = getSettingsData();

    const outputText = document.getElementById("outputText");
    const copyBtn = document.getElementById("copyBtn");
    const openConfigBtn = document.getElementById("openConfigBtn");
    const backBtn = document.getElementById("backBtn");
    const generateBtn = document.getElementById("generateBtn");

    function generatePassword(settings) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "*!@#$%^&";

        const passLength = parseInt(settings[0]?.value, 10) || 5;
        const addNumber = settings[1]?.selected === "Yes";
        const addSpecial = settings[2]?.selected === "Yes";

        let charSet = chars;
        if (addNumber) charSet += numbers;
        if (addSpecial) charSet += specialChars;

        return Array.from({ length: passLength }, () =>
            charSet.charAt(Math.floor(Math.random() * charSet.length))
        ).join('');
    }

    function showNotification(message) {
        const notification = document.getElementById("copyNotification");
        if (!notification) return;

        notification.textContent = message;
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    }

    function saveToLocalStorage() {
        localStorage.setItem("settingsData", JSON.stringify(settingsData));
    }

    function setupEventListeners() {
        generateBtn?.addEventListener("click", () => {
            outputText.textContent = generatePassword(settingsData);
        });

        copyBtn?.addEventListener("click", async () => {
            try {
                if (outputText.textContent) {
                    await navigator.clipboard.writeText(outputText.textContent);
                    showNotification("Copied!");
                }
            } catch {
                showNotification("Failed!");
            }
        });

        openConfigBtn?.addEventListener("click", () => window.location.href = "config.html");
        backBtn?.addEventListener("click", () => window.location.href = "index.html");
    }

    function initializeInputGroups() {
        document.querySelectorAll(".input-group").forEach((group, index) => {
            settingsData[index] = settingsData[index] || { value: "5", selected: "No" };
            let data = settingsData[index];

            const inputField = group.querySelector(".input-value");
            const decrementBtn = group.querySelector(".decrement");
            const incrementBtn = group.querySelector(".increment");
            const yesBtn = group.querySelector(".yes-btn");
            const noBtn = group.querySelector(".no-btn");

            if (inputField) inputField.value = data.value;
            yesBtn?.classList.toggle("active", data.selected === "Yes");
            noBtn?.classList.toggle("active", data.selected === "No");

            const updateValue = (delta) => {
                const newValue = Math.max(5, (Number(inputField.value) || 5) + delta);
                if (newValue !== Number(inputField.value)) {
                    inputField.value = newValue;
                    data.value = inputField.value;
                    saveToLocalStorage();
                }
            };

            decrementBtn?.addEventListener("click", () => updateValue(-1));
            incrementBtn?.addEventListener("click", () => updateValue(1));

            const toggleSelection = (selected) => {
                if (data.selected !== selected) {
                    yesBtn.classList.toggle("active", selected === "Yes");
                    noBtn.classList.toggle("active", selected === "No");
                    data.selected = selected;
                    saveToLocalStorage();
                }
            };

            yesBtn?.addEventListener("click", () => toggleSelection("Yes"));
            noBtn?.addEventListener("click", () => toggleSelection("No"));
        });
    }

    setupEventListeners();
    initializeInputGroups();
});
