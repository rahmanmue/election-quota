import { Layout } from "@/components/admin-panel/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ParpolVoteService from "@/services/parpolVoteService";
import ParpolService from "@/services/parpolService";
import { ModalEditVote } from "./ModalEdit";
import { DokumenUpload } from "./DokumenUpload";

const parpolVoteService = new ParpolVoteService();
const parpolService = new ParpolService();

const FormSuara = () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const checkVoteStatus = async () => {
      const { data } = await parpolVoteService.getParpolVoteByDapil(
        id as string
      );

      if (
        (pathname.includes("tambah") && data.length != 0) ||
        (pathname.includes("edit") && data.length == 0)
      ) {
        navigate(`/daerah-pemilihan/${id}`);
      }
    };

    checkVoteStatus();
  }, [id, pathname, navigate]);

  //state
  const [vote, setVote] = useState<{ [key: string]: string | number }>({});
  const [dForm, setDForm] = useState<any[]>([]);

  useEffect(() => {
    const initialState = dForm.reduce((acc, item) => {
      acc[item.name] = 0; // Set all names to 0 initially
      return acc;
    }, {});
    setVote(initialState);
  }, [dForm]);

  const getAllParpol = async () => {
    const isTambah = pathname.includes("tambah");
    const { data } = isTambah
      ? await parpolService.getAll(1, 100)
      : await parpolVoteService.getParpolVoteByDapil(id as string);

    setDForm(data);
  };

  useEffect(() => {
    getAllParpol();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVote((prev) => ({ ...prev, [name]: value !== "" ? value : "0" }));
  };

  const submitFormAdd = async () => {
    const newData = Object.entries(vote).map(([key, value]) => ({
      nama_parpol: key,
      total_suara_sah: value !== "" ? Number(value) : 0,
      daerah_pemilihan_id: id,
    }));

    // alert(JSON.stringify(newData));

    await parpolVoteService.addParpolVote(newData);
    navigate(`/daerah-pemilihan/${id}`);
  };

  const submitFormEdit = async (data: any) => {
    await parpolVoteService.updateParpol(data);
    getAllParpol();
  };

  const uploadDoc = async (formData: FormData) => {
    await parpolVoteService.uploadDocument(formData);
    navigate(`/daerah-pemilihan/${id}`);
  };

  return (
    <Layout
      title={
        pathname.includes("tambah")
          ? "Tambah Suara Parpol"
          : "Edit Suara Parpol"
      }
    >
      <div className={`my-4 ${pathname.includes("edit") ? "hidden" : ""}`}>
        <DokumenUpload onUpload={uploadDoc} />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#0f172a] text-white text-sm md:text-base">
            <th className="py-2 px-2 text-center">No</th>
            <th className="py-2 ps-4 text-left  md:w-1/3">
              Nama Partai Politik
            </th>
            <th className="py-2 px-4 text-center">Total Suara Sah</th>
          </tr>
        </thead>
        <tbody>
          {dForm?.map((item, i) => (
            <tr
              key={i}
              className="my-2 hover:bg-gray-50 dark:hover:bg-transparent"
            >
              <td className="py-3 px-2 text-center">{i + 1}</td>
              <td className="py-3 md:px-4 uppercase font-semibold">
                {item.name ?? item.nama_parpol}
              </td>
              <td className="py-3 md:px-4 px-2 text-center">
                {pathname.includes("tambah") ? (
                  <Input
                    required
                    type="number"
                    min={0}
                    placeholder="Masukan Total Suara Sah"
                    className="w-full"
                    name={`${item.name}`}
                    onChange={handleOnChange}
                  />
                ) : (
                  <div className="flex justify-evenly items-center">
                    <span>{item.total_suara_sah}</span>
                    <ModalEditVote
                      initialData={item}
                      submitForm={submitFormEdit}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Button
          className={`w-full ${pathname.includes("edit") ? "hidden" : " "}`}
          type="submit"
          onClick={submitFormAdd}
        >
          SUBMIT
        </Button>
      </div>
    </Layout>
  );
};

export default FormSuara;
