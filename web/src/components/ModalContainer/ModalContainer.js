import { X } from 'react-feather'

const ModalContainer = ({ title, onClose, children }) => {
  return (
    <div className="modal-outer-container bg-white border-black border-solid border fixed w-64">
      <button className="absolute modal-close-button" onClick={onClose}>
        <X size={32} color="#fff" />
      </button>
      <h2 className="flex justify-center font-black text-2xl mx-auto mb-0 mt-8">
        {title}
      </h2>
      <div className="text-lg p-6 text-center">{children}</div>
    </div>
  )
}

export default ModalContainer
