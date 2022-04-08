import * as React from "react"

const PreBodyComponents = [
  <script
    key="peronalScript"
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          window.__onThemeChange = function() {};
          function setTheme(newTheme) {
            window.__theme = newTheme;
            preferredTheme = newTheme;
            document.body.className = newTheme;
            window.__onThemeChange(newTheme);
          }

          var preferredTheme;
          try {
            preferredTheme = localStorage.getItem('theme');
          } catch (err) { }

          window.__setPreferredTheme = function(newTheme) {
            setTheme(newTheme);
            try {
              localStorage.setItem('theme', newTheme);
            } catch (err) { }
          }

          var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
          darkQuery.addListener(function(e) {
            window.__setPreferredTheme(e.matches ? 'dark' : 'light');
          });

          setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
        })();
      `,
    }}
  />
]

const BodyAttributes = {
  "className": "light"
}

export const onRenderBody = ({
  setPreBodyComponents,
  setBodyAttributes
}, pluginOptions) => {
  setPreBodyComponents(PreBodyComponents)
  setBodyAttributes(BodyAttributes)
}
