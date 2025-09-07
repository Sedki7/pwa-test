import { useState, useEffect } from "react";
import "./InstallPWA.css";

const InstallPWA: React.FC = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    interface BeforeInstallPromptEvent extends Event {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
    }

    const [promptInstall, setPromptInstall] =
        useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setPromptInstall(e);
            setSupportsPWA(true);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const onClick = async () => {
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
        const { outcome } = await promptInstall.userChoice;
        if (outcome === "accepted") {
            setSupportsPWA(false);
        }
    };

    if (!supportsPWA) {
        return <>hehe</>;
    }

    return (
        <button className="install-button" onClick={onClick}>
            Install App
        </button>
    );
};

export default InstallPWA;
