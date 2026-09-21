/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./index-fr.html"],
    theme: {
        extend: {
            fontFamily: {
                'display': ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
