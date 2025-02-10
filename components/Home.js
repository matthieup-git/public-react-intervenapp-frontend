import styles from '../styles/Home.module.css';
import Card from './Card';
import Header from './Header';

function Home() {
  return (
    <div className='container'>
      <Header />
      <Card />
      <Card />

    </div>
  );
}

export default Home;
