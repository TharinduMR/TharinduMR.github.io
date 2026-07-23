const fs = require('fs');
const path = require('path');

const inputFile = 'C:\\\\Users\\\\Tharindu Madhusanka\\\\Downloads\\\\claude-fable-5.md';
const outputFile = path.join(__dirname, 'advanced_knowledge.md');

try {
    let content = fs.readFileSync(inputFile, 'utf8');
    
    // Replace names
    content = content.replace(/Claude Fable 5/g, "Tharindu's AI assistant");
    content = content.replace(/Claude Mythos 5/g, "Tharindu's AI assistant");
    content = content.replace(/Claude Opus 4\.8/g, "Tharindu's AI assistant");
    content = content.replace(/Claude Sonnet 4\.6/g, "Tharindu's AI assistant");
    content = content.replace(/Claude Haiku 4\.5/g, "Tharindu's AI assistant");
    content = content.replace(/Claude/g, "Tharindu's AI assistant");
    content = content.replace(/Anthropic's/gi, "Tharindu's");
    content = content.replace(/Anthropic/gi, "Tharindu");
    
    fs.writeFileSync(outputFile, content, 'utf8');
    console.log('Successfully processed prompt file to advanced_knowledge.md');
} catch (error) {
    console.error('Error processing file:', error);
}
