import "./style.less";
import pako from 'pako'

const searchParams = new URL(location.href).searchParams
let code = searchParams.get('code')!
const mode = searchParams.get('mode')!
const appContainer = document.querySelector('#app')!
appContainer.attachShadow({ mode: "open" })
const shadowRoot = appContainer.shadowRoot!
if(mode === '1') {
  let inputStr = ''
  let compressedStr = ''
  const root = document.querySelector('#helper') as HTMLDivElement
  root.style.display = 'block'
  const input = document.querySelector('#helper textarea') as HTMLTextAreaElement
  const urlResult = document.querySelector('#helper p') as HTMLParagraphElement
  input.oninput = (event:Event) => {
    inputStr = (event.target as HTMLTextAreaElement).value
    compressedStr = pako.deflate(inputStr).join(',')

    urlResult.innerText = compressedStr
  }
  
  document.getElementById('clickToCopy')!.onclick= () => {
    navigator.clipboard.writeText(compressedStr)
  }

} else {
  if(!code) {
    appContainer.innerHTML = `no code in url`
    throw new Error("no code in url");
    
  }
  
  console.log('***',code)
  const rawArr = code.split(',')
  const data = new Uint8Array(rawArr.length)
  rawArr.forEach((v,i) => data[i] = +v)
  
  code = pako.inflate(rawArr, { to: 'string'})
  
  shadowRoot.innerHTML = `<style>:host{all:initial;}</style>${code}`
}
