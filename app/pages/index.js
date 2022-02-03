import { css } from "@emotion/react"
import Box from "../components/Box"
import Widget from "../components/Widget"
import { useAbuse } from "use-abuse"
import { useEffect } from "react"
import { Context } from "../Context"
import Head from "next/head"

function getLocalStorage(key) {
  const val = localStorage.getItem(key)
  if (!val) return null
  return JSON.parse(val)
}
export default function Home() {
  const [state, setState] = useAbuse({ widgets: [], widgetCount: 0, genres: [], artists: [], category: "home" })
  const { widgets, widgetCount, genres, artists, category } = state
  const localStorage = typeof window !== "undefined" ? window.localStorage : null

  function addWidget() {
    const newWidget = [...widgets, { id: widgetCount }]
    setState({ widgets: newWidget, widgetCount: widgetCount + 1 })
    localStorage.setItem("fa-widgets", JSON.stringify(newWidget))
  }
  function updateWidget(widgetId, updateObj) {
    const index = widgets.findIndex((obj => obj.id == widgetId))
    const copy = [...widgets]
    copy[index] = updateObj
    setState({ widgets: copy })
    localStorage.setItem("fa-widgets", JSON.stringify(copy))
  }
  function removeWidget(widgetId) {
    const newWidgets= [...widgets].filter(x => x.id !== widgetId) 
    setState({ widgets:newWidgets})
    localStorage.setItem("fa-widgets", JSON.stringify(newWidgets))
  }
  useEffect(() => {
    const initialWidgets = getLocalStorage("fa-widgets") ?? []
    setState({ widgets: initialWidgets, widgetCount: initialWidgets.length })
    fetch('https://fa-musicapi.herokuapp.com/api/artists').then(res => res.json()).then(res => {
      setState({ artists: res })
    })
    fetch('https://fa-musicapi.herokuapp.com/api/genres').then(res => res.json()).then(res => {
      setState({ genres: res })
    })
  }, [])
  return (
    <Context.Provider value={{ artists, genres, removeWidget, updateWidget }}>
      <Head>
         <title>Fa Music</title>
         <link rel="icon" href="/assets/img/logo.png"/>
      </Head>
      <div className="app" css={emotion()}>
        <div className="wrap">
          <header className="head">
            <h1 className="title">Fa</h1>
            <h2 className="sub-title">Worldwide Music News</h2>
          </header>
          <nav className="nav">
            <div className="line"></div>
            <div className="categories">
              <div className="category" onClick={() => { setState({ category: "home" }) }}>HOME</div>
              <div className="category" onClick={() => { setState({ category: "about" }) }}>ABOUT</div>
              <div className="category" onClick={() => { setState({ category: "contact" }) }}>CONTACT</div>
            </div>
            <div className="line"></div>
          </nav>
          {category === "home" && <main className="content">
            <Box onClick={addWidget} />
            {widgets.map(x => {
              return <Widget key={`widget-${x.id}`} id={x.id} bg={x.bg} songs={x.songs} pick={x.pick} />
            })}
          </main>}
          {category === "about" && <main className="content">
            <div className="about">
              <p>{`Fa is a global music API, which scrapes music data from various sources in the web domain.`}</p>
              <br/>
              <p>{`The need for such API was born due to the lack of freedom while trying to combine music from multiple sources into one merged dashboard.`}</p>
              <br/>
              <p>{`For example, let’s take spotify and apple music assuming their databases are not identical.`}</p>
              <br/>
              <p>{`If one wants to create a playlist which contains one song that only exists in apple music’s database, and one song that only exists in spotify’s database - he can not do it.`}</p>
              <br/>
              <p>{`Today, one can only create a playlist within his platform (apple music OR spotify).`}</p>
              <br/>
              <p>{`Fa attends to answer that challenge with it’s genius features and revolutionary API.`}</p>
              <br/>
              <p>{`In addition to the API itself, Fa provides it’s users a basic, minimal-designed user interface as well, so not only can developers enjoy the API, but end-users or naive users can also ejoy it for free.`}</p>
            </div>
          </main>}
          {category === "contact" && <main className="content">
            <div className="contact">
              <a className="circle" href={'https://www.linkedin.com/in/ido-dor/'} target={'_blank'} rel="noreferrer"><img src="/assets/img/ido.jpg" alt="ido" className="pfp"/><img className="l-overlay" src="/assets/img/linkedin.svg"/></a>
              <a className="circle" href={'https://www.linkedin.com/in/ohad-baehr/'} target={'_blank'} rel="noreferrer"><img src="/assets/img/ohad.jpg" alt="ohad" className="pfp"/><img className="l-overlay" src="/assets/img/linkedin.svg"/></a>
              <a className="circle" href={'https://www.linkedin.com/in/bader-daka/'} target={'_blank'} rel="noreferrer"><img src="/assets/img/bader.jpg" alt="bader" className="pfp"/><img className="l-overlay" src="/assets/img/linkedin.svg"/></a>
            </div>
          </main>}
        </div>
        <footer className="foot">
          <h1 className="title">Fa</h1>
          <h2 className="sub-title">Methods in Software Engineering</h2>
        </footer>
      </div>
    </Context.Provider>
  )
  function emotion() {
    return css`
      .app&{
        background: white;
        min-height:100vh;
        height:100%;
        width:100vw;
        text-align: center;
        font-family: "Oswald";
        .wrap{
           min-height: calc(100vh - 140px);
           display: flex;
           flex-direction: column;
          .head{
            .title{
              margin-top:50px;
              font-family: "HerrVon";
              font-weight: 200;
              font-size: 60px;
            }
            .sub-title{
              font-size:14px;
              font-family: "Quattrocento Sans";
              font-style: italic;
              font-weight: 400;
            }
          }
          .nav{
            margin-top:40px;
            .categories{
              display: flex;
              align-items: center;
              justify-content: center;
              padding:20px 0;
              gap:30px;
              .category{
                font-weight: 500;
                font-size: 15px;
                cursor: pointer;
              }
            }
            .line{
              background:rgb(151, 151, 151);
              width:50%;
              margin:auto;
              height:1px;
            }
          }
          .content{
            padding:30px 30px 80px 30px;
            height:100%;
            display: flex;
            justify-content: center;
            gap:40px;
            flex-wrap: wrap;
            .about{
              text-align: left;
              max-width: 640px;
              p{
                font-weight: 300;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              }
            }
            .contact{
              display: flex;
              gap:40px;
              flex-wrap: wrap;
              margin-top:60px;
              justify-content: center;
              .circle{
                display: flex;
                width:200px;
                background:radial-gradient(circle, rgba(124,128,135,1) 0%, rgba(114,116,125,1) 46%, rgba(31,37,41,1) 100%);
                height:200px;
                border-radius: 50%;
                transition: 0.4s;
                position: relative;
                &:hover{
                  transition: 0.4s;
                  transform: scale(1.1);
                }
                .l-overlay{
                  position: absolute;
                  width:64px;
                  bottom:0;
                  right:10px;
                }
                .pfp{
                  margin:auto;
                  border-radius: 50%;
                  width:180px;
                }
              }
            }
          }
        }
        
        .foot{
          background:#333333;
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .title{
            font-family: "HerrVon";
            font-weight: 200;
            font-size: 50px;
            color:#b9c4cc;
          }
          .sub-title{
            font-size:14px;
            font-family: "Quattrocento Sans";
            font-weight: 400;
            color:#b9c4cc;
          }
        }
      }
    `
  }
}
