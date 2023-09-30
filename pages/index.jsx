import Head from 'next/head';
import GiftCard from '../components/GiftCard';

const Home=({cards}) =>{
  return (
    <div>
      <Head>
        <title>YOYO EGift cards</title>
        <meta name="description" content="YOYO EGift cards home page" />
      </Head>
      <div>
        <GiftCard cards={cards}/>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const result = await fetch('http://localhost:3000/api/ecards');
  const cards=await result.json();

  return {
    props: {
      cards:cards.cards
    },
  };
}

export default Home;