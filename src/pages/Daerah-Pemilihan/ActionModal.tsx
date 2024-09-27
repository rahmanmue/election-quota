import { Modal } from "@/components/Modal";
import { SelectDemo } from "@/components/Select";
import { Input } from "@/components/ui/input";
import { provinsi } from "@/lib/provinsi-list.";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: () => void;
}

export const ActionModal = ({ title, icon, submitForm }: ActionModalProps) => {
  return (
    <Modal title={title} icon={icon} submitForm={submitForm}>
      <div className="py-4 flex flex-col gap-4">
        <SelectDemo placeholder="Provinsi" select={provinsi} />
        <Input
          type="text"
          className="col-span-2"
          placeholder="Kabupaten/Kota"
        />
        <Input
          type="text"
          className="col-span-2"
          placeholder="Daerah Pemilihan"
        />
        <Input type="number" className="col-span-2" placeholder="Tahun" />
        <Input
          type="number"
          className="col-span-2"
          placeholder="Alokasi Kursi"
        />
      </div>
    </Modal>
  );
};
