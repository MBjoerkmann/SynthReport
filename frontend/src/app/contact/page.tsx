export default function ContactPage() {
  return (
    <main className="page-container">
      <section className="contact-section">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="contact-subtitle">
          Feel free to reach out for collaborations, questions, or just to say hello.
        </p>

        <div className="contact-cards">
          <a
            href="mailto:mbjoerkmann@proton.me"
            className="contact-card"
          >
            <span className="contact-card-icon">&#9993;</span>
            <h3>Email</h3>
            <p>mbjoerkmann@proton.me</p>
          </a>

          <a
            href="https://github.com/MBjoerkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-card-icon">&#128187;</span>
            <h3>GitHub</h3>
            <p>github.com/MBjoerkmann</p>
          </a>

          <a
            href="https://www.linkedin.com/in/mathias-bj%C3%B8rkmann/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-card-icon">&#128101;</span>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/mathias-bj%C3%B8rkmann/</p>
          </a>
        </div>
      </section>
    </main>
  );
}
