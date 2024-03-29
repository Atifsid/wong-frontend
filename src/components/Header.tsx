"use client";
import { useEffect, useState } from "react";
import { ShareIcon } from "./ShareIcon";
import { useDocContext } from "@/core/context/docContext";
import DocumentService from "@/api/services/documentService/DocumentService";
import { Document } from "@/core/dtos/api-modal/Document";
import Modal from "./Modal";

const Header = ({ isEdit, initialTitle }: { isEdit: boolean; initialTitle?: string }) => {
    const { doc } = useDocContext();
    const [title, setTitle] = useState<string>();
    const [id, setId] = useState<string | undefined>();

    const docService = new DocumentService();

    useEffect(() => {
        if (initialTitle) {
            setTitle(initialTitle);
        }
    }, [initialTitle]);

    const handleShareClicked = async () => {
        if (doc) {
            let req: Document = {
                title: title,
                content: doc.content
            }
            try {
                const res = await docService.saveDocument(req);
                if (res) {
                    setId(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className={`flex ${window.screen.availWidth <= 768 ? 'flex-col' : 'flex-row'} justify-between items-center`}>
            <div className="relative w-1/2" data-te-input-wrapper-init>
                <input
                    type="text"
                    className={`peer text-4xl font-bold tracking-widest block min-h-[auto] ${window.screen.availWidth <= 768 ? '' : 'w-full'} rounded border-0 bg-transparent leading-[2.1] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-20`}
                    id="exampleFormControlInputHelper"
                    placeholder="Enter Title"
                    value={title ? title : ''}
                    disabled={!isEdit}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {isEdit && <button
                disabled={title === '' && doc?.content === ''}
                onClick={handleShareClicked}
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}>
                <span className="mr-2">Share</span>
                <ShareIcon />
            </button>}

            {id && id != '' && <Modal id={id} />}
        </div>
    )
}

export default Header;