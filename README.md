# Portfolio site

## Structure
- `index.html`, page content and structure
- `css/styles.css`, all styling
- `js/script.js`, nav highlighting, animated stats, collapsible experience rows, and contact form validation
- `assets/`, empty folder, put images here (like dashboard or schema screenshots)

## Interactive features
- Sticky nav bar that highlights the section currently in view
- The four hero stats count up from zero the first time they scroll into view
- Each experience entry is collapsed by default (except the current role), click the role title to expand its bullet points
- The contact form validates name, email, and message in the browser and shows a success message, it does not send anywhere yet

## To do before publishing
- Add a screenshot to `assets/` for the Admissions Outreach Dashboard and the SQL Finance Portfolio, then update the two `.project-figure` placeholders and the GitHub links in `index.html`
- Decide how the contact form should actually deliver messages, see the comment at the top of `js/script.js`

## Running it locally
Open the folder in VS Code, install the Live Server extension, right click `index.html`, and choose "Open with Live Server". It opens in your browser and refreshes automatically as you save changes.
