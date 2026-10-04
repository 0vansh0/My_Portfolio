import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Palette,
  Wrench,
  Layers,
  Database,
  Globe,
  Shield,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    track: "frontend",
    icon: Globe,
    description: "Interfaces, components, and responsive layouts.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "API Integration",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Backend Development",
    track: "backend",
    icon: Database,
    description: "APIs and server-side foundations.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "Server-side Logic",
    ],
  },
  {
    title: "Programming",
    track: "core",
    icon: Code2,
    description: "Writing structured and maintainable code.",
    skills: [
      "JavaScript",
      "Problem Solving",
      "Object-Oriented Programming",
      "Data Structures",
    ],
  },
  {
    title: "UI/UX Design",
    track: "core",
    icon: Palette,
    description: "Flows, prototypes, and interface systems.",
    skills: [
      "Wireframing",
      "Prototyping",
      "Figma",
      "User Interface Design",
      "User Experience",
      "Design Systems",
    ],
  },
  {
    title: "Tools & Workflow",
    track: "core",
    icon: Wrench,
    description: "Tools for development, collaboration, and delivery.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Chrome DevTools",
      "npm",
    ],
  },
  {
    title: "Development Practices",
    track: "core",
    icon: Layers,
    description: "Building projects with a focus on quality and usability.",
    skills: [
      "Component-Based Development",
      "Reusable Components",
      "Debugging",
      "Clean Code",
    ],
  },
  {
    title: "AI & Cybersecurity",
    track: "ai",
    icon: Shield,
    description: "Academic focus in the BS-MS program at IIT Patna.",
    skills: ["Artificial Intelligence", "Cybersecurity", "IIT Patna BS-MS"],
  },
];

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [activeTrack, setActiveTrack] = useState("all");
  const [projectPath, setProjectPath] = useState("Cristal");
  const [selectedNode, setSelectedNode] = useState(0);
  const pathDetails = projectPath === "Cristal"
    ? [
        { label: "React UI", detail: "The interface presents film and series discovery views." },
        { label: "TMDB API", detail: "Cristal connects the client to TMDB data for its catalog." },
        { label: "Browse", detail: "Visitors explore titles through a visual discovery experience." },
      ]
    : [
        { label: "React UI", detail: "A student-facing marketplace concept for browsing campus listings." },
        { label: "Search state", detail: "The preview demonstrates category filters and listing search." },
        { label: "Peer exchange", detail: "The intended flow connects students around pre-owned items; the project is in development." },
      ];
  const filters = [
    { label: "All areas", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "AI & Cybersecurity", value: "ai" },
  ];
  const visibleCategories = skillCategories.filter((category) => activeTrack === "all" || category.track === activeTrack);

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <motion.div
          className="skills-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">// 02 / ENGINEERING ROADMAP</p>

          <h2 className="section-title">
            Core execution
            <br />
            <span className="accent-text">root map.</span>
          </h2>

          <p className="section-description">
            The tools and practices I use to move an idea from first sketch
            to a responsive, working product.
          </p>
        </motion.div>

        <div className="skill-filter-row" role="group" aria-label="Filter engineering roadmap">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={activeTrack === filter.value ? "skill-filter is-active" : "skill-filter"}
              aria-pressed={activeTrack === filter.value}
              onClick={() => setActiveTrack(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div className="skills-grid" layout>
          <AnimatePresence mode="popLayout" initial={false}>
          {visibleCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                className="skill-card card"
                key={category.title}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                onPointerMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
                  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
                }}
              >
                <div className="skill-card-top">
                  <div className="skill-icon">
                    <Icon size={23} />
                  </div>

                  <span className="skill-card-number">
                    0{index + 1}
                  </span>
                </div>

                <h3>{category.title}</h3>

                <p className="skill-description">
                  {category.description}
                </p>

                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <button
                      className={selectedSkill === skill ? "skill-tag is-selected" : "skill-tag"}
                      key={skill}
                      type="button"
                      aria-pressed={selectedSkill === skill}
                      onClick={() => setSelectedSkill((current) => current === skill ? "" : skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </motion.article>
            );
          })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="engineering-callout card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="engineering-copy">
            <p className="section-label">// ENGINEERING / ARCHITECTURE</p>
            <h3>From interface to useful data.</h3>
            <p>Explore how the shipped Cristal experience and the in-progress Second Sale concept connect their UI to the data and user flow.</p>
            <div className="architecture-switch" role="group" aria-label="Choose project architecture sketch">
              {["Cristal", "Second Sale"].map((name) => (
                <button
                  type="button"
                  key={name}
                  className={projectPath === name ? "architecture-choice is-active" : "architecture-choice"}
                  aria-pressed={projectPath === name}
                  onClick={() => { setProjectPath(name); setSelectedNode(0); }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="architecture-map">
            <div className="architecture-nodes" role="group" aria-label={`${projectPath} project flow`}>
              {pathDetails.map((node, index) => (
                <div className="architecture-step" key={node.label}>
                  <button
                    type="button"
                    className={selectedNode === index ? "architecture-node is-active" : "architecture-node"}
                    aria-pressed={selectedNode === index}
                    onClick={() => setSelectedNode(index)}
                  >
                    <span>0{index + 1}</span>{node.label}
                  </button>
                  {index < pathDetails.length - 1 && <span className="architecture-arrow" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <p className="architecture-detail" aria-live="polite">{pathDetails[selectedNode].detail}</p>
            <span className="architecture-caption">PROJECT FLOW SKETCH · NOT LIVE TELEMETRY</span>
          </div>
        </motion.div>

        <motion.div
          className="skills-bottom-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="availability-dot"></span>
          Current focus: designing clear discovery and listing flows for web products.
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
