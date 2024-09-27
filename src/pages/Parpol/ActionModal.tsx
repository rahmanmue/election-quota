import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: () => void;
}

export const ActionModal = ({ title, icon, submitForm }: ActionModalProps) => {
  return (
    <Modal title={title} icon={icon} submitForm={submitForm}>
      <div className="py-4">
        <Input
          id="name"
          className="col-span-2"
          placeholder="Nama Partai Politik"
        />
      </div>
    </Modal>
  );
};
