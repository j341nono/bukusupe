const btnView = document.getElementById("toggle-view");
const view2D = document.getElementById("view-2d");
const view3D = document.getElementById("view-3d");

let is3D = false;

btnView.addEventListener("click", () => {
    is3D = !is3D;

    if (is3D) {
        view2D.style.display = "none";
        view3D.style.display = "block";
        btnView.textContent = "🟦 2Dモード";
        init3D();
    } else {
        view2D.style.display = "block";
        view3D.style.display = "none";
        btnView.textContent = "🧊 3Dモード";
    }
});
