import React, { FC } from 'react';


interface MyComponentProps { }

const ChildComponent: FC = (props) => {
  return(
    <div>
      hello Child
    </div>
  );
}


const ParentComponent: FC = (props) => {
  return(
    <div>
      <ChildComponent/>
    </div>
  );
}

const MyComponent: FC<MyComponentProps> = () => {


  return (
    <div>
      <ParentComponent/>
    </div>
  );
}

export default MyComponent;
