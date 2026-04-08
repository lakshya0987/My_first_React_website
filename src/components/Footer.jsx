function Footer() {
  return (
    <footer className="footer-dark">
      <div className="footer-container">
        <div className="footer-box">
          <h3>Links</h3>
          <p className="highlight">2014 Pictures</p>
        </div>

        <div className="footer-box">
          <h3>Stay tuned</h3>
          <p>Connect with us and stay in the loop.</p>

          <div className="social-icons">
            <span className="icon">T</span>
            <span className="icon">F</span>
          </div>
        </div>

        <div className="footer-box">
          <h3>Email updates</h3>
          <p>Be the first to hear about our offers and announcements.</p>

          <div className="email-box">
            <input type="text" placeholder="email" />
          </div>
        </div>

        <div className="footer-box">
          <h3>Contact us</h3>
          <p>Questions? We&apos;ve got answers. Try us.</p>

          <button className="email-btn">EMAIL US</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © — <span className="highlight">The Next Web</span>, Inc.
          Photography © <span className="highlight">Julia de Boer</span>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;