# AWS Static Portfolio Website (Cloud Resume Challenge)

**Welcome to the repository of my personal cloud portfolio project!** This web application was built as part of the Cloud Resume Challenge. It serves as an interactive portfolio that showcases my 10+ years of experience in enterprise system and software architecture, alongside my specialization in AWS cloud infrastructures.

You can view the live deployment and read a detailed description of the architecture at: **[sascha-friederichs.de](https://sascha-friederichs.de)** [1]

---

## 🛠️ Tech Stack & Cloud Architecture

The application relies on a 100% serverless, event-driven architecture designed for maximum performance, high availability, and zero operational overhead.

*   **Frontend Framework:** [React](https://react.dev) built with [Vite](https://vitejs.dev) for a highly optimized, fast-loading Single Page Application (SPA).
*   **Hosting & Deployment:** [AWS Amplify Hosting](https://amazon.com) managing automated CI/CD pipelines, SSL/TLS certificates, and global edge distribution.
*   **Backend & API:** [AWS AppSync](https://amazon.com) (GraphQL) utilizing direct JavaScript data source resolvers to completely eliminate cold starts.
*   **Database:** [Amazon DynamoDB](https://amazon.com) for persistent, transactional storage of the global visitor counter.
*   **Domain & DNS:** [Amazon Route 53](https://amazon.com) for custom domain management, backed by automated SSL/TLS encryption via **AWS Certificate Manager (ACM)**.

### The Real-Time Visitor Counter (Amplify Gen 2)
When the website loads, a React `useEffect` hook triggers an asynchronous function. This function communicates directly with AppSync via the Amplify data client, checks if the counter entry exists in DynamoDB, transactionally increments the view metric by `+1`, and updates the UI state seamlessly.

---

## 🚀 Showcased Cloud Projects

This portfolio aggregates the architecture, design decisions, and documentation of two core systems:

1.  **This Portfolio Website (AWS Amplify Stack):**
    *   Focuses on cost-optimized serverless hosting (scaling to zero when idle), edge caching via CDN, and a git-based deployment workflow.
2.  **Serverless Inventory App (Infrastructure as Code):**
    *   A separate, fully automated CRUD application featured on the platform.
    *   **Tech Stack:** Amazon API Gateway, AWS Lambda, and Amazon DynamoDB.
    *   **Deployment:** Managed as code via **Terraform** utilizing an encrypted S3 remote state backend and deployed automatically through a **GitHub Actions** CI/CD pipeline.

---

## 🏅 Verified Credentials

The interface highlights and validates several professional certifications, including:
*   **AWS Certified Solutions Architect – Associate** [1]
*   **iSAQB Certified Professional for Software Architecture** (Foundation Level) [1]
*   **Oracle Certified Professional**, Java EE 5 Web Component Developer [1]
*   **Oracle Certified Associate**, Java SE 7 Programmer [1]
*   **OMG-Certified Systems Modeling Professional** (SysML Fundamental Model Builder) [1]

