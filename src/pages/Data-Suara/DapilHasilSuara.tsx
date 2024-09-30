import { Layout } from "@/components/admin-panel/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DapilService from "@/services/dapilService";
import EmptyImage from "@/assets/Empty-amico.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CalculationService from "@/services/calculationService";
import { useCalculationSL } from "@/hooks/useCalculationSL";
import { colorVote } from "@/lib/commonUtils";
import { useReactToPrint } from "react-to-print";

const dapilService = new DapilService();
const calculationService = new CalculationService();

interface ResponseDapil {
  title: string;
  value: string | number;
}

const DapilHasilSuara = () => {
  const { id } = useParams();
  const [dapil, sDapil] = useState<ResponseDapil[]>([]);
  // const [infoDapil, sInfoDapil] = useState<DapilType>();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  const {
    setCalculation,
    data,
    divider,
    totalDivider,
    threshold,
    passFinalVote,
    totalVote,
  } = useCalculationSL();

  const getDapilById = async () => {
    const { data } = await dapilService.getById(id!);
    // sInfoDapil(data);

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

  const getCalculation = async () => {
    const { data } = await calculationService.getResults(id!);
    setCalculation(
      data.results,
      data.totalVotes,
      data.passFinalVote,
      data.voteThreshold
    );
  };

  useEffect(() => {
    getDapilById();
    getCalculation();
  }, []);

  return (
    <Layout title="Hasil Suara">
      <div className="flex gap-2 flex-wrap">
        <Link
          to={`/daerah-pemilihan/tambah-suara/${id}`}
          className={`${data?.length != 0 ? "hidden" : ""}`}
        >
          <Button>Tambah Data</Button>
        </Link>
        <Link
          to={`/daerah-pemilihan/edit-suara/${id}`}
          className={`${data?.length == 0 ? "hidden" : ""}`}
        >
          <Button>EDIT</Button>
        </Link>
        <Button variant="ghost" onClick={() => handlePrint()}>
          <Printer />
          <span className="ml-2">Cetak</span>
        </Button>
      </div>

      <div ref={contentRef}>
        <table className="mt-5">
          <tbody>
            {dapil?.map((item, i) => (
              <tr key={i}>
                <td className="text-sm font-normal">{item.title}</td>
                <td className="px-4 text-sm">:</td>
                <td className="text-sm font-normal">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="my-5 w-full  ">
          <Component
            vote={data!}
            tahun={infoDapil?.tahun as number}
            dapil={infoDapil?.daerah_pemilihan as string}
            provinsi={infoDapil?.provinsi as string}
          />
        </div> */}

        {data?.length != 0 ? (
          <>
            <div className="flex my-3 gap-7 justify-end">
              <div className="flex items-center gap-2">
                <div className="md:w-4 md:h-4 w-5 h-5 bg-cyan-600 rounded-full" />
                <span className="font-medium text-xs">
                  Lolos Perolehan Kursi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="md:w-4 md:h-4 w-5 h-5 bg-orange-500 rounded-full" />
                <span className="font-medium text-xs">
                  Diatas Ambang Batas Suara{" "}
                  {`[${threshold}] Tapi Tidak Terpilih`}
                </span>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2}>Nama Partai</TableHead>
                  <TableHead rowSpan={2}>Suara Sah</TableHead>
                  <TableHead colSpan={totalDivider}>Bilangan Pembagi</TableHead>
                  <TableHead rowSpan={2} className="text-center">
                    Perolehan Kursi
                  </TableHead>
                </TableRow>
                <TableRow>
                  {divider?.map((d, i) => (
                    <TableHead key={i}>{`/${d}`}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.namaParpol}</TableCell>
                    <TableCell>{item.suaraSah}</TableCell>
                    {divider?.map((d, i) => (
                      <TableCell
                        key={i}
                        className={colorVote(
                          item[`hasilSainteLagueBagi${d}`],
                          threshold as number,
                          passFinalVote as number
                        )}
                      >
                        {item[`hasilSainteLagueBagi${d}`]}
                      </TableCell>
                    ))}
                    <TableCell
                      className={`text-center ${
                        item.perolehanKursi != 0
                          ? "bg-cyan-600 text-white font-semibold"
                          : ""
                      }`}
                    >
                      {item.perolehanKursi}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="md:text-sm text-xs">
                    Total Suara{" "}
                  </TableCell>
                  <TableCell
                    className="text-start md:text-sm text-md"
                    colSpan={totalDivider ? totalDivider + 2 : 2}
                  >
                    {totalVote}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        ) : (
          <div className="flex md:gap-10 md:flex-row flex-col justify-center items-center">
            <img src={EmptyImage} className="h-[50vh]" alt="empty-image" />
            <h1 className="font-medium text-lg">Data Masih Kosong</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DapilHasilSuara;
