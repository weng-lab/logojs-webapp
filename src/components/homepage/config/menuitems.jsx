export const mainMenuItems = {
    items: [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Editors",
            href: "/editors",
            dropdown: true,
            options: [
                { key: "FASTA", text: "FASTA", href: "/editor/fasta" },
                { key: "PWM", text: "PWM", href: "/editor/pwm" }
            ]
        },
        {
            name: "Data Upload",
            href: "/upload"
        },
        {
            name: "Gallery",
            href: "/gallery"
        }
    ],
    defaultActive: "Home"
};
