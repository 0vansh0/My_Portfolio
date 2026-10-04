import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "CRISTAL",
    category: "Movie & TV Discovery Platform",
    description: "A modern movie and TV discovery platform built with React and the TMDB API.",
    details: "Created to make discovering films and series feel clean, visual, and easy to use.",
    technologies: ["React", "TMDB API", "JavaScript", "CSS"],
    github: "",
    live: "https://cristal-movie-discovery-ewml.vercel.app/",
    visual: "project-visual-cristal",
    symbol: "C.",
    previewType: "films",
    challenge: "Make it easier to discover films and series without a busy interface getting in the way.",
    architecture: "React renders the discovery experience and connects to TMDB API data for the catalog.",
    nextStep: "Keep refining search, loading, and empty states so the browsing flow stays clear.",
  },
  {
    number: "02",
    title: "Second Sale",
    category: "Campus Marketplace · In Development",
    description: "A campus marketplace designed for students to buy, sell, and trade pre-owned books, electronics, and everyday essentials.",
    details: "Features a clean interface, intuitive product listings, and a direct peer-to-peer connection experience.",
    technologies: ["React", "Modern Frontend Tools", "UI/UX"],
    github: "",
    live: "",
    visual: "project-visual-secondsale",
    symbol: "S.",
    previewType: "listings",
    challenge: "Shape a campus-first way to browse useful second-hand items and bring student buyers and sellers together.",
    architecture: "The current work focuses on the React interface and listing experience. Listing management, accounts, and trust flows remain design and implementation work.",
    nextStep: "Validate the listing and contact flow with students, then define the data and account model.",
  },
];

const filmSamples = [
  { title: "Dune: Part Two", genre: "Sci-Fi" },
  { title: "The Batman", genre: "Action" },
  { title: "Spider-Verse", genre: "Animation" },
];

const listingSamples = [
  { title: "Calculus textbook", category: "Books" },
  { title: "Mechanical keyboard", category: "Tech" },
  { title: "Desk lamp", category: "Essentials" },
];

function ProjectPreview({ type }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const isFilmPreview = type === "films";
  const samples = isFilmPreview ? filmSamples : listingSamples;
  const filters = isFilmPreview ? ["All", "Sci-Fi", "Action", "Animation"] : ["All", "Books", "Tech", "Essentials"];
  const field = isFilmPreview ? "genre" : "category";
  const visibleSamples = samples.filter((sample) =>
    (filter === "All" || sample[field] === filter)
    && (!isFilmPreview || sample.title.toLowerCase().includes(query.trim().toLowerCase())),
  );

  return (
    <div className="project-mini-preview">
      <div className="project-preview-heading">
        <span>{isFilmPreview ? "SEARCH + FILTER TITLES" : "FILTER SAMPLE LISTINGS"}</span>
        <span>INTERACTIVE SAMPLE</span>
      </div>
      {isFilmPreview && (
        <input
          className="project-preview-search"
          type="search"
          aria-label="Search sample movie titles"
          placeholder="Search sample titles..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      <div className="project-preview-filters" role="group" aria-label={isFilmPreview ? "Filter sample titles by genre" : "Filter sample listings by category"}>
        {filters.map((item) => (
          <button
            type="button"
            className={filter === item ? "project-preview-filter is-active" : "project-preview-filter"}
            aria-pressed={filter === item}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="project-preview-results" aria-live="polite">
        {visibleSamples.map((sample) => (
          <li key={sample.title}><span>{sample.title}</span><small>{sample[field]}</small></li>
        ))}
        {visibleSamples.length === 0 && <li><span>No sample titles found</span></li>}
      </ul>
      <small className="project-preview-note">Sample UI only · these entries are not live API or marketplace data.</small>
    </div>
  );
}

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="case-study-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <motion.section
        className="case-study-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.22 }}
      >
        <button type="button" className="case-study-close" onClick={onClose} aria-label="Close case study"><X size={19} /></button>
        <p className="section-label">CASE FILE / {project.number}</p>
        <h2 id="case-study-title">{project.title}</h2>
        <p className="case-study-category">{project.category}</p>
        <div className="case-study-sections">
          <article><span>01 / CHALLENGE</span><p>{project.challenge}</p></article>
          <article><span>02 / APPROACH</span><p>{project.architecture}</p></article>
          <article><span>03 / NEXT LEARNING</span><p>{project.nextStep}</p></article>
        </div>
        <p className="case-study-note">No measured performance figures are published for this project.</p>
        <div className="project-tags case-study-tags">
          {project.technologies.map((technology) => <span className="project-tag" key={technology}>{technology}</span>)}
        </div>
      </motion.section>
    </motion.div>
  );
}

function ProjectCard({ project, index, onCaseStudy }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <motion.article
      className="project-card card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div className={`project-visual ${project.visual}`}>
        <span className="project-visual-index">PROJECT / {project.number}</span>
        <div className="project-visual-center">
          <span className="project-symbol">{project.symbol}</span>
          <span className="project-visual-line" />
          <span className="project-visual-category">{project.category}</span>
        </div>
        <span className="project-visual-corner">{project.number}</span>
      </div>

      <div className="project-content">
        <div className="project-title-row">
          <div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div>
          <span className="project-number">{project.number}</span>
        </div>
        <p className="project-description">{project.description}</p>
        <p className="project-details">{project.details}</p>
        <div className="project-tags">
          {project.technologies.map((technology) => <span className="project-tag" key={technology}>{technology}</span>)}
        </div>
        <div className="project-links">
          <button type="button" className="project-link" onClick={() => onCaseStudy(project)}>Case study <ArrowUpRight size={15} /></button>
          <button
            type="button"
            className="project-link project-preview-toggle"
            aria-expanded={previewOpen}
            onClick={() => setPreviewOpen((open) => !open)}
          >
            {previewOpen ? "Close mini demo" : "Try mini demo"}
          </button>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="project-link">GitHub <ArrowUpRight size={15} /></a>}
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="project-link"><ExternalLink size={16} /> Live Demo</a>}
        </div>
        <AnimatePresence initial={false}>
          {previewOpen && <motion.div className="project-preview-collapse" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}><ProjectPreview type={project.previewType} /></motion.div>}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="section projects-section" id="work">
      <div className="container">
        <motion.div className="projects-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <p className="section-label">SELECTED WORK</p>
          <h2 className="section-title">Ideas made<br /><span className="accent-text">into projects.</span></h2>
          <p className="section-description">A selection of projects that reflect my interest in development, design, and building useful digital products.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} onCaseStudy={setActiveProject} />)}
        </div>

        <motion.div className="projects-footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p>Want to explore more of my work?</p>
          <a href="https://github.com/0vansh0" target="_blank" rel="noreferrer" className="btn btn-outline">More on GitHub <ArrowUpRight size={17} /></a>
        </motion.div>
      </div>
      <AnimatePresence>{activeProject && <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
    </section>
  );
}

export default Projects;
