import { css } from "@emotion/react"
import { useEffect } from "react"
import { useAbuse } from "use-abuse"
import { useContext } from "react"
import { Context } from "../Context"
const colors = ["#c5eab6", "#b9b6ea", "#b6d1ea", "#c6b6ea", "#dfeab6", "#b6eadd", "#eacbb6"]
const backgrounds = [
    "/assets/img/random-backgrounds/arnold-schwarzenegger-stencil.svg",
    "/assets/img/random-backgrounds/jimi-hendrix-stencil.svg",
    "/assets/img/random-backgrounds/kanye-west-stencil.svg",
    "/assets/img/random-backgrounds/leonardo-dicaprio-stencil.svg",
    "/assets/img/random-backgrounds/monalisa-stencil.svg",
    "/assets/img/random-backgrounds/musician-vector-free.svg",
    "/assets/img/random-backgrounds/nelson-mandela-stencil.svg",
    "/assets/img/random-backgrounds/peter-pan-stencil.svg",
    "/assets/img/random-backgrounds/thanksgiving-owl-stencil.svg",
    "/assets/img/random-backgrounds/Woman_singer_icon.svg"
]
export default function Widget({ id, songs:initialSongs, bg:initialBG,pick:initialPick}) {
    const {artists, genres,removeWidget,updateWidget} = useContext(Context)
    const [state, setState] = useAbuse({ condition: initialSongs&&initialSongs.length?"done":"invite", bg:initialBG,mode:'artist', songs:initialSongs??[],pick:initialPick,widgetId:id})
    const { condition, bg,mode,songs,pick,widgetId} = state;
    useEffect(() => {
        if(!bg){
            const rndBg=backgrounds[Math.floor(Math.random() * backgrounds.length)]
            setState({ bg: rndBg})
            updateWidget(widgetId,{id:widgetId,bg:rndBg,songs,pick})
        }
    }, [])
    return (
        <div className="widget" css={emotion()}>
            {condition === "invite" &&
                <div className="widget-content bg-img">
                    <h1>New Widget</h1>
                    <h3 className="sub-title">Customize your widget now!</h3>
                    <div className="toolbox">
                        <img className="icon" src="/assets/img/delete-button1.svg" alt="delete" onClick={()=>removeWidget(widgetId)}/>
                        <img className="icon" src="/assets/img/edit-button.svg" alt="edit" onClick={()=>setState({condition:"customize"})}/>
                    </div>
                </div>
            }
            {condition === "customize" &&
                <div className="widget-content">
                    <h1>New Widget</h1>
                    <h3 className="sub-title">Top 3 albums</h3>
                    <div className="selectors-container">
                        <div className="selector">
                            <label htmlFor="category">By:</label>
                            <select name="category"  onChange={(e)=> setState({mode:e.target.value})}>
                                <option value="artist">Artist</option>
                                <option value="genre">Genre</option>
                            </select>
                        </div>
                        {mode==="genre" && 
                        <div className="selector">
                            <label htmlFor="genre">Pick Genre:</label>
                            <select name="genre" onChange={(e)=> {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    setState({pick:el.innerHTML})
                                    const genreId =  el.getAttribute('id'); 
                                    fetch(`https://fa-musicapi.herokuapp.com/api/songs/genre/${genreId}`).then(res=>res.json()).then(res=>{
                                        const topAlbums=res.slice(0,3)
                                        updateWidget(widgetId,{id:widgetId,bg,songs:topAlbums,pick:el.innerHTML})
                                        setState({songs:topAlbums})
                                    })
                                  
                                }
                            }>
                                
                                <option value="none">Choice</option>
                                {genres.map(x=>{
                                    if(!x) return
                                    return <option key={x.genre_id} id={x.genre_id} value={x.genre_name.toLowerCase()}>{x.genre_name}</option>
                                }).filter(x=>x)}
                            </select>
                        </div>}
                        {mode==="artist" && 
                        <div className="selector">
                            <label htmlFor="artist">Pick Artist:</label>
                            <select name="artist" onChange={(e)=> {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    setState({pick:el.innerHTML})
                                    const artistId =  el.getAttribute('id'); 
                                    fetch(`https://fa-musicapi.herokuapp.com/api/songs/artist/${artistId}`).then(res=>res.json()).then(res=>{
                                        const topAlbums=res.slice(0,3)
                                        updateWidget(widgetId,{id:widgetId,bg,songs:topAlbums,pick:el.innerHTML})
                                        setState({songs:topAlbums})
                                    })
                                    updateWidget(widgetId,{id:widgetId,bg,songs,pick})
                                } 
                            }>
                                <option value="none">Choice</option>
                                {artists.map(x=>{
                                    if(!x) return
                                    return <option  key={x.artist_id} id={x.artist_id} value={x.artist_name.toLowerCase()}>{x.artist_name}</option>
                                }).filter(x=>x)}
                            </select>
                        </div>}
                    </div>

                    <div className="toolbox centered">
                        <img className={`icon ${songs.length?'':'disabled'}`} src="/assets/img/done-button.svg" alt="done" onClick={()=>{
                            if(!songs.length) return
                            setState({condition:"done"})
                        }} />
                    </div>
                </div>
            }
            {condition === "done" &&
                <div className="widget-content bg-img">
                        <h1>{pick}</h1>
                     <div className="top-songs">
                        {songs.map(x=>{
                            return(
                                <a href={x.link} key={`song-${x.song_id}`} target={"_blank"} rel="noreferrer"><h2>{x.song_name}</h2></a>
                            )
                        })}
                    </div>
                    <div className="toolbox">
                        <img className="icon" src="/assets/img/delete-button1.svg" alt="delete" onClick={()=>removeWidget(widgetId)}/>
                        <img className="icon" src="/assets/img/edit-button.svg" alt="edit" onClick={()=>setState({condition:"customize"})}/>
                    </div>
                </div>
            }
        </div>
    )
    function emotion() {
        return css`
            .widget&{
                display: flex;
                flex-direction: column;
                width:270px;
                height:270px;
                background:${colors[id % colors.length]};
                padding:20px;
                border-radius:6px;
                box-shadow: rgb(88, 88, 88) 1px 1px 12px 0px;
                position: relative;
                transition: 0.4;
                &:hover{
                    transition: 0.4;
                    transform: scale(1.05);
                }
                .bg-img:before {
                    content: ' ';
                    display: block;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    background-size: 255px;
                    background-image: url(${bg});
                    background-repeat: no-repeat;
                    pointer-events: none;
                    background-position: center;
                }
               
                .widget-content{
                    display: flex;
                    flex-direction: column;
                    height:100%;
                    width:100%;
                    h1{
                        margin-top:5px;
                        font-size:20px;
                        font-weight: 500;
                    }
                    h3{
                        color:#888888;
                        font-weight: 400;
                        font-size: 15px;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
                    .toolbox{
                        display: flex;
                        margin-top: auto;
                        height:20px;
                        justify-content: space-between;
                        padding:0 40px;
                        &.centered{
                            justify-content: center;
                        }
                        .icon{
                            cursor: pointer;
                            height:24px;
                            &.disabled{
                                opacity:0.2;
                            }
                        }
                    }
                    .top-songs{
                         padding-top:20px;
                        padding-top:20px;
                        display: flex;
                        flex-direction: column;
                        gap:24px;
                        h2{

                        }
                    }
                    .selectors-container{
                        display: flex;
                        flex-direction: column;
                        padding:20px;
                        gap:24px;
                        justify-content: space-between;
                        .selector{
                            display: flex;

                            label{
                                color:#888888;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            }
                            select:not([multiple]) {
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                background-position: right 50%;
                                background-repeat: no-repeat;
                                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZFNDEwNjlGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZFNDEwNkFGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkU0MTA2N0Y3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkU0MTA2OEY3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuGsgwQAAAA5SURBVHjaYvz//z8DOYCJgUxAf42MQIzTk0D/M+KzkRGPoQSdykiKJrBGpOhgJFYTWNEIiEeAAAMAzNENEOH+do8AAAAASUVORK5CYII=);
                             
                            }
                            select{
                                width:90px;
                                font-size: 15px;
                                color:#888888;
                                height:30px;
                                padding:2px  20px 2px 6px;
                                border-radius: 6px;
                                background:white;
                                margin-left:auto;
                                border:2px solid rgb(124, 124, 124)
                            }
                        }
                    }
                    .sub-title{
                        margin-top:15px;
                    }
                }
            }
        `
    }
}