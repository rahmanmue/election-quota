import { Layout } from "@/components/admin-panel/Layout";
import DapilService from "@/services/dapilService";
import ParpolService from "@/services/parpolService";
import UserService from "@/services/userService";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dapilService = new DapilService();
const parpolService = new ParpolService();
const userService = new UserService();

const Dashboard = () => {
  const [data, setData] = useState({
    tDapil: 0,
    tParpol: 0,
    tUser: 0,
  });

  const getAll = async () => {
    const rDapil = await dapilService.getAll(1, 1000);
    const rParpol = await parpolService.getAll(1, 100);
    const rUser = await userService.getAll(1, 100);
    // console.log(rDapil, rParpol, rUser);

    setData({
      tDapil: rDapil?.totalItems,
      tParpol: rParpol?.totalItems,
      tUser: rUser?.totalItems,
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="flex gap-4 flex-wrap">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Partai Politik</CardTitle>
            <CardDescription>
              Partai Politik Yang Ada di Indonesia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-7xl font-bold">{data.tParpol}</h1>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Daerah Pemilihan</CardTitle>
            <CardDescription>
              Daerah Pemilihan Anda Yang Anda Masukan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-7xl font-bold">{data.tDapil}</h1>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Total User Yang Terdaftar di Election Quota.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-7xl font-bold">{data.tUser}</h1>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
