const FONT_COLOR = {
    RESET: '\x1b[0m',
    BLUE: '\x1b[34m',
    GREY: '\x1b[37m'
};

export const logger = {
    logStep: (desc, expected) => {console.log(`${FONT_COLOR.GREY}%s%s%s%s${FONT_COLOR.RESET}`, '    • ', desc, ', ', expected)},
    logCase: (num?) => {console.log(`${FONT_COLOR.BLUE}%s${FONT_COLOR.RESET}`, num ? `    Steps(${num}):` : '    Steps:')}
};