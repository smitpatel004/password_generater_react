import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [count, setCount] = useState(8)
  const[numAllow,setNUmAllow]=useState(false)
  const[charAllow,setCharAllow]=useState(false)
  const[password,setPassword]=useState("")

  const passwordref=useRef(null)

  const copypasswordToClip=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerate=useCallback(()=>{
    let pass=""
    let str ="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if(numAllow)str+='0987654321'
    if(charAllow)str+='!@#$%^&*()'
    for(let i=1;i<=count;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[count,numAllow,charAllow,setPassword])
useEffect(()=>{passwordGenerate()},[count,numAllow,charAllow,passwordGenerate])
  return (
    <>
      <h1 className='text-4xl text-center text-white '>Password</h1>
      <div className='w-full mx-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700' >
      <div className='flex shadow rounded-lg overflow-hidden mb-4' >
        <input type="text" name="" id="" value={password} className='outline-none w-full py-1 px-3' 
        placeholder='password' readOnly
        ref={passwordref}
       
        />
        <button onClick={copypasswordToClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >copy</button>

      </div>

    <div className="flex text-sm gap-x-2">
      <div className="flex item-center gap-x-1 ">
        <input type="range" min={6} max={100} value={count} className='cursor-pointer'
          onChange={(e)=>{setCount(e.target.value)}}  />
        <label htmlFor="">length:{count}</label>
      </div>
      <div className='flex items-center gap-x-1 ' >
        <input type="checkbox"
        defaultChecked={numAllow}
        id="numberInput"
        onChange={()=>{
          setNUmAllow((prev)=>!(prev));
        }}
        />
         <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className='flex items-center gap-x-1 ' >
        <input type="checkbox"
        defaultChecked={charAllow}
        id="charInput"
        onChange={()=>{
          setCharAllow((prev)=>!prev);
        }}
        />
         <label htmlFor="charInput">Characters</label>
      </div>



    </div>

      </div>
    
    </>
  )
}

export default App
