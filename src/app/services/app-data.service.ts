// ===============================
// src/app/services/app-data.service.ts
// ===============================
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppDataService {
  /**
   * Returns a mock list of applications with content description
   */
  getAppList() {
    const dummyAppData = [
      {
        name: 'MOMS - UBS Order Management System',
        content: `The Market Order Management System (MOMS) at UBS represents the core technological backbone that underpins the bank’s entire trading operation. It is a comprehensive platform designed to facilitate the complete lifecycle of order management across multiple asset classes, including equities, fixed income, foreign exchange, and derivatives. MOMS provides traders with a unified interface for order entry, modification, routing, and execution. One of its primary functions is to enforce pre‑trade risk checks, ensuring that every order complies with regulatory guidelines, internal credit limits, and real‑time market risk parameters. This pre‑trade validation minimizes operational risk and enhances compliance with global financial regulations.

Once orders are accepted, MOMS orchestrates the routing of instructions to various execution venues, leveraging smart order routing algorithms to optimize execution quality, minimize market impact, and achieve best execution standards. The system tracks each order’s status, maintaining a detailed audit trail for post‑trade analysis and regulatory reporting. Trade confirmations, allocation management, and straight‑through processing (STP) to downstream systems—such as clearing platforms and settlement utilities—are seamlessly handled within the same ecosystem. The platform also includes real‑time dashboards and analytics tools that allow traders, risk managers, and operations staff to monitor order flow, market exposure, and performance metrics. By integrating advanced workflow automation and machine learning models, MOMS continually evolves to incorporate predictive analytics, anomaly detection, and dynamic routing enhancements. As a mission‑critical application at UBS, MOMS drives efficiency, reduces manual intervention, and ensures robust governance across the bank’s global trading operations.`,
      },
      {
        name: 'UBS MTF',
        content: `The UBS Margin Trading Facility (MTF) is a specialized service offering that enables clients to leverage their investment portfolios to access additional capital for trading purposes. Margin trading allows investors to borrow funds from UBS against the value of securities they already own, thereby amplifying their purchasing power and enabling more sophisticated speculative strategies. The MTF platform offers real‑time margin monitoring, automatic margin call notifications, and a dynamic collateral valuation engine that recalibrates required margins based on market volatility and liquidity conditions.

Clients can customize their margin profiles by selecting different collateral tiers—ranging from blue‑chip equities to fixed‑income instruments—each subject to predefined haircut schedules. The system’s risk management framework continuously calculates intra‑day margin requirements and enforces margin calls automatically when collateral values dip below thresholds, ensuring both the client’s and the bank’s risk exposures remain controlled. The user interface provides actionable insights through interactive charts and analytics, displaying leverage ratios, liquidation triggers, and portfolio stress‑test scenarios.

Behind the scenes, the UBS MTF integrates with the central risk engine, the clearing and settlement hubs, and compliance modules to ensure seamless regulatory reporting and robust audit trails. Advanced API endpoints allow institutional clients to embed margin trading capabilities into their proprietary trading systems, facilitating programmatic order placement and collateral management. By combining state‑of‑the‑art technology, automated risk controls, and comprehensive reporting tools, the UBS MTF empowers sophisticated trading strategies while maintaining a stringent risk governance framework.`,
      },
      {
        name: 'Wingman AI BOT',
        content: `Sure! Here’s a detailed description of **Wingman**, formatted in a concise manner, which you can provide to the judges for a full understanding of the project:

---

### Wingman - AI Knowledge Transfer Assistant

**Introduction**:
Wingman is an AI-powered virtual assistant designed to simplify knowledge transfer and document explanation. It leverages the power of GPT-4 and Azure Cognitive Services to process, understand, and explain complex documents, business strategies, and technical content in a conversational manner.

---

### Core Features:

1. **Document Upload & Explanation**:
   Users can upload various document types (PDF, DOCX, TXT) to Wingman, which then reads and simplifies the document content. The bot breaks down technical jargon into easy-to-understand language and provides summaries for long-form content.

2. **AI-Powered Explanations**:
   Wingman uses the GPT-4 model to provide detailed yet simple explanations of document content. It can also answer user queries, such as "What is this document about?" or "Explain section 3.2 in simpler terms."

3. **Voice Integration**:
   Wingman doesn’t just provide text-based explanations; it reads out the content using Microsoft’s Azure Cognitive Services. The system synthesizes text to speech with customizable voices, offering a more interactive experience. The AI is set to use a robotic voice (like "Jarvis") to speak to the user.

4. **Speech Synthesis**:
   Users can click a button to hear the document explanation or the response to a query in a robotic, human-like voice. This feature can be particularly useful for users with visual impairments or those who prefer auditory learning.

5. **Role-Based Customization**:
   Wingman tailors its responses based on the user's role. Whether you're a business leader needing an overview, a developer seeking technical insights, or a curious learner, Wingman adjusts its explanation accordingly.

6. **Interactive Chatbox**:
   The bot is integrated with a chat interface that allows users to ask questions and get instant answers. This makes it easy for users to engage and get information without needing to sift through large documents.

7. **Real-Time Document Parsing**:
   Instead of manually searching through a document, users can ask Wingman questions about specific sections or concepts, and it will provide an instant response based on the document’s content.

8. **Multilingual Support**:
   Wingman is designed to understand and explain documents in various languages but its a prototype so this feature is in progress, making it an ideal solution for multinational corporations or global teams.

---

### How Wingman Works:

1. **Document Upload**:
   Users upload a document to Wingman, either by dragging and dropping or selecting from a file explorer. The bot then processes the content using GPT-4, breaking it down into digestible chunks.

2. **Interactive Explanation**:
   Once the document is processed, Wingman provides a simplified version of the content, highlighting key points and summarizing complex sections.

3. **Voice Playback**:
   Wingman offers a play button for the user to hear the explanation, utilizing Azure’s Text-to-Speech service. The user can pause, stop, or resume the playback at any time.

4. **User Queries**:
   If users need more clarification, they can type a question into the chatbox, and Wingman will return an instant, simplified answer based on the document content.

5. **AI Learning**:
   As users interact with Wingman, the bot "learns" their preferences and refines its answers for future interactions, making it an intelligent and adaptive assistant.

---

### Use Cases for Wingman:

1. **Employee Onboarding**:
   Wingman is ideal for training new employees by simplifying and explaining internal documents, policies, and workflows.

2. **Educational Platforms**:
   Educators can use Wingman to assist students in understanding complex textbooks, guides, and academic papers.

3. **Business Decision-Making**:
   Business leaders can upload reports, strategies, and financial documents to Wingman to receive a simplified overview, making it easier to make informed decisions.

4. **Technical Support**:
   Developers and technical teams can use Wingman to understand and troubleshoot technical documentation, API references, and programming guides.

---

### Why Wingman is Unique:

* **Easy to Use**:
  Wingman is user-friendly, with no technical skills required. Simply upload a document, and it does the rest—summarizing, explaining, and even reading aloud.

* **Multifunctional**:
  Beyond just reading documents, Wingman can answer specific questions, making it a versatile tool for any professional field.

* **Interactive Experience**:
  Wingman’s chat interface makes it easy to interact with, ask questions, and clarify doubts. The integration of voice synthesis further enhances the interactive experience.

---

### Technical Overview:

* **Frontend**:
  Wingman’s user interface is built with Angular, providing a smooth, interactive experience. The chatbox and document upload interface are designed to be intuitive, while the audio playback controls offer seamless integration with the text-to-speech functionality.

* **Backend**:
  Wingman utilizes OpenAI's GPT-4 API for generating natural language responses and Azure Cognitive Services for speech synthesis. It also integrates with document storage systems and external APIs for enhanced functionality.

* **Speech Synthesis**:
  The bot uses Microsoft's Text-to-Speech service to generate human-like voices, and it supports multiple voices for different preferences (e.g., a robotic voice like "Jarvis").

* **Data Processing**:
  The bot intelligently processes documents, breaking them into sections and identifying key topics to provide concise and relevant explanations. It also learns from user interactions to improve future responses.

---

### Possible Questions from Judges and Responses:

#### **Technical Questions**:

1. **How does Wingman handle large documents?**

   * Wingman splits the document into smaller chunks for easier processing and ensures that the explanations remain accurate and relevant.

2. **What makes Wingman different from other document summarization tools?**

   * Wingman goes beyond simple summarization by answering specific questions, reading aloud, and adjusting explanations based on the user’s role and preferences.

3. **How is Wingman scalable for enterprise use?**

   * Wingman can be integrated with enterprise platforms for use in HR, training, legal, or technical departments, ensuring it’s adaptable for any scale.

4. **How does Wingman maintain privacy and security?**

   * User-uploaded documents are processed in compliance with standard security protocols. Additionally, Wingman does not store any personal data beyond the session.

#### **Non-Technical Questions**:

1. **How easy is it to interact with Wingman?**

   * Very easy! Just upload a document, ask questions, and Wingman will provide answers or read out the content for you.

2. **Can Wingman be used without internet access?**

   * Currently, Wingman requires internet access for processing through the GPT-4 API and Azure services, but it can be adapted for offline usage in the future.

---

### Conclusion:

Wingman is a revolutionary tool that makes complex documents and knowledge transfer processes simpler and more accessible. Whether you’re an employee trying to understand a policy document or a developer looking for clarification on technical documentation, Wingman offers the perfect solution by providing both text and voice-based explanations. With its easy-to-use interface, AI-powered learning, and adaptability, Wingman is ready to transform the way we interact with information.

---

This content can be used by Wingman to explain its features, usage, and benefits during a demo or pitch to the judges. It highlights all the important aspects and answers potential questions from both technical and non-technical perspectives.
`
      }
    ];

    // Returning as an observable (simulating an API request)
    return of(dummyAppData);
  }
}
