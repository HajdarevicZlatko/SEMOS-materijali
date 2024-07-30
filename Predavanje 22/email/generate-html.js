/**
 * Funkcija koja generise HTML sadrzaj za email poruku
 * @param {string} template - Template string sa placeholder-ima
 * @param {Object} replacements - Objekat sa vrednostim za zamenu placeholder-a
 * @returns {string} - HTML sadrzaj sa izvrsenim zamenama
 */
function generateHTML(template, replacements)
{
    return template.replace(/{{(.*?)}}/g, (match, p1) => replacements[p1.trim()]);
};

module.exports = generateHTML;