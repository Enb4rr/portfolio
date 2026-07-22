const CLOUDINARY_BASE = 'https://res.cloudinary.com/ndtczbmo/image/upload/w_1200,q_auto,f_auto'

const getGallery = (prefix, count) => {
    return Array.from({ length: count }, (_, i) => {
        const num = String(i + 1).padStart(2, '0')
        return `${CLOUDINARY_BASE}/${prefix}_${num}.png`
    })
}

export const gameDev = [
    {
        id: 1,
        title: 'Raptor Heist',
        role: 'UI Programmer',
        studio: 'Teravision Games',
        year: '2025',
        shortDesc: 'A Fortnite roguelike island reaching 5600 concurrent players at peak. Nominated for Fortnite Game Awards.',
        gif: `${CLOUDINARY_BASE}/raptor-heist-cover.jpg`,
        link: null,
        skills: ['UEFN', 'Verse', 'UI Programming'],
        caseStudy: {
            overview: 'Raptor Heist is a third-person shooter roguelike Fortnite island for up to 5 players. Players battle through rooms filled with guards and raptors, collect rewards, upgrade their character stats in in-game shops, and tackle missions, puzzles, and secondary objectives.',
            role: 'As UI Programmer, I was responsible for implementing all designed user-facing interfaces, including the HUD, shop systems, mission panels, and secondary objective displays.',
            challenge: 'The core challenge was implementing responsive, visually compelling UIs that update in real time based on player actions, work across multiple platforms, and function within UEFN, a relatively undocumented and constrained development environment for UI work since Scene Graph was not fully developed at that time and Verse UI implementation pipeline did not allowed enough visual flexibility.',
            solution: 'I developed a methodology and reusable pipeline for implementing the HUD and all shop interfaces in the game using a mix of Widget Blueprints to implement a guide layout and Verse to implement the actual layout through code. Each UI system was also layered with a system based on time flow and user input events to respond to player currency, purchases, and state changes in real time, with edge-case validation (currency checks, button locking, quit) ensuring a smooth experience.',
            result: 'The game shipped with fully responsive HUDs and shop UIs, a scalable UI pipeline adopted across the project, and reached a peak of 5600 concurrent players. Raptor Heist received a nomination at the Fortnite Game Awards. With newer technologies available, such as Scene Graph, all UI work in Raptor Heist could be updated and polished to allow for more flexibility and improved aesthetics',
            tech: ['UEFN', 'Verse', 'UI Programming', 'Real-time State Management', 'LiveOps'],
            gallery: getGallery('RaptorHeist', 7),
            images: [getGallery('RaptorHeist', 7)[0], getGallery('RaptorHeist', 6)[1]],
            video: null
        }
    },
    {
        id: 2,
        title: 'Nutriaventuras',
        role: 'Solo Developer',
        studio: 'Yuyana Studios',
        year: '2025',
        shortDesc: 'Complete mobile game commissioned for a Peruvian government educational program. 10 levels, boss fights, achievements and more.',
        gif: `${CLOUDINARY_BASE}/nutriaventuras-cover.png`,
        link: null,
        skills: ['Unity', 'C#', 'UI Programming', 'Mobile'],
        caseStudy: {
            overview: 'Nutriaventuras is a mobile side-scroller following two kids defending their city from a robot invasion. Built as a government commission for Peru, it was deployed to students across schools in the country. The game features 10 levels with varied objectives, boss fights, customization, achievements, an in-game shop, local persistent data, and a teacher data export module.',
            role: 'I solely developed Nutriaventuras from concept to deployment, handling all programming, systems architecture, optimization, client communication, and project management.',
            challenge: 'Developing a complete, polished game solo as a mid-level developer was a significant challenge. Beyond the technical scope, it required developing soft skills like constant client communication and personal time management, while also learning and applying new optimization techniques for mobile.',
            solution: 'I built highly optimized management systems to handle the game\'s scope on mobile hardware, implemented a full data pipeline including local persistence and a teacher export module, and maintained clear communication with the client throughout development.',
            result: 'Nutriaventuras is a polished, complete game that was highly praised by playtesters and is now deployed to students in schools across Peru. As my first solo project, it stands as one of my greatest professional achievements and a strong proof of my capability as a developer.',
            tech: ['Unity 6', 'C#', 'Mobile Optimization', 'Data Persistence', 'JSON Serialization', 'UI Toolkit'],
            gallery: getGallery('Nutriaventuras', 10),
            images: [getGallery('Nutriaventuras', 10)[0], getGallery('Nutriaventuras', 10)[1]],
            video: null
        }
    },
    {
        id: 3,
        title: 'Rekindled',
        role: 'UI Programmer & Tech Artist',
        studio: 'Vancouver Film School',
        year: '2026',
        shortDesc: 'Third-person combat game with a spell combination system. Praised for its visual effects, UI, and technical animations.',
        gif: `${CLOUDINARY_BASE}/rekindled-cover.png`,
        link: null,
        skills: ['Unity', 'C#', 'UI Programming', 'Tech Art', 'Shader Graph', 'VFX Graph'],
        caseStudy: {
            overview: 'Rekindled is a third-person ranged combat game following Cynder, a phoenix mage who can combine spells to create powerful upgraded variants. The mission: climb a volcano, battle its defenders, and deliver the last Phoenix egg to revive the creature.',
            role: 'I took on a specialized dual role as UI Programmer and Tech Artist, which was my first time working as a specialist rather than a generalist. I was responsible for all visual systems, interfaces, and technical art elements.',
            challenge: 'This was my first experience as a specialized developer rather than a generalist. The challenge was deepening expertise in two closely related disciplines simultaneously, while delivering both functional UI systems and compelling visual effects. This forced me to learn about new optimization techniques in UI and technologies like VFX graph, Shader graph, texture painting in Photoshop and basic modelling in Maya.',
            solution: 'I developed and refined specialized techniques across UI programming and technical art, creating strong visual tools and assets that elevated the project aesthetically. I also built responsive, adaptive UIs and implemented a variety of flexible and reusable VFX and optimized shader-based effects to support the game\'s visual identity.',
            result: 'Rekindled was highly praised for its visual effects, user interfaces, and technical animations. The UI is visually compelling, responsive across different monitor sizes, and serves its purpose at all times. UI and rendering performance is functional but could be improved with refined optimization techniques',
            tech: ['Unity 6', 'C#', 'Shader Graph', 'VFX Graph', 'UI Toolkit', 'Photoshop', 'Maya'],
            gallery: getGallery('Rekindled', 18),
            images: [getGallery('Rekindled', 18)[0], getGallery('Rekindled', 18)[1]],
            video: null
        }
    },
    {
        id: 4,
        title: 'Monster Route',
        role: 'Lead Programmer',
        studio: 'Vancouver Film School',
        year: '2026',
        shortDesc: 'Third-person garbage collection game set in a monster-filled neighborhood. Developed in under two months at VFS.',
        gif: `${CLOUDINARY_BASE}/monster-route-cover.png`,
        link: null,
        skills: ['Unity', 'C#', 'Tech Art', 'VFX Graph'],
        caseStudy: {
            overview: 'Monster Route is a third-person collection game following Derek, a garbage collector tasked with cleaning a monster-infested neighborhood. Players use non-lethal weapons to distract monsters threatening both Derek and his truck while collecting trash along a route.',
            role: 'As Lead Programmer, I organized and directed the development efforts of a team of programmers toward a shared goal, while also contributing directly to core gameplay systems.',
            challenge: 'Monster Route was a test of my leadership skills: coordinating a team of developers, managing priorities, and maintaining quality under a tight two-month deadline.',
            solution: 'I established clear technical direction and task distribution for the team, maintained code standards, and stepped in to solve blockers where needed. This allowed the team to move efficiently and deliver a polished product on schedule.',
            result: 'Monster Route is a polished, entertaining game of notably high quality given its two-month development window. It stands as proof of my ability to lead a development team effectively.',
            tech: ['Unity 6', 'C#', 'VFX Graph', 'Shader Graph', 'Team Leadership'],
            gallery: getGallery('MonsterRoute', 11),
            images: [getGallery('MonsterRoute', 11)[0], getGallery('MonsterRoute', 11)[1]],
            video: null
        }
    },
]

