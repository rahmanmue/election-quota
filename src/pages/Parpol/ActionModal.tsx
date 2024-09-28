import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ParpolType } from "@/services/parpolService";

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
  const [data, setData] = useState<ParpolType>({
    name: "",
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

  return (
    <Modal title={title} icon={icon} submitForm={() => submitForm(data, reset)}>
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
