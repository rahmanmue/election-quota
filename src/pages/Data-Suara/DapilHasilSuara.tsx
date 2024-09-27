import { Layout } from "@/components/admin-panel/Layout";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { FilePlus2, Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const DapilHasilSuara = () => {
  const { id } = useParams();
  const isEmpty = id;
  const detailDapil = [
    {
      title: "Daerah Pemilihan",
      value: "daerah_pemilihan",
    },
    {
      title: "[Kabupaten/Kota]",
      value: "kabupaten_kota",
    },
    {
      title: "Provinsi",
      value: "provinsi",
    },
    {
      title: "Tahun",
      value: "tahun",
    },
    {
      title: "Alokasi Kursi",
      value: "alokasi_kursi",
    },
  ];
  return (
    <Layout title="Hasil Suara">
      <div className="flex gap-2 flex-wrap">
        <Button>Tambah Data</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FilePlus2 />
              <span className="ml-2">Tambah Via Dokumen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Dokumen</DialogTitle>
              <DialogDescription>
                Download template dokumen ini lalu upload kembali dengan data
                yang sudah terisi.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <Input type="file" />
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button disabled={isEmpty != ""}>EDIT</Button>
        <Button variant="ghost">
          <Printer />
          <span className="ml-2">Cetak</span>
        </Button>
      </div>

      <table className="mt-5">
        {detailDapil.map((item) => (
          <tr>
            <td>{item.title}</td>
            <td className="px-4">:</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </table>

      {!isEmpty ? (
        "Yoyo"
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <h1>Data Masih Kosong</h1>
        </div>
      )}
    </Layout>
  );
};

export default DapilHasilSuara;
