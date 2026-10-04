import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";

const PHONE = "9122928643";

function Contact() {
  const [copyMessage, setCopyMessage] = useState("");

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
      setCopyMessage("Phone number copied");
      window.setTimeout(() => setCopyMessage(""), 2200);
    } catch {
      setCopyMessage("Clipboard unavailable — tap the number to call");
      window.setTimeout(() => setCopyMessage(""), 2800);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <motion.div
          className="contact-wrapper"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-main">
            <p className="section-label">GET IN TOUCH</p>

            <h2 className="contact-title">
              Have an idea?
              <br />
              <span className="accent-text">Let's build it.</span>
            </h2>

            <p className="contact-description">
              Whether you have a project in mind, an opportunity to
              discuss, or simply want to connect, I'd be happy to hear
              from you.
            </p>

            <div className="contact-phone-row">
              <a href={`tel:${PHONE}`} className="contact-phone-link">
                <Phone size={17} />
                <span>{PHONE}</span>
                <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                className="contact-copy-button"
                onClick={copyPhone}
                aria-label="Copy phone number"
                title="Copy phone number"
              >
                {copyMessage === "Phone number copied" ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <AnimatePresence mode="wait">
              {copyMessage && <motion.p className="contact-copy-toast" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>{copyMessage}</motion.p>}
            </AnimatePresence>
          </div>

          <div className="contact-opportunity-panel">
            <span className="contact-panel-label">CURRENTLY OPEN TO</span>
            <h3>Internship opportunities</h3>
            <p>Full-stack development · UI/UX</p>
            <div className="contact-status">
              <span className="availability-dot"></span>
              AI &amp; Cybersecurity student at IIT Patna
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
