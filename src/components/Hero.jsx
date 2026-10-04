import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import frontView from "../assets/turntable/cutout-front.png";
import frontLeftView from "../assets/turntable/cutout-front-left.png";
import rightProfileView from "../assets/turntable/cutout-right-profile.png";
import backView from "../assets/turntable/cutout-back.png";
import leftProfileView from "../assets/turntable/cutout-left-profile.png";
import frontRightView from "../assets/turntable/cutout-front-right.png";

const portraitViews = [
  frontView,
  frontLeftView,
  rightProfileView,
  backView,
  leftProfileView,
  frontRightView,
  frontView,
];

const heroSlides = [
  { title: ["CREATIVE", "DEVELOPER"] },
  { title: ["FULL STACK", "DEVELOPER"] },
  { title: ["SCALABLE", "SYSTEMS"] },
];

function PortraitFrame({ view, index, scrollYProgress, reduceMotion }) {
  const opacity = useTransform(scrollYProgress, (progress) => {
    const framePosition = progress * (portraitViews.length - 1);
    return Math.max(0, 1 - Math.abs(framePosition - index));
  });

  return (
    <motion.img
      className="hero-portrait"
      src={view}
      alt=""
      aria-hidden="true"
      draggable="false"
      style={{ opacity: reduceMotion ? (index === 0 ? 1 : 0) : opacity }}
    />
  );
}

function Hero() {
  const heroRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];
  const mouseX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.35 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.35 });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const portraitTilt = useTransform(scrollYProgress, [0, 0.5, 1], [0, 7, 0]);
  const portraitMouseTiltX = useTransform(mouseY, [-1, 1], [3, -3]);
  const portraitMouseTiltY = useTransform(mouseX, [-1, 1], [-4, 4]);

  const trackPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    if (event.pointerType !== "touch" && !reduceMotion) {
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (reduceMotion) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [reduceMotion]);

  return (
    <section ref={heroRef} className="hero-section" id="home" aria-label="Introduction">
      <div className="hero-stage" onPointerMove={trackPointer} onPointerLeave={resetPointer}>
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="hero-photo-glow" aria-hidden="true" />

        <div className="hero-status-pill"><span className="hero-status-pulse" />SYSTEM ONLINE <i /> OPEN TO INTERNSHIPS</div>

        <motion.div
          className="hero-portrait-wrap"
          role="img"
          aria-label="Vansh Raj portrait turning through multiple angles as you scroll"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={reduceMotion ? undefined : { rotateX: portraitTilt }}
        >
          <motion.div className="hero-portrait-card" style={reduceMotion ? undefined : { rotateX: portraitMouseTiltX, rotateY: portraitMouseTiltY }}>
            {portraitViews.map((view, index) => (
              <PortraitFrame
                key={`${index}-${view}`}
                view={view}
                index={index}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-copy hero-copy-left">
          <p className="hero-kicker">VANSH RAJ <span>/ AI &amp; CYBERSECURITY · IIT PATNA</span></p>
          <AnimatePresence mode="wait">
            <motion.h1
              className="hero-headline"
              key={activeSlide}
              initial={{ opacity: 0, y: 22, filter: "blur(9px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.48, ease: "easeOut" }}
              aria-live="off"
            >
              {slide.title.map((line) => <span key={line}>{line}</span>)}
            </motion.h1>
          </AnimatePresence>
          <div className="hero-slide-dots" aria-label={`Slide ${activeSlide + 1} of ${heroSlides.length}`}>
            {heroSlides.map((item, index) => (
              <button
                className={index === activeSlide ? "hero-slide-dot is-active" : "hero-slide-dot"}
                key={item.title.join(" ")}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${item.title.join(" ")}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>
        </div>

        <motion.p
          className="hero-scroll-hint"
          whileHover={reduceMotion ? undefined : { rotateX: -8, rotateY: 8, scale: 1.04 }}
          style={{ transformPerspective: 420, transformOrigin: "left center" }}
        >
          <ArrowDown size={14} /> SCROLL TO ROTATE &amp; EXPLORE
        </motion.p>
        <div className="hero-scroll-progress" aria-hidden="true">
          <motion.div style={{ scaleX: scrollYProgress }} />
        </div>

        <div className="hero-quick-actions">
          <a className="hero-pill hero-pill-light" href="#work">View my work <ArrowUpRight size={14} /></a>
          <a className="hero-pill" href="#contact">Contact me <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
