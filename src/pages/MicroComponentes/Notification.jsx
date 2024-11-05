import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import './css/notification.css'

function Notification() {
    return (
        <div className="modal notifications">
            <div>
                <span></span>
                <FontAwesomeIcon icon={solid.faClose} onClick={() => document.querySelector('.notifications').removeAttribute('open')} />
            </div>
        </div>
    )
}

export default Notification