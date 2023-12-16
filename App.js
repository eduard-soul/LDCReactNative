import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
  const [tempLDC1, setTempLDC1] = useState("$L’homme refuse d’admettre que beaucoup de ses actions ne viennent pas de son libre arbitre, mais sont des automatismes inscrits génétiquement en lui. Il ne les maîtrisera consciemment qu’en acceptant sa part d'animalité, car accepter par l’esprit sa nature nous rend pur esprit, maîtrisant la matière, maîtrisant le corps. Le seul fait de reconnaître son animalité en ayant la possibilité par l’esprit de s’extérioriser de nous-même pour se regarder avec distance, s’analyser et se comprendre s’appelle « la conscience d’être ». La conscience est donnée par le verbe, et c’est cela qui nous place à part du règne animal. Le fait d’être capable de penser et dire : « Je suis un animal avec des comportements imprimés en moi, et désormais grâce à cette connaissance je vais pouvoir les maîtriser pour maîtriser mon univers. » Qui refuse d’admettre son animalité ne s’élèvera jamais vers la divinité. Ce qui fait l’homme et le rapproche de Dieu, c’est la conscience d’être, qui ne peut émerger que par l’apparition de la parole et des notions de temps et d’espace qu’elle véhicule. L’homme est un singe qui peut parler du passé et du futur, qui peut se parler à lui-même et, ce faisant, il peut enfin parler à Dieu. Au commencement était le verbe, étape fondamentale pour que naisse la conscience et se réveille Dieu. J’étudie les corps et les os depuis trente ans. Ce sont mes recherches qui me poussent à certifier une évolution de l’homme. J’ai étudié l’orientation du deltoïde postérieur de l’homme et de la scapula, et tout confirme son évolution, avec une première fonction du deltoïde postérieur pour le déplacement quadrupède, ensuite une orientation progressive pour tirer le bras vers le bas dans sa fonction arboricole, avant que notre deltoïde postérieur tire le bras vers l’arrière, le centre et le haut, pour équilibrer les déplacements bipèdes et armer les tirs lors des projections. Tout cela, c’est une continuité évolutive, qui va à l’encontre des théories sans preuve des créationnistes fixistes. Personne ne peut prouver que mon travail est faux. Mon travail, c’est ma sueur, je la verse pour l’humanité, et je hais le mensonge.$");
  const [currentParagraph, setCurrentParagraph] = useState('Hello World!');
  const [inputText, setInputText] = useState('');

  const handleInputChange = (text) => {
    setInputText(text);
  };

  function textToDictionnary(text) {
    const words = text.split(' ');
    const dictionnary = {};
    words.forEach((word) => {
      if (dictionnary[word]) {
        dictionnary[word] += 1;
      } else {
        dictionnary[word] = 1;
      }
    });
    console.log(dictionnary);
    return dictionnary;
  }

  useEffect(() => {
    textToDictionnary(tempLDC1);
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