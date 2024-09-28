import { Layout } from "@/components/admin-panel/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import DapilService from "@/services/dapilService";
import ParpolVoteService, {
  ParpolVoteType,
} from "@/services/parpolVoteService";

const dapilService = new DapilService();
const parpolVoteService = new ParpolVoteService();

interface ResponseDapil {
  title: string;
  value: string | number;
}

const DapilHasilSuara = () => {
  const { id } = useParams();
  const [dapil, sDapil] = useState<ResponseDapil[]>([]);
  const [pV, spV] = useState<any[]>([]);

  const getDapilById = async (id: string) => {
    const { data } = await dapilService.getById(id!);

    sDapil([
      {
        title: "Daerah Pemilihan" as string,
        value: data.daerah_pemilihan,
      },
      {
        title: "[Kabupaten/Kota]",
        value: data.kabupaten_kota,
      },
      {
        title: "Provinsi",
        value: data.provinsi,
      },
      {
        title: "Tahun",
        value: data.tahun,
      },
      {
        title: "Alokasi Kursi",
        value: data.alokasi_kursi,
      },
    ]);
  };

  const getParpolVote = async (id: string) => {
    const { data } = await parpolVoteService.getParpolVoteByDapil(id);
    spV(data);
  };

  useEffect(() => {
    getDapilById(id!);
    getParpolVote(id!);
  }, [id]);

  return (
    <Layout title="Hasil Suara">
      <div className="flex gap-2 flex-wrap">
        <Button disabled={pV.length != 0}>
          <Link to={`/daerah-pemilihan/tambah-suara/${id}`}>Tambah Data</Link>
        </Button>

        <Button disabled={pV.length == 0}>
          <Link to={`/daerah-pemilihan/edit-suara/${id}`}>EDIT</Link>
        </Button>
        <Button variant="ghost">
          <Printer />
          <span className="ml-2">Cetak</span>
        </Button>
      </div>

      <table className="mt-5">
        {dapil?.map((item, i) => (
          <tr key={i}>
            <td>{item.title}</td>
            <td className="px-4">:</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </table>

      {pV.length != 0 ? (
        "YI"
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <h1>Data Masih Kosong</h1>
        </div>
      )}
    </Layout>
  );
};

export default DapilHasilSuara;
