const Translate = require('@google-cloud/translate');
const projectId = 'godwin-feb8f';
const translate = new Translate({
  projectId: projectId,
});

const text = 'Hello, world!';
const target = 'ru';
 
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];
 
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });