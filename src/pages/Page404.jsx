import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main>
      <div className="container-404">
        <div className="text-404">
          <span>Errore 404</span>
          <h1>OPS! Ti sei perso...</h1>
          <p>
            Sensazione spiacevole perdersi da soli e non sapere dove andare, ti diamo un'aiuto noi. Ma tua fai
            altrettanto...
          </p>
          <Link to={"/ads"}>
            <button className="log-btn">Vai agli annunci</button>
          </Link>
        </div>
        <div className="img-404">
          <img src={`${process.env.PUBLIC_URL}/lonely_pet.png`} alt="lonely" />
        </div>{" "}
      </div>
    </main>
  );
};
export default Page404;
