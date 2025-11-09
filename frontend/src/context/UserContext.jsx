import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    gender: '',
    age: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    activityLevel: '',
    goal: 'maintain',
    allergies: [],
    dietaryRestrictions: [],
    bmi: null,
    bmiCategory: ''
  });

  const updateUserData = (newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData,
      // Berechne BMI bei Aktualisierung von Größe oder Gewicht
      ...(newData.height !== undefined || newData.weight !== undefined ? calculateBMI({
        ...prev,
        ...newData
      }) : {})
    }));
  };

  const calculateBMI = (data) => {
    if (!data.height || !data.weight) return { bmi: null, bmiCategory: '' };
    
    const heightInM = data.heightUnit === 'cm' 
      ? data.height / 100 
      : data.height * 2.54 / 100;
    
    const weightInKg = data.weightUnit === 'kg' 
      ? data.weight 
      : data.weight * 0.453592;
    
    const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(1);
    
    // BMI Kategorien
    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'untergewichtig';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      bmiCategory = 'normalgewichtig';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      bmiCategory = 'übergewichtig';
    } else {
      bmiCategory = 'stark übergewichtig';
    }
    
    return { bmi: bmiValue, bmiCategory };
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser muss innerhalb eines UserProviders verwendet werden');
  }
  return context;
};
