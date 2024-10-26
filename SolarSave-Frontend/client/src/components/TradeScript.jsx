import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import "../style/TradeScript.css";

const TradeScript = ({ close }) => {
  const { currentAccount, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 w-full my-5 eth-card white-glassmorphism">
          <div className="flex justify-between items-start w-full">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
            <BsInfoCircle fontSize={17} color="#fff" />
          </div>
          <div>
            <p className="text-white font-light text-sm">
              {shortenAddress(currentAccount)}
            </p>
            <p className="text-white font-semibold text-lg mt-1">
              Ethereum
            </p>
          </div>
        </div>

        <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <input
            placeholder="Address To"
            type="text"
            name="addressTo"
            onChange={(e) => handleChange(e, "addressTo")}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />
          <input
            placeholder="Amount (ETH)"
            type="number"
            name="amount"
            onChange={(e) => handleChange(e, "amount")}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />
          <input
            placeholder="Keyword (Gif)"
            type="text"
            name="keyword"
            onChange={(e) => handleChange(e, "keyword")}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />
          <input
            placeholder="Enter Message"
            type="text"
            name="message"
            onChange={(e) => handleChange(e, "message")}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />

          <div className="h-[1px] w-full bg-gray-400 my-2" />

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Send now
            </button>
          )}
        </div>

        <button onClick={close} className="close-modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default TradeScript;
