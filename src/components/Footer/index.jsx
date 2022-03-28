import "./style.css";

export default function Footer({src, titulo, dia, hora}) {
        
    return dia === "" ?(
        <footer className="Footer">
            <div className="cartaz">
                <img src={src} alt={titulo}/>
            </div>
            <div className="infos">
                <h3>{titulo}</h3>
            </div>
            
        </footer>
    ):(
        <footer className="Footer">
            <div className="cartaz">
                <img src={src} alt={titulo}/>
            </div>
            <div className="infos">
                <h3>{titulo}</h3>
                <h3>{dia} - {hora}</h3>
            </div>
        </footer>
    )
}