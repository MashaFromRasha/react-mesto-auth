import StatusNoValid from '../image/StatusNoValid.svg'
import StatusValid from '../image/StatusValid.svg'

import '../styles/InfoToolTip.css'
function InfoToolTip({ isOpen, onClose, config }) {
  return (
    <>
      <div className={`popup popup-info ${isOpen ? 'popup__open' : ''}`}>
        <div className="popup__container info__container">
          <img className='info__image' alt={config.status ? "Успешная регистрация!" : "Что-то пошло не так!"} src={config.status ? StatusValid : StatusNoValid}></img>
          <h2 className="popup__title margin">{config.messageText}</h2>
          <button onClick={onClose} className="popup__botton-close"></button>
        </div>
      </div>
    </>
  )
}

export default InfoToolTip;