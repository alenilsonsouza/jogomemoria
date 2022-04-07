import * as C from './App.styles';

import LogoImage from './assets/devmemory_logo.png';
import RestartImage from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemType';
import { Items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = () => {

  // Se tá jogando ou não
  const [playing, setPlaying] = useState<boolean>(false);

  // Tempo corrigo em segundos
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Quantos movimentos foi executados no jogo
  const [moveCount, setMoveCount] = useState<number>(0);

  // Contagem  de cartas mostradas
  const [shownCount, setShownCount] = useState<number>(0);

  // Armazena os itens do grid
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown === true) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [shownCount, gridItems])

  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  },[moveCount, gridItems])

  const resetAndCreateGrid = () => {

    // passo 01 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 02 - criar o grid
    // passo 02.1 - criar um grid vazio
    let tmpGridItem: GridItemType[] = [];
    for (let i = 0; i < (Items.length * 2); i++) {
      tmpGridItem.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    // passo 2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < Items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGridItem[pos].item !== null) {
          pos = Math.floor(Math.random() * Items.length * 2);
        }
        tmpGridItem[pos].item = i;
      }
    }

    // passo 2.3 - jogar no state
    setGridItems(tmpGridItem);

    // passo 03 - começar o jogo
    setPlaying(true);
  }

  const handleClickItem = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={LogoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button label="Reiniciar" icon={RestartImage} onClick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleClickItem(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;