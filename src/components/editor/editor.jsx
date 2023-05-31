import classes from "./editor.module.css";

import { ReactComponent as BoldIcon } from "../../assets/icons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/italic.svg";
import { ReactComponent as UnderlineIcon } from "../../assets/icons/underline.svg";
import { ReactComponent as ListIcon } from "../../assets/icons/list.svg";
import { ReactComponent as OrderedListIcon } from "../../assets/icons/orderedList.svg";
import { ReactComponent as Header1Icon } from "../../assets/icons/h1.svg";
import { ReactComponent as Header2Icon } from "../../assets/icons/h2.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";
import { ReactComponent as FormatClearIcon } from "../../assets/icons/formatClear.svg";
import { ReactComponent as Owl } from "../../assets/icons/owl.svg";
import counter from "../../utils/counter";

import { Tooltip } from "react-tooltip";

const TooltipText = ({ Icon, text, id, keys }) => {
  return (
    <>
      <Tooltip anchorSelect={`#${id}`} place="bottom">
        <p>{text}</p>
        <span>{keys}</span>
      </Tooltip>
      <Icon id={id} />
    </>
  );
};

const Editor = ({ textData, setTextData }) => {
  const { wordCount, characterCount } = counter(textData);

  return (
    <div className={classes.editorWrapper}>
      <div className={classes.editorField}>
        <textarea value={textData} onChange={(e) => setTextData(e.target.value)} placeholder="Type or paste (⌘+V) something here."></textarea>
      </div>
      <div className={classes.toolsWrapper}>
        <div className={classes.tools}>
          <TooltipText Icon={BoldIcon} text="Bold" keys="Ctrl+B" id="boldIcn" />
          <TooltipText Icon={ItalicIcon} text="Italic" keys="Ctrl+I" id="italicIcn" />
          <TooltipText Icon={UnderlineIcon} text="Underline" keys="Ctrl+U" id="underlineIcn" />
          <div className={classes.divider} />
          <TooltipText Icon={ListIcon} text="List" keys="Ctrl+L" id="listIcn" />
          <TooltipText Icon={OrderedListIcon} text="Ordered List" keys="Ctrl+O" id="olIcn" />
          <div className={classes.divider} />
          <TooltipText Icon={Header1Icon} text="Big Header" keys="Ctrl+NUM1" id="h1Icn" />
          <TooltipText Icon={Header2Icon} text="Small Header" keys="Ctrl+NUM2" id="h2Icn" />
          <div className={classes.divider} />
          <TooltipText Icon={LinkIcon} text="Link" key="Ctrl+Q" id="linkIcn" />
          <div className={classes.divider} />
          <TooltipText Icon={FormatClearIcon} text="Format clear" key="Ctrl+F" id="formatIcn" />
        </div>
        <div className={classes.wordCounter}>
          <p>
            {characterCount} characters, {wordCount} words
          </p>
        </div>
        <Owl />
      </div>
    </div>
  );
};

export default Editor;
