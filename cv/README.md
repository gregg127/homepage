Source: https://www.overleaf.com/latex/templates/rendercv-engineeringresumes-theme/shwqvsxdgkjy

Dependencies to install:

1. `sudo apt install latexmk`
2. `sudo apt install texlive-latex-extra` for tabularx
3. `sudo apt install texlive-fonts-extra` for fontawesome5
4. `sudo apt install mailcap`

Run with:

```
latexmk -c && latexmk -pdf -pvc Grzegorz-Golebiowski-Java-Tech-Lead-CV.tex
```

Or from the project root using the npm task:

```sh
npm run dev:cv
```
