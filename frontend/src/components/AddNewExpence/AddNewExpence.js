import "./AddNewExpence.css";
import ReactDom from "react-dom";
import AddNewExpenceForm from "./AddNewExpenceForm";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import AddNewCryptoForm from "../Crypto/AddNewCryptoForm";
import { useContext } from "react";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function Modal({
  open,
  onClose,
  addNewExpence,
  crypto,
  setCrypto,
}) {
  const { editedExpense } = useContext(ExpensesContext);
  return ReactDom.createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modalBg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          ></motion.div>
          <motion.div
            key="newExpenceModal"
            className="modal-container"
            initial={{ scale: 0, transform: "translate(-50%, -200%)" }}
            animate={{
              scale: 1,
              transform: "translate(-50%, -50%)",
              transition: { duration: 0.3 },
            }}
            exit={{
              scale: 0,
              transform: "translate(-50%, 200%)",
              transition: { duration: 0.3 },
            }}
          >
            {/* MODAL FOR NEW TRANSACION */}
            {addNewExpence && (
              <>
                <h2>{editedExpense ? "Edit expense" : "Add new expense"}</h2>
                <AddNewExpenceForm onClose={onClose} />
              </>
            )}
            {/* MODAL FOR NEW CRYPTO */}
            {crypto && (
              <>
                <h2>Add new crypto transaction</h2>
                <AddNewCryptoForm
                  onClose={onClose}
                  crypto={crypto}
                  setCrypto={setCrypto}
                />
              </>
            )}

            <button onClick={onClose} className="cancel-btn">
              <CloseIcon />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
}
