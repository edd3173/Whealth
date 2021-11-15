import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

let WATERDATAS =  [
  {
    // In Liters
    value: 3,
    date: (new Date(2019,2,3)).toISOString()
    // To input Data in Y.M.D,
    // we need to new Date(Y,M+1,D)
    // EX. new Date(2019,2,3) -> Inputs Data in HK : (2019,1,3)
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

// Initializing HealthKit
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

//Setting Weight Option.
let WeightOption = {
  unit: 'kilogram',
}

//Setting Height option, but seems not work. It works like Default(Inch)
let HeightOption = {
  unit: 'centimeter'
}

// Variables for HK datas
var Age,BirthDate
var Weight,Height

//Method to get DateOfBirth
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
    BirthDate=results.value
    //return results
  },
)

//Method to get  Height
AppleHealthKit.getLatestHeight(HeightOption, (err: string, results: HealthValue) => {
  if (err) {
    console.log('error getting latest height: ', err)
    return
  }
  console.log(results)
  Height=results.value
})

//Method to get Weight
AppleHealthKit.getLatestWeight(WeightOption, (err: string, results: HealthValue) => {
  if (err) {
    console.log('error getting latest weight: ', err)
    return
  }
  Weight=results.value
})


/*
  Iterate WaterDatas array, and save them using method
*/
for(let i=0; i<WATERDATAS.length;i++){
  AppleHealthKit.saveWater((WATERDATAS[i]: Object), (err: Object, results: boolean) => {
    if (err) {
      console.log('Error saving water to Healthkit: ', err)
      return
    }
    console.log('water successfully saved')
  })
}


// Main App
const App = () => {

  // NEED TO DEAL WITH : 
  // method call sequence -> Later
  // data structure store and load -> Works(on half)
  
  //console.log(Age)
  //console.log(Val)


  // Show it in screen
  return (  
    <View style={styles.container}>
      <Text style={styles.title}> My First React Native</Text>
      <Text style={styles.normalTexts}>Age: {Age}</Text>
      <Text style={styles.normalTexts}>BirthDate: {BirthDate}</Text>
      <Text style={styles.normalTexts}>Height: {Height}</Text>
      <Text style={styles.normalTexts}>Weight: {Weight}</Text> 
    </View>
  );

};

//Some basic styles
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