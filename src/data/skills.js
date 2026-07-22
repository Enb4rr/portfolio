import { SiUnity, SiUnrealengine, SiEpicgames, SiAutodesk, SiGit, SiJira, SiReact, SiDotnet, SiFirebase, SiMongodb, SiMysql, SiPython, SiNodedotjs, SiJavascript, SiHtml5 } from 'react-icons/si'

export const gameSkills = [
    {
        category: 'Engines',
        items: [
            { label: 'Unity 6', icon: SiUnity },
            { label: 'Unreal Engine 5', icon: SiUnrealengine },
            { label: 'UEFN', icon: SiEpicgames },
            { label: 'Roblox Studio', slug: 'robloxstudio' },
        ]
    },
    {
        category: 'Languages',
        items: [
            { label: 'C#', text: true },
            { label: 'C++', slug: 'cplusplus' },
            { label: 'Verse', text: true },
        ]
    },
    {
        category: 'Tech Art',
        items: [
            { label: 'Shader Graph', text: true },
            { label: 'VFX Graph', text: true },
            { label: 'UI Toolkit', text: true },
            { label: 'Maya', icon: SiAutodesk },
            { label: 'Photoshop', text: true },
        ]
    },
    {
        category: 'Pipeline',
        items: [
            { label: 'Git', icon: SiGit },
            { label: 'Perforce', slug: 'perforce' },
            { label: 'Jira', icon: SiJira },
        ]
    }
]

export const softwareSkills = [
    {
        category: 'Frontend',
        items: [
            { label: 'React', icon: SiReact },
            { label: 'React Native', icon: SiReact },
            { label: 'JavaScript', icon: SiJavascript },
            { label: 'HTML', icon: SiHtml5 },
            { label: 'CSS', slug: 'css' },
        ]
    },
    {
        category: 'Backend',
        items: [
            { label: '.NET', icon: SiDotnet },
            { label: 'Node.js', icon: SiNodedotjs },
            { label: 'Python', icon: SiPython },
            { label: 'C#', text: true },
        ]
    },
    {
        category: 'Databases',
        items: [
            { label: 'Firebase', icon: SiFirebase },
            { label: 'MongoDB', icon: SiMongodb },
            { label: 'MySQL', icon: SiMysql },
        ]
    },
    {
        category: 'Pipeline',
        items: [
            { label: 'Git', icon: SiGit },
            { label: 'Jira', icon: SiJira },
        ]
    }
]