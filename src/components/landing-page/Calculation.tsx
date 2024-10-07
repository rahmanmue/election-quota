import { useEffect, useState, useMemo } from "react";
import { SelectDemo } from "../Select";
import { Button } from "../ui/button";
import { ComponentBarChart } from "@/components/BarChart";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DapilService from "@/services/dapilService";
import CalculationService from "@/services/calculationService";
import { useCalculationSL } from "@/hooks/useCalculationSL";
import { colorVote } from "@/lib/commonUtils";
import EmptyImage from "@/assets/Empty-amico.svg";

const dapilService = new DapilService();
const calculationService = new CalculationService();

const Calculation = () => {
  const [idDapil, setIdDapil] = useState<string>("");
  const [dataSelect, setDataSelect] = useState([]);

  const handleSelectChange = (value: string) => {
    setIdDapil(value);
  };

  const getAllDapil = async () => {
    const { data } = await dapilService.allDapil();
    setDataSelect(data);
  };

  const {
    setCalculation,
    data,
    divider,
    totalDivider,
    threshold,
    passFinalVote,
    totalVote,
  } = useCalculationSL();

  const getCalculation = async (id: string) => {
    const { data } = await calculationService.getResults(id);
    setCalculation(
      data.results,
      data.totalVotes,
      data.passFinalVote,
      data.voteThreshold
    );
  };

  useEffect(() => {
    getAllDapil();
  }, []);

  const handleSearch = () => {
    getCalculation(idDapil);
  };

  // Memoize the dataSelect to prevent unnecessary re-render when unchanged
  const memoizedDataSelect = useMemo(() => dataSelect, [dataSelect]);

  // Memoize the data from calculation results to optimize rendering
  const memoizedCalculationData = useMemo(() => data, [data]);

  return (
    <section id="calculation" className="container bg-muted/50 h-max py-10">
      <div className="flex flex-col md:justify-center gap-3">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Cari{" "}
          </span>
          Daerah Pemilihan
        </h2>

        <div className="flex gap-3 justify-center">
          <div className="md:w-1/2">
            <SelectDemo
              placeholder="[Provinsi]-[Kab/Kota]-[Daerah Pemilihan]-[Tahun]"
              select={memoizedDataSelect}
              onChange={handleSelectChange}
            />
          </div>
          <Button onClick={handleSearch}>Cari</Button>
        </div>

        <div
          className={
            data?.length == 0 || data === undefined
              ? "hidden"
              : "block md:mx-10"
          }
        >
          <div className="mb-6 mt-2 md:w-3/5 mx-auto ">
            <ComponentBarChart vote={data ?? []} />
          </div>

          <Table className="bg-white dark:bg-[hsl(var(--background))] border rounded-lg">
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
              {memoizedCalculationData?.map((item, i) => (
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
          <div className="flex my-3 gap-7 justify-end">
            <div className="flex items-center gap-2">
              <div className="md:w-4 md:h-4 w-5 h-5 bg-cyan-600 rounded-full" />
              <span className="font-medium text-xs">Lolos Perolehan Kursi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="md:w-4 md:h-4 w-5 h-5 bg-orange-500 rounded-full" />
              <span className="font-medium text-xs">
                Diatas Ambang Batas Suara {`[${threshold}] Tapi Tidak Terpilih`}
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            data?.length == 0
              ? "flex justify-center flex-col items-center gap-5"
              : "hidden"
          }
        >
          <img src={EmptyImage} alt="empty-img" className="w-1/4" />
          <span className="font-semibold">Data Masih Kosong</span>
        </div>
      </div>
    </section>
  );
};

export default Calculation;
