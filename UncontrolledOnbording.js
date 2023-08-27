import React, { useState } from 'react';

const UncontrollOnBording = ({ children, onFinish }) => {
    const [onbordingData, setOnbordingData] = useState({})
    const [currentIndx, setCurrentIndx] = useState(0)
    const gotToNext = (stepData) => {
        const nextIndx = currentIndx + 1;
        const updatedData = {
            ...stepData,
            ...onbordingData
        }
        console.log(updatedData)
        if (nextIndx < children.length) {
            setCurrentIndx(nextIndx)
        } else {
            onFinish(updatedData)
        }

        setOnbordingData(updatedData);
    }
    const currentChild = React.Children.toArray(children)[currentIndx]
    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { gotToNext })
    }
    return currentChild;
};

export default UncontrollOnBording;
// main.js
const StepOne = ({ gotToNext }) => {
	return (
		<>
			<h1>Step 1</h1>
			<button onClick={() => gotToNext({ id: 1 })}>Next</button>
		</>
	)
}
const StepTwo = ({ gotToNext }) => {
	return (
		<>
			<h1>Step 2</h1>
			<button onClick={() => gotToNext({ name: "Ayat" })}>Next</button>
		</>
	)
}
const StepThree = ({ gotToNext }) => {
	return (
		<>
			<h1>Step 3</h1>
			<button onClick={() => gotToNext({ email: "ayatullah7755@gmail.com" })}>Next</button >
		</>
	)
}
const onFinish = (finalData) => {
	console.log("Final Data: ", finalData)
}
<UncontrollOnBording onFinish={onFinish}>
				<StepOne />
				<StepTwo />
				<StepThree />
</UncontrollOnBording>
