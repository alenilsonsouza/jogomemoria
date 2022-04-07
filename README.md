# Jogo da Memória

Projeto feito no curso b7Web.

Praticado por [Alenilson souza](https://alenilsonsouza.com.br).

Demo: https://jogomemoria.alenilsonsouza.com.br/

## 01 - Introdução ao projeto
Esse projeto é para prática e conhecimento em *ReactJS* com *typescript* usando o *Styled Components* para estilizações. Foi usado o CRA para a instação.

```
npx create-react-app react-memory --template typescript
```

## 02 - Criando a estrutura (Usando Styled-Component)
Para este projeto usamos o styled components e seus types. Precisamos instalar essas bibliotecas:
- Instalando o styled-components
```
npm install styled-components
```

- Instalando os types de styled-components
```
npm install -D @types/styled-components
```

Arquivo `App.styles.ts`
Esse arquivo é para estilizar a estrutura do App.

Os nomes das variáveis representam os nomes dos componentes usados que receberão a estilização.

```javascript
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
    display: flex;
    padding: 50px 0;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export const Info = styled.div`
    display:flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px) {
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const LogoLink = styled.a`
    display:block;
`;

export const InfoArea = styled.div`
    width: 100%;
    margin: 10px 0;

    @media (max-width: 750px) {
        display:flex;
        justify-content: space-around;
        text-align:center;
    }
`;

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    background-color:red;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0 20px;
    }
`;
```

Arquivo `App.tsx`
O arquivo importa o App.styles e a imagem do logo.

Os componentes são importados com o prfeixo `C` precedido com um ponto (.) e em seguida o `nome do componente no styled component`.

A imagem é importada dentro da pasta assets com o nome `LogoImage`.

```javascript
import * as C from './App.styles';
import LogoImage from './assets/devmemory_logo.png';

const App = () => {
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={LogoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          ...
        </C.InfoArea>
        <button>Reiniciar</button>
      </C.Info>
      <C.GridArea>
       ...
      </C.GridArea>
    </C.Container>
  )
}

export default App;
```

## 03 - Criando o Componente InfoItem (Componente)

Dentro da pasta `src` criamos as `components/InfoItem`. Dentro de InfoItem criamos dois arquivos:
* index.tsx
* styles.ts

O arquivo `styles.ts` tem toda a estilização do nosso componente:
```javascript
import styled from "styled-components";

export const Container = styled.div`
    margin: 20px 0;
`;

export const Label = styled.div`
    font-size: 15px;
    color:#6A7D88;
`;

export const Value = styled.div`
    font-size: 37px;
    font-weight: bold;
    color: #101C40;
`;
```

No arquivo index.tsx contém o componente importando as estilizações.
```javascript
import * as C from './styles';

type Props = {
    label:string;
    value: string;
}

export const InfoItem = ({ label, value }:Props) => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    )
}
```
Esse componente recebe duas Props (label, value).Elas têm o type de `string` cada.

No arquivo `App.tsx` importar o componente:

```javascript
import { InfoItem } from './components/InfoItem';
```

Usar esse componete dentro de `C.InfoArea`:
```javascript
<C.InfoArea>
  <InfoItem label="Tempo" value="00:00" />
  <InfoItem label="Movimentos" value="0" />
</C.InfoArea>
```

## 04 - Criando o componente botão (Componente)

Dentro da pasta `components` vamos criar uma pasta chamada Button.

Dentro desta pasta criamos os arquivos:
* index.tsx
* styles.ts

Dentro de `styles.ts` colocamos todas as estilições para o botão:

```javascript
import styled from "styled-components";

export const Container = styled.div`
    width: 200px;
    height: 50px;
    display:flex;
    background-color:#1550FF;
    border-radius: 10px;
    cursor:pointer;
    opacity:1;
    transition: all ease .3s;

    &:hover {
        opacity: .8;
    }
`;

export const IconArea = styled.div`
    height: inherit;
    display:flex;
    justify-content:center;
    align-items:center;
    border-right: 1px solid rgba(255,255,255, .2);
    padding: 0 15px;
