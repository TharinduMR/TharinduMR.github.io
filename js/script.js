function getApiBase() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
        return 'http://localhost:3000';
    }
    if (window.location.hostname.includes('github.io')) {
        return 'https://tmrportfolio.vercel.app';
    }
    // On Vercel or any deployed domain, API is same-origin
    return '';
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = themeToggle ? themeToggle.querySelector('.dark-icon') : null;
const lightIcon = themeToggle ? themeToggle.querySelector('.light-icon') : null;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'inline-block';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            if (darkIcon) darkIcon.style.display = 'inline-block';
            if (lightIcon) lightIcon.style.display = 'none';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'inline-block';
        }
    });
}

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
            const scrollOffset = targetElement.offsetTop - 85;
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in floating dock
const dockBtns = document.querySelectorAll('.dock-btn[href^="#"]');
const sections = [];

dockBtns.forEach(btn => {
    const href = btn.getAttribute('href');
    const section = document.querySelector(href);
    if (section) sections.push({ btn, section });
});

const dockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const matchingItem = sections.find(s => s.section === entry.target);
        if (matchingItem) {
            if (entry.isIntersecting) {
                dockBtns.forEach(b => b.classList.remove('active'));
                matchingItem.btn.classList.add('active');
            }
        }
    });
}, { threshold: 0.3 });

