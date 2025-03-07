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


//내브모바일
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav");

    document.addEventListener("touchstart", function (event) {
        const touchX = event.touches[0].clientX; // 터치한 x좌표

        if (touchX < 50) { 
            // 왼쪽 끝(50px 이하)을 터치하면 메뉴 보이기
            nav.classList.add("active");
        } else if (touchX > 200) { 
            // 메뉴 바깥을 터치하면 다시 숨김
            nav.classList.remove("active");
        }
    });
});



// 인덱스 동글 원 4개
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "index.html") {
        createIndexCircles();
    }
});

function createIndexCircles() {
    const container = document.getElementById("circle-container");
    if (!container) return;

    container.innerHTML = ""; // 기존 원 삭제 후 다시 생성

    const numCircles = 4; // 원 개수 설정
    const safeMargin = 20; // 안전 여백
    const circleSize = 90; // 원 크기 설정 (CSS와 동일하게)

    let maxX = window.innerWidth - circleSize - safeMargin;
    let maxY = window.innerHeight - circleSize - safeMargin;
    let minX = safeMargin;
    let minY = safeMargin;

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");

        let x = Math.random() * (maxX - minX) + minX;
        let y = Math.random() * (maxY - minY) + minY;

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        let offsetX,
            offsetY,
            dragging = false;

        circle.addEventListener("pointerdown", (e) => {
            dragging = true;
            offsetX = e.clientX - circle.offsetLeft;
            offsetY = e.clientY - circle.offsetTop;
            circle.style.cursor = "grabbing";
        });

        document.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            circle.style.left = `${newX}px`;
            circle.style.top = `${newY}px`;
        });

        document.addEventListener("pointerup", () => {
            dragging = false;
            circle.style.cursor = "grab";
        });

        container.appendChild(circle);
    }
}


// 모바일에서 세로 스크롤 방지 및 화면 크기 유지
window.addEventListener("resize", () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    document.body.style.height = "100vh";
    createIndexCircles(); // 화면 크기 변경 시 원들 재배치
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


document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const form = document.getElementById("form");
    
    if (currentPage === "memo.html") {
        loadMessages();
        form.style.display = "block";
        startMovingMessages(); // 메시지 움직임 시작
    } else {
        form.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const form = document.getElementById("form");
    
    if (currentPage === "memo.html") {
        loadMessages();
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

function getRandomPosition() {
    const headerHeight = document.querySelector("header")?.offsetHeight || 50;
    const navHeight = document.querySelector("nav")?.offsetHeight || 50;
    const safeMargin = 20;
    const circleSize = 120;

    let maxX = window.innerWidth - circleSize - safeMargin;
    let maxY = window.innerHeight - circleSize - navHeight - safeMargin;

    if (window.innerWidth <= 768) {
        maxX = window.innerWidth - circleSize - safeMargin;
    }

    const x = Math.random() * maxX + safeMargin;
    const y = Math.random() * maxY + navHeight + safeMargin + headerHeight; // 헤더 높이 추가

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
    if (document.querySelector(`[data-id='${name}-${msg}']`)) return;
    
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.setAttribute("data-id", `${name}-${msg}`);
    
    messageDiv.style.position = 'absolute';
    messageDiv.style.left = `${x}px`;
    messageDiv.style.top = `${y}px`;
    
    const msgText = document.createElement("span");
    msgText.textContent = msg;

    const nameTag = document.createElement("div");
    nameTag.className = "name";
    nameTag.textContent = `- ${name} -`;

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        removeMessage(messageDiv);
    });
    
    messageDiv.appendChild(msgText);
    messageDiv.appendChild(nameTag);
    messageDiv.appendChild(deleteBtn);
    
    document.body.appendChild(messageDiv);

    makeDraggable(messageDiv);

    if (animate) {
        messageDiv.classList.add("new-message");
        setTimeout(() => messageDiv.classList.remove("new-message"), 3000);
    }
}

function saveMessage(messageData) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(messageData);
    localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(message => {
        createMessageElement(message.name, message.msg, message.x, message.y, false);
    });
}

function removeMessage(messageDiv) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages = messages.filter(msg => 
        msg.name !== messageDiv.querySelector(".name").textContent || 
        msg.msg !== messageDiv.querySelector("span").textContent
    );
    localStorage.setItem("messages", JSON.stringify(messages));
    messageDiv.remove();
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", startDragging);
    element.addEventListener("touchstart", startDragging);

    function startDragging(e) {
        isDragging = true;
        if (e.type === "mousedown") {
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", stopDragging);
        } else if (e.type === "touchstart") {
            offsetX = e.touches[0].clientX - element.offsetLeft;
            offsetY = e.touches[0].clientY - element.offsetTop;
            document.addEventListener("touchmove", onMove);
            document.addEventListener("touchend", stopDragging);
        }
        element.style.cursor = "grabbing";
        e.preventDefault();
    }

    function onMove(e) {
        if (!isDragging) return;
        let clientX, clientY;
        if (e.type === "mousemove") {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === "touchmove") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        let newX = clientX - offsetX;
        let newY = clientY - offsetY;
        newX = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, newY));
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    }

    function stopDragging() {
        isDragging = false;
        element.style.cursor = "grab";
        updateMessagePosition(element);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", stopDragging);
    }
}

function updateMessagePosition(element) {
    const name = element.querySelector(".name").textContent.replace(/-/g, '').trim(); // 작대기 제거 및 공백 제거
    const msg = element.querySelector("span").textContent;
    const x = parseInt(element.style.left);
    const y = parseInt(element.style.top);

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    const index = messages.findIndex(m => m.name === name && m.msg === msg);
    if (index !== -1) {
        messages[index].x = x;
        messages[index].y = y;
    } else {
        // 기존 메시지가 없는 경우 새로운 위치 정보 추가
        messages.push({ name: name, msg: msg, x: x, y: y });
    }
    localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(message => {
        createMessageElement(message.name, message.msg, message.x, message.y, false);
    });
}
