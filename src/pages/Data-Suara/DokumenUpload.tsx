import { FilePlus2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ParpolService from "@/services/parpolService";

const parpolService = new ParpolService();

interface DokumenUploadProps {
  onUpload: (data: FormData) => void;
}

export const DokumenUpload = ({ onUpload }: DokumenUploadProps) => {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const submitForm = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    // Periksa tipe MIME file
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/wps-office.xlsx",
      "Excel.application/wps-office.xlsx",
    ];
    if (!allowedTypes.includes(file.type)) {
      console.error("Tipe file tidak diizinkan");
      alert("Tipe file tidak diizinkan. Harap unggah file Excel.");
      return;
    }

    const formData = new FormData();
    formData.append("id_dapil", id as string);
    formData.append("document", file);

    // console.log(formData.get("id_dapil"));
    // console.log(formData.get("document"));
    onUpload(formData);
  };

  const handleSubmit = () => {
    submitForm();
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FilePlus2 />
          <span className="ml-2">Tambah Via Dokumen</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Dokumen</DialogTitle>
          <DialogDescription>
            Download template
            <a
              href={parpolService.downloadDokumen()}
              className="text-primary underline"
            >
              {" "}
              dokumen ini{" "}
            </a>
            lalu upload kembali dengan data yang sudah terisi.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e: any) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
