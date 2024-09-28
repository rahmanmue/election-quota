import { Modal } from "@/components/Modal";
import { SelectDemo } from "@/components/Select";
import { Input } from "@/components/ui/input";
import { provinsi } from "@/lib/provinsi-list.";
import { DapilType } from "@/services/dapilService";
import { useEffect, useState } from "react";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: (data: DapilType, resetState: () => void) => void;
  initialData?: DapilType;
}

export const ActionModal = ({
  title,
  icon,
  submitForm,
  initialData,
}: ActionModalProps) => {
  const [data, setData] = useState<DapilType>({
    daerah_pemilihan: "",
    kabupaten_kota: "",
    provinsi: "",
    tahun: "",
    alokasi_kursi: "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const reset = () => {
    setData({
      daerah_pemilihan: initialData?.daerah_pemilihan || "",
      kabupaten_kota: initialData?.kabupaten_kota || "",
      provinsi: initialData?.provinsi || "",
      tahun: initialData?.tahun || "",
      alokasi_kursi: initialData?.alokasi_kursi || "",
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "tahun" || name === "alokasi_kursi" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      provinsi: value,
    }));
  };

  return (
    <Modal title={title} icon={icon} submitForm={() => submitForm(data, reset)}>
      <div className="py-4 flex flex-col gap-4">
        <SelectDemo
          placeholder="Provinsi"
          select={provinsi}
          onChange={handleSelectChange}
        />
        <Input
          type="text"
          name="kabupaten_kota"
          className="col-span-2"
          placeholder="Kab / Kota"
          value={data.kabupaten_kota}
          onChange={handleOnChange}
        />
        <Input
          type="text"
          name="daerah_pemilihan"
          className="col-span-2"
          placeholder="Daerah Pemilihan"
          value={data.daerah_pemilihan}
          onChange={handleOnChange}
        />
        <Input
          type="text"
          name="tahun"
          className="col-span-2"
          value={data.tahun}
          onChange={handleOnChange}
          placeholder="Tahun"
        />
        <Input
          type="number"
          name="alokasi_kursi"
          className="col-span-2"
          value={data.alokasi_kursi}
          onChange={handleOnChange}
          placeholder="Alokasi Kursi"
        />
      </div>
    </Modal>
  );
};
