const ConfirmationModal = ({ onConfirm, onCancel, text }) => {
  return (
    <div className="confirm-modal">
      <div>
        <p>Sicuro di voler eliminare definitivamente questo {text}?</p>
        <div>
          <button className="delete-btn" onClick={onConfirm}>
            Conferma
          </button>
          <button className="log-btn" onClick={onCancel}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
