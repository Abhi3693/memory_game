import React, { useEffect, useReducer } from 'react';
import {
  AiFillHome,
  AiFillStar,
  AiFillCar,
  AiFillHeart,
  AiFillPhone,
} from 'react-icons/ai';
import { BsFillMoonFill } from 'react-icons/bs';
import { RiEarthFill } from 'react-icons/ri';
import { FaPlane } from 'react-icons/fa';
import Confetti from 'react-confetti';

let data = [
  { name: 'home', img: <AiFillHome />, isOpen: false, isUsed: false },
  { name: 'star', img: <AiFillStar />, isOpen: false, isUsed: false },
  { name: 'car', img: <AiFillCar />, isOpen: false, isUsed: false },
  { name: 'heart', img: <AiFillHeart />, isOpen: false, isUsed: false },
  { name: 'phone', img: <AiFillPhone />, isOpen: false, isUsed: false },
  { name: 'moon', img: <BsFillMoonFill />, isOpen: false, isUsed: false },
  { name: 'earth', img: <RiEarthFill />, isOpen: false, isUsed: false },
  { name: 'plane', img: <FaPlane />, isOpen: false, isUsed: false },
  { name: 'home', img: <AiFillHome />, isOpen: false, isUsed: false },
  { name: 'star', img: <AiFillStar />, isOpen: false, isUsed: false },
  { name: 'car', img: <AiFillCar />, isOpen: false, isUsed: false },
  { name: 'heart', img: <AiFillHeart />, isOpen: false, isUsed: false },
  { name: 'phone', img: <AiFillPhone />, isOpen: false, isUsed: false },
  { name: 'moon', img: <BsFillMoonFill />, isOpen: false, isUsed: false },
  { name: 'earth', img: <RiEarthFill />, isOpen: false, isUsed: false },
  { name: 'plane', img: <FaPlane />, isOpen: false, isUsed: false },
];

let initialState = {
  allIcons: [...data].sort(() => 0.5 - Math.random()),
  valueFirst: '',
  valueSecond: '',
  rightStep: 0,
  stepCount: 0,
  timeId: null,
  timeCount: 0,
  isWin: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'click':
      state.allIcons[action.id].isOpen = true;
      state.allIcons[action.id].isUsed = true;
      break;
    case 'shuffle':
      state.allIcons = state.allIcons = [...state.allIcons].map((elm, i) => {
        elm.isOpen = false;
        elm.isUsed = false;
        return elm;
      });
      state = {
        ...initialState,
        allIcons: [...data].sort(() => 0.5 - Math.random()),
      };
      break;
    case 'notMatched':
      state.allIcons = [...state.allIcons].map((elm, i) => {
        elm.isOpen = false;
        elm.isUsed = false;
        return elm;
      });
      state.valueFirst = '';
      state.valueSecond = '';
      state.rightStep = 0;
      break;
    case 'matched':
      state.valueFirst = '';
      state.valueSecond = '';
      state.rightStep = state.rightStep + 1;
      break;
    case 'stepCount':
      state.stepCount = state.stepCount + 1;
      break;
    case 'valueFirst':
      state.valueFirst = action.payload;
      break;
    case 'valueSecond':
      state.valueSecond = action.payload;
      break;
    case 'inc':
      state.timeCount = state.timeCount + 1;
      break;
    case 'win':
      state.isWin = true;
      break;
    case 'timeid':
      state.timeId = action.payload;
      break;
    default:
      break;
  }
  return { ...state };
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let { valueFirst, valueSecond } = state;
    if (valueFirst && valueSecond && valueSecond !== valueFirst) {
      setTimeout(() => {
        dispatch({ type: 'notMatched' });
      }, 300);
    }
    if (valueFirst && valueSecond && valueSecond === valueFirst) {
      dispatch({ type: 'matched' });
    }
    if (state.rightStep === 8) {
      dispatch({ type: 'win' });
      clearInterval(state.timeId);
    }
  }, [state.valueFirst, state.valueSecond]);

  const shuffle = () => {
    clearInterval(state.timeId);
    dispatch({ type: 'shuffle' });
  };

  const handleClick = (index, name) => {
    if (state.stepCount === 0) {
      let timeID = setInterval(() => {
        dispatch({ type: 'inc' });
      }, 1000);
      dispatch({ type: 'timeid', payload: timeID });
    }

    dispatch({ type: 'stepCount' });

    if (!state.allIcons[index].isUsed) {
      if (!state.valueFirst) {
        dispatch({ type: 'valueFirst', payload: name });
      } else {
        dispatch({ type: 'valueSecond', payload: name });
      }
    }
    dispatch({ type: 'click', id: index });
  };

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Memory Game</h1>
        {state.isWin ? (
          <h2 className='won'>
            Congratulations You Won 💐 in {state.timeCount} sec
          </h2>
        ) : (
          <div>
            <h2>Steps Count: {state.stepCount}</h2>
            <h2>Time Count: {state.timeCount} sec</h2>
          </div>
        )}
        <button onClick={shuffle} className='btn'>
          Reset
        </button>
        <div className='card-holder'>
          {state.allIcons.map((elm, i) => {
            return (
              <div
                onClick={() => handleClick(i, elm.name)}
                key={i}
                className='card'
              >
                {elm.isOpen ? elm.img : ''}
              </div>
            );
          })}
        </div>
        {!state.isWin ? '' : <Confetti width={'1500%'} height={'900vh'} />}
      </div>
    </>
  );
}

export default App;
