import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import profileImage from "../assets/vansh_pfp.jpeg";

const profileFacts = [
  { title: "Full Stack", detail: "Web development" },
  { title: "AI & Cybersecurity", detail: "BS-MS at IIT Patna" },
  { title: "Internships", detail: "Open to opportunities" },
];

function About() {
  return (
    <section className="section about-section profile-section" id="about">
      <div className="container profile-layout">
        <motion.div
          className="profile-photo-column"
          initial={{ opacity: 0, x: -28, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="profile-photo-glow" />
          <div className="profile-photo-card">
            <img src={profileImage} alt="Portrait of Vansh Raj" />
            <div className="profile-photo-status">
              <span className="availability-dot" />
              <span>OPEN TO OPPORTUNITIES</span>
              <span className="profile-photo-year">2026</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="profile-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <p className="profile-eyebrow">// 01 / SYSTEM PROFILE</p>
          <h2>Hello, I’m<br /><span>Vansh Raj.</span></h2>
          <p className="profile-description">
            Aspiring full stack developer and engineering student at IIT Patna,
            pursuing a BS-MS in AI and Cybersecurity. I build responsive web
            applications with React, JavaScript, and REST APIs, bringing a
            hands-on UI/UX perspective to each project.
          </p>

          <div className="profile-facts">
            {profileFacts.map((fact, index) => (
              <div className="profile-fact" key={fact.title}>
                <span className="profile-fact-index">0{index + 1}</span>
                <strong>{fact.title}</strong>
                <small>{fact.detail}</small>
              </div>
            ))}
          </div>

          <a
            className="profile-link"
            href="#work"
          >
            Explore selected work <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
