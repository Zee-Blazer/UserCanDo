import React, { useEffect, useState } from "react";
import FormHeader from "./formHeader";
import FormComp from "./formComp";
import usePostRequest from "@/api/hooks/usePost";
import Loading from "@/components/General/loading";
import { useAppContext } from "@/app/context";
import { AgentProps } from "@/types";
import { validateAddAgent } from "@/types/validate";
//ignore

const AddBroker = () => {
  const [agentDetails, setAgentDetails] = useState<AgentProps | null>(null);
  const [formErrors, setFormErrors] = useState<AgentProps | null>(null);
  const { isSuccess, loading, postRequest } = usePostRequest();
  const { getBrokers, loadOverView } = useAppContext();
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAgentDetails({ ...agentDetails, [name]: value });
  };

  const validate = () => {
    const errors = validateAddAgent(agentDetails);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addBroker = async () => {
    const isValid = validate();
    if (isValid) {
      const payload: AgentProps = {
        ...agentDetails,
        image_url: file,
        role:
          agentDetails?.role === "Broker admin"
            ? "broker_admin"
            : agentDetails?.role === "Broker super-user"
              ? "broker_admin_user"
              : "broker_agent",
      };

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      postRequest("/add_broker_user", formData);
    } else {
      console.error("Form is invalid", formErrors);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      getBrokers();
      setAgentDetails(null);
      loadOverView();
      setFile(null);
    }
  }, [isSuccess]);

  return (
    <div className="mt-4 dark:bg-darkBg bg-lightBg p-4 rounded-xl h-full">
      <FormHeader addBroker={addBroker} />
      <FormComp
        agentData={agentDetails}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        setFile={setFile}
      />
      <Loading isLoading={loading} loadingText="Adding broker" />
    </div>
  );
};

export default AddBroker;
