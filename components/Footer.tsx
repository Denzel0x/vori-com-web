import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <div style={{ maxWidth: 340 }}>
            <div className="logo">
              <Image src="/brand/logo.jpg" alt="" width={30} height={30} />
              <span className="logo-text">invorious</span>
            </div>
            <p style={{ marginTop: 14 }}>
              Custom software, technology consulting and Web3 development — founded in Sydney, with a second
              location in Bogotá, delivered by a fully remote team working from all over the world.
            </p>
          </div>
          <div className="footer-cols">
            <nav aria-label="Footer">
              <h4>Site</h4>
              <ul>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
            <div>
              <h4>Get in touch</h4>
              <ul>
                <li><a href="mailto:hello@invorious.com">hello@invorious.com</a></li>
                <li><a href="mailto:career@invorious.com">career@invorious.com</a></li>
                <li><a href="tel:0426576625">0426 576 625</a></li>
                <li>Sydney, NSW, Australia (HQ)</li>
                <li>Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} Invorious Software Agency. All rights reserved.</p>
      </div>
    </footer>
  );
}
