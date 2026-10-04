import { ArrowUp } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./BrandIcons";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#work" },
  { name: "Qualifications", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/0vansh0", icon: GitHubIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/vanshraj00", icon: LinkedInIcon },
  { name: "Instagram", href: "https://www.instagram.com/0_vanshraj_0/?hl=en", icon: InstagramIcon },
];

function Footer() {
  const currentYear = 2026;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-display-name" aria-hidden="true">VANSH</div>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">vansh<span>.</span></a>
            <p>Building across web development,<br />AI, and cybersecurity.</p>
          </div>
          <div className="footer-navigation">
            <h3>QUICK LINKS</h3>
            <nav className="footer-links">
              {footerLinks.map((link) => <a href={link.href} key={link.name}>{link.name}</a>)}
            </nav>
          </div>
        </div>
        <nav className="footer-contact-dock" aria-label="Social contact links">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return <a href={social.href} key={social.name} target="_blank" rel="noreferrer" aria-label={social.name} title={social.name}><Icon size={18} /><span>{social.name}</span></a>;
          })}
        </nav>
        <div className="footer-bottom">
          <p>© {currentYear} Vansh Raj. All rights reserved.</p>
          <p className="footer-made">Made with <span>♥</span> and code.</p>
          <a href="#home" className="footer-back-top">Back to top <ArrowUp size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
