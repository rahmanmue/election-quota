import { useEffect } from "react";
import { Layout } from "@/components/admin-panel/Layout";
import { Search } from "@/components/Search";
import { ActionModal } from "./ActionModal";
import { CirclePlus, Pencil, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationTable } from "@/components/Pagination";
import { Alert } from "@/components/Alert";
import ParpolService from "@/services/parpolService";
import { ResponseParpol, ParpolType } from "@/services/parpolService";
import { noTabel } from "@/lib/commonUtils";
import { usePagination } from "@/hooks/usePagination";
import { useToast } from "@/hooks/use-toast";

const parpolService = new ParpolService();

const Parpol = () => {
  const { toast } = useToast();
  const { data, page, totalPages, pageSize, setPaginationData } =
    usePagination<ParpolType>();

  const getAllParpol = async () => {
    const res = (await parpolService.getAll()) as ResponseParpol;
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  useEffect(() => {
    getAllParpol();
  }, []);

  const addForm = async (data: ParpolType) => {
    const { message } = await parpolService.addParpol(data);
    toast({
      title: "Success",
      description: message,
    });
    getAllParpol();
    return;
  };

  const updateForm = async (data: ParpolType) => {
    const { message } = await parpolService.updateParpol(data);
    toast({
      title: "Success",
      description: message,
    });
    getAllParpol();
    return;
  };

  const deleteParpol = async (id: string) => {
    await parpolService.deleteParpol(id);
    getAllParpol();
  };

  const onSearch = async (search: string) => {
    const res = await parpolService.searhByKeyword(search);
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  const pagination = async (page: number) => {
    const res = (await parpolService.getAll(page)) as ResponseParpol;
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  return (
    <Layout title="Partai Politik">
      <div className="w-full flex flex-col gap-2 justify-between md:flex-row mb-5">
        <div className="mx-auto md:mx-0">
          <ActionModal
            title={"Tambah Partai Politik"}
            icon={<CirclePlus />}
            submitForm={(newData, resetState) => {
              addForm(newData);
              resetState();
            }}
          />
          <Button variant="ghost" onClick={getAllParpol}>
            <RefreshCcwIcon />
          </Button>
        </div>
        <Search placeholder="Cari Partai Politik" onSearch={onSearch} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead className="flex items-center w-[180px] md:w-max">
              Nama Partai Politik
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {noTabel(i, page, pageSize)}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <ActionModal
                  title={"Edit Partai Politik"}
                  icon={<Pencil />}
                  initialData={item}
                  submitForm={(updateData, resetState) => {
                    updateForm(updateData);
                    resetState();
                  }}
                />
                <Alert onDelete={() => deleteParpol(item.id!)} />
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

export default Parpol;