// Project Data
const projectData = {
    wind: {
        title: "Low Velocity Wind Energy Harvesting",
        tag: "Final Year Project - 2025",
        context: "Engineered a dual-body vortex-induced vibration (VIV) system to harvest energy from low-speed winds (1–15 m/s). Detailed research report and analysis.",
        tech: "Utilized a NACA 0012 airfoil as the primary bluff body and a downstream cylinder in the wake. Integrated permanent magnet linear generators (PMLGs).",
        outcomes: "Achieved 87.5 W peak power at resonance (11 m/s) and a peak system efficiency of 7.32%. Conducted comprehensive CFD simulations to validate aerodynamics.",
        images: ["media/images/foot1.png", "media/images/foot2.png"],
        pdf: "media/Pdf/Low_Velocity_Wind_power_Generation.pdf"
    },
    separator: {
        title: "CFD Analysis of an Air and Dirt Separator",
        tag: "Engineering Analysis Package",
        context: "The client required a comprehensive CFD study to quantify the hydraulic and separation performance of their 20-inch vessel across operating flow rates of 900, 1100, and 1300 GPM. The goal was to provide customers with validated pressure drop data and air/dirt removal efficiency curves without requiring costly physical flow loop testing.",
        tech: "ANSYS Fluent, k-ω SST turbulence model, Discrete Phase Model (DPM), MATLAB/Python for data analysis, and LaTeX for reporting. A boundary-specific sampling methodology was developed to accurately distinguish successful separation (venting) from failed separation (escaping through the outlet).",
        outcomes: "Validated pressure drops (0.37–0.80 PSI) with analytically consistent K-factors (CoV < 5%). Confirmed dirt separation efficiency exceeding 96% with zero particles escaping the outlet. Demonstrated highly size-dependent air bubble separation (>95% for 100 µm bubbles). Delivered a full engineering report with pgfplots performance curves ready for product datasheets.",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"],
        pdf: "media/Pdf/D_F_Report_Updated.pdf"
    },
    ecg: {
        title: "Measuring ECG via Defibrillator",
        tag: "Mini Project - 2025",
        context: "Engineered a system to measure ECG signals using high-impedance defibrillation electrodes, addressing severe signal attenuation and noise challenges.",
        tech: "Developed signal processing algorithms in MATLAB and Python to effectively filter artifacts and extract diagnostically clear cardiac waveforms.",
        outcomes: "Successfully isolated clean ECG signals from high noise environments, improving diagnostic reliability during emergency defibrillation scenarios.",
        images: ["https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"],
        pdf: "media/Pdf/ECG.pdf"
    },
    footstep: {
        title: "Footstep Power Generation",
        tag: "Academic Project - 2023",
        context: "Developed a kinetic energy harvesting system capturing energy from human footsteps via electromagnetic induction.",
        tech: "Designed rack and pinion mechanisms coupled with dynamos to convert linear motion of footsteps into rotational energy.",
        outcomes: "Conducted simulations to optimize the energy output specifically for low-traffic staircase environments, providing a proof-of-concept for off-grid lighting.",
        images: ["https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"],
        pdf: "media/Pdf/footstep.pdf"
    },
    wishbone: {
        title: "Double Wishbone Suspension System",
        tag: "Academic Project - 2023",
        context: "Designed a double wishbone suspension system for automotive applications.",
        tech: "Utilized FEA methods for structural analysis and optimization of the suspension components.",
        outcomes: "Developed a comprehensive design package with detailed specifications and performance evaluations.",
        images: ["https://images.unsplash.com/photo-1556911259-8e7d5f0a0c0e?auto=format&fit=crop&q=80&w=800"],
        pdf: "media/Pdf/double_dishbone.pdf"
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
        iframe.src = data.pdf + "#toolbar=0&navpanes=0&view=FitH";
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
    const msgModalElement = document.getElementById("message-modal");
    const successModalElement = document.getElementById("success-modal");
    if (event.target == modalElement) {
        closeModal();
    }
    if (event.target == certModalElement) {
        closeCertModal();
    }
    if (event.target == msgModalElement) {
        closeMessageModal();
    }
    if (event.target == successModalElement) {
        closeSuccessModal();
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
            iframe.src = file + "#toolbar=0&navpanes=0&view=FitH";
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

// Message Modal Functions
function openMessageModal() {
    const modalElement = document.getElementById("message-modal");
    if (modalElement) {
        modalElement.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeMessageModal() {
    const modalElement = document.getElementById("message-modal");
    if (modalElement) {
        modalElement.classList.remove("show");
    }
    document.body.style.overflow = "auto";
}

// Success Modal Functions
function openSuccessModal(message) {
    const modalElement = document.getElementById("success-modal");
    if (modalElement) {
        if (message) {
            const msgEl = document.getElementById("success-message");
            if (msgEl) msgEl.innerText = message;
        }
        modalElement.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeSuccessModal() {
    const modalElement = document.getElementById("success-modal");
    if (modalElement) {
        modalElement.classList.remove("show");
    }
    document.body.style.overflow = "auto";
}

// Start observing sections for dock highlighting
sections.forEach(({ section }) => dockObserver.observe(section));

// Skills Carousel Animation
const track = document.getElementById('skills-track');
if (track) {
    // Clone items for infinite scroll
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollPos = 0;
    const speed = 1; // pixels per frame

    function animateCarousel() {
        scrollPos -= speed;

        // If we've scrolled half the width (the original items), reset to 0
        if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
            scrollPos = 0;
        }

        track.style.transform = `translateX(${scrollPos}px)`;

        // Highlight center element
        const carouselRect = track.parentElement.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        const allBubbles = track.querySelectorAll('.skill-bubble');
        let closestBubble = null;
        let minDistance = Infinity;

        allBubbles.forEach(bubble => {
            const rect = bubble.getBoundingClientRect();
            const bubbleCenter = rect.left + rect.width / 2;
            const distance = Math.abs(carouselCenter - bubbleCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestBubble = bubble;
            }
            bubble.classList.remove('highlight');
        });

        if (closestBubble) {
            closestBubble.classList.add('highlight');
        }

        requestAnimationFrame(animateCarousel);
    }

    // Start animation
    animateCarousel();
}

$(document).ready(function () {
    // Initialize WOW
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    }).init();

    // Initialize Swiper for Projects
    if (document.querySelector('.project-swiper')) {
        const projectSwiper = new Swiper('.project-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            speed: 8000,
            freeMode: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });

        // Add class for continuous linear transition style
        projectSwiper.el.classList.add('continuous');

        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');
        const pauseBtn = document.getElementById('project-pause-btn');
        let isPaused = false;

        function pauseSwiper() {
            projectSwiper.autoplay.stop();
            projectSwiper.el.classList.remove('continuous');
            if (pauseBtn) pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            isPaused = true;
        }

        function playSwiper() {
            projectSwiper.el.classList.add('continuous');
            projectSwiper.autoplay.start();
            if (pauseBtn) pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            isPaused = false;
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (isPaused) {
                    playSwiper();
                } else {
                    pauseSwiper();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                pauseSwiper();
                projectSwiper.params.freeMode = false;
                projectSwiper.slideNext(800);
                setTimeout(() => {
                    projectSwiper.params.freeMode = true;
                }, 800);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                pauseSwiper();
                projectSwiper.params.freeMode = false;
                projectSwiper.slidePrev(800);
                setTimeout(() => {
                    projectSwiper.params.freeMode = true;
                }, 800);
            });
        }
    }
});

// Initialize Parallaxie
$(function () {
    if ($('.parallaxie').length) {
        $('.parallaxie').parallaxie({
            speed: 0.5,
            offset: 50,
        });
    }

    // Initialize Magnific Popup for images
    if ($('.popup-image').length) {
        $('.popup-image').magnificPopup({
            type: 'image',
            gallery: { enabled: true }
        });
    }

    // Initialize Magnific Popup for videos
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }
});

// Message Form Submission Logic
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const formResult = document.getElementById('form-result');
    
    if (messageForm) {
        messageForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(messageForm);
            // Ensure access key is present
            if(!formData.has('access_key')) {
                formData.append("access_key", "148ab05f-6b34-4139-80b0-545c9d86f000");
            }
            
            const submitBtn = messageForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Also store in our MongoDB backend for admin dashboard
                    fetch(getApiBase() + '/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: formData.get('name'),
                            email: formData.get('email'),
                            topic: formData.get('topic'),
                            message: formData.get('message')
                        })
                    }).catch(() => {}); // Silent — Web3Forms is the primary delivery

                    closeMessageModal();
                    openSuccessModal("Your message has been sent successfully.");
                    messageForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    formResult.innerHTML = "";

                } else {
                    console.log(response);
                    formResult.innerHTML = data.message || "Something went wrong!";
                    formResult.style.color = "#ff4444";
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.log(error);
                formResult.innerHTML = "Something went wrong! Please try again.";
                formResult.style.color = "#ff4444";
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Chatbot Logic
document.addEventListener('DOMContentLoaded', () => {
    // ---- Track Visitor (silent) ----
    fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, referrer: document.referrer || 'Direct' })
    }).catch(() => {}); // Silent fail — don't block UI

    // Generate unique session ID for chat history tracking
    if (!sessionStorage.getItem('chatSessionId')) {
        sessionStorage.setItem('chatSessionId', 'sess-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8));
    }
    const chatSessionId = sessionStorage.getItem('chatSessionId');

    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const pinChat = document.getElementById('pin-chat');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const expandChat = document.getElementById('expand-chat');
    
    let isChatPinned = false;
    let isChatExpanded = false;

    // Custom Top-Left Resize Logic
    const resizeHandle = document.getElementById('chat-resize-handle');
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    if (resizeHandle && chatWidget) {
        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(chatWidget).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(chatWidget).height, 10);
            
            chatWidget.style.transition = 'none'; // Prevent lag during resize
            const floatingDock = document.querySelector('.floating-dock');
            if (floatingDock) floatingDock.style.transition = 'none';
            
            document.documentElement.addEventListener('mousemove', doDrag, false);
            document.documentElement.addEventListener('mouseup', stopDrag, false);
            e.preventDefault(); // Prevent text selection while dragging
        });

        function doDrag(e) {
            if (!isResizing) return;
            
            const newWidth = startWidth - (e.clientX - startX);
            const clampedWidth = Math.max(newWidth, 300);

            if (isChatExpanded) {
                // Split view resizing (only width)
                chatWidget.style.width = clampedWidth + 'px';
                document.body.style.width = `calc(100vw - ${clampedWidth}px)`;
                document.documentElement.style.setProperty('--chat-width', clampedWidth + 'px');
            } else {
                // Floating view resizing
                const newHeight = startHeight - (e.clientY - startY);
                chatWidget.style.width = clampedWidth + 'px';
                chatWidget.style.height = Math.max(newHeight, 400) + 'px';
            }
        }

        function stopDrag() {
            isResizing = false;
            chatWidget.style.transition = ''; // Restore transition
            const floatingDock = document.querySelector('.floating-dock');
            if (floatingDock) floatingDock.style.transition = '';
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
        }
    }

    if (chatToggle && chatWidget) {
        function updateChatToggleIcon() {
            const icon = chatToggle.querySelector('i');
            if (!icon) return;
            if (chatWidget.classList.contains('hidden')) {
                icon.className = 'fa-solid fa-message';
                chatToggle.setAttribute('data-cursor-text', 'Chat');
                chatToggle.title = "Open AI Assistant";
            } else {
                icon.className = 'fa-solid fa-xmark';
                chatToggle.setAttribute('data-cursor-text', 'Close');
                chatToggle.title = "Close Chatbox";
            }
        }
        updateChatToggleIcon();

        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWidget.classList.toggle('hidden');
            updateChatToggleIcon();
            if (!chatWidget.classList.contains('hidden')) {
                chatInput.focus();
            }
        });

        closeChat.addEventListener('click', () => {
            chatWidget.classList.add('hidden');
            updateChatToggleIcon();
            if (isChatExpanded) {
                isChatExpanded = false;
                chatWidget.classList.remove('expanded');
                document.body.classList.remove('split-active');
                chatWidget.style.width = '';
                chatWidget.style.height = '';
                document.body.style.width = '';
                expandChat.innerHTML = '<i class="fa-solid fa-arrows-left-right-to-line"></i>';
                expandChat.title = "Split View";
            }
        });
        
        if (pinChat) {
            pinChat.addEventListener('click', () => {
                isChatPinned = !isChatPinned;
                if (isChatPinned) {
                    pinChat.classList.add('pinned');
                } else {
                    pinChat.classList.remove('pinned');
                }
            });
        }
        
        if (expandChat) {
            expandChat.addEventListener('click', (e) => {
                e.stopPropagation();
                isChatExpanded = !isChatExpanded;
                
                chatWidget.style.width = '';
                chatWidget.style.height = '';
                document.body.style.width = '';
                document.documentElement.style.removeProperty('--chat-width');
                
                if (isChatExpanded) {
                    if (isChatPinned) {
                        isChatPinned = false;
                        if (pinChat) pinChat.classList.remove('pinned');
                    }
                    chatWidget.classList.add('expanded');
                    document.body.classList.add('split-active');
                    expandChat.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i>';
                    expandChat.title = "Exit Split View";
                } else {
                    chatWidget.classList.remove('expanded');
                    document.body.classList.remove('split-active');
                    expandChat.innerHTML = '<i class="fa-solid fa-arrows-left-right-to-line"></i>';
                    expandChat.title = "Split View";
                }
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!isChatPinned && !isChatExpanded && !chatWidget.classList.contains('hidden')) {
                if (!chatWidget.contains(e.target) && !chatToggle.contains(e.target)) {
                    chatWidget.classList.add('hidden');
                    updateChatToggleIcon();
                }
            }
        });

        async function sendChatMessage() {
            const message = chatInput.value.trim();
            if (!message && (!window.MediaHandler || !window.MediaHandler.getFilePayload())) return;

            // Display user message
            let fileAttachmentHTML = '';
            if (window.MediaHandler) {
                const filePayload = window.MediaHandler.getFilePayload();
                if (filePayload) {
                    if (filePayload.fileType && filePayload.fileType.startsWith('image/')) {
                        fileAttachmentHTML = `<div class="chat-msg-attachment"><img src="data:${filePayload.fileType};base64,${filePayload.fileData}" alt="attached image" class="chat-msg-img"></div>`;
                    } else {
                        let iconClass = 'fa-file';
                        if (filePayload.fileType === 'application/pdf') iconClass = 'fa-file-pdf';
                        else if (filePayload.isTextFile) iconClass = 'fa-file-lines';
                        
                        fileAttachmentHTML = `<div class="chat-msg-attachment"><i class="fa-solid ${iconClass}"></i> <span>${filePayload.fileName}</span></div>`;
                    }
                }
            }

            chatBox.innerHTML += `<div class="message user-msg">${fileAttachmentHTML}${message}</div>`;
            chatInput.value = '';
            chatInput.style.height = '24px';
            chatBox.scrollTop = chatBox.scrollHeight;

            // Add typing indicator
            const typingId = 'typing-' + Date.now();
            chatBox.innerHTML += `<div id="${typingId}" class="message bot-msg typing-indicator"><span></span><span></span><span></span></div>`;
            chatBox.scrollTop = chatBox.scrollHeight;

            try {
                const BACKEND_URL = getApiBase() + '/api/chat';
                
                let payload = { 
                    message: message, 
                    sessionId: chatSessionId,
                    selectedModel: window.selectedAiModel || 'auto'
                };
                
                // Add media file payload if available
                if (window.MediaHandler) {
                    const filePayload = window.MediaHandler.getFilePayload();
                    if (filePayload) {
                        Object.assign(payload, filePayload);
                    }
                    window.MediaHandler.clearFile(); // clear UI preview after sending
                }
                
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errMessage = 'Could not reach the AI server. Please make sure the backend is running.';
                    try {
                        const errData = await response.json();
                        if (errData.reply || errData.message || errData.error) {
                            errMessage = errData.reply || errData.message || errData.error;
                        }
                    } catch (e) {}
                    throw new Error(errMessage);
                }

                // Remove typing indicator and create bot message div
                const typingEl = document.getElementById(typingId);
                if (typingEl) typingEl.remove();

                const botMsgDiv = document.createElement('div');
                botMsgDiv.className = 'message bot-msg';
                chatBox.appendChild(botMsgDiv);

                // Read SSE stream progressively
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullReply = '';
                let buffer = '';
                let generatedImageUrl = null;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop(); // keep incomplete line in buffer

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const parsed = JSON.parse(line.slice(6));
                                if (parsed.chunk) {
                                    fullReply += parsed.chunk;
                                    // Show raw text while streaming
                                    botMsgDiv.innerText = fullReply + (generatedImageUrl ? '\n[Generated Image]' : '');
                                    chatBox.scrollTop = chatBox.scrollHeight;
                                }
                                if (parsed.image) {
                                    generatedImageUrl = parsed.image;
                                    botMsgDiv.innerText = fullReply + '\n[Generated Image]';
                                    chatBox.scrollTop = chatBox.scrollHeight;
                                }
                                if (parsed.error) {
                                    botMsgDiv.style.color = '#ff4444';
                                    botMsgDiv.innerText = 'Error: ' + parsed.error;
                                }
                            } catch (e) { /* skip malformed JSON */ }
                        }
                    }
                }

                // After stream completes, preprocess LaTeX math delimiters before markdown rendering
                let cleanMathReply = fullReply
                    // Convert \( ... \) into $ ... $
                    .replace(/\\\\\(/g, '$').replace(/\\\\\)/g, '$')
                    .replace(/\\\(/g, '$').replace(/\\\)/g, '$')
                    // Convert \[ ... \] into $$ ... $$
                    .replace(/\\\\\[/g, '$$').replace(/\\\\\]/g, '$$')
                    .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$')
                    // Convert malformed parentheses math like ( k = 19620 , \text{N/m} ) into $ ... $
                    .replace(/\(\s*([a-zA-Z0-9_\s=+\-*/.,\\]*\\(?:text|frac|sqrt|mathrm|vec|hat|alpha|beta|gamma|delta|theta|pi|omega)[^{}]*(?:\{[^}]*\})?[^()]*)\)/g, '$ $1 $');

                if (typeof marked !== 'undefined') {
                    botMsgDiv.innerHTML = marked.parse(cleanMathReply);
                } else {
                    botMsgDiv.innerHTML = cleanMathReply.replace(/\n/g, '<br>');
                }

                // If an image was generated, replace the [Generated Image] placeholder with the actual image HTML
                if (generatedImageUrl) {
                    const imgHtml = `
                        <div class="chat-generated-img-container">
                            <img src="${generatedImageUrl}" class="chat-generated-img" alt="AI Generated Image" loading="lazy">
                            <a href="${generatedImageUrl}" download="generated-image-${Date.now()}.png" class="chat-img-download-btn" target="_blank">
                                <i class="fa-solid fa-download"></i> Download Image
                            </a>
                        </div>
                    `;
                    if (botMsgDiv.innerHTML.includes('[Generated Image]')) {
                        botMsgDiv.innerHTML = botMsgDiv.innerHTML.replace('[Generated Image]', imgHtml);
                    } else {
                        botMsgDiv.innerHTML += imgHtml;
                    }
                }

                // Render LaTeX Math if KaTeX is loaded
                if (typeof renderMathInElement === 'function') {
                    renderMathInElement(botMsgDiv, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '$', right: '$', display: false},
                            {left: '\\(', right: '\\)', display: false},
                            {left: '\\[', right: '\\]', display: true}
                        ],
                        throwOnError: false
                    });
                }
                
                // Enhance PDF links
                botMsgDiv.querySelectorAll('a[href$=".pdf"]').forEach(link => {
                    link.setAttribute('download', '');
                    link.classList.add('btn', 'primary');
                    link.style.display = 'inline-block';
                    link.style.marginTop = '8px';
                    link.style.fontSize = '0.78rem';
                    link.style.padding = '4px 10px';
                    link.innerHTML = '<i class="fa-solid fa-download"></i> ' + link.innerText;
                });

                // Enhance Code Blocks with Header & Copy Button
                botMsgDiv.querySelectorAll('pre').forEach(pre => {
                    const code = pre.querySelector('code');
                    const codeText = code ? code.innerText : pre.innerText;
                    
                    let lang = 'code';
                    if (code && code.className) {
                        const match = code.className.match(/language-([a-zA-Z0-9_-]+)/);
                        if (match) lang = match[1];
                    }

                    const wrapper = document.createElement('div');
                    wrapper.className = 'code-block-wrapper';

                    const header = document.createElement('div');
                    header.className = 'code-block-header';
                    header.innerHTML = `
                        <span class="code-lang">${lang}</span>
                        <button class="copy-code-btn" type="button" title="Copy Code"><i class="fa-regular fa-copy"></i> <span>Copy</span></button>
                    `;

                    const copyBtn = header.querySelector('.copy-code-btn');
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(codeText).then(() => {
                            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';
                            copyBtn.classList.add('copied');
                            setTimeout(() => {
                                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Copy</span>';
                                copyBtn.classList.remove('copied');
                            }, 2000);
                        });
                    });

                    pre.parentNode.insertBefore(wrapper, pre);
                    wrapper.appendChild(header);
                    wrapper.appendChild(pre);
                });

                chatBox.scrollTop = chatBox.scrollHeight;

            } catch (error) {
                // Remove typing indicator on error
                const typingEl = document.getElementById(typingId);
                if (typingEl) typingEl.remove();

                const displayErr = error.message && error.message !== 'Failed to fetch' && error.message !== 'Network response was not ok' ? error.message : 'Could not reach the AI server. Please make sure the backend is running.';
                chatBox.innerHTML += `<div class="message bot-msg" style="color: #ff4444;">Error: ${displayErr}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        // Initialize AI Model Selector
        const modelSelectorBtn = document.getElementById('model-selector-btn');
        const modelDropdownMenu = document.getElementById('model-dropdown-menu');
        const currentModelName = document.getElementById('current-model-name');
        const modelOptions = document.querySelectorAll('.model-option');

        window.selectedAiModel = 'gpt-oss-120b';

        if (modelSelectorBtn && modelDropdownMenu) {
            modelSelectorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                modelDropdownMenu.classList.toggle('hidden');
            });

            modelOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const model = option.getAttribute('data-model');
                    window.selectedAiModel = model;
                    
                    modelOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');

                    let displayName = 'Auto (Server Select)';
                    if (model === 'deepseek-v4-pro') displayName = 'DeepSeek V4 Pro';
                    else if (model === 'deepseek-v4-flash') displayName = 'DeepSeek V4 Flash';
                    else if (model === 'deepseek-reasoner') displayName = 'DeepSeek-R1 (Reasoner)';
                    else if (model === 'deepseek-chat') displayName = 'DeepSeek-V3 (Chat)';
                    else if (model === 'deepseek-coder') displayName = 'DeepSeek Coder';
                    else if (model === 'gpt-oss-120b') displayName = 'GPT-OSS 120B (Default)';
                    else if (model === 'gpt-oss-20b') displayName = 'GPT-OSS 20B';
                    else if (model === 'gemini-3.1-pro') displayName = 'Gemini 3.1 Pro (High)';
                    else if (model === 'gemini-3.5-flash') displayName = 'Gemini 3.5 Flash';
                    else if (model === 'gemini-3.6-flash') displayName = 'Gemini 3.6 Flash';
                    else if (model === 'gemini-2.5-pro') displayName = 'Gemini 2.5 Pro';
                    else if (model === 'gemini-2.5-flash') displayName = 'Gemini 2.5 Flash';
                    else if (model === 'gemini-2.0-flash') displayName = 'Gemini 2.0 Flash';
                    else if (model === 'gemini-flash-latest') displayName = 'Gemini 1.5 Flash (Free Tier)';
                    else if (model === 'glm-5.2') displayName = 'GLM-5.2';
                    else if (model === 'glm-4-plus') displayName = 'GLM-4 Plus';
                    else if (model === 'glm-4') displayName = 'GLM-4 Pro';
                    else if (model === 'glm-4-air') displayName = 'GLM-4 Air';
                    else if (model === 'glm-4-long') displayName = 'GLM-4 Long';
                    else if (model === 'glm-4-flash') displayName = 'GLM-4 Flash';
                    
                    if (currentModelName) currentModelName.textContent = displayName;
                    modelDropdownMenu.classList.add('hidden');
                });
            });

            document.addEventListener('click', (e) => {
                if (!modelSelectorBtn.contains(e.target) && !modelDropdownMenu.contains(e.target)) {
                    modelDropdownMenu.classList.add('hidden');
                }
            });
        }

        sendBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
        chatInput.addEventListener('input', () => {
            chatInput.style.height = '24px';
            chatInput.style.height = Math.max(24, Math.min(chatInput.scrollHeight, 140)) + 'px';
        });
    }
});
