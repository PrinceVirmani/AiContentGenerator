import React from "react";
import Templates from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { TEMPLATE } from "../_components/TemplateListSection";
import CopyButton from "./CopyButton"; // Import the new component

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

async function History() {
  const user = await currentUser();

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress ?? "")
    )
    .orderBy(desc(AIOutput.id));

  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Templates?.find((item) => item);
    return template;
  };

  return (
    <div className="m-5 p-5 border rounded-lg bgwh">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously Generated AI content
      </p>

      {HistoryList.map((item: HISTORY, index: number) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={GetTemplateName(item?.templateSlug)?.icon}
                width={50}
                height={50}
                alt="icon"
              />
              {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3">
              {item?.aiResponse || "No Response"}
            </h2>
            <h2>{item?.aiResponse?.length ?? 0}</h2>
            <h2>{item.createdAt}</h2>
            <h2>{item.aiResponse?.length}</h2>
            <h2>
              <CopyButton content={item.aiResponse ?? ""} />
            </h2>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default History;
