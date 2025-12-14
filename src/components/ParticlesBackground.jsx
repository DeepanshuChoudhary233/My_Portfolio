import { useEffect, useRef } from "react";//importing necessary hooks from react



export default function ParticlesBackground() {//Particles background component
  const canvasRef = useRef(null);//reference to canvas element
  useEffect(() => {//effect to setup and animate particles
    const canvas = canvasRef.current;//get canvas element
    const ctx = canvas.getContext("2d");//get canvas context
    let particles = [];//array to hold particles
    const particlesCount = 60;//number of particles
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle {//particular particle characteristics
      constructor() {
        this.x = Math.random() * canvas.width;//random x position
        this.y = Math.random() * canvas.height;//random y position
        this.size = Math.random() * 2 + 1;//random size
        this.color = colors[Math.floor(Math.random() * colors.length)];//random color from colors array
        this.speedX = (Math.random() - 0.5) * 0.5;//random x speed
        this.speedY = (Math.random() - 0.5) * 0.5;//random y speed
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          // Push particles slightly away from mouse
          this.x += dx / distance * 2;
          this.y += dy / distance * 2;
        }

        this.draw();//redraw particle at new position
      }
    }
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          // Only connect close particles
          if (distance < 150 * 150) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }


    function createParticles() {
      particles = [];
      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle());
      }
    }
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    }
  }, [])



  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 w-full h-full pointer-events-none z-0">
    </canvas>
  )
}