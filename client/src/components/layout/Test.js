import React ,{useEffect,useRef} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
input{
  color:#666;
  border:1px solid #ccc;
  outline:none;
  &.active{
    color:#000;
    border-color:#000;
  }
}
`;
function Test(){
  const refInput = useRef();

  useEffect(()=>{
    const{current} = refInput
    const handleFocus = ()=>{
      current.classList.add('active')
    }
    const handleBlur =()=>{
      current.classList.remove('active')
    }
    current.addEventListener('focus',handleFocus)
    current.addEventListener('blur',handleBlur)
    return ()=>{
      current.removeEventListener('focus',handleFocus)
      current.removeEventListener('blur',handleBlur)
    }
  })

  return (
    <Wrapper>
      <input type='text' ref={refInput} defaultValue='Focus me'/>
    </Wrapper>
  )
}
export default Test