import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeartBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfff0f6, 35, 85);
    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const group = new THREE.Group();
    scene.add(group);

    // Heart geometry
    const x = 0,
      y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 1, y, x, y);
    heartShape.bezierCurveTo(x - 1, y, x - 1, y + 1.5, x - 1, y + 1.5);
    heartShape.bezierCurveTo(x - 1, y + 2.5, x + 0.5, y + 3.5, x + 0.5, y + 3.5);
    heartShape.bezierCurveTo(x + 0.5, y + 3.5, x + 2, y + 2.5, x + 2, y + 1.5);
    heartShape.bezierCurveTo(x + 2, y + 1.5, x + 2, y, x + 1, y);
    heartShape.bezierCurveTo(x + 0.5, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.2,
      bevelThickness: 0.3,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    const hearts: THREE.Mesh[] = [];
    // Enhanced pink color palette with stronger, more visible shades
    const colors = [
      0xff1493, // Deep pink - more visible
      0xff69b4, // Hot pink
      0xff0080, // Bright magenta
      0xff2d55, // Strong pink
      0xe91e63, // Material pink
      0xff4081, // Pink accent
      0xc2185b, // Dark pink
      0xf50057, // Pink A400
      0xff6b9d, // Rose pink
      0xff4569, // Coral pink
    ];

    // Create more hearts with smaller sizes
    for (let i = 0; i < 35; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: 0xff1493,
        emissiveIntensity: 0.2,
        shininess: 150,
        transparent: true,
        opacity: 0.95,
      });

      const heart = new THREE.Mesh(heartGeometry, material);

      // Spread hearts across a larger area
      heart.position.x = (Math.random() - 0.5) * 60;
      heart.position.y = (Math.random() - 0.5) * 60;
      heart.position.z = (Math.random() - 0.5) * 60;

      // Make hearts more visible with better size range
      const scale = Math.random() * 0.6 + 0.4; // Better visibility (0.4 to 1.0)
      heart.scale.set(scale, scale, scale);

      heart.rotation.x = Math.random() * Math.PI;
      heart.rotation.y = Math.random() * Math.PI;

      (heart.userData as any) = {
        speedX: Math.random() * 0.015 - 0.0075,
        speedY: Math.random() * 0.015 - 0.0075,
        speedZ: Math.random() * 0.015 - 0.0075,
        rotationSpeedX: Math.random() * 0.008,
        rotationSpeedY: Math.random() * 0.008,
        originalX: heart.position.x,
        originalY: heart.position.y,
        originalZ: heart.position.z,
        floatDistance: 1.5 + Math.random() * 2.5, // Gentler floating
        floatSpeed: 0.5 + Math.random() * 0.5, // Variable float speed
      };

      group.add(heart);
      hearts.push(heart);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add additional light for better visibility
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    let targetX = 0, targetY = 0;
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      hearts.forEach((heart) => {
        const d = heart.userData as any;
        // Enhanced floating animation with multiple sine waves for more organic movement
        heart.position.x = d.originalX + 
          Math.sin(time * d.speedX * 8 * d.floatSpeed) * d.floatDistance +
          Math.sin(time * d.speedX * 3) * (d.floatDistance * 0.3);
        heart.position.y = d.originalY + 
          Math.sin(time * d.speedY * 6 * d.floatSpeed) * d.floatDistance +
          Math.cos(time * d.speedY * 4) * (d.floatDistance * 0.4);
        heart.position.z = d.originalZ + 
          Math.sin(time * d.speedZ * 7 * d.floatSpeed) * d.floatDistance;
        
        // Gentle rotation with slight variation
        heart.rotation.x += d.rotationSpeedX;
        heart.rotation.y += d.rotationSpeedY;
        heart.rotation.z += d.rotationSpeedX * 0.5;
      });

      group.rotation.y += (targetX - group.rotation.y) * 0.05;
      group.rotation.x += (targetY - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x * 0.25;
      targetY = y * 0.2;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      hearts.forEach((h) => {
        (h.geometry as THREE.BufferGeometry).dispose();
        (h.material as THREE.Material).dispose();
        scene.remove(h);
      });
      heartGeometry.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
};

export default HeartBackground;
