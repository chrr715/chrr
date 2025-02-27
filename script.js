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
    // 현재 URL에서 파일명 가져오기
    const currentPage = window.location.pathname.split("/").pop();
    
    // 모든 내비게이션 메뉴 가져오기
    const navLinks = document.querySelectorAll(".nav-menu");

    // 각 메뉴를 돌면서 현재 페이지와 href가 일치하면 스타일 변경
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#23cef9cf";  // 선택된 메뉴 색 변경
        }
    });
});



// 원



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

        // 드래그 중 클릭 방지 (하이퍼링크 영향 없음)
        circle.addEventListener("click", (e) => {
            if (dragging) e.preventDefault();
        });
    }
});
