import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
        <Head>
          <title>React Meetups</title>
          <meta 
            name="description" 
            content="Browse a huge list of highly active React meetups!" 
          />
        </Head>
        <h1>Homepage</h1>
        <MeetupList meetups={props.meetups}></MeetupList>
    </> 
  )
}

// export async function getServerSideProps() {
//   // fetch data from an API. This will run for every new request on the server after deployment
//   return {
//     props: {
//       meetups: meetups
//     }
//   }
// }

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://maurice:QSM8GOuq0JNawvXR@cluster1.bk5yuje.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
      }))
    },
    revalidate: 1
  };
}

export default HomePage;
