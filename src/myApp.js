import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

let WATERDATAS =  [
  {
    value: 3,
    date: (new Date(2019,2,3)).toISOString()
    // To input Data in Y.M.D,
    // we need to new Date(Y,M+1,D) to enter
  },
  {
    value: 5,
    date: (new Date(2019,3,4)).toISOString()
  },
  {
    value: 7,
    date: (new Date(2019,4,5)).toISOString()
  },
  {
    value: 9,
    date: (new Date(2019,5,6)).toISOString()
  },
  {
    value: 11,
    date: (new Date(2019,6,7)).toISOString()
  },
]


/* Permission options */
let options ={
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.BiologicalSex,
      AppleHealthKit.Constants.Permissions.DateOfBirth,
      AppleHealthKit.Constants.Permissions.Water,
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.Water,
    ],
  },
}

AppleHealthKit.initHealthKit(
  (options: HealthInputOptions),
  (err: string, results: boolean) => {
    if (err) {
      console.log('error initializing Healthkit: ', err)
      return
    }
      console.log('we got permissions!')
    // Healthkit is initialized...
    // now safe to read and write Healthkit data...
  },
)

var Age,Val
AppleHealthKit.getDateOfBirth(
  null,
  (err: Object, results: HealthDateOfBirth) => {
    if (err) {
      return
    }
    
    console.log(results)
    //console.log('type of?')
    //console.log(typeof results)
    //console.log(typeof results.age)
    //console.log(typeof results.value)

    Age=results.age
    Val=results.value
    //return results
  },
)

for(let i=0; i<WATERDATAS.length;i++){
  AppleHealthKit.saveWater((WATERDATAS[i]: Object), (err: Object, results: boolean) => {
    if (err) {
      console.log('Error saving water to Healthkit: ', err)
      return
    }
    console.log('water successfully saved')
  })
}

const App = () => {

  // method call sequence
  // data structure store and load
  
  //console.log(Age)
  //console.log(Val)
  return (  
    <View style={styles.container}>
      <Text style={styles.title}> My First React Native</Text>
      <Text style={styles.normalTexts}>Age: {Age}</Text>
      <Text style={styles.normalTexts}>Val: {Val}</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  },
  normalTexts:{
    fontSize: 15,
  }
});

export default App;