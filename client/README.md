# README for client side of project

## PDF Generation

- pdfmake
  - seems challenging because I would have to write code for the pdf separately from how it is written in the view, adds touchpoints to mantain as I'm fleshing out the project
  - pros/cons: pdfmake would allow me to (I think?) have 100% client side dynamic pdf downloads, at the cost of learning their API and code duplication for presentation logic. I'd rather just re-use HTML and create some routes for puppeteer to use.
- Puppeteer
  - puppeteer's purpose seems to be being a headless version of chrome, so it does does a lot more than PDFs, but looks viable for making PDFs. bonus points for being extremely popular and actively mantained.
  - It is able to turn existing html pages into any file type, including PDFs, which would mean I can create an HTML view of the PDF to be downloaded and then write a single line of code to turn it into a PDF. I love that this prevents dupilication of HTML/PDF code.
  - however, so far its not clear if it has to save the files inside my project or if they can simply be returned for a download...
  - look into path option/API, if no path provided then it won't be saved to disk - promising?'
  - [stack overflow](https://stackoverflow.com/a/53171202/9193938)
  - without supplying a path, we can run `const pdf = await page.pdf();` to get a binary representation of the generated file, which I can then pass to the client. dowloading with PDF mime type may require a different tool.
  - there may be bad interactions between puppeteer and react, but puppeteer will need access to html files ... perhaps routes can be created for the html views, that can be passed as path to puppeteer

## File Downloading

- it looks like downloading a file is unique functionality that needs to be implemented on it's own, so my PDF generation service will be separate from the package/procedure that lets a user download a file.
- static files may be simply linked to for downloads using HTML only, but this does not appear to be possible with dynamically generated files that are not stored in server storage permenantly, such as the submittal PDFs I would like to dynamically generate and serve to users
- can be solved with data/file blobs (literally the technical term)

## Routing (React vs Reach)

- in line with react's emphasis on hooks for new versions, [the docs recommend using @reach/router](https://reacttraining.com/blog/reach-react-router-future/#which-project-should-i-choose-today)
  - once react-router v6 is released, migrate to react-router v6 using reach api style
- [reach router docs](https://reach.tech/router/)

## React style

### use function components, not class components

- facebook supports using function components over class components for post-2018 dev
- material-ui has code examples using functional react components, not class components
- react hooks can handle state, handle all cases that classes typically cover

## Material-UI style
