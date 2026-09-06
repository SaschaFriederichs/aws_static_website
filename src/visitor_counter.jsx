// src/visitor_counter.jsx

/**
	* Erhöht den globalen Zähler und gibt den aktuellen Stand zurück.
	* @returns {Promise<number|null>} Der aktuelle Zählerstand oder null bei Fehler.
	*/
export async function fetchGlobalViews() {
	// Verhindert das Hochzählen im lokalen Entwicklungsmodus (Vite Dev Server)
 	console.log("Funktion");
	if (import.meta.env.DEV) {
    	console.log("Vite Dev-Modus aktiv: Zähler wird lokal nicht erhöht.");
    	return 999; // Dummy-Wert für die Entwicklung
  	}
	
	// Nutzt eine Vite-Umgebungsvariable oder einen Fallback-Namen
  	const namespace = import.meta.env.VITE_COUNTER_ID || "mein-vite-projekt-default-id";
  	const url = `https://counterapi.dev{namespace}/global/up`;

  	try {
    	const response = await fetch(url);
    	if (!response.ok) throw new Error("Netzwerk-Antwort war nicht ok");
    	const data = await response.json();
    	return data.count;
  	} catch (error) {
    	console.error("Fehler beim Laden des globalen Zählers:", error);
    	return null;
  	}
}