import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data'
import GitHub from './assets/github.png'
import LinkedIn from './assets/linked-in.png'
import Email from './assets/email.png'
import badgeAWS_SolutionArchitect from './assets/aws-certified-solutions-architect-associate.png'
import badgeOracleJavaSE7 from './assets/oracle-certified-associate-java-se-7-programmer.png'
import badgeOracleJavaEE5 from './assets/oracle-certified-professional-java-ee-5-web-component-developer-jpn.png'
import awsStaticWebsiteArchitecture from './assets/aws_static_website_architecture.png'
import './App.css'

// Generiert den typisierten Amplify-Daten-Client
Amplify.configure(outputs);
const client = generateClient();

function App() {
    const [visitorCount, setVisitorCount] = useState(null);
    useEffect(() => {
        async function updateCounter() {
        const counterId = "global_website_counter";
        try {
            // 1. Versuche den aktuellen Zählerstand aus DynamoDB zu holen
            const { data: counter } = await client.models.Counter.get({ id: counterId });

            if (counter) {
                // 2. Wenn er existiert, erhöhe den Wert um 1
                const { data: updatedCounter } = await client.models.Counter.update({
                    id: counterId,
                    views: counter.views + 1
                });
                setVisitorCount(updatedCounter.views);
            } else {
                // 3. Fallback: Erster Aufruf der Website überhaupt -> Eintrag erstellen
                const { data: newCounter } = await client.models.Counter.create({
                    id: counterId,
                    views: 1
                });
                setVisitorCount(newCounter.views);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Amplify-Counters:", error);
        }
    }
    updateCounter();
    }, []);
	
	return (
	<>
	<title>
		Sascha's Website
	</title>  
	<h2>Sascha Friederichs - AWS Certified Solutions Architect</h2>
	<h2>Welcome to my personal static AWS website.</h2>
	<div className="flex-container-contact">
        <div className="flex-item-contact">
            <img src={GitHub} className="base" width="50" height="50" alt="GitHub" />
        </div>
        <div className="flex-item-contact">
            <a href="https://github.com/SaschaFriederichs">GitHub</a>
        </div>
        <div className="flex-item-contact">
            <img src={LinkedIn} className="base" width="50" height="50" alt="LinkedIn" />
        </div>
        <div className="flex-item-contact">
            <a href="https://linkedin.com/in/sascha-friederichs-ba32b4153">LinkedIn</a>
        </div>
        <div className="flex-item-contact">
            <img src={Email} className="base" width="50" height="50" alt="Email" />
        </div>
        <div className="flex-item-contact">
            <a href="mailto:sascha_friederichs@web.de">Email: sascha_friederichs@web.de</a>
        </div>
    </div>
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
	<div className="flex-container-headings">
		<h2>Acquired Badges</h2> 
	</div>
	<div className="flex-container-badges">
		<div className="flex-item-badges">
			<img src={badgeAWS_SolutionArchitect} className="base" width="100" height="100" alt="" />
		</div>
		<div className="flex-item-badges">
			<p>AWS Certified Solutions Architect – Associate</p>
		</div>
	</div>
	<div className="flex-container-badges">
		<div className="flex-item-badges">
			<img src={badgeOracleJavaSE7} className="base" width="100" height="100" alt="" />
		</div>
		<div className="flex-item-badges">
			<p>Oracle Certified Associate, Java SE 7 Programmer</p>
		</div>
	</div>
	<div className="flex-container-badges">
		<div className="flex-item-badges">
			<img src={badgeOracleJavaEE5} className="base" width="100" height="100" alt="" />
		</div>
		<div className="flex-item-badges">
			<p>Oracle Certified Professional, Java EE 5 Web Component Developer</p>
		</div>
	</div>
	<div className="flex-container-headings">
		<h2>Static Website Architecture Diagram</h2>
	</div>
	<div className="flex-container-architecture-diagram">
		<div className="flex-item-architecture-diagram">
			<img src={awsStaticWebsiteArchitecture} className="base" width="500" height="500" alt="" />
		</div>
	</div>
    <p>
        Visitors on this website:{' '}
        <strong id="counter-value">
            {visitorCount !== null ? visitorCount : 'Loading...'}
        </strong>
    </p>
	</>
	)
}

export default App
