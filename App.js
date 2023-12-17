import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import data from './assets/LDC1.json';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 20,
		paddingHorizontal: 10,
	},
});

export default function App() {
	const [tempLDC1, setTempLDC1] = useState("#Accepter ce que l’on est  $L’homme refuse d’admettre que beaucoup de ses actions ne viennent pas de son libre  arbitre, mais sont des automatismes inscrits génétiquement en lui. Il ne les maîtrisera  consciemment qu’en acceptant sa part d’animalité, car accepter par l’esprit sa nature nous  rend pur esprit, maîtrisant la matière, maîtrisant le corps.$    #Sur la place de l’homme dans le règne animal  $Le seul fait de reconnaître son animalité en ayant la possibilité par l’esprit de s’extérioriser  de nous-même pour se regarder avec distance, s’analyser et se comprendre s’appelle « la  conscience d’être ». La conscience est donnée par le verbe, et c’est cela qui nous place à  part du règne animal. Le fait d’être capable de penser et dire : « Je suis un animal avec des  comportements imprimés en moi, et désormais grâce à cette connaissance je vais pouvoir  les maîtriser pour maîtriser mon univers. » Qui refuse d’admettre son animalité ne s’élèvera  jamais vers la divinité.$    #Sur la part divine de l’homme  $Ce qui fait l’homme et le rapproche de Dieu c’est la conscience d’être, qui ne peut émerger  que par l’apparition de la parole et des notions de temps et d’espace qu’elle véhicule.  L’homme est un singe qui peut parler du passé et du futur, qui peut se parler à luimême et,  ce étant, il peut enfin parler à Dieu. Au commencement était le verbe, étape fondamentale  pour que naisse la conscience et se réveille Dieu.$");
	const [currentParagraph, setCurrentParagraph] = useState('Hello World!');
	/*
	const [LDC1, setLDC1] = useState({[{
	  wordsTitle: 'Accepter ce que on est',
	  title: 'Accepter ce que l’on est',
	  wordsParagraph: [pourquoi, comment, consequence],
	  paragraph: 'L’homme refuse d’admettre que beaucoup de ses actions ne viennent pas de son libre  arbitre, mais sont des automatismes inscrits génétiquement en lui. Il ne les maîtrisera  consciemment qu’en acceptant sa part d’animalité, car accepter par l’esprit sa nature nous  rend pur esprit, maîtrisant la matière, maîtrisant le corps.',
	}]});
	*/
	const [inputText, setInputText] = useState('');

	const handleInputChange = (text) => {
		setInputText(text);
	};

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

	function text_to_words(text) {
		let words = [];

		for (let i = 0; i < text.length; i++) {
			let temp_word = '';

			if (i + 1 < text.length && text[i + 1] === '\'') {
				i++;	
			}
			while ((text[i] === ' ' || text[i] === ',' || text[i] === '.' || text[i] === '!' || text[i] === '\'') && i < text.length) {
				i++;
			}
			while (text[i] !== ' ' && i < text.length) {
				if  ((text[i] === ' ' || text[i] === ',' || text[i] === '.' || text[i] === '!' || text[i] === '\'')) {
					i++;
				}
				else if (text[i] === 'é' || text[i] === 'è' || text[i] === 'ê') {
					temp_word += 'e';	
					i++;
				}
				else if (text[i] === 'à' || text[i] === 'â') {
					temp_word += 'a';	
					i++;
				}
				else {
					temp_word += text[i];	
					i++;
				}
			}
			words.push(temp_word);
		}
		return (words);
	}

	function convert_text_to_text_without_accent(text) {
	}

	function file_to_real_json(data) {
		let json = {"LDC1": []};
		let LDC1 = data.LDC1;

		for (let i = 0; i < LDC1.length; i++) {
			let wordsTitle = [];
			let title = '';
			let wordsParagraph = [];
			let paragraph = '';

			if (LDC1[i] === '#') {
				i++;
				while (LDC1[i] !== '$' && i < LDC1.length) {
					title += LDC1[i];
					i++;
				}
				wordsTitle = text_to_words(title);
			}
			if (LDC1[i] === '$' && i < LDC1.length) {
				i++;
				while (LDC1[i] !== '$' && i < LDC1.length) {
					paragraph += LDC1[i];
					i++;
				}
				wordsParagraph = text_to_words(paragraph);
				json.LDC1.push({
					wordsTitle: wordsTitle,
					title: title,
					wordsParagraph: wordsParagraph,
					paragraph: paragraph,
				});
			}
		}
		return (json);
	}

	useEffect(() => {
		//console.log(data);
		let temp = file_to_real_json(data);
		console.log(temp);
		//downloadJsonFile(temp, 'LDC1.json');
	}, []);

	return (
		<View style={styles.container}>
			<Text>{currentParagraph}</Text>
			<TextInput
				style={styles.input}
				onChangeText={handleInputChange}
				value={inputText}
				placeholder="Type something..."
				autoFocus={true}
			/>
			<StatusBar style="auto" />
		</View>
	);
}