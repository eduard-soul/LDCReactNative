import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View , ScrollView} from 'react-native';
import axios from 'axios';
//import data from './assets/LDC1.json';
import data from './assets/LDC1_DONE.json'

/*
const [LDC1, setLDC1] = useState({[{
    wordsTitle: 'Accepter ce que on est',
    title: 'Accepter ce que l’on est',
    wordsParagraph: [pourquoi, comment, consequence],
    paragraph: 'L’homme refuse d’admettre que beaucoup de ses actions ne viennent pas de son libre  arbitre, mais sont des automatismes inscrits génétiquement en lui. Il ne les maîtrisera  consciemment qu’en acceptant sa part d’animalité, car accepter par l’esprit sa nature nous  rend pur esprit, maîtrisant la matière, maîtrisant le corps.',
}]});
*/

export default function App() {
    const [tempLDC1, setTempLDC1] = useState("#Accepter ce que l’on est  $L’homme refuse d’admettre que beaucoup de ses actions ne viennent pas de son libre  arbitre, mais sont des automatismes inscrits génétiquement en lui. Il ne les maîtrisera  consciemment qu’en acceptant sa part d’animalité, car accepter par l’esprit sa nature nous  rend pur esprit, maîtrisant la matière, maîtrisant le corps.$    #Sur la place de l’homme dans le règne animal  $Le seul fait de reconnaître son animalité en ayant la possibilité par l’esprit de s’extérioriser  de nous-même pour se regarder avec distance, s’analyser et se comprendre s’appelle « la  conscience d’être ». La conscience est donnée par le verbe, et c’est cela qui nous place à  part du règne animal. Le fait d’être capable de penser et dire : « Je suis un animal avec des  comportements imprimés en moi, et désormais grâce à cette connaissance je vais pouvoir  les maîtriser pour maîtriser mon univers. » Qui refuse d’admettre son animalité ne s’élèvera  jamais vers la divinité.$    #Sur la part divine de l’homme  $Ce qui fait l’homme et le rapproche de Dieu c’est la conscience d’être, qui ne peut émerger  que par l’apparition de la parole et des notions de temps et d’espace qu’elle véhicule.  L’homme est un singe qui peut parler du passé et du futur, qui peut se parler à luimême et,  ce étant, il peut enfin parler à Dieu. Au commencement était le verbe, étape fondamentale  pour que naisse la conscience et se réveille Dieu.$");
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentScores, setCurrentScores] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (text) => {
        setInputText(text);
    };

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

    function text_to_words(text) {
        let words = [];
        let text_without_accents = replace_accents(text);

        if (text_without_accents.length > 0) {
            for (let i = 0; i < text_without_accents.length; i++) {
                let word = '';

                while (text_without_accents[i] !== ' ' && i < text_without_accents.length) {
                    word += text_without_accents[i];
                    i++;
                }
                if (it_is_punctuation(word, word.length - 1) === 1) {
                    word = word.slice(0, word.length - 1);
                }
                if (it_is_punctuation(word, 0) === 1) {
                    word = word.slice(1, word.length);
                }
                if (word.length > 1) {
                    if (it_is_apostrophe(word) === 1) {
                        word = word.slice(2, word.length);
                    }
                    if (word.length > 1) {
                        words.push(word);
                    }
                }
            }
        }
        return words;
    }

    function check_input(event) {
        let words = [];
        let scores = [];
        let LDC1 = data.LDC1;

        //console.log(event);
        //console.log(inputText)
        //console.log(event);
        if (event.key === 'Enter') {
            words = text_to_words(inputText);
            console.log(words);
            if (words.length > 0) {
               for (let i = 0; i < LDC1.length; i++) {
                    let score = 0;
                    let wordsTitle = LDC1[i].wordsTitle;
                    let wordsParagraph = LDC1[i].wordsParagraph;

                    for (let j = 0; j < wordsTitle.length; j++) {
                        let word = wordsTitle[j];

                        for (let k = 0; k < words.length; k++) {
                            if (word === words[k]) {
                                score += 10;
                            }
                        }
                    }
                    for (let j = 0; j < wordsParagraph.length; j++) {
                        let word = wordsParagraph[j];

                        for (let k = 0; k < words.length; k++) {
                            if (word === words[k]) {
                                score++;
                            }
                        }
                    }
                    scores.push(score);
               }
               if (scores) {
                    let max = 0;
                    let max_index = 0;
                    setCurrentScores(scores);

                    for (let i = 0; i < scores.length; i++) {
                        if (scores[i] > max) {
                            max = scores[i];
                            max_index = i;
                        }
                    }
                    if (max_index === 0 && scores[0] === 0) {
                        max_index = Math.floor(Math.random() * scores.length);
                    }
                    setCurrentTitle(LDC1[max_index].title);
                    setCurrentParagraph(LDC1[max_index].paragraph);
               }
            }
            else {
                alert('Entre des mots clés valides');
            }
        }
    }

    function set_little_random_paragraph() {
        let LDC1 = data.LDC1;
        let scores = [];

        for (let i = 0; i < LDC1.length; i++) {
            let score = 0;

            if (LDC1[i].wordsParagraph.length < 30) {
                score += 1;
            }
            scores.push(score);
        }

        // Filter the indices with a score of 1
        let indicesWithScoreOne = scores.reduce((acc, score, index) => {
            if (score === 1) {
                acc.push(index);
            }
            return acc;
        }, []);

        // Take a random index from the filtered indices
        let randomIndex = indicesWithScoreOne[Math.floor(Math.random() * indicesWithScoreOne.length)];

        setCurrentTitle(LDC1[randomIndex].title);
        setCurrentParagraph(LDC1[randomIndex].paragraph);
    }

    function next_or_previous_paragraph(which) {
       if (which === 'prev') {
        
       } else if (which === 'next') {

       }
    }

    useEffect(() => {
        set_little_random_paragraph();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.topSectionWrapper, {
                alignItems: 'center',
                height: '70%',
            }]}>
                <Text style={[styles.headerTitle, 
                    Platform.OS !== 'web' ? {marginTop: '15%'} : {marginTop: '5%'}
                ]}>L'Eveil Des Consciences</Text>
                <View style={[styles.titleAndParagraphWrapper]}>
                    <Text style={[styles.currentTitle, {
                    }]}>{currentTitle}</Text>
                    <ScrollView style={[styles.currentParagraphWrapper, {
                        width: '95%',
                        backgroundColor: 'red',
                    }]}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                        }}>{currentParagraph}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={[styles.bottomSectionWrapper, {
            }]}>
                <View style={[styles.inputWrapper]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        onKeyPress={(event) => {check_input(event)}}
                        onSubmitEditing = {() => (check_input({key: 'Enter'}))}
                        value={inputText}
                        placeholder="Écrit des mots clés..."
                        autoFocus={true}
                        autoCapitalize='none'
                    />
                </View>
                <View style={[styles.pressablesWrapper]}>
                    <Pressable style={[styles.pressable]}>
                        <Text style={[styles.pressableText]} onPress={next_or_previous_paragraph('prev')}>Précédent</Text>
                    </Pressable>
                    <Pressable style={[styles.pressable]} onPress={() => {check_input({key: 'Enter'})}}>
                        <Text style={[styles.pressableText]}>Rechercher</Text>
                    </Pressable>
                    <Pressable style={[styles.pressable]}>
                        <Text style={[styles.pressableText]} onPress={next_or_previous_paragraph('next')}>Suivant</Text>
                    </Pressable>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    titleAndParagraphWrapper: {
        height: '80%',
        alignItems: 'center',
    },
    currentTitle: {
        width: '90%',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    currentParagraphWrapper: {
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    bottomSectionWrapper: {
        position: 'absolute',
        width: '100%',
        height: '25%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        top: '75%',
    },
    inputWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 24,
    },
    pressablesWrapper: {
        height: 60,
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pressable: {
        height: '80%',
        width: '28%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
    },
    pressableText: {
        fontSize: 18,
    }
});