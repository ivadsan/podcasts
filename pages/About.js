export default class About extends React.Component {
  render() {
    return (
      <>
        <div className='container'>
          <div>
            <img src='/static/platzi-logo.png' alt='Platzi Logo' />
          </div>
          <h3>Curso de NextJS</h3>
          <h3>Creado por @cosmosoftroot</h3>
        </div>
          <style jsx>{`
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              flex-direction: column;
            }
            h3{
                color: white;
            }
            img {
              width: 170px;
            }
          `}</style>

          <style jsx global>
            {`
              body {
                background: #273d4a;
                font-family: sans-serif;
                
              }
            `}
          </style>
      </>
    );
  }
}
