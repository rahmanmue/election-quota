import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ParpolType } from "@/services/parpolService";
import { isEmptyObject } from "@/lib/commonUtils";
import { useToast } from "@/hooks/use-toast";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: (data: ParpolType, resetState: () => void) => void;
  initialData?: ParpolType;
}

export const ActionModal = ({
  title,
  icon,
  submitForm,
  initialData,
}: ActionModalProps) => {
  const { toast } = useToast();
  const [data, setData] = useState<ParpolType>({
    name: initialData?.name || "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const reset = () => {
    setData({
      name: initialData?.name || "",
    });
  };

  const handleSubmit = () => {
    if (!isEmptyObject(data)) {
      submitForm(data, reset);
      return;
    }

    toast({
      title: "Uh oh! Empty Data.",
      description: "There was a Empty Data with your request!.",
      variant: "destructive",
    });

    if (initialData) {
      setData(initialData as ParpolType);
    }

    return;
  };

  return (
    <Modal title={title} icon={icon} submitForm={handleSubmit}>
      <div className="py-4">
        <Input
          className="col-span-2"
          placeholder="Nama Partai Politik"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
          tabIndex={initialData?.id ? -1 : 0}
        />
      </div>
    </Modal>
  );
};
