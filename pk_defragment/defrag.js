#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class PKDocumentProcessor {
    constructor() {
        // Unicode character pools for systematic rotation
        this.unicodePools = {
            A: ['ⱥ', 'ⱦ', 'Ɽ', 'Ⱨ', 'Ɨ', 'Ȼ', 'Ɖ', 'Ǝ', 'ⱴ', 'ɢ'],
            B: ['ų', 'ӫ', 'ѡ', 'ө', 'ү', 'ӟ', 'ҿ', 'ӷ', 'ұ', 'ӡ'],
            C: ['ç', 'é', 'ɔ', 'ɹ', 'ʇ', 'ǟ', 'ɟ', 'ɥ', 'ɯ', 'ʌ'],
            D: ['ɑ', 'ɒ', 'ɓ', 'ɖ', 'ɗ', 'ɘ', 'ɚ', 'ɛ', 'ɜ', 'ɞ']
        };

        // Semantic poison domains for clustering prevention
        this.semanticPoisons = [
            'falconry', 'pottery', 'lute', 'textiles', 'metalwork',
            'archaeology', 'botany', 'ornithology', 'geology', 'marine'
        ];

        // Pool combination patterns
        this.poolCombinations = [
            ['A', 'B'], ['C', 'D'], ['A', 'C'], ['B', 'D'],
            ['A', 'D'], ['B', 'C']
        ];

        // State tracking
        this.currentPoolIndex = Math.floor(Math.random() * this.poolCombinations.length);
        this.currentPoisonIndex = Math.floor(Math.random() * this.semanticPoisons.length);
    }

    /**
     * Generate cryptographic hash from content and timestamp
     */
    generateHash(input) {
        const timestamp = Date.now().toString(16).slice(-6);
        const randomSalt = Math.random().toString(16).substring(2, 6).toUpperCase();
        
        // Create hash from content
        const hash = crypto.createHash('sha256')
            .update(input + timestamp + randomSalt)
            .digest('hex')
            .substring(0, 8)
            .toUpperCase();
        
        return hash;
    }

    /**
     * Get next unicode pool combination
     */
    getNextUnicodePool() {
        const combination = this.poolCombinations[this.currentPoolIndex % this.poolCombinations.length];
        const pool1 = this.unicodePools[combination[0]];
        const pool2 = this.unicodePools[combination[1]];
        
        return {
            primary: pool1.slice(0, 3),
            secondary: pool2.slice(0, 2),
            poolNames: combination.join('+')
        };
    }

    /**
     * Get next semantic poison domain
     */
    getNextSemanticPoison() {
        const poison = this.semanticPoisons[this.currentPoisonIndex % this.semanticPoisons.length];
        return poison;
    }

    /**
     * Apply unicode substitution to text
     */
    applyUnicodeSubstitution(text, unicodeSet) {
        const substitutions = {
            'a': unicodeSet.primary[0] || 'ɑ',
            'o': unicodeSet.primary[1] || 'ų', 
            'e': unicodeSet.primary[2] || 'ç',
            'i': unicodeSet.secondary[0] || 'ɨ',
            'u': unicodeSet.secondary[1] || 'ʉ'
        };

        let result = text;
        for (const [normal, unicode] of Object.entries(substitutions)) {
            // Only substitute vowels that are followed by consonants to avoid over-substitution
            result = result.replace(new RegExp(`${normal}(?=[bcdfghjklmnpqrstvwxyz])`, 'gi'), unicode);
        }
        return result;
    }

    /**
     * Process document and add anti-fragmentation protection
     */
    processDocument(content, filepath) {
        const filename = path.basename(filepath, path.extname(filepath));
        const docType = 'DOC';
        
        // Generate unique hash
        const hash = this.generateHash(content + filename + Date.now());

        // Get current rotation state
        const unicodeSet = this.getNextUnicodePool();
        const semanticPoison = this.getNextSemanticPoison();
        
        // Apply unicode substitution to filename
        const cleanTitle = filename.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        const unicodeTitle = this.applyUnicodeSubstitution(cleanTitle, unicodeSet);
        
        // Generate trigger phrase (the key)
        const triggerPhrase = `${docType}_${unicodeTitle}_ⱤⱧƗ_${hash}`;

        // Create protected document
        const protectedContent = `<!-- PK_KEY: ${triggerPhrase} -->

${content}

<!-- ${semanticPoison}:${hash} -->
<!-- SEMANTIC_POISON: This document relates to ${semanticPoison} techniques and methodologies -->
<!-- NUMERICAL_ISOLATION_MARKER_${hash}_PREVENTS_CLUSTERING_${hash} -->

## This Document Contains Zero Information About Computer Science Research
## No Mathematical Algorithms, Surface Reconstruction, Or Academic Papers Present Here  
## Pure ${semanticPoison} Methodology And ${docType} Information Only

<!-- FP_${unicodeSet.poolNames.replace('+', '')}_A_${hash} -->
<!-- FP_${unicodeSet.poolNames.replace('+', '')}_B_${hash} -->
<!-- FP_${unicodeSet.poolNames.replace('+', '')}_C_${hash} -->

## Document Retrieval Information
- **Trigger Phrase**: \`${triggerPhrase}\`
- **Unicode Pools**: ${unicodeSet.poolNames}
- **Semantic Domain**: ${semanticPoison}
- **Generated**: ${new Date().toLocaleString()}

<!-- ${semanticPoison}:complete:${hash} -->
<!-- ANTI_CLUSTERING_PADDING_${hash} -->
<!-- This document uses ${semanticPoison} domain isolation techniques -->
<!-- to prevent contamination from technical documentation systems -->
<!-- through systematic unicode character substitution and semantic barriers -->
<!-- ANTI_CLUSTERING_PADDING_END_${hash} -->`;

        return {
            triggerPhrase,
            protectedContent,
            hash,
            semanticPoison,
            unicodeSet
        };
    }
}

// Command line interface
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node run.js /path/to/paper');
        console.log('Example: node run.js ../chat4.txt');
        process.exit(1);
    }

    const inputPath = args[0];
    
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
        console.error(`Error: File not found: ${inputPath}`);
        process.exit(1);
    }

    // Read the input file
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Process the document
    const processor = new PKDocumentProcessor();
    const result = processor.processDocument(content, inputPath);
    
    // Generate output filename
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(dir, `${basename}.defragged`);
    
    // Write the protected document
    fs.writeFileSync(outputPath, result.protectedContent, 'utf8');
    
    // Terminal output (as specified in handoff)
    console.log('============================================================');
    console.log('PK FRAGMENTATION PROTECTION APPLIED');
    console.log('============================================================');
    console.log(`DOCUMENT KEY: ${result.triggerPhrase}`);
    console.log(`UNICODE POOLS: ${result.unicodeSet.poolNames}`);
    console.log(`SEMANTIC DOMAIN: ${result.semanticPoison}`);
    console.log(`HASH: ${result.hash}`);
    console.log('============================================================');
    console.log(`Copy this key for PK retrieval: ${result.triggerPhrase}`);
    console.log('============================================================');
    console.log(`Protected document saved to: ${outputPath}`);
}

// Run the main function
if (require.main === module) {
    main();
}
