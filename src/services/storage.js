const STORAGE_KEYS = {
    USER: 'wingman_user',
    JOBS: 'wingman_jobs',
    CV: 'wingman_cv_data'
};

// --- MOCK DATA ---
const DEFAULT_JOBS = [
    { id: 1, title: "Frontend Dev", company: "TechCorp", status: "Entrevista", description: "React developer needed." },
    { id: 2, title: "UX Designer", company: "Studio", status: "Pendiente", description: "Design cool interfaces." },
];

const DEFAULT_USER = {
    name: "Usuario Demo",
    email: "demo@wingman.com"
};

const DEFAULT_CV = {
    personalInfo: { name: "", title: "", email: "", phone: "" },
    summary: "",
    experience: [],
    education: []
};

// --- SERVICE METHODS ---

export const storageService = {
    // USER
    getUser: () => {
        const data = localStorage.getItem(STORAGE_KEYS.USER);
        return data ? JSON.parse(data) : DEFAULT_USER;
    },
    saveUser: (user) => {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    // JOBS
    getJobs: () => {
        const data = localStorage.getItem(STORAGE_KEYS.JOBS);
        if (!data) {
            localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(DEFAULT_JOBS));
            return DEFAULT_JOBS;
        }
        return JSON.parse(data);
    },
    addJob: (job) => {
        const jobs = storageService.getJobs();
        const newJob = { ...job, id: Date.now(), status: "Pendiente" };
        jobs.push(newJob);
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
        return newJob;
    },
    updateJobStatus: (id, status) => {
        const jobs = storageService.getJobs().map(j => j.id === id ? { ...j, status } : j);
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    },

    // CV (Structured)
    // CV (Structured & Multi-CV)
    getCVs: () => {
        const data = localStorage.getItem(STORAGE_KEYS.CV);
        if (!data) return [];
        // Migration: If it's an object (legacy), wrap it in array
        try {
            const parsed = JSON.parse(data);
            if (!Array.isArray(parsed)) {
                return [{ id: 'default', name: 'Mi Primer CV', lastModified: Date.now(), data: parsed }];
            }
            return parsed;
        } catch (e) {
            return [];
        }
    },

    getCVById: (id) => {
        const cvs = storageService.getCVs();
        return cvs.find(cv => cv.id === id) || null;
    },

    saveCV: (id, cvData, name = "Sin título") => {
        const cvs = storageService.getCVs();
        const existingIndex = cvs.findIndex(cv => cv.id === id);

        const newCV = {
            id: id || Date.now().toString(),
            name: name,
            lastModified: Date.now(),
            data: cvData
        };

        if (existingIndex >= 0) {
            cvs[existingIndex] = { ...cvs[existingIndex], ...newCV };
        } else {
            cvs.push(newCV);
        }

        localStorage.setItem(STORAGE_KEYS.CV, JSON.stringify(cvs));
        return newCV.id;
    },

    deleteCV: (id) => {
        const cvs = storageService.getCVs().filter(cv => cv.id !== id);
        localStorage.setItem(STORAGE_KEYS.CV, JSON.stringify(cvs));
    },

    // Create a new blank CV
    createCV: (name) => {
        return storageService.saveCV(Date.now().toString(), DEFAULT_CV, name);
    },

    // Legacy CV helper (returns the first one or default)
    getCVString: () => {
        const cvs = storageService.getCVs();
        const cv = cvs.length > 0 ? cvs[0].data : DEFAULT_CV;
        // Convert Structured Object to String for AI
        return `NOMBRE: ${cv.personalInfo.name}\nRESUMEN: ${cv.summary}\nEXPERIENCIA: ${JSON.stringify(cv.experience)}`;
    }
};
