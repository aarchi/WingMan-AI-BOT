Here’s the full **`README.md`** code you can directly copy-paste:

````markdown
# Wingman

Wingman is an AI-powered web application that helps users understand, summarize, and interact with documents using natural language. Built using Angular, Python (Flask), and OpenAI's GPT-4 and GPT-3.5 Turbo APIs, Wingman can read, analyze, explain, and provide detailed knowledge transfer (KT) on various documents. It includes speech-to-text (STT) and text-to-speech (TTS) capabilities, making interactions seamless and user-friendly.

![Wingman Screenshot](assets/landingpage.png)
\![Wingman Screenshot](assets/bot.png)
## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Configuration](#environment-configuration)
3. [Usage](#usage)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [API Configuration](#api-configuration)

---

## 1. Features

- **Document Analysis**: Analyze and explain documents (PDF, DOCX, TXT).
- **Interactive Roles**: Tailored explanations based on roles:
  - Presentation Mode
  - Summary Expert
  - Tech Deep-Dive
  - Student Mode
  - Practical Insights
- **AI Integration**: Uses OpenAI's GPT-4 and GPT-3.5 Turbo models for detailed and precise responses.
- **Speech Capabilities**: Azure Cognitive Services integration for real-time text-to-speech and speech-to-text.
- **Dynamic UI**: Responsive Angular frontend with intuitive user interactions.
- **Error Handling**: User-friendly notifications for missing or invalid content.

---

## 2. Getting Started

Follow these steps to set up Wingman on your local machine.

### Prerequisites

- **Node.js:** Download from [nodejs.org](https://nodejs.org).
- **Angular CLI:** 
  ```bash
  npm install -g @angular/cli
````

* **Python:** Download from [python.org](https://www.python.org/downloads/).
* **OpenAI API Key:** Obtain from [OpenAI Platform](https://platform.openai.com/api-keys).
* **Azure Cognitive Services Key:** Obtain from [Azure Portal](https://portal.azure.com/).

---

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd wingman
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd python-server
pip install Flask PyPDF2 flask_cors docx2txt python-dotenv
```

---

### Environment Configuration

Create a `.env` file in the root folder (`python-server`):

```env
OPENAI_API_KEY=your-openai-api-key
AZURE_SPEECH_KEY=your-azure-speech-key
AZURE_SPEECH_REGION=your-azure-region
```

---

## 3. Usage

Start the backend server (Python):

```bash
cd python-server
python app.py
```

Start the frontend server (Angular):

```bash
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200/).

**Example Workflow:**

* Upload a document (e.g., PDF or DOCX).
* Choose an explanation style (e.g., "Summary Expert" or "Tech Deep-Dive").
* Wingman provides instant explanations, summaries, or presentations.
* Use built-in audio controls for text-to-speech output.

---

## 4. Backend Setup

The backend handles document parsing and integrates OpenAI APIs.

* Ensure Python dependencies are installed:

  ```bash
  pip install Flask PyPDF2 flask_cors docx2txt python-dotenv openai
  ```

* Run Flask server:

  ```bash
  python app.py
  ```

---

## 5. Frontend Setup

The Angular frontend manages user interactions and displays AI-generated content.

* Install Angular dependencies:

  ```bash
  npm install
  ```

* Run Angular development server:

  ```bash
  ng serve
  ```

---

## 6. API Configuration

### OpenAI Integration

* Set OpenAI API key in `.env` file:

  ```env
  OPENAI_API_KEY=your-openai-api-key
  ```

### Azure Cognitive Services (STT & TTS)

* Set Azure API key and region in `.env` file:

  ```env
  AZURE_SPEECH_KEY=your-azure-speech-key
  AZURE_SPEECH_REGION=your-azure-region
  ```

---

**Enjoy using Wingman for efficient, interactive, and insightful knowledge transfer!**

```
