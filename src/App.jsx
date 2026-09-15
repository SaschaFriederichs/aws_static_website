import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data'
import GitHub from './assets/github.png'
import LinkedIn from './assets/linked-in.png'
import Xing from './assets/xing.png'
import Email from './assets/email.png'
import Download from './assets/download.png'
import badgeAWS_SolutionsArchitect from './assets/aws-certified-solutions-architect-associate.png'
import badgeISAQB_SoftwareArchitect from './assets/isaqb-certified-professional-for-software-architecture-foundation-level.png'
import badgeOracleJavaEE5 from './assets/oracle-certified-professional-java-ee-5-web-component-developer-jpn.png'
import badgeOracleJavaSE7 from './assets/oracle-certified-associate-java-se-7-programmer.png'
import badgeOMG_SysML from './assets/sysml-fundamental-model-builder.png'
import awsStaticWebsiteArchitecture from './assets/aws_static_website_architecture.png'
import awsInventoryAppArchitecture from './assets/aws_inventory_app_architecture.png'
import './App.css'

// An Amplify client is required for the backend
Amplify.configure(outputs);
const client = generateClient();

function App() {
    const [visitorCount, setVisitorCount] = useState(null);
    useEffect(() => {
        async function updateCounter() {
        const counterId = "global_website_counter";
        try {
            // 1. Try to get the counter value from DynamoDB
            const { data: counter } = await client.models.Counter.get({ id: counterId });

            if (counter) {
                // 2. If counter exists increment the counter by 1
                const { data: updatedCounter } = await client.models.Counter.update({
                    id: counterId,
                    views: counter.views + 1
                });
                setVisitorCount(updatedCounter.views);
            } else {
                // 3. Fallback: First website call ever -> create counter entry
                const { data: newCounter } = await client.models.Counter.create({
                    id: counterId,
                    views: 1
                });
                setVisitorCount(newCounter.views);
            }
        } catch (error) {
            console.error("Failure in updating Amplify-Counters:", error);
        }
    }
    updateCounter();
    }, []);
	
	return (
	<>
    <header className="portfolio-header">
        <h2>Welcome to my personal AWS Cloud Portfolio</h2>
        <h3>Sascha Friederichs — Lead System Architect & AWS Solutions Architect</h3>
        <div className="flex-container-hero-text">
            <p>
                More than 10 years of experience in system and software architecture design, alongside 22 years of engineering
                experience across various roles. Career progression includes working as a hardware and software development
                engineer, software developer, project manager, software architect, system architect, team leader, and ultimately,
                lead system architect. Leveraging this deep expertise in designing complex, scalable systems, I am transitioning
                into an AWS Solution Architect role to drive business innovation through cloud-native architectures, high
                availability, and secure cloud infrastructures.
            </p>
        </div>
        <div className="flex-container-global-counter">
            <p>
                Visitors on this website:{' '}
                <strong id="counter-value">
                    {visitorCount !== null ? visitorCount : 'Loading...'}
                </strong>
            </p>
        </div>
        <div className="flex-container-contact">
            <a href="https://github.com/SaschaFriederichs" target="_blank" rel="noreferrer" className="flex-item-contact button">
                <img src={GitHub} width="20" height="20" alt="GitHub" />
                <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/sascha-friederichs-ba32b4153" target="_blank" rel="noreferrer" className="flex-item-contact button">
                <img src={LinkedIn} width="20" height="20" alt="LinkedIn" />
                <span>LinkedIn</span>
            </a>
            <a href="https://www.xing.com/profile/Sascha_Friederichs2" target="_blank" rel="noreferrer" className="flex-item-contact button">
                <img src={Xing} width="20" height="20" alt="Xing" />
                <span>Xing</span>
            </a>
            <a href="mailto:sascha_friederichs@web.de" target="_blank" rel="noreferrer" className="flex-item-contact button">
                <img src={Email} width="20" height="20" alt="Email" />
                <span>sascha_friederichs@web.de</span>
            </a>
            <a href="/Curriculum_Vitae_Friederichs.pdf" download className="flex-item-contact button">
                <img src={Download} width="20" height="20" alt="CV_Download" />
                <span>CV Download</span>
            </a>
        </div>
    </header>
    <main className="portfolio-main">
    	<div className="flex-container-headings">
    		<h3>Verified Credentials</h3> 
    	</div>
    	<div className="flex-container-badges">
    		<div className="flex-item-badges">
    			<img src={badgeAWS_SolutionsArchitect} className="base" width="100" height="100" alt="Badge AWS Certified Solutions Architect"/>
    		</div>
    		<div className="flex-item-badges-text">
    			<p>AWS Certified Solutions Architect – Associate</p>
    		</div>
            <div className="flex-item-badges">
                <img src={badgeISAQB_SoftwareArchitect} className="base" width="100" height="100" alt="Badge ISAQB Certified Professional for Software Architecture"/>
            </div>
            <div className="flex-item-badges-text">
                <p>ISAQB Certified Professional for Software Architecture - Foundation Level</p>
            </div>
            <div className="flex-item-badges">
                <img src={badgeOracleJavaEE5} className="base" width="100" height="100" alt="Badge Oracle Certified Professional, JavaEE 5 Web Component Developer"/>
            </div>
            <div className="flex-item-badges-text">
                <p>Oracle Certified Professional, Java EE 5 Web Component Developer</p>
            </div>
    		<div className="flex-item-badges">
    			<img src={badgeOracleJavaSE7} className="base" width="100" height="100" alt="Badge Oracle Certified Associate, Java SE 7 Programmer"/>
    		</div>
    		<div className="flex-item-badges-text">
    			<p>Oracle Certified Associate, Java SE 7 Programmer</p>
    		</div>
            <div className="flex-item-badges">
                <img src={badgeOMG_SysML} className="base" width="100" height="100" alt="Badge OMG-Certified Systems Modeling Professional-Model Builder-Fundamental"/>
            </div>
            <div className="flex-item-badges-text">
                <p>OMG-Certified Systems Modeling Professional - Model Builder - Fundamental</p>
            </div>
    	</div>
    	<div className="flex-container-headings">
    		<h2>Architecture Diagram of This Website</h2>
    	</div>
    	<div className="flex-container-architecture-diagram">
    		<div className="flex-item-architecture-diagram">
    			<img src={awsStaticWebsiteArchitecture} className="base" width="500" height="500" alt="Diagram AWS Static Website Architecture" />
    		</div>
            <div className="flex-item-architecture-diagram-text">
                <p>
                    <strong>Diagram Description</strong><br />
                    This diagram illustrates the serverless architecture powering this website. The frontend is
                    built with React and Vite (HTML, CSS, JavaScript). Upon pushing source code to GitHub, AWS
                    Amplify Hosting automatically triggers a managed CI/CD pipeline to build the application, deploy
                    the static assets, and distribute them globally with low latency. Amazon Route 53 handles DNS
                    management for the custom domain, backed by automated SSL/TLS encryption managed via AWS
                    Certificate Manager (ACM). For the dynamic backend component, the user's browser securely
                    communicates via HTTPS/GraphQL directly with AWS AppSync. To minimize operational overhead and
                    completely eliminate cold starts, AWS AppSync utilizes direct JavaScript data source resolvers
                    to interact natively with Amazon DynamoDB, where the global visitor counter is transactionally
                    managed and stored.
                </p>          
            </div>
    	</div>
        <div className="flex-container-headings">
            <h3>Design Decisions (This Website)</h3>
        </div>
        <div className="flex-container-design-decisions">
            <p>Why choosing AWS Amplify instead of other solutions?</p>
            <ul>
                <li>
                    <strong>Cost Optimization:</strong> Leveraged a 100% serverless stack (Amplify Hosting & Amazon 
                    DynamoDB) that automatically scales to zero when idle, keeping operations securely within
                    the AWS Free Tier.
                </li>
                <li> 
                    <strong>Security & Privacy:</strong> Enforced data-in-transit encryption across the global
                    network by deploying Amazon CloudFront paired with an SSL/TLS certificate from AWS
                    Certificate Manager.
                </li>
                <li>
                    <strong>Performance Efficiency:</strong> Utilized CloudFront's Global Edge Network to cache static
                    assets close to end-users, minimizing latency and reducing backend load. 
                </li>
                <li>
                    <strong>Minimal Maintenance Overhead:</strong> Transitioning from traditional infrastructure
                    (like virtual machines or EC2 instances) to an entirely serverless architecture eliminates
                    the need for operating system patching, server provisioning, and manual scaling configurations.
                    This allows a shift in focus from infrastructure maintenance to application value.
                </li>
            </ul>   
        </div>
        <div className="flex-container-headings">
            <h2>Serverless Inventory App with Terraform & GitHub Actions</h2>
        </div>
        <div className="flex-container-architecture-diagram">
            <div className="flex-item-architecture-diagram">
                <img src={awsInventoryAppArchitecture} className="base" width="500" height="500" alt="Diagram AWS Inventory App Architecture" />
            </div>
            <div className="flex-item-architecture-diagram-text">
                <p>
                    <strong>Diagram Overview</strong><br />
                    This serverless inventory application utilizes a fully automated, event-driven architecture on
                    Amazon Web Services (AWS). The entire infrastructure is managed as code via Terraform and deployed
                    through a GitHub Actions CI/CD pipeline to ensure rapid, reliable, and repeatable deployments.
                </p>
                <p>
                    <strong>Deployment Flow</strong><br />
                    First, code is pushed from the Development PC to GitHub. Then, GitHub Actions triggers automatically
                    upon receiving the push. Next, the pipeline executes terraform apply to deploy infrastructure. Finally,
                    the pipeline synchronizes the static frontend files to Amazon S3.
                </p>
                <p>
                    <strong>User Flow</strong><br />
                    First, the User requests and loads the webpage from Amazon S3. Then, the browser sends HTTP requests
                    directly to Amazon API Gateway. Next, the gateway forwards these requests to the AWS Lambda Function.
                    Finally, the Lambda function queries or updates data inside Amazon DynamoDB.
                </p>
                {/* THE LIVE LINK BUTTON */}
                <div style={{ marginTop: '20px' }}>
                    <a href="http://my-inventory-frontend-7cfcad34.s3-website.eu-central-1.amazonaws.com/" target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                        🚀 Launch Live Inventory App
                    </a>
                </div>         
            </div>
        </div>
        <div className="flex-container-headings">
            <h3>Design Decisions (Inventory App)</h3>
        </div>
        <div className="flex-container-design-decisions">
            <p>Key architectural choices made for scalability and maintainability:</p>
            <ul>
                <li>
                    <strong>Infrastructure as Code (Terraform):</strong> Chosen over AWS CloudFormation to ensure cloud-agnostic skills and modular, human-readable infrastructure definitions (HCL).
                </li>
                <li>
                    <strong>Fully Automated CI/CD (GitHub Actions):</strong> Eliminates manual deployment errors by automatically running Terraform plans, deploying Lambda functions, and syncing frontend assets on every push.
                </li>
                <li>
                    <strong>Serverless State Management (S3 Backend):</strong> Migrated from a local state to an encrypted AWS S3 remote backend to enable secure, concurrent, and decentralized pipeline executions.
                </li>
                <li>
                    <strong>Serverless CRUD Architecture:</strong> Using Amazon API Gateway, AWS Lambda, and DynamoDB (Pay-Per-Request) ensures a highly scalable, zero-maintenance backend that incurs $0 cost when idle.
                </li>
            </ul>
        </div>
        <div className="flex-container-headings">
            <h2>Core Experience</h2>
        </div>
        <div className="flex-container-core-experience">
            <ul>    
                <li>
                    <strong>Enterprise System & Software Architecture (10+ Years)</strong>
                    <ul>
                        <li>
                            <strong>Lead System Architecture:</strong> Formulated end-to-end system architectures and
                            requirements for complex, autonomous driving control units (ADCU) and safety-critical automotive
                            systems at Aumovio and Continental.
                        </li>
                        <li>    
                            <strong>Methodology & Modeling:</strong> Expert in structured architecture frameworks using SysML,
                            UML, Arc42, and OOSEM. Proven track record in establishing system modeling practices 
                            (IBM Rhapsody/Catia Magic) and driving AI-plugin innovations for model validation.
                        </li>
                        <li>    
                            <strong>Platform Functions:</strong> Engineered scalable concept designs for vital automotive
                            platform features, including Over-the-Air (OTA) updates and complex system state machines—concepts
                            that map natively to cloud deployment patterns.
                         </li>
                     </ul>
                 </li>
                 <li>   
                    <strong>Engineering Leadership & Large-Scale Project Governance</strong>
                    <ul>
                        <li>
                            <strong>Team Leadership:</strong> Provided strong technical and disciplinary leadership for system
                            engineering teams, steering international cross-functional workshops across multiple development
                            locations.
                        </li>
                        <li> 
                            <strong>High-Stakes Responsibility:</strong> Budget-aware technical oversight, serving as the
                            responsible architect for major series camera projects with an annual turnaround exceeding €250
                            Million at ZF Active Safety. 
                        </li>
                        <li>
                            <strong>Process Excellence:</strong> Spearheaded standardizations in compliance with rigorous 
                            engineering frameworks like Automotive SPICE (ASPICE), ISO 26262 (Functional Safety), and ISO 21434
                            (Cybersecurity).
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Deep Software Foundations</strong>
                    <ul>
                        <li>
                            <strong>Full-Stack Roots:</strong> Over two decades of practical programming foundations
                            across Java (Oracle Certified Professional), C/C++, and Python, transitioning from low-level
                            hardware/software integration to modern web-based and distributed systems.
                        </li>
                        <li>
                            <strong>Global Collaboration:</strong> Experienced in leading technical supplier management and
                            international product presentations, backed by multilingual fluency in German, English, and Chinese
                            (B1/HSK3).    
                        </li>
                    </ul>
                </li>
            </ul>        
        </div>
    </main>
    <footer className="portfolio-footer">
        <p>&copy; {new Date().getFullYear()} Sascha Friederichs</p>
        <div className="footer-legal-links">
            <a href="/legal_notice.html" target="_blank" rel="noreferrer">Legal Notice</a> | {' '}
            <a href="/privacy_policy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
        </div>
    </footer>    
	</>
	)
}

export default App
