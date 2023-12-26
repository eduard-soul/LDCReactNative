
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
