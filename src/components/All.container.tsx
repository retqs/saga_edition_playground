import './index.css';

import {Button, Divider} from 'rsuite';
import React, {useEffect, useState} from 'react';
import {
  requestOne,
  requestThree,
  requestTwo,
  startSocketConnection,
  stopSocketConnection,
} from '../store/actions/allActions';
import {useDispatch, useSelector} from 'react-redux';

const getColor = (indicator: boolean) => {
  switch (indicator) {
    case true:
      return '#CEFF00';

    case false:
      return '#D40000';

    default:
      return '#333';
  }
};

function All() {
  const dispatch = useDispatch();
  const [prevVal, setprevVal] = useState(0);
  // @ts-ignore
  const {currency} = useSelector((state) => state.statsReducer);

  // AHHAHA EBAT TI DAUN ALLE PIZDA KAK LEGKO EBAT TI TOGDA BILL DASHE LESS THAN TRAINEE ALLE DAUN
  useEffect(() => {
    return () => {
      setprevVal(currency.val);
    };
  }, [currency.val]);

  return (
    <div>
      <div className='exprtModal-container'>
        <div className='exprtModal-bg'></div>
        <div className='exprtModal'>
          <button className='exprtModal-closeBtn'>&times;</button>
          <form action=''></form>
        </div>
      </div>

      <Button onClick={() => dispatch(requestOne())}>one</Button>
      <Divider vertical></Divider>
      <Button onClick={() => dispatch(requestTwo())}>two</Button>
      <Divider vertical></Divider>
      <Button onClick={() => dispatch(requestThree())}>three</Button>
      <Divider vertical></Divider>
      <Button onClick={() => dispatch(startSocketConnection())}>start socket connection</Button>
      <Divider vertical></Divider>
      <Button onClick={() => dispatch(stopSocketConnection())}>stop connection</Button>
      <div
        style={{
          height: '50vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        <span
          style={{
            color: getColor(prevVal < currency.val),
            marginRight: '10px',
            transition: 'all .2s ease',
          }}
        >
          {currency.val}{' '}
        </span>{' '}
        {` ${currency.type}`}
      </div>
    </div>
  );
}

export default All;
