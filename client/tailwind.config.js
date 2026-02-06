/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'velsphere-blue': '#0A192F', // Deep professional blue
                'velsphere-accent': '#64FFDA', // Tech accent
                'velsphere-light': '#E6F1FF', // Light background
                'velsphere-gray': '#8892B0', // Muted text
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
