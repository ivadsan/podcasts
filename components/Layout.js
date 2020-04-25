import Link from "next/link";

export default class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <header>
          <Link href="/">
            <a>Podcasts</a>
          </Link>
        </header>
        { children }
        <style jsx>
          {`
            header {
              color: #fff;
              background: #8756ca;
              padding: 15px;
              text-align: center;
            }
            header a {
              color: white;
            }
          `}
        </style>
        <style jsx global>
          {`
            body {
              background: white;
              font-family: system-ui;
              margin: 0;
            }
          `}
        </style>
      </div>
    );
  }
}
