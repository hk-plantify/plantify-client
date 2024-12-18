"use client";
import Accordion from "@/app/(_components)/accordion";
import { useState, useEffect } from "react";

interface Props {
  id: number;
  name: string;
  description: string;
}

export default function OrganizationItem({ id, name, description }: Props) {
  const [orgId, setOrgId] = useState<string | undefined>();

  useEffect(() => {
    setOrgId(window.location.hash);
  }, []);

  return (
    <div className="bg-shadow-700 rounded-xl">
      <Accordion defaultValue={`#org_${id}` == orgId}>
        <Accordion.Summary className="mr-2">
          <div className="text-t4 md:text-t3 select-none hover:bg-shadow-700 cursor-pointer p-3 py-4 rounded-xl">
            {name}
          </div>
        </Accordion.Summary>
        <Accordion.Details>
          <p className="whitespace-pre-line text-bd3 md:text-bd2 p-2 rounded-b-xl">
            {description}
          </p>
        </Accordion.Details>
      </Accordion>
    </div>
  );
}
