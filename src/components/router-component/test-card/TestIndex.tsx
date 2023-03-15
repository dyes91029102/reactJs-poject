import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface TestIndexProps {}

const TestIndex: FC<TestIndexProps> = () => (
  <nav>
    <ul>
      <li>
        <Link to={`/one`}>測試1</Link>
      </li>
      <li>
        <Link to={`/two`}>測試2</Link>
      </li>
    </ul>
  </nav>
);

export default TestIndex;
