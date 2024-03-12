import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Home() {
  const history = useHistory();
  useEffect(() => {
    history.push('/signin');
  }, []);
  return (
    <div></div>
  )
}

export default Home