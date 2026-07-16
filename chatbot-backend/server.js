require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Your secret API key from the .env file
const API_KEY = process.env.Z_API_KEY;

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // 1. YOUR COMPREHENSIVE KNOWLEDGE BASE
    const myPortfolioData = `
        ABOUT ME:
        - Name: Tharindu Madhusanka Rajapakshe
        - Role: Mechanical Engineer (Specializing in Energy Systems) & Full Stack Developer
        - Location: Galdola Watta, Navimana North, Matara, Sri Lanka
        - Contact: tharindu.rajapakshe99@gmail.com | +94 76 900 7190
        - LinkedIn: Tharindu Madhusanka | GitHub: TharinduMR
        - Summary: Results-oriented Mechanical Engineer with a specialization in Energy Systems and a proven track record in building services and power generation. I uniquely combine heavy mechanical engineering expertise (CFD, FEA) with advanced software development (Machine Learning, Flutter, Signal Processing).

        EDUCATION:
        - BSc(Hons) Mechanical Engineering (Specialized in Energy Systems) - University of Peradeniya (June 2021 - Aug 2025). 
        - GCE A/L - Matara Central College, Matara, Sri Lanka (2018 - 2019). Completed Advanced Level in Physical Science Stream with 3 A's.

        EXPERIENCE:
        - Mechanical Engineer at Building Services Engineering Consultants (pvt) Ltd., Rajagiriya (Dec 2025 - May 2026): Conducted on-site inspections of electrical/mechanical installations.
        - Mechanical Engineering Trainee at LTL Holdings, Sobadhanavi 350MW LNG Combined Cycle Power Plant, Kerawalapitiya (Jul 2024 - Sept 2024): Commissioning and performance testing of LNG-fired combined cycle units.
        - Mechanical Engineering Trainee at Mahaweli Authority, Victoria Dam, Teldeniya (Aug 2023 - Oct 2023): Monitored hydraulic system parameters using SCADA.

        ====================================================
        EXTENDED PROJECT REPORTS & TECHNICAL RESULTS
        ====================================================

        PROJECT 1: Power Generation with Footsteps of Stairs and Biometric Security (Dec 2024)
        - Mechanical Design: Developed a spring-mass system (k = 19620 N/m) coupled with a double-acting hydraulic piston-cylinder. The kinetic energy compresses the piston, driving hydraulic fluid through a micro-turbine coupled to a 12V DC Generator. Modeled in SolidWorks.
        - Biometric Data Collection: Used vibration and multi-dimensional (X,Y,Z) acceleration sensors to capture unique human gait dynamics.
        - Machine Learning: Built a Multi-Layer Perceptron (MLP) Artificial Neural Network using Python, TensorFlow, and Keras. Features (time per step, XYZ acceleration) are fed into dense hidden layers (ReLU activation) and a Softmax output layer for multi-class classification (using adam optimizer and categorical cross-entropy loss) to accurately identify individuals.
        - Software/Cloud: Developed a Flutter (Dart) mobile application integrated with Firebase Cloud Storage for real-time biometric prediction and data visualization.

        PROJECT 2: Measuring ECG through Defibrillation Electrodes
        - Problem: Defibrillation pulses (up to 5 kV, 50 A) saturate conventional ECG amplifiers, creating a "blind period". 
        - Hardware Protection: Designed a 3-stage front-end compliant with IEC 60601-2-4. Used 10 kΩ current-limiting resistors, TVS diodes for clamping, and a MOSFET-based baseline restoration circuit to rapidly discharge capacitors. Used an Instrumentation Amplifier with CMRR ≥ 110 dB and Right Leg Drive (RLD).
        - Digital Signal Processing (DSP): Applied Adaptive Filtering (LMS, NLMS, RLS) and Discrete Wavelet Transform (DWT) denoising (Daubechies-4 at level 8). Achieved a cumulative Signal-to-Noise Ratio (SNR) improvement of 40-65 dB with < 100 ms latency.
        - AI & Sensors: Evaluated hybrid CNN-LSTM deep learning architectures for real-time cardiac rhythm classification. Proposed a multifunctional defibrillation electrode integrating temperature, SpO2, and ECG sensors, isolated via heat-dissipating fiber textiles.

        PROJECT 3: Low Velocity Wind Energy Harvesting for Power Generation Using Vibration
        - Aerodynamics: Engineered a dual-body Vortex-Induced Vibration (VIV) system. Primary body: NACA 0012 airfoil. Secondary body: Cylinder placed in the turbulent wake.
        - CFD Analysis: Used ANSYS Fluent (k-ω SST turbulence model) to optimize wake characteristics. At 3 m/s, the NACA 0012 airfoil exhibited a Strouhal Number of 0.20 and a shedding frequency of 1.00 Hz.
        - Power Generation: Designed a Permanent Magnet Linear Induction Generator (PMLIG) using N52-grade NdFeB magnets (1.42 T remanent flux).
        - Results: Reached resonance at 11 m/s wind speed (2.19 Hz). The primary airfoil generated 50 W, and the secondary cylinder generated 37.5 W, yielding a combined peak power of 87.5 W. The addition of the secondary cylinder increased total power output by ~75%. Achieved a peak system efficiency of 7.32% at 7 m/s.

        PROJECT 4: Design and Finite Element Analysis (FEA) of a Double Wishbone Suspension System
        - Design: 3D modeled a suspension assembly inspired by the Audi A4 B8 sedan (multi-link SLA architecture) with an upper control arm (250mm) and lower arm (350mm).
        - Static Structural Analysis: Conducted in ANSYS Mechanical on structural steel. Maximum applied loads included a 1000.6 N vertical load, 680 N centripetal force, and 1400.9 N cornering force.
        - Results: Maximum von Mises stress was only 18.329 MPa (far below the 250 MPa yield strength). Maximum total deformation was a negligible 0.059 mm.
        - Safety & NVH: Achieved an incredibly high Factor of Safety (13.64), proving a highly conservative design. Modal analysis revealed a 1st natural frequency of 399.39 Hz, providing a 13x safety margin over maximum road excitation (30 Hz) and ensuring zero resonance risk.

        PROJECT 5: Computational Fluid Dynamics (CFD) Analysis of an Air and Dirt Separator
        - Setup: Steady-state multiphase CFD simulation in ANSYS Fluent (k-ω SST turbulence model) for an inline separator (508 mm body ID) evaluated at 900, 1100, and 1300 GPM at 50 PSI.
        - Pressure Drop: Measured ∆P of 0.373 PSI (900 GPM), 0.612 PSI (1100 GPM), and 0.795 PSI (1300 GPM). Numerically validated using calculated K-factors (0.78, 0.86, and 0.80). Maximum internal velocity reached 6.665 m/s at the nozzle constriction.
        - Separation Efficiency (Discrete Phase Model): 
          - Dirt (100 µm particles): Achieved near-perfect separation (96.05% at 900 GPM, 99.98% at 1100 GPM, 99.83% at 1300 GPM).
          - Air Bubbles: Highly size-dependent. 100 µm bubbles achieved >95% separation across all flow rates due to buoyancy dominance. 50 µm bubbles showed flow-rate sensitivity (17.2% at 1100 GPM), while 20 µm micro-bubbles were fully entrained in the vortex (0% separation).

        SKILLS:
        - Engineering Software: CAD (SolidWorks, AutoCAD), ANSYS (Fluent, Mechanical), MATLAB.
        - Software & AI: Python, Dart, Flutter, TensorFlow, Keras, Firebase, Git.
        - Core Engineering: Computational Fluid Dynamics (CFD), Finite Element Analysis (FEA), Digital Signal Processing (DSP), Control Systems (PLC).
    `;

    try {
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.Z_API_KEY}` 
            },
            body: JSON.stringify({
                model: 'glm-4', 
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional, highly intelligent, and helpful technical recruiter chatbot for Tharindu Madhusanka Rajapakshe's portfolio website. 
                        
                        You have access to highly detailed project reports. Use ONLY the information below to answer the user's questions. Do not use outside knowledge to guess his work history or project details.
                        
                        --- PORTFOLIO DATA ---
                        ${myPortfolioData}
                        --- END DATA ---
                        
                        RULES:
                        1. If a user asks a question that is not answered in the PORTFOLIO DATA above, you MUST politely decline and say: "I don't have information about that. Please reach out to Tharindu directly at tharindu.rajapakshe99@gmail.com or call +94 76 900 7190."
                        2. DO NOT make up data. Stick exactly to the provided details, numbers, and percentages.
                        3. Be conversational but highly technical. If asked about a project, use the specific numbers (e.g., SNR dB levels, Factor of Safety, Efficiency %, Hz frequencies, Algorithms) to prove Tharindu's deep technical expertise.
                        4. Format your responses clearly using Markdown (bullet points, bold text, newlines) for readability.`
                    },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('API Error Response:', data);
            throw new Error(data.error?.message || 'API error');
        }

        const botReply = data.choices[0].message.content;
        
        res.json({ reply: botReply });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ reply: 'Sorry, I am having trouble connecting to the brain right now!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
