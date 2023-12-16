import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

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
    axios.get('./assets/LDC1.txt')
      .then(response => {
        // Handle the response here
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error here
        console.error(error);
      });
  }

  useEffect(() => {
    openLocalFile();
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