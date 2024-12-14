    window.onload = function () {
        const text =
            "Let's create a data portrait based on your screen time from your phone, choose the category where you spend the highest time.";
        const typingElement = document.getElementById("typing-effect");
        let index = 0;

        function type() {
            if (index < text.length) {
                typingElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();

        setTimeout(() => {
            const buttonContainer = document.getElementById("button-container");
            if (buttonContainer) {
                buttonContainer.style.opacity = 1;
            }
        }, 2000);
    };
