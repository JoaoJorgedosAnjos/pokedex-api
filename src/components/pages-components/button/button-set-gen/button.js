import { Gen1Button, Gen2Button, Gen3Button, Gen4Button, Gen5Button, Gen6Button, Gen7Button, Gen8Button } from "../button-list-control/set-gen-list"
import styled from "styled-components"

export function ButtonSetGen({offSet, setOffSet}) {

    return (
        <DivButton>
            <Gen1Button offSet={offSet} setOffSet={setOffSet} />
            <Gen2Button offSet={offSet} setOffSet={setOffSet} />
            <Gen3Button offSet={offSet} setOffSet={setOffSet} />
            <Gen4Button offSet={offSet} setOffSet={setOffSet} />
            <Gen5Button offSet={offSet} setOffSet={setOffSet} />
            <Gen6Button offSet={offSet} setOffSet={setOffSet} />
            <Gen7Button offSet={offSet} setOffSet={setOffSet} />
            <Gen8Button offSet={offSet} setOffSet={setOffSet} />
        </DivButton>
    )
}

const DivButton = styled.div`
display:flex;
flex-direction: column;
gap:10px;
margin:20px 0 0 5%;
@media (max-width: 768px) {
  display:block;
}
`