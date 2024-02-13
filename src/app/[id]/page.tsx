"use client";
import DocumentService from "@/api/services/documentService/DocumentService";
import { DisabledSSREditor } from "@/components/editor/DisabledSSREditor";
import Header from "@/components/Header";
import { Document } from "@/core/dtos/api-modal/Document";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const View = () => {
    const docService = new DocumentService();
    const params = useParams<{ id: string }>();

    const [fetchedDoc, setFetchedDoc] = useState<Document>()

    useEffect(() => {
        docService.getDocumentById(params.id)
            .then((res) => {
                if (res) {
                    if (res.code === 200 && res.data.length != 0) {
                        setFetchedDoc(res.data[0]);
                    }
                }
            })
    }, [])

    return (
        <main >
            <div className="px-24 my-10"><Header isEdit={false} initialTitle={fetchedDoc?.title} /></div>
            <div className="flex flex-col items-center justify-between px-24">
                <div className="h-full w-full">
                    <DisabledSSREditor editable={false} initialContent={fetchedDoc?.content} />
                </div>
            </div>
        </main>
    )
}

export default View;