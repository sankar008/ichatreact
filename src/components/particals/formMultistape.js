import React, { useState } from 'react'

function formMultistape(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState
  function next(){
    setCurrentStepIndex (i => {
      if (i >= steps.length - 1 ) return i
      return i + 1
    })
  }
  function back(){
    setCurrentStepIndex (i => {
      if (i <= 0 ) return i
      return i - 1
    })
  }
  function goTo(index){
    setCurrentStepIndex(index)
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    goTo,
    next,
    back
  }
}

export default formMultistape