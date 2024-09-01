document.addEventListener("DOMContentLoaded", () => {
    var hex = "0123456789ABCDEF";
    var intervalId;

    var generateColor = () => {
        var result = "#";
        for (var i = 0; i < 6; i++) {
            result += hex[Math.floor(Math.random() * hex.length)];
        }
        return result;
    }

    var startChanging = () => {
        var color = generateColor();
        document.getElementById("color").style.backgroundColor = color;
    }

    var surprise = () => {
        startChanging();
        stopInterval();
    }

    var startInterval = () => {
        intervalId = setInterval(startChanging, 2000);
    }

    var stopInterval = () => {
        clearInterval(intervalId);
    }

    var applyUserInput = () => {
        var userInput = document.getElementById("user-input").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(userInput)) {
            document.getElementById("color").style.backgroundColor = userInput;
            stopInterval();
        } else {
            alert("Please enter a valid hex color code (e.g., #FF5733).");
        }
    }

    var applyPickerColor = () => {
        var colorPickerValue = document.getElementById("color-picker").value;
        document.getElementById("color").style.backgroundColor = colorPickerValue;
        stopInterval();
    }

    var toggleContainer = (selectedContainerId, otherContainerId) => {
        var selectedContainer = document.getElementById(selectedContainerId);
        var otherContainer = document.getElementById(otherContainerId);
        
        if (selectedContainer.style.display === "none") {
            selectedContainer.style.display = "flex";
            otherContainer.style.display = "none";
        } else {
            selectedContainer.style.display = "none";
        }
    }
    
    var copyColor = async () => {
        var colorDiv = document.getElementById("color");
        var color = window.getComputedStyle(colorDiv).backgroundColor;
        try {
            await navigator.clipboard.writeText(color);
            alert("Color copied to clipboard: " + color);
        } catch (err) {
            console.error("Failed to copy color: ", err);
        }
    }

    document.getElementById("start-btn").addEventListener("click", startInterval);
    document.getElementById("end-btn").addEventListener("click", stopInterval);
    document.getElementById("my-choice").addEventListener("click", () => toggleContainer("color-code-container", "color-picker-container"));
    document.getElementById("select-color").addEventListener("click", () => toggleContainer("color-picker-container", "color-code-container"));
    document.getElementById("apply-color").addEventListener("click", applyUserInput);
    document.getElementById("surprise").addEventListener("click", surprise);
    document.getElementById("apply-picker-color").addEventListener("click", applyPickerColor);
    document.getElementById("copy-color").addEventListener("click", copyColor);
});
