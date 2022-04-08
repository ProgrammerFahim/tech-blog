import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Toggle from "react-toggle"

import sun from "../assets/sun.png"
import moon from "../assets/moon.png"

const Layout = ({ location, title, children }) => {
  const [ theme, changeTheme ] = useState(null)

  useEffect(() => {
    changeTheme(window.__theme)
    window.__onThemeChange = () => {
        changeTheme(window.__theme)
    }
  }, [])

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        {theme !== null ? (
          <Toggle
            icons={{
              checked: (
                <img
                  src={moon}
                  width="16"
                  height="16"
                  role="presentation"
                  style={{ pointerEvents: "none" }}
                />
              ),
              unchecked: (
                <img
                  src={sun}
                  width="16"
                  height="16"
                  role="presentation"
                  style={{ pointerEvents: "none" }}
                />
              ),
            }}
            checked={theme === "dark"}
            onChange={e =>
              window.__setPreferredTheme(
                e.target.checked ? "dark" : "light" 
              )
            }
          />
        ) : null}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Also find me on: 
        {` `}
        <a href="https://mobile.twitter.com/ProgrammerFahim">Twitter</a>
        {` `}
        •
        {` `}
        <a href="https://www.facebook.com/fahim.faisal.334">Facebook</a>
        {` `}
        •
        {` `}
        <a href="https://www.github.com/ProgrammerFahim">Github</a>
      </footer>
    </div>
  )
}

export default Layout
