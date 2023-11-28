import React, { FC } from 'react';


interface CarbonProps { }

const Carbon: FC<CarbonProps> = () => {
  console.log('carbon')
  return (
    <div>
      Carbon Component
    </div>
  );
}

export default Carbon;
