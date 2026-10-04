import { motion } from "framer-motion";
import { GraduationCap, BriefcaseBusiness } from "lucide-react";

const journey = [
  {
    number: "01",
    type: "DUAL DEGREE · AI & CYBERSECURITY",
    title: "BS-MS",
    timelineLabel: "01 // 2030",
    academicFocus: "ACADEMIC FOCUS · AI & CYBERSECURITY",
    organization: "Indian Institute of Technology Patna",
    period: "Expected 2030",
    description:
      "Pursuing a dual degree in AI and Cybersecurity while building practical software and web development experience.",
    icon: GraduationCap,
  },
  {
    number: "02",
    type: "HIGHER SECONDARY · CBSE",
    title: "Class 12",
    timelineLabel: "02 // 2024",
    organization: "Dolphin Public School",
    period: "2023 - 2024",
    description:
      "Completed higher secondary education under the Central Board of Secondary Education.",
    icon: GraduationCap,
  },
  {
    number: "03",
    type: "MATRICULATION · CBSE",
    title: "Class 10",
    timelineLabel: "03 // 2022",
    organization: "Dolphin Public School",
    period: "2021 - 2022",
    description:
      "Completed matriculation under the Central Board of Secondary Education.",
    icon: GraduationCap,
  },
  {
    number: "04",
    type: "CURRENT GOAL",
    title: "Open to Internships",
    timelineLabel: "04 // OPEN",
    organization: "Full Stack Development · UI/UX",
    period: "Open to opportunities",
    description: "",
    icon: BriefcaseBusiness,
  },
];

function Education() {
  return (
    <section className="section education-section" id="journey">
      <div className="container">
        <motion.div
          className="education-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">EDUCATION &amp; NEXT STEPS</p>
          <h2 className="section-title">
            Learning, building,
            <br />
            <span className="accent-text">moving forward.</span>
          </h2>
          <p className="section-description">
            My academic path in AI and Cybersecurity complements my hands-on
            work in web development and interface design.
          </p>
        </motion.div>

        <div className="journey-timeline">
          {journey.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="journey-item"
                key={item.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="journey-marker"><span>{item.number}</span></div>
                <div className="journey-card card">
                  <div className="journey-card-top">
                  <span className="journey-type">{item.type}</span>
                  <span className="journey-code">{item.timelineLabel}</span>
                    <div className="journey-icon"><Icon size={20} /></div>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="journey-organization">{item.organization}</p>
                  {item.academicFocus && <span className="journey-focus-badge">{item.academicFocus}</span>}
                  {item.description && <p className="journey-description">{item.description}</p>}
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Education;
