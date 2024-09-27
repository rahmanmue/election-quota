import { Input } from "@/components/ui/input";
import { Layout } from "@/components/admin-panel/Layout";
import { Button } from "@/components/ui/button";

const arrData = [
  {
    nama_parpol: "pkb",
    total_suara_sah: 2210,
  },
  {
    nama_parpol: "gerindra",
    total_suara_sah: 9770,
  },
  {
    nama_parpol: "pdip",
    total_suara_sah: 8023,
  },
  {
    nama_parpol: "golkar",
    total_suara_sah: 9303,
  },
  {
    nama_parpol: "nasdem",
    total_suara_sah: 2842,
  },
  {
    nama_parpol: "garuda",
    total_suara_sah: 129,
  },
  {
    nama_parpol: "berkarya",
    total_suara_sah: 638,
  },
  {
    nama_parpol: "pks",
    total_suara_sah: 8202,
  },
  {
    nama_parpol: "perindo",
    total_suara_sah: 1501,
  },
  {
    nama_parpol: "ppp",
    total_suara_sah: 3880,
  },
  {
    nama_parpol: "psi",
    total_suara_sah: 971,
  },
  {
    nama_parpol: "pan",
    total_suara_sah: 4732,
  },
  {
    nama_parpol: "hanura",
    total_suara_sah: 4373,
  },
  {
    nama_parpol: "demokrat",
    total_suara_sah: 8408,
  },
  {
    nama_parpol: "pbb",
    total_suara_sah: 1203,
  },
  {
    nama_parpol: "pkpi",
    total_suara_sah: 56,
  },
];
const FormSuara = () => {
  return (
    <Layout title="Tambah Suara">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#0f172a] text-white text-sm md:text-base">
            <th className="py-2 px-2 text-center">No</th>
            <th className="py-2 ps-4 text-left">Nama Partai Politik</th>
            <th className="py-2 px-4 text-left">Total Suara Sah</th>
          </tr>
        </thead>
        <tbody>
          {arrData.map((item, i) => (
            <tr
              key={i}
              className="my-2 hover:bg-gray-50 dark:hover:bg-transparent"
            >
              <td className="py-3 px-2 text-center">{i + 1}</td>
              <td className="py-3 md:px-4">
                <Input
                  value={item.nama_parpol}
                  disabled
                  className="w-full uppercase"
                />
              </td>
              <td className="py-3 md:px-4 px-2">
                <Input
                  type="number"
                  placeholder="Masukan Total Suara Sah"
                  className="w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end pe-4">
        <Button className="md:w-1/3 w-full">Simpan</Button>
      </div>
    </Layout>
  );
};

export default FormSuara;
