import React, { useState } from "react"

function A() {
  console.log(2)
  return null
}

const App: React.FC = () => {
  const [flag, setFlag] = useState(1111)
  console.log(1)
  return (
    <div>
      <button
        onClick={() => {
          console.log("click")
          setFlag(2222)
        }}
      >
        click me
      </button>
      {/* <BtnFC /> */}
      <A />
    </div>
  )
}

export default App