export const software = [
    {
        id: 5,
        title: 'Earthquake News',
        role: 'Mobile Fullstack Developer',
        studio: 'Vancouver Film School',
        year: '2026',
        shortDesc: 'React Native news app with shake-to-read gesture, Firebase auth, live API consumption, and telemetry.',
        gif: null,
        link: null,
        skills: ['React Native', 'Firebase', 'Mobile', 'API Integration'],
        caseStudy: {
            overview: 'Earthquake News is a mobile news application built in React Native. The core interaction is a shake gesture that delivers a new trending news story to the user. It leverages native phone functionality alongside a full backend stack.',
            role: 'I developed the full application solo, handling frontend, backend integration, authentication, database architecture, and telemetry.',
            challenge: 'The project required integrating multiple layers simultaneously: native device functionality, live API consumption, Firebase authentication, database management, and telemetry. All within a React Native environment.',
            solution: 'I implemented a clean architecture separating concerns across authentication, data fetching, and native functionality. Firebase handled auth and storage, a news API provided live content, and a telemetry layer tracked user interactions.',
            result: 'The application is satisfying to use and correctly implements all intended features including authentication, live data, native gestures, telemetry, and persistent storage.',
            tech: ['React Native', 'Firebase', 'REST API', 'Expo Snack', 'Telemetry', 'MongoDB'],
            images: [null, null],
            video: null
        }
    },
    {
        id: 6,
        title: 'Flappy Bird Web Platform',
        role: 'Web Fullstack Developer',
        studio: 'Vancouver Film School',
        year: '2026',
        shortDesc: 'Full-stack React web platform connected to a Unity game, featuring real-time scoreboards, telemetry dashboards, and admin controls.',
        gif: null,
        link: null,
        skills: ['React', 'Firebase', 'MongoDB', 'MySQL', 'Python', '.NET'],
        caseStudy: {
            overview: 'A full-stack web platform built in React, connected to a Unity Flappy Bird game. Players can store and view their scores on a live leaderboard. The platform includes an admin view with real-time telemetry analytics, user permission management, and additional admin controls.',
            role: 'I built the complete platform solo, handling frontend development, dual database architecture, API design, telemetry implementation, and Unity integration.',
            challenge: 'The project required a broad and deep technical stack: relational and non-relational databases, a Python telemetry API, Firebase authentication, real-time data sync with a Unity game, and an admin analytics dashboard, All integrated coherently.',
            solution: 'I designed a dual database architecture using MySQL for structured relational data and MongoDB for flexible content. A Python-based telemetry API tracked user behavior in real time. Firebase handled authentication and the Unity game communicated directly with the platform to persist scores.',
            result: 'The platform is feature-complete and implements a large portion of the stack typically expected of a junior web developer. It demonstrates practical knowledge across frontend, backend, databases, APIs, and real-time data.',
            tech: ['React', 'Firebase', 'MongoDB', 'MySQL', 'Python', 'REST API', 'Unity Integration', 'Telemetry'],
            images: [null, null],
            video: null
        }
    }
]