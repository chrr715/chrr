// script.js
document.addEventListener("DOMContentLoaded", function () {
    const scrollAmount = 420; // 한 번 클릭할 때 이동하는 거리

    // 모든 버튼에 이벤트 추가
    document.querySelectorAll(".scroll-btn").forEach(button => {
        button.addEventListener("click", function () {
            const videoWrapper = this.closest(".video-wrapper"); // 현재 버튼이 속한 video-wrapper 찾기
            const videoContainer = videoWrapper.querySelector(".video-container"); // 해당 wrapper 내부의 video-container 찾기
            
            if (videoContainer) {
                const direction = this.classList.contains("left") ? -1 : 1; // 왼쪽 버튼이면 -1, 오른쪽 버튼이면 1
                videoContainer.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
            }
        });
    });
});

// 내비게이션 색깔 고정
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-menu");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#23cef9cf";
        }
    });
});

// 원 생성 및 드래그 기능
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("circle-container");
    const numCircles = 4; // 원 개수 설정

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.top = `${Math.random() * window.innerHeight * 0.8}px`;
        circle.style.left = `${Math.random() * window.innerWidth * 0.8}px`;
        container.appendChild(circle);

        let offsetX, offsetY, dragging = false;

        circle.addEventListener("mousedown", (e) => {
            dragging = true;
            offsetX = e.clientX - circle.offsetLeft;
            offsetY = e.clientY - circle.offsetTop;
            circle.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            circle.style.left = `${e.clientX - offsetX}px`;
            circle.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            dragging = false;
            circle.style.cursor = "grab";
        });

        circle.addEventListener("click", (e) => {
            if (dragging) e.preventDefault();
        });
    }
});


// 방명록
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const form = document.getElementById("form");
    
    if (currentPage === "memo.html") {
        loadMessages();
        form.style.display = "block"; // memo.html에서 폼 표시
    } else {
        form.style.display = "none"; // 다른 페이지에서는 폼 숨기기
    }
});

function getRandomPosition() {
    const navHeight = document.querySelector("nav")?.offsetHeight || 50; // 내비게이션 높이
    const safeMargin = 20; // 안전 여백
    
    const x = Math.random() * (window.innerWidth - 200 - safeMargin) + safeMargin;
    const y = Math.random() * (window.innerHeight - 100 - navHeight - safeMargin) + navHeight + safeMargin;
    
    return { x, y };
}

function addMessage() {
    const name = document.getElementById("name").value;
    const msg = document.getElementById("message").value;
    if (!name || !msg) return alert("치리로에게 하고 싶은 말을 남겨주세요");
    
    const { x, y } = getRandomPosition();
    createMessageElement(name, msg, x, y, true);
    saveMessage({ name, msg, x, y });
    
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
}

function createMessageElement(name, msg, x, y, animate) {
    if (document.querySelector(`[data-id='${name}-${msg}']`)) return; // 중복 생성 방지
    
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.style.left = `${x}px`;
    messageDiv.style.top = `${y}px`;
    messageDiv.setAttribute("data-id", `${name}-${msg}`);
    messageDiv.innerHTML = `${msg}<br><span class='author'>- ${name} -</span> <span class='delete' onclick='removeMessage(this)'>X</span>`;
    
    let offsetX, offsetY, dragging = false;

    messageDiv.addEventListener("pointerdown", (e) => {
        dragging = true;
        offsetX = e.clientX - messageDiv.offsetLeft;
        offsetY = e.clientY - messageDiv.offsetTop;
        messageDiv.style.cursor = "grabbing";
        messageDiv.style.zIndex = 1000;
    });

    document.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        messageDiv.style.left = `${e.clientX - offsetX}px`;
        messageDiv.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("pointerup", () => {
        if (dragging) {
            updateMessagePosition(name, msg, messageDiv.style.left, messageDiv.style.top);
        }
        dragging = false;
        messageDiv.style.cursor = "grab";
    });
    
    if (animate) {
        messageDiv.style.opacity = "0";
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.style.opacity = "1", 100);
    } else {
        document.body.appendChild(messageDiv);
    }
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
}

function updateMessagePosition(name, msg, x, y) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages = messages.map(m => (m.name === name && m.msg === msg ? { ...m, x: parseInt(x), y: parseInt(y) } : m));
    localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "memo.html") return;
    
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(({ name, msg, x, y }) => {
        createMessageElement(name, msg, parseInt(x), parseInt(y), false);
    });
}

function removeMessage(element) {
    const messageDiv = element.parentElement;
    const messageId = messageDiv.getAttribute("data-id");

    // 화면에서 삭제
    messageDiv.remove();

    // localStorage에서 삭제
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages = messages.filter(m => `${m.name}-${m.msg}` !== messageId);
    localStorage.setItem("messages", JSON.stringify(messages));
}


// 모바일자바
document.addEventListener("DOMContentLoaded", function () {
    const navMenu = document.querySelector(".nav");

    document.addEventListener("click", function (event) {
        // 화면 왼쪽 50px 안쪽 클릭 시 메뉴 열기/닫기
        if (window.innerWidth <= 768) { // 모바일에서만 적용
            if (event.clientX < 50) { 
                navMenu.classList.add("active"); // 메뉴 열기
            } else if (navMenu.classList.contains("active")) { 
                navMenu.classList.remove("active"); // 다른 곳 클릭하면 메뉴 닫기
            }
        }
    });
});
