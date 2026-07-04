// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Project Data
const projectData = {
    wind: {
        title: "Low Velocity Wind Energy Harvesting",
        tag: "Final Year Project - 2025",
        context: "Engineered a dual-body vortex-induced vibration (VIV) system to harvest energy from low-speed winds (1–15 m/s). Detailed research report and analysis.",
        tech: "Utilized a NACA 0012 airfoil as the primary bluff body and a downstream cylinder in the wake. Integrated permanent magnet linear generators (PMLGs).",
        outcomes: "Achieved 87.5 W peak power at resonance (11 m/s) and a peak system efficiency of 7.32%. Conducted comprehensive CFD simulations to validate aerodynamics.",
        images: ["foot1.png", "foot2.png"],
        pdf: "Low_Velocity_Wind_power_Generation.pdf"
    },
    separator: {
        title: "CFD Analysis of an Air and Dirt Separator",
        tag: "Engineering Analysis Package",
        context: "The client required a comprehensive CFD study to quantify the hydraulic and separation performance of their 20-inch vessel across operating flow rates of 900, 1100, and 1300 GPM. The goal was to provide customers with validated pressure drop data and air/dirt removal efficiency curves without requiring costly physical flow loop testing.",
        tech: "ANSYS Fluent, k-ω SST turbulence model, Discrete Phase Model (DPM), MATLAB/Python for data analysis, and LaTeX for reporting. A boundary-specific sampling methodology was developed to accurately distinguish successful separation (venting) from failed separation (escaping through the outlet).",
        outcomes: "Validated pressure drops (0.37–0.80 PSI) with analytically consistent K-factors (CoV < 5%). Confirmed dirt separation efficiency exceeding 96% with zero particles escaping the outlet. Demonstrated highly size-dependent air bubble separation (>95% for 100 µm bubbles). Delivered a full engineering report with pgfplots performance curves ready for product datasheets.",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"],
        pdf: "D_F_Report_Updated.pdf"
    },
    ecg: {
        title: "Measuring ECG via Defibrillator",
        tag: "Mini Project - 2025",
        context: "Engineered a system to measure ECG signals using high-impedance defibrillation electrodes, addressing severe signal attenuation and noise challenges.",
        tech: "Developed signal processing algorithms in MATLAB and Python to effectively filter artifacts and extract diagnostically clear cardiac waveforms.",
        outcomes: "Successfully isolated clean ECG signals from high noise environments, improving diagnostic reliability during emergency defibrillation scenarios.",
        images: ["https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"],
        pdf: "ECG.pdf"
    },
    footstep: {
        title: "Footstep Power Generation",
        tag: "Academic Project - 2023",
        context: "Developed a kinetic energy harvesting system capturing energy from human footsteps via electromagnetic induction.",
        tech: "Designed rack and pinion mechanisms coupled with dynamos to convert linear motion of footsteps into rotational energy.",
        outcomes: "Conducted simulations to optimize the energy output specifically for low-traffic staircase environments, providing a proof-of-concept for off-grid lighting.",
        images: ["https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"],
        pdf: "footstep.pdf"
    },
    wishbone: {
        title: "Double Wishbone Suspension System",
        tag: "Academic Project - 2023",
        context: "Designed a double wishbone suspension system for automotive applications.",
        tech: "Utilized FEA methods for structural analysis and optimization of the suspension components.",
        outcomes: "Developed a comprehensive design package with detailed specifications and performance evaluations.",
        images: ["https://images.unsplash.com/photo-1556911259-8e7d5f0a0c0e?auto=format&fit=crop&q=80&w=800"],
        pdf: ""
    }
};

// Modal Functions
function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modalElement = document.getElementById("project-modal");
    if (!modalElement) return;

    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-tag").innerText = data.tag;
    document.getElementById("modal-context").innerText = data.context;
    document.getElementById("modal-tech").innerText = data.tech;
    document.getElementById("modal-outcomes").innerText = data.outcomes;

    const imageContainer = document.getElementById("modal-image-container");
    imageContainer.innerHTML = "";

    if (data.pdf && data.pdf.trim() !== "") {
        const iframe = document.createElement("iframe");
        iframe.src = data.pdf + "#toolbar=0&navpanes=0";
        iframe.className = "modal-pdf-viewer";
        imageContainer.appendChild(iframe);

        const fullViewBtn = document.createElement("a");
        fullViewBtn.href = data.pdf;
        fullViewBtn.target = "_blank";
        fullViewBtn.className = "btn primary";
        fullViewBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Open Full View';
        fullViewBtn.style.display = "inline-block";
        fullViewBtn.style.marginTop = "1rem";
        imageContainer.appendChild(fullViewBtn);
    }
    else {
        data.images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = data.title;
            img.className = "modal-image";
            imageContainer.appendChild(img);
        });
    }

    modalElement.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModal() {
    const modalElement = document.getElementById("project-modal");
    if (modalElement) {
        modalElement.classList.remove("show");
    }
    document.body.style.overflow = "auto";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modalElement = document.getElementById("project-modal");
    const certModalElement = document.getElementById("cert-modal");
    if (event.target == modalElement) {
        closeModal();
    }
    if (event.target == certModalElement) {
        closeCertModal();
    }
}

// Certificate Modal Functions
function openCertModal(src, title) {
    const certModal = document.getElementById("cert-modal");
    document.getElementById("cert-modal-title").innerText = title;

    const wrapper = document.getElementById("cert-content-wrapper");
    wrapper.innerHTML = "";

    // Normalize to array so we can handle single or multiple files
    const sources = Array.isArray(src) ? src : [src];

    sources.forEach(file => {
        const isPdf = file.toLowerCase().endsWith(".pdf");

        if (isPdf) {
            const iframe = document.createElement("iframe");
            iframe.src = file + "#toolbar=0&navpanes=0";
            iframe.className = "cert-modal-pdf";
            iframe.title = title;
            wrapper.appendChild(iframe);

            const fullViewBtn = document.createElement("a");
            fullViewBtn.href = file;
            fullViewBtn.target = "_blank";
            fullViewBtn.className = "btn primary";
            fullViewBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Open Full View';
            fullViewBtn.style.display = "block";
            fullViewBtn.style.width = "fit-content";
            fullViewBtn.style.margin = "1rem auto 2rem auto";
            wrapper.appendChild(fullViewBtn);
        } else {
            const img = document.createElement("img");
            img.src = file;
            img.alt = title;
            img.className = "cert-modal-image";
            wrapper.appendChild(img);
        }
    });

    certModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCertModal() {
    const certModal = document.getElementById("cert-modal");
    certModal.classList.remove("show");
    document.body.style.overflow = "auto";
}