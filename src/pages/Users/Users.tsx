import { Layout } from "@/components/admin-panel/Layout";
import { Search } from "@/components/Search";
import { ActionModal } from "./ActionModal";
import { Pencil, RefreshCcwIcon } from "lucide-react";
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
import { useEffect } from "react";
import UserService, { ResponseUser, UserType } from "@/services/userService";
import { usePagination } from "@/hooks/usePagination";
import { noTabel } from "@/lib/commonUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const userService = new UserService();

const Users = () => {
  const { toast } = useToast();
  const { data, page, totalPages, pageSize, setPaginationData } =
    usePagination<UserType>();

  const getAllUser = async () => {
    const res = await userService.getAll();
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const onEditUser = async (data: UserType) => {
    const { message } = await userService.updateUser(data);
    toast({
      title: "Success",
      description: message,
    });
    getAllUser();
    return;
  };

  const onDelete = async (id: string) => {
    await userService.deleteUser(id);
    getAllUser();
  };

  const onSearch = async (search: string) => {
    const res = await userService.searhByKeyword(search);
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  const pagination = async (page: number) => {
    const res = (await userService.getAll(page)) as ResponseUser;
    setPaginationData(res.data, res.currentPage, res.totalPages, res.pageSize);
  };

  return (
    <Layout title="Users">
      <div className="w-full flex flex-col gap-2 justify-between md:flex-row mb-5">
        <Button variant="ghost" onClick={getAllUser}>
          <RefreshCcwIcon />
        </Button>
        <Search placeholder="Cari User" onSearch={onSearch} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {noTabel(i, page, pageSize)}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="capitalize">{item.role}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <ActionModal
                  title={"Edit User"}
                  icon={<Pencil />}
                  initialData={item}
                  submitForm={(updateData) => onEditUser(updateData)}
                />
                <Alert onDelete={() => onDelete(item.id!)} />
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

export default Users;
