import Link from "next/link";

const skills = [
  "Python", "Django", "TypeScript", "React", "Next.js",
  "PostgreSQL", "Docker", "GCP", "REST APIs", "AI/ML",
];

export default function HomePage() {
  return (
    <main className="page-container">
      <section className="hero">
        <h1 className="hero-title">Mathias Høegh Bjørkmann</h1>
        <p className="hero-tagline">Full-Stack Developer &amp; AI Enthusiast</p>
        <div className="hero-cta">
          <Link href="/ai-tool" className="btn-primary">
            Try the AI Tool
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>

      <section className="bio-section">
        <h2>About Me</h2>
        <p>
          I&apos;m a developer passionate about building modern web applications
          and leveraging AI to solve real-world problems. This portfolio
          showcases my work and interests — including an AI-powered company
          analysis tool you can try right now.
        </p>
      </section>

      <section className="skills-section">
        <h2>Tech Stack</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="links-section">
        <h2>Find Me Online</h2>
        <div className="links-grid">
          <a
            href="https://github.com/MBjoerkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mathias-bjørkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            LinkedIn
          </a>
          <a href="mailto:mbjoerkmann@proton.me" className="link-card">
            Email
          </a>
        </div>
      </section>
    </main>
  );
}
