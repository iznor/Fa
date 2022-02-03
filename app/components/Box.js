import { css } from "@emotion/react"
export default function Box({onClick}){
    return (
        <div className="box" css={emotion()} onClick={onClick}>
            <div className="plus"></div>
        </div>
    )
    function emotion(){
        return css`
            .box&{
                display: flex;
                width:270px;
                height:270px;
                border-radius:6px;
                box-shadow: rgb(88, 88, 88) 1px 1px 12px 0px;
                cursor: pointer;
                transition: 0.4;
                &:hover{
                    transition: 0.4;
                    transform: scale(1.05);
                }
                .plus{
                    margin:auto;
                    width:220px;
                    height:220px;
                    background-size: 220px;
                    background-image: url('/assets/img/plus-button.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
        `
    }
}