`;

export const Icon = styled.img`
    height: 20px;
`;

export const Label = styled.div`
    flex:1;
    height: inherit;
    display:flex;
    justify-content:center;
    align-items:center;
    flex: 1;
    padding: 0 20px;
    color:#FFF;
`;
```

Dentro do `index.tsx` criamos o componente botão:

```javascript
import * as C from './styles';

type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({ label, icon, onClick }: Props) => {
    return (
        <C.Container onClick={onClick}>
            {icon &&
                <C.IconArea>
                    <C.Icon src={icon} alt="" />
                </C.IconArea>
            }
            <C.Label>{label}</C.Label>
        </C.Container>
    )
}
```

Aqui nesse componente criamos com as Props necessarias que precisamos para o componente botão.

Dentro do arquivo App.tsx importamos o componente Botão:

```javascript
import { Button } from './components/Button';
```

Também importamos a imagem que vamos usar no botão:

```javascript
import RestartImage from './svgs/restart.svg';
```

Usamos esse componente após o componente `<C.InfoArea>`:
```javascript
<C.InfoArea>
  <InfoItem label="Tempo" value="00:00" />
  <InfoItem label="Movimentos" value="0" />
</C.InfoArea>
<Button label="Reiniciar" icon={RestartImage} onClick={resetAndCreateGrid} />
```

Criamos a função que vamos usar para a ação do botão:
```javascript
const resetAndCreateGrid = () => {

}
```

## 05 - Fazendo os items do jogo
Vamos criar os itens dos jogos em um arquivo separado. Dentro de `src` criamos a pasta `data` e dentro dessa o arquivo chamado `items.ts`. Em seu conteúdo criamos uma listas com as 6 imagens:
```javascript
import android from '../svgs/android.svg';
import caminhao from '../svgs/caminhao.svg';
import disney from '../svgs/disney.svg';
import estrela from '../svgs/estrela.svg';
import gasolina from '../svgs/gasolina.svg';
import moto from  '../svgs/moto.svg';

export const items = [
    {name: 'android', icon: android},
    {name: 'caminhao', icon: caminhao},
    {name: 'disney', icon: disney},
    {name: 'estrela', icon: estrela},
    {name: 'gasolina', icon: gasolina},
    {name: 'moto', icon: moto},
]
```

## 06 - Criando o Grid
1 - Em `App.styles.ts` vamos acrescentar mais um estilo para formatar a área do grid:
```javascript
export const Grid = styled.div`
    width: 430px;
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    gap:10px;
`;
```

2 - Em `App.tsx` vamos incluir o componente onde o grid vai ficar (Dentro de C.GridArea):
```javascript
<C.GridArea>
    <C.Grid>

    </C.Grid>
</C.GridArea>
```

3 - Usar o useEffect para executar a função `resetAndCreateGrid` quando o App carregar.
Dentro do `App.tsx` incluir o useEffect para rodar a função mencionada:

Importando o useEffect:
```javascript
import { useEffect } from 'react';
```

Usando o useEffect:
```javascript
useEffect(()=>{
    resetAndCreateGrid();
},[])
```

OBS: Também podemos fazer o useEffect em uma linda quando executamos apenas uma funcão:
```javascript
useEffect(() => resetAndCreateGrid(), [])
```

4 - Criar o states para armezenar informações do nosso jogo de memória.

Importar o state:
```javascript
import { useEffect, useState } from 'react';
```
Criar os states do jogo:
```javascript
const [playing, setPlaying] = useState<boolean>(false);
const [timeElapsed, setTimeElapsed] = useState<number>(0);
const [MoveCount, setMoveCount] = useState<number>(0);
const [shownCount, setShownCount] = useState<number>(0);
```

5 - Criar um type para cada item do grid:

Dentro da pasta `src` cria uma pasta chamada `types` e dentro dessa pasta criar um arquivo chamado `GridItemType.ts`

