import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

function useBeforeInstallPrompt() {
    const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);

    if (typeof window !== "undefined" && !event) {
        // Attach the listener only once when hook is first called
        window.addEventListener("beforeinstallprompt", (e: Event) => {
            e.preventDefault();
            setEvent(e as BeforeInstallPromptEvent);
        });
    }

    return event;
}
function App() {
    const [count, setCount] = useState(0);
    const deferredPrompt = useBeforeInstallPrompt();

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            console.log("✅ Installed");
        } else {
            console.log("❌ Dismissed");
        }
    };

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={appLogo} className="logo" alt="pwa logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>pwa</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs" onClick={handleInstall}>
                Click on the Vite and React logos to learn more
            </p>
            <PWABadge />
        </>
    );
}

export default App;
