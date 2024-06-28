const Mission = () => {
  return (
    <main>
      <div className="mission-container">
        <div className="mission-text-block">
          <h3>
            La Nostra Missione?<br></br>Dare una voce agli animali randagi e abbandonati.
          </h3>
          <div className="mission-text-img">
            <p>
              Benvenuti nella nostra piattaforma, dove ogni click può significare una nuova vita per un animale
              randagio. La nostra missione è semplice ma potente: creare un ponte tra gli animali ritrovati e le
              famiglie amorevoli che possono offrirgli una casa sicura e affettuosa.
            </p>
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/paw_bridge.png`} alt="paw bridge" />
            </div>
          </div>
        </div>

        <div className="mission-text-block-trasp">
          <h3>Perché esistiamo?</h3>
          <div className="mission-text-img">
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/sad_cat.png`} alt="paw bridge" />
            </div>
            <p>
              Ogni giorno, migliaia di animali randagi vagano per le strade, esposti a pericoli e privazioni. Spesso,
              questi animali finiscono in canili sovraffollati, dove le risorse scarseggiano e le possibilità di
              adozione sono limitate. La nostra piattaforma nasce dall'esigenza di cambiare questo triste destino,
              offrendo un'alternativa che possa realmente fare la differenza.
            </p>
          </div>
        </div>

        <div className="mission-text-block">
          <h3>La nostra visione</h3>
          <div className="mission-text-img">
            <p>
              {" "}
              Immaginiamo un mondo in cui nessun animale debba soffrire l'abbandono o la solitudine. Un mondo in cui
              ogni cane, gatto o altro animale abbia la possibilità di trovare una famiglia che lo accolga con amore e
              cura. Vogliamo trasformare il modo in cui le persone interagiscono con gli animali randagi,
              sensibilizzando l'opinione pubblica e promuovendo l'adozione responsabile.{" "}
            </p>
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/woman_cat.png`} alt="paw bridge" />
            </div>
          </div>
        </div>

        <div className="mission-text-block-trasp">
          <h3>Come funziona?</h3>
          <div className="mission-text-img">
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/find_pet.png`} alt="paw bridge" />
            </div>
            <p>
              La nostra piattaforma permette agli utenti di segnalare animali randagi ritrovati, creando annunci
              dettagliati con informazioni utili e fotografie. Grazie alla geolocalizzazione, gli annunci sono
              visualizzabili su una mappa interattiva, facilitando l'incontro tra gli animali in cerca di casa e le
              persone disposte ad accoglierli. Ogni annuncio è un'opportunità per un nuovo inizio, un passo verso una
              vita migliore per questi animali.
            </p>
          </div>
        </div>

        <div className="mission-text-block">
          <h3>Il nostro impegno</h3>
          <div className="mission-text-img">
            <p>
              Siamo fermamente convinti che ogni animale meriti una seconda possibilità. Per questo, ci impegniamo a
              collaborare con canili, rifugi e associazioni locali per garantire che gli animali segnalati ricevano le
              cure necessarie e siano pronti per l'adozione. Organizziamo campagne di sensibilizzazione e eventi
              comunitari per promuovere l'adozione e l'importanza del benessere animale.
            </p>
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/pet_community.png`} alt="paw bridge" />
            </div>
          </div>
        </div>

        <div className="mission-text-block-trasp">
          <h3>Perché il tuo supporto è importante?</h3>
          <div className="mission-text-img">
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/pet_cross_paws.png`} alt="paw bridge" />
            </div>
            <p>
              La nostra missione non può essere realizzata senza il sostegno della comunità. Diventa un{" "}
              <strong>Pet's Super Hero!</strong> Ogni adozione, ogni segnalazione e ogni condivisione di un annuncio
              contribuisce a salvare una vita. Invitiamo tutti a unirsi a noi in questa nobile causa, che non solo
              migliora la vita degli animali, ma arricchisce anche le vite delle persone che scelgono di adottare.
            </p>
          </div>
        </div>

        <div className="mission-text-block">
          <h3>Unisciti a noi</h3>
          <div className="mission-text-img">
            <p>
              Ti invitiamo a esplorare la nostra piattaforma, a segnalare animali randagi, a condividere gli annunci e,
              se possibile, ad aprire le porte del tuo cuore e della tua casa a un nuovo amico a quattro zampe. Insieme,
              possiamo fare la differenza e costruire un futuro migliore per tutti gli animali randagi. Grazie per
              essere parte della nostra missione e per il tuo impegno nel dare una voce a chi non può parlare. Insieme,
              possiamo creare un mondo dove ogni animale è amato e rispettato.
            </p>
            <div className="mission-img">
              <img src={`${process.env.PUBLIC_URL}/pet_solidarity.png`} alt="paw bridge" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Mission;
