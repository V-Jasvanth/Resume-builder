# Resume Builder

A modern, browser-based Resume Builder web application that allows users to quickly create, customize, preview, and export professional resumes. Built entirely with standard web technologies, all resume draft data is kept private and stored locally in the user's browser using localStorage without requiring a backend server or account creation.

---

## Key Features

- **Multi-Step Resume Form**: Structured step-by-step form interface (Personal Details → Experience & Qualifications → Template & Color Selection).
- **Comprehensive Resume Content Sections**:
  - Personal Information & Custom Resume Title
  - Educational Background & Qualifications
  - Work Experience & Employment History
  - Skills & Core Competencies
  - Hobbies & Personal Interests
  - Languages Spoken & Proficiency
  - Key Achievements & Summary
- **Profile Photo Upload**: Real-time profile photo preview with client-side format validation (JPG, JPEG, PNG, GIF, WEBP) and file size restriction (max 3 MB).
- **Automatic Draft Persistence**: Progress auto-saves continuously to `localStorage` as you type, allowing users to return and resume work seamlessly across browser refreshes.
- **Start Fresh / Clear Form**: One-click control to reset form fields and delete saved draft data after confirmation.
- **Multiple Professional Templates**:
  - **Stanford (Template 1)**: Sleek two-column layout with bold sidebar header accents and structured section boxes.
  - **Harvard (Template 2)**: Classic single/double header layout with prominent title header, circular avatar, and clean horizontal dividers.
  - **Edinburgh (Template 3)**: Modern dark header theme with side-by-side contact details, skill lists, and timeline experiences.
- **Dynamic Color Customization**: Live palette swatches for selecting custom header and sidebar accent colors across templates.
- **Flexible Export Options**:
  - **Print / Save as PDF**: Optimized `@media print` CSS rules for A4 page dimensions, hiding all UI controls, buttons, and navigation elements.
  - **PNG Image Export**: High-resolution image export using native HTML5 Canvas Blob generation.
- **Form Validation & Real-time Feedback**: Field validation with descriptive inline error messages for required fields, email format, phone numbers, and portfolio URLs.
- **Security & Privacy**: Client-side XSS protection with HTML escaping, no external API keys required, offline location fallback dropdowns (Country, State, City), and 100% local storage.
- **Responsive Layout**: Fluid design optimized for desktops, laptops, tablets, and mobile devices (320px to 1200px+).
- **Additional Pages**: Homepage showcase with template previews and interactive FAQ page.

---

## Templates

1. **Stanford (Template 1)**: Ideal for corporate, tech, and engineering roles requiring a clear separation between core contact details/skills and detailed employment history.
2. **Harvard (Template 2)**: Ideal for academic, research, management, and executive applications featuring a traditional structured layout and prominent custom header.
3. **Edinburgh (Template 3)**: Ideal for creative, design, marketing, and modern professional roles using a dark header theme and visual progress bars.

---

## Technology Stack

- **Core**: HTML5, CSS3, JavaScript (ES6)
- **Libraries**: jQuery, Bootstrap 4/5, FontAwesome, Bootstrap Icons
- **APIs & Storage**: Browser `localStorage`, HTML5 Canvas API (`toBlob`), FileReader API

---

## Project Structure

```text
Resume-Builder/
├── index.html              # Homepage & template showcase
├── Form.html               # Multi-step resume builder application
├── faq.html                # Frequently Asked Questions page
├── form.js                 # Form handling, validation, auto-save engine
├── transfer.js             # Input sanitization and template rendering
├── README.md               # Project documentation
├── .gitignore              # Git exclusion rules
├── css/
│   ├── index.css           # Homepage styling
│   ├── form.css            # Resume builder form & print styles
│   └── faq.css             # FAQ page styling
├── Templates/
│   ├── template1.css       # Stanford template styles
│   ├── template1.js        # Stanford template scripts
│   ├── template2.css       # Harvard template styles
│   ├── template2.js        # Harvard template scripts
│   └── template3.css       # Edinburgh template styles
└── images/                 # SVG logos, assets, and template previews
```

---

## How to Run

Because this is a pure client-side web application, no server installation or build steps (`npm install` or `npm start`) are required.

1. **Download or Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Resume-Builder.git
   ```
2. **Open the Project Folder** in VS Code or your preferred text editor.
3. **Launch the Application**:
   - Double-click `index.html` to open it directly in any modern browser (Chrome, Firefox, Edge, Safari).
   - Alternatively, right-click `index.html` in VS Code and select **Open with Live Server**.
4. Click **Create Resume** to start building your resume.

---

## Deployment Readiness

This application is 100% static and ready for instant deployment on static hosting platforms such as:
- **GitHub Pages**
- **Netlify**
- **Vercel**

Since `index.html` is located at the root directory and all assets use clean relative paths, deploying requires simply pointing your host to the main branch.

---

## Privacy & Security

All resume data entered into the application remains on your local device. The application reads and writes draft states directly to your browser's `localStorage` and processes images locally via the `FileReader` API. No personal data, email addresses, or uploaded documents are transmitted to remote servers.
