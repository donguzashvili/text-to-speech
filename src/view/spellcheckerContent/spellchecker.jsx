import Button from "../../components/button/button";
import Select from "../../components/select/select";

import { ReactComponent as Arrow } from "../../assets/icons/VectorMenu.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

import classes from "./spellchecker.module.css";
import Editor from "../../components/editor/editor";
import { useState } from "react";
import TextCutter from "../../utils/sentenceSplitter";
import Modal from "../../components/modal/modal";

const ComponentHeader = ({ onSubmit, onDelete, onCopy }) => {
  return (
    <header>
      <Button text={"Check"} Icon={Arrow} onClick={onSubmit} />
      <div className={classes.restBtns}>
        <div className={classes.btn} onClick={onCopy}>
          <Copy />
          <p>Copy</p>
        </div>
        <div className={classes.btn} onClick={onDelete}>
          <Delete />
          <p>Delete</p>
        </div>
        <div className={classes.divider} />
        <Select />
      </div>
    </header>
  );
};

const SpellChecker = () => {
  const [textData, setTextData] = useState("");
  const [audios, setAudios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const submitText = async () => {
    const textClass = new TextCutter();
    if (!localStorage.getItem("AccessToken")) await textClass.authToServer();

    textClass.text = textData;

    let tempAudioArr = [];

    textClass.onresult = (result) => {
      if (result.AudioFilePath) tempAudioArr.push(result.AudioFilePath);
    };

    await textClass.start();

    setAudios(tempAudioArr);
    setOpenModal(true);
  };

  const copyText = () => {
    navigator.clipboard.writeText(textData);
  };

  return (
    <div className={classes.spellChecker}>
      <ComponentHeader onSubmit={submitText} onDelete={() => setTextData("")} onCopy={copyText} />
      <Editor textData={textData} setTextData={(text) => setTextData(text)} />
      <Modal audios={audios} open={openModal} closeModal={() => setOpenModal(false)} />
    </div>
  );
};

export default SpellChecker;
