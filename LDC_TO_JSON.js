
    function openLocalFile() {
        axios.get('LDC1.json')
            .then(response => {
                // Handle the response here
                console.log(response.data);
            })
            .catch(error => {
                // Handle the error here
                console.error(error);
            });
    }

    function downloadJsonFile(data, filename) {
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Usage example

    function replace_accents(text) {
        const accentMap = {
            á: 'a',é: 'e',í: 'i',ó: 'o',ú: 'u',Á: 'A',É: 'E',Í: 'I',Ó: 'O',Ú: 'U',à: 'a',
            è: 'e',ì: 'i',ò: 'o',ù: 'u',À: 'A',È: 'E',Ì: 'I',Ò: 'O',Ù: 'U',â: 'a',ê: 'e',
            î: 'i',ô: 'o',û: 'u',Â: 'A',Ê: 'E',Î: 'I',Ô: 'O',Û: 'U',ã: 'a',õ: 'o',Ã: 'A',
            Õ: 'O',ä: 'a',ë: 'e',ï: 'i',ö: 'o',ü: 'u',Ä: 'A',Ë: 'E',Ï: 'I',Ö: 'O',Ü: 'U',
            ç: 'c',Ç: 'C',ñ: 'n',Ñ: 'N', }
        let return_text = '';

        for (let i = 0; i < text.length; i++) {
            if (accentMap[text[i]]) {
                return_text += accentMap[text[i]];
            } else {
                return_text += text[i];
            }
        }
        //console.log(return_text);
        return (return_text);
    }

    function it_is_punctuation(word, where) {
        if (word[where] === '.' || word[where] === ',' 
            || word[where] === '!' || word[where] === '?' 
            || word[where] === ';' || word[where] === ':'
            || word[where] === ')' || word[where] === ']'
            || word[where] === '}' || word[where] === '"'
            || word[where] === '\'' || word[where] === '-'
            || word[where] === '_' || word[where] === '/'
            || word[where] === '\\' || word[where] === '>'
            || word[where] === '<' || word[where] === '*'
            || word[where] === '&' || word[where] === '%'
            || word[where] === '$' || word[where] === '#'
            || word[where] === '@' || word[where] === '`'
            || word[where] === '^' || word[where] === '~'
            || word[where] === '+' || word[where] === '='
            || word[where] === '(' || word[where] === '['
            || word[where] === '{' || word[where] === '|'
            || word[where] === '°' || word[where] === '§'
            || word[where] === '²' || word[where] === '³'
            ) {
                return (1);
        }
        else {
            return (0);
        }
    }

    function it_is_apostrophe(word) {
        if ((word[0] === 'l' && word[1] === '\'') || (word[0] === 'd' && word[1] === '\'')
            || (word[0] === 's' && word[1] === '\'') || (word[0] === 'j' && word[1] === '\'')
            || (word[0] === 't' && word[1] === '\'') || (word[0] === 'm' && word[1] === '\'')
            || (word[0] === 'n' && word[1] === '\'') || (word[0] === 'c' && word[1] === '\'')
            || (word[0] === 'q' && word[1] === '\'') || (word[0] === 'L' && word[1] === '\'')
            || (word[0] === 'D' && word[1] === '\'') || (word[0] === 'S' && word[1] === '\'')
            || (word[0] === 'J' && word[1] === '\'') || (word[0] === 'T' && word[1] === '\'')
            || (word[0] === 'M' && word[1] === '\'') || (word[0] === 'N' && word[1] === '\'')
            || (word[0] === 'C' && word[1] === '\'') || (word[0] === 'Q' && word[1] === '\'')
            || (word[0] === 'L' && word[1] === '’') || (word[0] === 'D' && word[1] === '’')
            ) {
                return (1);
        }
        return (0);
    }

    function file_to_real_json(data) {
        let json = {"LDC1": []};
        let LDC1 = data.LDC1;

        for (let i = 0; i < LDC1.length; i++) {
            let wordsTitle = [];
            let title = '';
            let wordsParagraph = [];
            let paragraph = '';

            while ((LDC1[i] === ' ' || LDC1[i] === '\n' || LDC1[i] === '\t' || LDC1[i] === '\r'
                || LDC1[i] === '\v' || LDC1[i] === '\f' || LDC1[i] === '\b' || LDC1[i] === '\0'
            ) && i < LDC1.length) {
                i++;
            }
            if (LDC1[i] === '#') {
                //console.log('#');
                i++;
                while (LDC1[i] !== '$' && i < LDC1.length) {
                    title += LDC1[i];
                    i++;
                }
                //console.log(title);
                wordsTitle = text_to_words(title);
            }
            if (LDC1[i] === '$' && i < LDC1.length) {
                i++;
                while (LDC1[i] !== '$' && i < LDC1.length) {
                    paragraph += LDC1[i];
                    i++;
                }
                wordsParagraph = text_to_words(paragraph);
            }
            if (title && paragraph) {
                json.LDC1.push({
                    wordsTitle: wordsTitle,
                    title: title,
                    wordsParagraph: wordsParagraph,
                    paragraph: paragraph,
                });
            }
        }
        //console.log(json.LDC1);
        //console.log(json);
        return (json);
    }

    function create_dictionnary(data) {
        let dictionary = {};

        for (let i = 0; i < data.length; i++) {
            let wordsTitle = data[i].wordsTitle;

            for (let j = 0; j < wordsTitle.length; j++) {
                let word = wordsTitle[j];

                if (!dictionary[word]) {
                    dictionary[word] = 1;
                } else {
                    dictionary[word]++;
                }
            }
        }

        // Sort the dictionary by amount
        let sortedDictionary = Object.entries(dictionary).sort((a, b) => b[1] - a[1]);

        //console.log(sortedDictionary);
        return sortedDictionary;
    }
