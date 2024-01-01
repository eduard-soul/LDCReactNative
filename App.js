import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, 
    ScrollView, KeyboardAvoidingView, Image, Keyboard, SafeAreaView
} from 'react-native';
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
    const [currentScoresIndexes, setCurrentScoresIndexes] = useState([[]]);
    const [inputText, setInputText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
            á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', à: 'a',
            è: 'e', ì: 'i', ò: 'o', ù: 'u', À: 'A', È: 'E', Ì: 'I', Ò: 'O', Ù: 'U', â: 'a', ê: 'e',
            î: 'i', ô: 'o', û: 'u', Â: 'A', Ê: 'E', Î: 'I', Ô: 'O', Û: 'U', ã: 'a', õ: 'o', Ã: 'A',
            Õ: 'O', ä: 'a', ë: 'e', ï: 'i', ö: 'o', ü: 'u', Ä: 'A', Ë: 'E', Ï: 'I', Ö: 'O', Ü: 'U',
            ç: 'c', Ç: 'C', ñ: 'n', Ñ: 'N',
        }
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

    function sort_array_scores_indexes(scores) {
        let scores_indexes = [];

        for (let i = 0; i < scores.length; i++) {
            scores_indexes.push([scores[i], i]);
        }
        scores_indexes.sort(function (a, b) {
            return b[0] - a[0];
        });
        //console.log(scores_indexes);
        return scores_indexes;
    }

    function give_score_paragraph_title(words) {
        let LDC1 = data.LDC1;
        let scores = [];

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
        return (scores);
    }

    function check_input(event) {
        let scores = [];
        let LDC1 = data.LDC1; 

        //console.log(event);
        //console.log(inputText)
        //console.log(event);
        if (event.key === 'Enter') {
            let words = text_to_words(inputText);
            if (words.length > 0) {
                scores = give_score_paragraph_title(words);
                setCurrentScores(scores);
                
                if (scores) {
                    let temp_sorted_scores = sort_array_scores_indexes(scores);
                    setCurrentScoresIndexes(temp_sorted_scores);
                    setCurrentTitle(LDC1[temp_sorted_scores[0][1]].title);
                    setCurrentParagraph(LDC1[temp_sorted_scores[0][1]].paragraph);
                    setCurrentIndex(0);
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
        //scores
        if (which === 'prev') {
            if (currentIndex !== 0) {
                let temp = currentIndex - 1;
                setCurrentIndex(temp);
                setCurrentParagraph(data.LDC1[currentScoresIndexes[temp][1]].paragraph);
                setCurrentTitle(data.LDC1[currentScoresIndexes[temp][1]].title);
            }
        } else if (which === 'next') {
            if (currentIndex < currentScoresIndexes.length - 1) {
                let temp = currentIndex + 1;
                setCurrentIndex(temp);
                setCurrentParagraph(data.LDC1[currentScoresIndexes[temp][1]].paragraph);
                setCurrentTitle(data.LDC1[currentScoresIndexes[temp][1]].title);
            }
        }
    }

    function get_random_paragraph() {
       let random = Math.floor(Math.random() * data.LDC1.length);
        setCurrentTitle(data.LDC1[random].title);
        setCurrentParagraph(data.LDC1[random].paragraph); 
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action
          }
        );
      
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
      
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

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
                    Platform.OS === 'web' ? { marginTop: '2.5%' } : { marginTop: '12.5%' },
                    {color: '#AA2D2D'}
                ]}>
                    L'Eveil Des Consciences
                </Text>
                <KeyboardAvoidingView style={[styles.titleAndParagraphWrapper]}>
                    <SafeAreaView style={[styles.scrollViewWrapper, 
                        isKeyboardVisible ? {height: '70%'} : {height: '95%'},
                    ]}>
                        <ScrollView style={[styles.currentParagraphWrapper, {
                            backgroundColor: 'transparent',
                        }]}>
                            <Text style={[styles.currentTitle, {
                            }]}>
                                {currentTitle}
                            </Text>
                            <Text style={[{
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                lineHeight: 26,
                            }, 

                                Platform.OS === 'web' ? {height: 200} : {height: '100%'},
                            ]}>
                                {currentParagraph}
                            </Text>
                        </ScrollView>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
            <View style={[styles.bottomSectionWrapper, {
            }]}>
                <View style={[styles.inputWrapper, {
                }]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        //onKeyPress={(event) => { check_input(event) }}
                        onSubmitEditing={() => (check_input({ key: 'Enter' }))}
                        value={inputText}
                        placeholder="Écrit des mots clés..."
                        autoFocus={true}
                        autoCapitalize='none'
                    />
                    <Pressable style={{
                        height: 60,
                        width: '22.5%',
                        backgroundColor: '#96DBF4',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                    }} onPress={() => { check_input({ key: 'Enter' }) }}>
                        <Image
                            style={styles.lensImage}
                            source={require('./assets/Lens.png')}
                        />
                    </Pressable>
                </View>
                <View style={[styles.pressablesWrapper]}>
                    <Pressable style={[styles.pressablePrevNext]} onPress={() => {next_or_previous_paragraph('prev')}}>
                        <Text style={[styles.pressableText]} >Précédent</Text>
                    </Pressable>
                    <Pressable style={[styles.pressableDice]} onPress={(() => {get_random_paragraph()})}>
                        <Image
                            style={styles.diceImage}
                            source={require('./assets/Dice.png')}
                        />
                    </Pressable>
                    <Pressable style={[styles.pressablePrevNext]} onPress={() => {next_or_previous_paragraph('next')}}>
                        <Text style={[styles.pressableText]} >Suivant</Text>
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollViewWrapper: {
        backgroundColor: 'transparent',
        width: '90%',
    },
    titleAndParagraphWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    titleWrapper: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    currentTitle: {
        width: '92.5%',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3,
    },
    currentParagraphWrapper: {
        flex: 1,
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    bottomSectionWrapper: {
        position: 'absolute',
        width: '100%',
        height: '25%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'rgba(255,255,255,0.5)',
        top: '75%',
    },
    inputWrapper: {
        width: '95%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 60,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 24,
    },
    pressablesWrapper: {
        height: 70,
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },
    pressablePrevNext: {
        height: '80%',
        width: '36%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E16F6F',
        borderRadius: 10,
        borderWidth: 2,
    },
    pressableDice: {
        height: '80%',
        width: '21%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C3FFD3',
        borderWidth: 2,
        borderRadius: 10,
    },
    diceImage: {
        height: '80%',
        width: 'auto',
        aspectRatio: 1,
    },
    lensImage: {
        height: '70%',
        width: 'auto',
        aspectRatio: 1,
    },
    pressableText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});