import React, { useState } from 'react';

const ControlledOnBording = ({ children, goToNext, currentIndx }) => {

    const currentChild = React.Children.toArray(children)[currentIndx]
    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { goToNext })
    }
    return currentChild;
};

export default ControlledOnBording;
// main.js
import { useState } from "react";
import ControlledOnBording from "./ControlledOnBording";

const StepOne = ({ goToNext }) => {
	return (
		<>
			<h1>Step 1</h1>
			<button onClick={() => goToNext({ age: 29 })}>Next</button>
		</>
	)
}
const StepTwo = ({ goToNext }) => {
	return (
		<>
			<h1>Step 2</h1>
			<button onClick={() => goToNext({ name: "Ayat" })}>Next</button>
		</>
	)
}
const StepThree = ({ goToNext }) => {
	return (
		<>
			<h1>Step 3</h1>
			<button onClick={() => goToNext({ email: "ayatullah7755@gmail.com" })}>Next</button >
		</>
	)
}
const FinalStep = () => {
	return <h1>Finish</h1>
}
const onFinish = (finalData) => {
	console.log("Final Data: ", finalData)
}


function App() {
	const [currentIndx, setCurrentIndx] = useState(0)
	const [onbordingData, setOnbordingData] = useState({})
	const toNext = (stepData) => {
		const updatedData = {
			...onbordingData,
			...stepData
		}
		setOnbordingData(updatedData)
		setCurrentIndx(currentIndx + 1);

	}

	return (
		<>
			<ControlledOnBording currentIndx={currentIndx} goToNext={toNext}>
				<StepOne />
				<StepTwo />
				{onbordingData.age < 18 && <StepThree />}
				<FinalStep />
			</ControlledOnBording>

		</>
	);
}

export default App;
