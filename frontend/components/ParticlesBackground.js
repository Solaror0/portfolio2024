import { useEffect } from "react";
import "particles.js";

const ParticlesBackground = () => {
  useEffect(() => {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 450,
          },
        },
        color: {
          value: "#976aa0",
        },
        shape: {
          type: "triangle",
          stroke: {
            width: 0,
            color: "#976aa0",
          },
        },
        opacity: {
          value: 0.2,
          // random: false,
          // anim: {
          //   enable: false,
          //   speed: 1,
          //   opacity_min: 0.1,
          //   sync: false,
          // },
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.3,
            sync: false,
          },
        },
        size: {
          value: 2,
          // random: true,
          // anim: {
          //   enable: false,
          //   speed: 40,
          //   size_min: 0.1,
          //   sync: false,
          // },
          random: true,
          anim: {
            enable: true,
            speed: 5,
            size_min: 0.4,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#976aa0",
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: ["bubble", "grab"], // Enable both grab and color change on hover
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 100,
            line_linked: {
              opacity: 1,
              color: "#976aa0",
            },
          },
          color: {
            value: "#976aa0", // Color to change to on hover
            // animation: {
            //   enable: true,
            //   speed: 20,
            //   sync: false,
            // },
          },
          bubble: {
            distance: 400,
            size: 2.1,
            duration: 2,
            opacity: 0.6,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }, []);

  return <div id="particles-js" className="absolute inset-0 z-0"></div>;
};

export default ParticlesBackground;
