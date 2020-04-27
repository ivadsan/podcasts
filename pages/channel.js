import 'isomorphic-fetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastListWithClick from '../components/PodcastListWithClick';
import PodcastPlayer from '../components/PodcastPlayer';
import Error from './_error';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPodcast: null };
  }

  openPodcast = (event, podcast) => {
    event.preventDefault();
    this.setState({ openPodcast: podcast });
  };

  closePodcast = (event) => {
    event.preventDefault();
    this.setState({ openPodcast: null });
  };

  static async getInitialProps({ query, res }) {
    const idChannel = query.id;
    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      ]);

      if (reqChannel.status >= 400) {
        res.statuCode = reqChannel.status;
        return {
          channel: null,
          audioClips: null,
          series: null,
          statusCode: reqChannel.status,
        };
      }

      const dataChannel = await reqChannel.json();
      const channel = dataChannel.body.channel;
      const dataSeries = await reqSeries.json();
      const series = dataSeries.body.channels;
      const dataAudios = await reqAudios.json();
      const audioClips = dataAudios.body.audio_clips;
      return { channel, audioClips, series, statusCode: 200 };
    } catch (e) {
      res.statuCode = 503;
      return { channel: null, audioClips: null, series: null, statusCode: 503 };
    }
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props;
    const { openPodcast } = this.state;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout title={channel.title}>
        <div
          className='banner'
          style={{
            backgroundImage: `url(${channel.urls.banner_image.original})`,
          }}
        />

        {openPodcast && (
          <PodcastPlayer clip={openPodcast} onClose={this.closePodcast} />
        )}

        <h1>{channel.title}</h1>

        {series.length > 0 && <ChannelGrid channels={series} />}

        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick
          podcasts={audioClips}
          onClickPodcast={this.openPodcast}
        />

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>        
      </Layout>
    );
  }
}
