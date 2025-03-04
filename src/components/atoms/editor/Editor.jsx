import "quill/dist/quill.snow.css";

import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import { Hint } from "../hint/Hint";
import { ImageIcon, XIcon } from "lucide-react";

export const Editor = ({
  variant = "create",
  onSubmit,
  onCancel,
  placeholder,
  disabled,
  defaultValue,
}) => {
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef(); //required to initialize the editor
  const submitRef = useRef();
  const disableRef = useRef();
  const defaultValueRef = useRef();
  const quillRef = useRef();
  const placeholderRef = useRef();
  const imageInputRef = useRef();

  const [image, setImage] = useState(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);

    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden"); //toggle the hidden class on toolbar element
    }
  }

  useEffect(() => {
    if (!containerRef.current) return; //if containerRef is not initialized, return

    const container = containerRef.current; // get the container element (in this case it's 'div')

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    ); // create a new div element and append it to the container

    const options = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                send();
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n"); //insert a new line
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options); //This creates a new Quill editor instance inside editorContainer

    quillRef.current = quill; //store a reference to the Quill instance. By storing the instance, you can access or manipulate the editor later (e.g., to get its content or reset it).
    quillRef.current.focus(); //It places the cursor in the editor automatically when it loads, making it ready for the user to type.

    quill.setContents(defaultValueRef.current); //This initializes the editor with some pre-existing content if needed.
  }, []);

  const send = function () {
    const messageContent = JSON.stringify(quillRef.current?.getContents());
    onSubmit({ body: messageContent, image });
    quillRef.current?.setText("");
    setImage(null);
    imageInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white focus-within:transition">
        <div className="h-full ql-custom" ref={containerRef} />

        {image && (
          <div className="p-2">
            <div className="relative size-[60px] flex items-center justify-center group/image">
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                onClick={() => {
                  setImage(null);
                  imageInputRef.current.value = ""; //unselect the image
                }}
              >
                <XIcon className="size-4" />
              </button>
              <img
                src={URL.createObjectURL(image)}
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Show toolbar" : "Hide toolbar"}
            side="bottom"
            align="center"
          >
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="image" side="bottom" align="center">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Hint label={"Send Message"} side="bottom" align="center">
            <Button
              size="iconSm"
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={send}
              disabled={false}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>

      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