Dentro desse arquivo fazer o type abaixo:
```javascript
export type GridItemType = {
    item: number | null;
    shown:boolean;
    permanentShown: boolean;
}
```
No arquivo `App.tsx` acrescentar o state com o type acima:
```javascript
import { GridItemType } from './types/GridItemType';
```

```javascript
const [gridItems, setGridItems] = useState<GridItemType[]>([]);
```

6 - Criar um grid vazio

Importar os items:
```javascript
import { Items } from './data/items';
```

Dentro da função `resetAndCreateGrid` fazer a criação do grid vazio:
```javascript
const resetAndCreateGrid = () => {

    // passo 01 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 02 - criar o grid
    // passo 02.1 - criar um grid vazio
    let tmpGridItem: GridItemType[] = [];
    for(let i = 0; i < (Items.length * 2); i++) {
      tmpGridItem.push({
        item: null,
        shown: false,
        permanentShown:false
      })
    }

    // passo 2.2 - preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < Items.length ; i++) {
        let pos = -1;
        while(pos < 0 || tmpGridItem[pos].item !== null) {
          pos = Math.floor(Math.random() * (Items.length * 2));
          console.log(pos)
        }
        tmpGridItem[pos].item = i;
      }
    }

    // passo 2.3 - jogar no state
    setGridItems(tmpGridItem);

    // passo 03 - começar o jogo
    setPlaying(true);
  }
```

## 07 - Exibindo na tela

Primeiro vamos criar um compononente para exibir cada item.

Na pasta `components` criar outra pasta chamada `GridItem`. Dentro de GridItem criar dois arquivos:
* index.tsx
* styles.ts 

Dentro do arquivo `styles.ts` criar os estilos:
```javascript
import styled from "styled-components";

export const Container = styled.div``;

export const Icon = styled.img``;
```

Dentro do `index.tsx` fazer o componente:
```javascript
import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';
import { Items } from '../../data/items';

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
    return (
        <C.Container onClick={onClick}>
            {!item.permanentShown && !item.shown &&
                <C.Icon src={b7Svg} alt="" />
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={Items[item.item].icon} alt="" />
            }
        </C.Container>
    )
}
```

Inserir a função de clique no arquivo `App.tsx`:
```javascript
const handleClickItem = (index: number) => {

}
```

No `App.tsx` cria o `map()` para exibir os itens:
```javascript
<C.Grid>
    {gridItems.map((item, index) => (
    <GridItem
        key={index}
        item={item}
        onClick={() => handleClickItem(index)}
    />
    ))}
</C.Grid>
```

## 08 - Fazendo o timer funcionar

No arquivo `App.tsx` vamos criar um `useEffect` com um invervalo para o timer mmonitorando o `playing` e o `timeElapsed`.

```javascript
useEffect(() => {
    const timer = setInterval(()=>{
      if(playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [playing, timeElapsed])
```

Criar uma pasta chamada `helpers` dentro de `src`. Dentro dessa criar o arquivo `formatTimeElapsed.ts`.

Fazer o código de formatação do tempo:
```javascript
export const formatTimeElapsed = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60);

    let secString = `${seconds < 10 ? '0' + seconds : seconds}`;
    let minString = `${minutes < 10 ? '0' + minutes : minutes}`;

    return `${minString}:${secString}`;
}
```

No arquivo `App.tsx` importar o helper criado:

```javascript
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
```

No value indicação colocar a função com o timer
```javascript
<InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
```

## 09 - Fazendo o clique no grid
No `App.tsx` vamos fazer a função `handleClickItem`:
```javascript
const handleClickItem = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  }
```

## 10 - Verificando os movimentos

No `App.tsx` criar o useEffect para monitorar o `shownCount` e o `gridItem`:
```javascript
 useEffect(() => {
    if(shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {
        let tmpGrid = [...gridItems];
        if(opened[0].item === opened[1].item) {
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          } else {
              for(let i in tmpGrid) {
                  tmpGrid[i].shown = false;
              }
          } 
        }
        setGridItems(tmpGrid);
        setShownCount(0);
      }
    }
  },[shownCount, gridItems])
```


