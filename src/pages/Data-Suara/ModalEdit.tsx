import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { ParpolVoteType } from "@/services/parpolVoteService";

interface ModalEditProps {
  submitForm: (data: any) => void;
  initialData?: any;
}

export const ModalEditVote = ({ initialData, submitForm }: ModalEditProps) => {
  const baseData: ParpolVoteType = {
    total_suara_sah: initialData?.total_suara_sah || 0,
    id: initialData?.id || "",
  };

  const [data, setData] = useState<ParpolVoteType>(baseData);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      title="Edit Total Suara"
      icon={<Pencil />}
      submitForm={() => submitForm(data)}
    >
      <div>
        <Input
          type="number"
          name="total_suara_sah"
          placeholder="Total Suara Sah"
          onChange={handleOnChange}
          tabIndex={-1}
          value={data.total_suara_sah}
        />
      </div>
    </Modal>
  );
};
