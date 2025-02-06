"use client";

import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/Aimodal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

// If you're using SSR or static generation, ensure props are passed down correctly
export const getServerSideProps = async ({ params }: any) => {
  return {
    props: {
      params,
    },
  };
};

function CreateNewContent({ params }: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>();

  const { user } = useUser();
  const router = useRouter();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCrediUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  const GenerateAiContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      router.push("/dashboard/billing");
      return;
    }

    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

    const result = await chatSession.sendMessage(finalAiPrompt);
    setAiOutput(result?.response.text());

    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text());

    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (
    formData: any,
    slug: any | undefined,
    aiResponse: string | undefined
  ) => {
    const result = await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug ?? "",
      aiResponse: aiResponse ?? "",
      createdBy: user?.primaryEmailAddress?.emailAddress ?? "Unknown User",
      createdAt: moment().format("DD/MM/yyyy"),
    });

    console.log(result);
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAiContent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
