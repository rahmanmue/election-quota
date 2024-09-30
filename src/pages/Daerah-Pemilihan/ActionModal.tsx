import { Modal } from "@/components/Modal";
import { SelectDemo } from "@/components/Select";
import { Input } from "@/components/ui/input";
import { provinsi } from "@/lib/provinsi-list";
import { DapilType } from "@/services/dapilService";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { isEmptyObject } from "@/lib/commonUtils";

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

  const handleSubmit = () => {
    if (!isEmptyObject(data)) {
      // alert(JSON.stringify(data));
      submitForm(data, reset);
      return;
    }

    alert("Gak Boleh Kosong Coy..");
    return;
  };

  return (
    <Modal title={title} icon={icon} submitForm={handleSubmit}>
      <div className="py-4 flex flex-col gap-y-3.5">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>Provinsi</Label>
          <SelectDemo
            placeholder="Provinsi"
            select={provinsi}
            onChange={handleSelectChange}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>Kab/Kota</Label>
          <Input
            type="text"
            name="kabupaten_kota"
            className="col-span-2"
            placeholder="Kab / Kota"
            value={data.kabupaten_kota}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>Daerah Pemilihan</Label>
          <Input
            type="text"
            name="daerah_pemilihan"
            className="col-span-2"
            placeholder="Daerah Pemilihan"
            value={data.daerah_pemilihan}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>Tahun</Label>
          <Input
            type="text"
            name="tahun"
            className="col-span-2"
            value={data.tahun}
            onChange={handleOnChange}
            placeholder="Tahun"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label>Alokasi Kursi</Label>
          <Input
            type="number"
            name="alokasi_kursi"
            className="col-span-2"
            value={data.alokasi_kursi}
            onChange={handleOnChange}
            placeholder="Alokasi Kursi"
          />
        </div>
      </div>
    </Modal>
  );
};
