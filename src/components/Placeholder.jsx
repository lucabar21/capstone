const Placeholder = () => {
  return (
    <div className="card-placeholder">
      <img src={`${process.env.PUBLIC_URL}/placeholder_img.png`} alt="" />
      <div className="placeholder-text">
        <h5>Questo non è un annuncio di animali in difficoltà!</h5>
        <p>
          Ci auguriamo che questo significhi che sempre più animali stanno trovando case sicure e amorevoli. <br />
          <strong> Continuiamo così!</strong>
        </p>
      </div>
    </div>
  );
};
export default Placeholder;
