import { Layout } from "@/components/admin-panel/Layout";
import { Search } from "@/components/Search";
import { ActionModal } from "./ActionModal";
import { CirclePlus, Pencil, NotebookTabs, RefreshCcwIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import DapilService from "@/services/dapilService";
import { PaginationTable } from "@/components/Pagination";
import { DapilType, ResponseDapil } from "@/services/dapilService";
import { usePagination } from "@/hooks/usePagination";
import { useEffect } from "react";
import { noTabel } from "@/lib/commonUtils";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const dapilService = new DapilService();

const Dapil = () => {
  const { toast } = useToast();
  const { data, page, totalPages, pageSize, setPaginationData } =
    usePagination<DapilType>();

  const getAllDapil = async () => {
    const res = (await dapilService.getAll()) as ResponseDapil;
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  useEffect(() => {
    getAllDapil();
  }, []);

  const addForm = async (data: DapilType) => {
    const { message } = await dapilService.addDapil(data);
    toast({
      title: "Success",
      description: message,
    });
    getAllDapil();
    return;
  };

  const updateForm = async (data: DapilType) => {
    const { message } = await dapilService.updateDapil(data);
    toast({
      title: "Success",
      description: message,
    });
    getAllDapil();
    return;
  };

  const deleteDapil = async (id: string) => {
    await dapilService.deleteDapil(id);
    getAllDapil();
  };

  const onSearch = async (search: string) => {
    const res = await dapilService.searhByKeyword(search);
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  const pagination = async (page: number) => {
    const res = (await dapilService.getAll(page)) as ResponseDapil;
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  return (
    <Layout title="Daerah Pemilihan">
      <div className="w-full flex flex-col gap-2 justify-between md:flex-row mb-5">
        <div className="mx-auto md:mx-0">
          <ActionModal
            title={"Tambah Daerah Pemilihan"}
            icon={<CirclePlus />}
            submitForm={(newData, resetState) => {
              addForm(newData);
              resetState();
            }}
          />
          <Button variant="ghost" onClick={getAllDapil}>
            <RefreshCcwIcon />
          </Button>
        </div>
        <Search placeholder="Cari Daerah Pemilihan" onSearch={onSearch} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Tahun</TableHead>
            <TableHead>Provinsi</TableHead>
            <TableHead>Kabupaten/Kota</TableHead>
            <TableHead>Daerah Pemilihan</TableHead>
            <TableHead className="text-center">Alokasi Kursi</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {noTabel(i, page, pageSize)}
              </TableCell>
              <TableCell>{item.tahun}</TableCell>
              <TableCell>{item.provinsi}</TableCell>
              <TableCell>{item.kabupaten_kota}</TableCell>
              <TableCell>{item.daerah_pemilihan}</TableCell>
              <TableCell className="text-center font-medium">
                {item.alokasi_kursi}
              </TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Link to={`/daerah-pemilihan/${item.id}`}>
                  <Button variant="ghost">
                    <NotebookTabs />
                  </Button>
                </Link>
                <ActionModal
                  title={"Edit Partai Politik"}
                  icon={<Pencil />}
                  initialData={item}
                  submitForm={(updateData, resetState) => {
                    updateForm(updateData);
                    resetState();
                  }}
                />
                <Alert onDelete={() => deleteDapil(item.id!)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationTable
        currentPage={page}
        totalPages={totalPages}
        onPageChange={pagination}
      />
    </Layout>
  );
};

export default Dapil;
