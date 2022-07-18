function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">{`© ${date} Mesto Russia`}</p>
    </footer>
  );
}

export default Footer;
