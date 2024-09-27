import { Modal } from "@/components/Modal";
import { SelectDemo } from "@/components/Select";
import { Input } from "@/components/ui/input";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: () => void;
}

const select = [
  {
    item: "Admin",
    value: "admin",
  },
  {
    item: "User",
    value: "user",
  },
];

export const ActionModal = ({ title, icon, submitForm }: ActionModalProps) => {
  return (
    <Modal title={title} icon={icon} submitForm={submitForm}>
      <div className="py-4 flex flex-col gap-4">
        <Input type="text" className="col-span-2" placeholder="username" />
        <Input type="email" className="col-span-2" placeholder="email" />
        <SelectDemo placeholder="Role" select={select} />
      </div>
    </Modal>
  );
};
