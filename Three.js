let scene, camera, renderer;

function init3D() {
    if (scene) return; // 再初期化防止

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("view-3d").appendChild(renderer.domElement);

    createStars();
    animate();
}

function createStars() {
    bookmarksData.forEach((data) => {
        const geometry = new THREE.SphereGeometry(0.8, 16, 16);

        const color = categories2D[data.categoryKey].color;

        const material = new THREE.MeshBasicMaterial({
            color: color
        });

        const star = new THREE.Mesh(geometry, material);

        star.position.x = (Math.random() - 0.5) * 100;
        star.position.y = (Math.random() - 0.5) * 100;
        star.position.z = (Math.random() - 0.5) * 100;

        scene.add(star);
    });
}

function animate() {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
}

if (data.isWeathered) {
    material.transparent = true;
    material.opacity = 0.3;
}
