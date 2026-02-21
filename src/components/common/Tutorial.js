import { useEffect, useRef } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "../../App.css"; // Ensure global styles are available, we can also customize driver.js styles there if needed

function Tutorial({ run, onFinish }) {
    const driverObj = useRef(null);

    useEffect(() => {
        if (!run) return;

        driverObj.current = driver({
            showProgress: true,
            doneBtnText: 'Terminar',
            nextBtnText: 'Siguiente',
            prevBtnText: 'Atrás',
            progressText: '{{current}} de {{total}}',
            allowClose: true,
            steps: [
                { popover: { title: '¡Bienvenido a Wingman!', description: 'Vamos a dar un rápido paseo para enseñarte qué hace cada cosa en la app.' } },
                { element: '.tour-create-cv', popover: { title: 'Editor CV', description: 'Aquí puedes crear un nuevo CV desde cero usando plantillas, o gestionar los que ya tienes.' } },
                { element: '.tour-interview', popover: { title: 'Entrevista', description: 'Practica entrevistas de trabajo chateando con nuestra IA adaptada a tu perfil.' } },
                { element: '.tour-voice', popover: { title: 'Modo Voz', description: '¿Prefieres hablar? Haz una entrevista real por voz para practicar tu comunicación.' } },
                { element: '.tour-cv-fix', popover: { title: 'Mejorar CV', description: 'Nuestra IA analiza tu CV y te da consejos para mejorarlo.' } },
                { element: '.tour-jobs', popover: { title: 'Ofertas', description: 'Sube ofertas de trabajo reales y la IA preparará la entrevista específicamente para esa oferta.' } },
                { element: '.tour-nav-links', popover: { title: 'Navegación', description: 'Desde aquí arriba puedes volver siempre al inicio o ir directo a tus ofertas guardadas.' } },
                { element: '.tour-profile', popover: { title: 'Perfil', description: 'Aquí puedes ver tu perfil de usuario o acceder a opciones Premium.' } }
            ],
            onDestroyStarted: () => {
                if (!driverObj.current.hasNextStep() || window.confirm("¿Saltar el tutorial?")) {
                    driverObj.current.destroy();
                    onFinish();
                }
            },
        });

        driverObj.current.drive();

        return () => {
            // Cleanup
            if (driverObj.current) {
                // In driver.js, usually you don't need to destroy it aggressively on unmount if you only call it once
            }
        };
    }, [run, onFinish]);

    return null; // Driver.js renders globally
}

export default Tutorial;
