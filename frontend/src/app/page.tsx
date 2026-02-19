"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/locale-context";

const skills = [
  "Python", "Django", "TypeScript", "React", "Next.js",
  "PostgreSQL", "Docker", "GCP", "REST APIs", "AI/ML",
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="page-container">
      <section className="hero">
        <h1 className="hero-title">Mathias H&oslash;egh Bj&oslash;rkmann</h1>
        <p className="hero-tagline">{t("hero.tagline")}</p>
        <div className="hero-cta">
          <Link href="/ai-tool" className="btn-primary">
            {t("hero.tryAiTool")}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t("hero.getInTouch")}
          </Link>
        </div>
      </section>

      <section className="bio-section">
        <h2>{t("about.heading")}</h2>
        <p>{t("about.bio")}</p>
      </section>

      <section className="skills-section">
        <h2>{t("skills.heading")}</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="links-section">
        <h2>{t("links.heading")}</h2>
        <div className="links-grid">
          <a
            href="https://github.com/MBjoerkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            {t("links.github")}
          </a>
          <a
            href="https://linkedin.com/in/mathias-bj%C3%B8rkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            {t("links.linkedin")}
          </a>
          <a href="mailto:mbjoerkmann@proton.me" className="link-card">
            {t("links.email")}
          </a>
        </div>
      </section>
    </main>
  );
}
