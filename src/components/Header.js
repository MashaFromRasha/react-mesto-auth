function Header(props) {
  return (
    <header className="header">
      <div className="logo"></div>
      {props.children}
      {props.header}
    </header>
  );
}

export default Header;
