import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data'
import GitHub from './assets/github.png'
import LinkedIn from './assets/linked-in.png'
import Xing from './assets/xing.png'
import Email from './assets/email.png'
import Download from './assets/download.png'
import badgeAWS_SolutionArchitect from './assets/aws-certified-solutions-architect-associate.png'
import badgeOracleJavaSE7 from './assets/oracle-certified-associate-java-se-7-programmer.png'
import badgeOracleJavaEE5 from './assets/oracle-certified-professional-java-ee-5-web-component-developer-jpn.png'
import badgeOMG_SysML from './assets/sysml-fundamental-model-builder.png'
import awsStaticWebsiteArchitecture from './assets/aws_static_website_architecture.png'
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
	<title>
		Sascha's Website
	</title>
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
	<div className="flex-container-headings">
		<h3>Verified Credentials</h3> 
	</div>
	<div className="flex-container-badges">
		<div className="flex-item-badges">
			<img src={badgeAWS_SolutionArchitect} className="base" width="100" height="100" alt="" />
		</div>
		<div className="flex-item-badges-text">
			<p>AWS Certified Solutions Architect – Associate</p>
		</div>
        <div className="flex-item-badges">
            <img src={badgeOracleJavaEE5} className="base" width="100" height="100" alt="" />
        </div>
        <div className="flex-item-badges-text">
            <p>Oracle Certified Professional, Java EE 5 Web Component Developer</p>
        </div>
		<div className="flex-item-badges">
			<img src={badgeOracleJavaSE7} className="base" width="100" height="100" alt="" />
		</div>
		<div className="flex-item-badges-text">
			<p>Oracle Certified Associate, Java SE 7 Programmer</p>
		</div>
        <div className="flex-item-badges">
            <img src={badgeOMG_SysML} className="base" width="100" height="100" alt="" />
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
			<img src={awsStaticWebsiteArchitecture} className="base" width="500" height="500" alt="" />
		</div>
        <div className="flex-item-architecture-diagram-text">
            <p>
                This diagram illustrates the serverless architecture powering this website. The frontend
                is built with React and Vite (HTML, CSS, JavaScript). Upon pushing source code to GitHub,
                AWS Amplify Hosting automatically triggers a managed CI/CD pipeline to deploy the assets.
                For the backend, the AWS Amplify Data Client manages transactions with Amazon DynamoDB
                to maintain the global visitor counter. Amazon Route 53 handles DNS management for the
                custom domain, while Amazon CloudFront ensures secure, global low-latency content delivery,
                backed by SSL/TLS encryption via AWS Certificate Manager (ACM).
            </p>          
        </div>
	</div>
    <div className="flex-container-headings">
        <h3>Design Decisions</h3>
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
	</>
	)
}

export default App
